import { createClient } from '@supabase/supabase-js';
import { logger } from './logger.js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://lwvgnadxqfrrtjmkhgzb.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseKey) {
  logger.warn('SUPABASE_ANON_KEY is missing from environment variables! Supabase Auth will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseKey || 'dummy_key');
