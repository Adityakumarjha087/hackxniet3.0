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
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Teammate name is required' });
    }

    // Get user from token
    const user = await db.collection('users').findOne({ token });
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check if team size limit is reached
    if (user.teammates && user.teammates.length >= 4) {
      return res.status(400).json({ message: 'Maximum team size is 4 members' });
    }

    // Add teammate
    const updatedUser = await db.collection('users').findOneAndUpdate(
      { token },
      { 
        $push: { teammates: name },
        $set: { updatedAt: new Date() }
      },
      { returnDocument: 'after' }
    );

    res.status(200).json(updatedUser.value);
  } catch (error) {
    console.error('Error adding teammate:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 