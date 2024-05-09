'use server';

// Utils
import * as z from 'zod';
import { signIn } from '@/src/auth';
import { LOGIN_REDIRECT } from '@/src/routes';

// Types & Schemas
import { LoginSchema } from '@/src/schemas';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/src/lib/utils';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'User does not exists' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        case 'AccessDenied':
          return { error: 'Activate account.' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    // Essential throw otherwise no redirect
    // https://nextjs.org/learn/dashboard-app/adding-authentication#updating-the-login-form
    throw error;
  }
};
