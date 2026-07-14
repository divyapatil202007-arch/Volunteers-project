import { PrismaClient } from '@prisma/client';
import pkg from 'pg';
const { Pool } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import { logger } from './logger.js';

export let prisma;

export const connectDB = async () => {
  try {
    if (!prisma) {
      const connectionString = process.env.DATABASE_URL;
      
      if (!connectionString) {
        throw new Error('CRITICAL: DATABASE_URL environment variable is missing in Vercel Settings!');
      }

      const pool = new Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      prisma = new PrismaClient({ adapter });
    }

    await prisma.$connect();
    logger.info('PostgreSQL connected via Prisma');
  } catch (error) {
    logger.error('Prisma connection error:', error.message);
    throw error;
  }
};
