import { PrismaClient } from '@prisma/client';
import pkg from 'pg';
const { Pool } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import { logger } from './logger.js';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info(`Supabase PostgreSQL Connected via Prisma`);
  } catch (error) {
    logger.error(`Error connecting to Supabase: ${error.message}`);
    throw error;
  }
};
