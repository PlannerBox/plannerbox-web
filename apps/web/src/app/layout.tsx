'use client';

import Head from 'next/head';
import Providers from '../utils/providers';
import './global.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fr'>
      <Head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
