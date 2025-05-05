import { connectToDatabase } from '../lib/mongodb.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

async function initDb() {
  try {
    await connectToDatabase();
    
    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      // Create admin user
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      
      await User.create({
        name: 'Admin User',
        email: 'admin@hackathon.com',
        password: hashedPassword,
        role: 'admin',
        college: 'NIET',
        phone: '1234567890',
        teamName: 'Admin Team',
        teamMembers: [],
        applicationStatus: 'approved'
      });
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDb(); 