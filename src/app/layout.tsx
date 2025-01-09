'use client'

import Header from '@/components/Header';
import { ReactNode } from 'react';
import './globals.css';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import FloatingButtons from '@/components/FloatingButtons';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = ['/form'];
  
  const showHeaderFooter = pathname !== null && 
    !pathname.startsWith('/admin') && 
    !noHeaderFooterRoutes.some(route => pathname.startsWith(route));
  
  const showFloatingButtons = pathname !== null && !pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body>
        {showHeaderFooter && <Header />}
        <main>{children}</main>
        {showHeaderFooter && <Footer />}
        {showFloatingButtons && <FloatingButtons />}
      </body>
    </html>
  );
}