// Types & Schemas
import type { NextAuthConfig } from 'next-auth';

export default {
  secret: process.env.AUTH_SECRET,
  providers: [],
} satisfies NextAuthConfig;
