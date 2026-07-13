import { PrismaClient } from '@prisma/client';
import { logger } from './logger.js';

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info(`Supabase PostgreSQL Connected via Prisma`);
  } catch (error) {
    logger.error(`Error connecting to Supabase: ${error.message}`);
    throw error;
  }
};
