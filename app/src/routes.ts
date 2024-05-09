/**
 * An array of routes that are publicly accessible
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged users to LOGIN_REDIRECT
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register'];

/**
 * The prefix for API routes
 * @see {@link https://next-auth.js.org/configuration/nextjs}
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The path to redirect to after login
 */
export const LOGIN_REDIRECT = '/search';
