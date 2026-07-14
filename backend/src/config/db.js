import { PrismaClient } from '@prisma/client';
import pkg from 'pg';
const { Pool } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import { logger } from './logger.js';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.jaxwfomyuzulqxtvcufr:Omharsh%402006@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info('PostgreSQL connected via Prisma');
  } catch (error) {
    logger.error('Prisma connection error:', error.message);
    throw error;
  }
};
