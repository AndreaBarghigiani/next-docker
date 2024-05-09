'use server';

// Utils
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { db } from '@/src/drizzle';
import { eq } from 'drizzle-orm';
import { generateVerificationToken } from '@/src/lib/utils/tokens';

// Types & Schemas
import { RegisterSchema } from '@/src/schemas';
import { users } from '@/src/drizzle/schema/AuthTables';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    console.log('Email already in use!');
    return { error: 'Email already in use!' };
  }

  await db.insert(users).values({ name, email, password: hashedPassword });

  const vToken = await generateVerificationToken(email);

  // Send verification token email

  return { success: 'Success! Check your email for a verification link.' };
};
