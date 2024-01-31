import createIntlMiddleware from 'next-intl/middleware';
import {locales} from './navigation';

export default createIntlMiddleware({
  locales,
  defaultLocale: 'en'
});

export const config = {
  // Skip all non-content paths
  matcher: ['/', '/(en|es)/:path*']
};
