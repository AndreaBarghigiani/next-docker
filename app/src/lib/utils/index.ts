// Utils
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Types
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// External
export * from './users';
