import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

// Default MongoDB URI for development
const DEFAULT_MONGODB_URI = 'mongodb://127.0.0.1:27017/hackathon';

// Get MongoDB URI from environment variables or use default
const uri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

const options = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(uri, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (error.name === 'MongooseServerSelectionError') {
      console.error('\nPlease make sure MongoDB is running on your system.');
      console.error('You can start MongoDB by:');
      console.error('1. Opening a new terminal');
      console.error('2. Running "mongod" command');
      console.error('\nIf MongoDB is not installed, please install it first:');
      console.error('1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community');
      console.error('2. Follow the installation instructions for your operating system');
    }
    throw error;
  }
};

// Export a module-scoped MongoClient promise
export default clientPromise; 