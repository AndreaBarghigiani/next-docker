// Utils
import { db } from '@/src/drizzle';
import { verificationToken } from '@/src/drizzle/schema';
import { eq } from 'drizzle-orm';
import { getVerificationTokenByEmail } from '@/src/lib/utils/verification-token';
import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 6 * 30 * 24 * 60 * 60 * 1000); // 6 months

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .select()
      .from(verificationToken)
      .where(eq(verificationToken.id, existingToken.id));
  }

  const vToken = await db
    .insert(verificationToken)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return vToken.pop();
};
