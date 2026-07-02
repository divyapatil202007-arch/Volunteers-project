import app from '../backend/src/app.js';
import { connectDB } from '../backend/src/config/db.js';

// Cache database connection
let isConnected = false;

const startServerless = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error('Failed to connect to database in Vercel Serverless Function:', err);
    }
  }
};

export default async (req, res) => {
  // Ensure database is connected before handling request
  await startServerless();
  return app(req, res);
};
