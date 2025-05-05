import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    await connectToDatabase();
    const user = await User.findById(session.user.id).select('role');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Error checking role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 