import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email must be a valid email address',
  }),
  password: z.string().min(6, { message: 'Minimum 6 characters' }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});
