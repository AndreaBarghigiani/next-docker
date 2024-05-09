import * as z from 'zod';
import {
  timestamp,
  pgTable,
  pgEnum,
  text,
  primaryKey,
  integer,
  varchar,
  uuid,
} from 'drizzle-orm/pg-core';

import type { AdapterAccount } from 'next-auth/adapters';

export const roles = pgEnum('role', ['user', 'admin', 'company', 'university']);
export const rolesEnumSchema = z.enum(roles.enumValues);
export type Roles = z.infer<typeof rolesEnumSchema>;

export const memberships = pgEnum('membership', ['free', 'premium', 'voucher']);
export const membershipsEnumSchema = z.enum(memberships.enumValues);
export type Memberships = z.infer<typeof membershipsEnumSchema>;

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  first_name: text('first_name'),
  last_name: text('last_name'),
  job_title: text('job_title').notNull().default('Unknown'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  role: roles('role').notNull().default('user'),
  membership: memberships('membership').notNull().default('free'),
  password: varchar('password', { length: 255 }),
  image: text('image'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow(),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const verificationToken = pgTable(
  'verificationToken',
  {
    id: uuid('id').notNull().defaultRandom(),
    email: text('email').notNull(),
    token: text('token').notNull().unique(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compoundKey: primaryKey({
      columns: [verificationToken.email, verificationToken.token],
    }),
  })
);
