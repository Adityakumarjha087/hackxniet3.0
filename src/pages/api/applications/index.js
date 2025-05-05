import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const applications = await User.find({ role: 'participant' })
          .select('-password')
          .sort({ createdAt: -1 });
        res.status(200).json(applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Error fetching applications' });
      }
      break;

    case 'POST':
      try {
        const { name, email, password, college, phone, teamName, teamMembers } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new user
        const user = new User({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          college,
          phone,
          teamName,
          teamMembers,
          role: 'participant',
          applicationStatus: 'pending'
        });

        await user.save();
        res.status(201).json({ message: 'Application submitted successfully' });
      } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Error submitting application' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 