import { PrismaClient } from '@prisma/client';
import { logger } from './logger.js';
import fs from 'fs';
import path from 'path';

let dbUrl = process.env.DATABASE_URL;

// On Vercel, the filesystem is read-only except for /tmp.
// SQLite needs write access to create .wal and .shm files even for reads.
// We must copy the bundled dev.db to /tmp/dev.db before connecting.
if (process.env.VERCEL || process.env.VERCEL_REGION) {
  try {
    const sourceDbPath = path.join(process.cwd(), 'backend', 'dev.db');
    const tmpDbPath = '/tmp/dev.db';
    
    // Copy if it doesn't exist in /tmp yet
    if (!fs.existsSync(tmpDbPath) && fs.existsSync(sourceDbPath)) {
      fs.copyFileSync(sourceDbPath, tmpDbPath);
      logger.info('Copied dev.db to /tmp/dev.db for Vercel execution');
    }
    
    dbUrl = 'file:/tmp/dev.db';
  } catch (err) {
    logger.error('Failed to copy sqlite db to /tmp:', err.message);
  }
} else if (!dbUrl) {
  // Local fallback if no .env
  dbUrl = 'file:../dev.db';
}

export const prisma = new PrismaClient({ 
  errorFormat: 'minimal',
  datasources: {
    db: {
      url: dbUrl
    }
  }
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info(`Database connected via Prisma (URL: ${dbUrl})`);
  } catch (error) {
    logger.error('Prisma connection error:', error.message);
    throw error;
  }
};
