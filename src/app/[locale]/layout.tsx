import {Inter} from '@next/font/google';
import {useLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {ReactNode} from 'react';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: 'Street photography'
};

type Props = {
  children: ReactNode;
  params: {locale: string};
};

export default function LocaleLayout({children, params}: Props) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
