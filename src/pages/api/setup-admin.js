import { connectToDatabase } from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      email,
      password: hashedPassword,
      name,
      role: 'admin',
      college: 'Admin College',
      phone: '0000000000',
      applicationStatus: 'approved'
    });

    await admin.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Error creating admin user' });
  }
} 