import { PrismaClient } from '@prisma/client';
import { logger } from './logger.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  logger.error('DATABASE_URL is not defined in the environment variables!');
  // Exit the process so we don't start the app with a missing database
  process.exit(1);
}

export const prisma = new PrismaClient({ errorFormat: 'minimal' });

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected via Prisma');
  } catch (error) {
    logger.error('Prisma connection error:', error.message);
    throw error;
  }
};
