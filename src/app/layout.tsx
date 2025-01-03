'use client'

import Header from '@/components/Header';
import { ReactNode } from 'react';
import './globals.css';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = ['/admin','/form']; 

  const showHeaderFooter = pathname !== null && !noHeaderFooterRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        {showHeaderFooter && <Header />}
        <main>{children}</main>
        {showHeaderFooter && <Footer />}
      </body>
    </html>
  );
}
