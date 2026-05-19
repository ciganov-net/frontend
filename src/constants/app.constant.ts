export const APP_CONFIG = {
  baseUrl: process.env['NEXT_PUBLIC_APP_URL'],
  apiUrl: process.env['NEXT_PUBLIC_API_BASE_URL'],
  cookieDomain: process.env['NEXT_PUBLIC_COOKIES_DOMAIN']
} as const
