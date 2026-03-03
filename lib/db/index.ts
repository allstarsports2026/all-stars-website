import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠️ DATABASE_URL is not defined in your environment. Database connections will fail.');
  }
}

// Neon() throws if passed an empty string or undefined.
// We use a dummy string during build-time to prevent the crash.
const sql = neon(connectionString || 'postgres://db:db@localhost:5432/db');
export const db = drizzle(sql, { schema });


