import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

declare module global {
  let connection: ReturnType<typeof postgres> | undefined;
}

export let connection: ReturnType<typeof postgres> | undefined;

if (process.env.NODE_ENV === 'production') {
  if (!global.connection) {
    global.connection = postgres(process.env.DATABASE_URL as string, {
      max: 3,
      prepare: false,
    });
  }

  connection = global.connection;
} else {
  connection = postgres(process.env.DATABASE_URL as string, {
    max: 1,
  });
}

export const db = drizzle(connection, { schema, logger: true });

export type db = typeof db;

export default db;
