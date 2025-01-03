'use client'

import Header from '@/components/Header';
import { ReactNode } from 'react';
import './globals.css';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = ['/form']; // Only specific routes that are not under /admin

  const showHeaderFooter = pathname !== null && !pathname.startsWith('/admin') && !noHeaderFooterRoutes.some(route => pathname.startsWith(route));

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
