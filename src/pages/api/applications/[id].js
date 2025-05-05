import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Application ID is required' });
  }

  await connectToDatabase();

  switch (req.method) {
    case 'PATCH':
      try {
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
          return res.status(400).json({ message: 'Invalid status' });
        }

        const updatedUser = await User.findByIdAndUpdate(
          id,
          { applicationStatus: status },
          { new: true }
        ).select('-password');

        if (!updatedUser) {
          return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ message: 'Error updating application' });
      }
      break;

    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 