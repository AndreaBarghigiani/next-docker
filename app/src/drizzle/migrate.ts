import { migrate } from 'drizzle-orm/postgres-js/migrator';
import config from '../../drizzle.config';
import { connection, db } from '@/src/drizzle';

export const migrateDB = async () => {
  await migrate(db, { migrationsFolder: config.out as string });

  await connection?.end();
};

migrateDB();
