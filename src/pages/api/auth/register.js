import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, addUser } from '../../../lib/users';

// In a real application, you would use a database
// This is just for demonstration
const users = [];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password, teamName, college, phone } = req.body;

    // Validate input
    if (!name || !email || !password || !teamName || !college || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now(), // Using timestamp as ID
      name,
      email,
      password: hashedPassword,
      teamName,
      college,
      phone
    };

    addUser(user);

    // Create token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
