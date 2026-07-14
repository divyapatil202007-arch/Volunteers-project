import { logger } from './logger.js';

export const connectDB = async () => {
  try {
    // In-memory mock database mode - no real connection needed!
    logger.info('Mock In-Memory Database connected for Hackathon Mode!');
  } catch (error) {
    logger.error('Mock connection error:', error.message);
    throw error;
  }
};
