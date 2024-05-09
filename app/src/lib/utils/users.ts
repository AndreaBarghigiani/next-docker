'use server';

// Utils
import { db } from '@/src/drizzle';
import { memberships, users } from '@/src/drizzle/schema';
import { eq } from 'drizzle-orm';

/**
 * Retrieves a user from the database based on their email address.
 *
 * @param {string} email - The email address of the user.
 * @return {Promise<User | null>} A Promise that resolves to the user object if found, or null if not found.
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user.pop();
  } catch {
    return null;
  }
};

/**
 * Retrieves a user from the database based on their ID.
 *
 * @param {string} id - The ID of the user.
 * @return {Promise<User | null>} A Promise that resolves to the user object if found, or null if not found.
 */
export const getUserById = async (id: string) => {
  try {
    const user = await db
      .select({
        email: users.email,
        role: users.role,
        membership: users.membership,
        emailVerified: users.emailVerified,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, id));
    return user.pop();
  } catch {
    return null;
  }
};
