// Utils
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import db from '@/src/drizzle';
import authConfig from './auth.config';
import bcrypt from 'bcrypt';
import { getUserByEmail, getUserById } from '@/src/lib/utils';

// Types & Schemas
import type { DefaultSession } from 'next-auth';
import { LoginSchema } from './schemas';
import type { Roles, Memberships } from '@/src/drizzle/schema/AuthTables';
declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's role. */
      role: Roles;
      membership: Memberships;
      createdAt: Date | null;
      emailVerified: Date | null;
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      if (!user || !user.id) return false;

      const existingUser = await getUserById(user.id);

      // if (!existingUser || !existingUser.emailVerified) {
      //   return false;
      // }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        // Add database ID to current session
        if (token.sub) {
          session.user.id = token.sub;
        }

        // Add user role to current session
        if (token.role) {
          session.user.role = token.role as Roles;
        }

        if (token.membership) {
          session.user.membership = token.membership as Memberships;
        }

        // Add user creation date to current session
        if (token.createdAt) {
          session.user.createdAt = token.createdAt as Date | null;
        }

        // Add email verification status to current session
        if (token.emailVerified) {
          session.user.emailVerified = token.emailVerified as Date | null;
        }
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.membership = existingUser.membership;
      token.createdAt = existingUser.createdAt;
      token.emailVerified = existingUser.emailVerified;

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const userPassword = user.password;

          if (!userPassword) return null;

          const passwordMatch = await bcrypt.compare(password, userPassword);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
});
