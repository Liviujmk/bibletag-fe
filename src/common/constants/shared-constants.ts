export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const AuthProvider = `${import.meta.env.VITE_AUTH_PROVIDER}.${import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID}.LastAuthUser`
export const ALLOWED_USER = import.meta.env.VITE_ALLOWED_USER;

export const API_PATHS = {
  ARTICLES: '/articles',
  COLLECTIONS: '/collections',
}