import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const TestTable = pgTable('TestTable', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  active: boolean('active').notNull().default(false),
});

export default TestTable;
