import {Inter} from '@next/font/google';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: 'Street Photography Browser'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
