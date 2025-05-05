import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { db } = await connectToDatabase();
    const { index } = req.body;

    if (typeof index !== 'number') {
      return res.status(400).json({ message: 'Invalid teammate index' });
    }

    // Get user from token
    const user = await db.collection('users').findOne({ token });
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check if index is valid
    if (!user.teammates || index < 0 || index >= user.teammates.length) {
      return res.status(400).json({ message: 'Invalid teammate index' });
    }

    // Remove teammate
    const updatedTeammates = [...user.teammates];
    updatedTeammates.splice(index, 1);

    const updatedUser = await db.collection('users').findOneAndUpdate(
      { token },
      { 
        $set: { 
          teammates: updatedTeammates,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );

    res.status(200).json(updatedUser.value);
  } catch (error) {
    console.error('Error removing teammate:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 