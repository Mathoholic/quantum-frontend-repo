'use client'

import Header from '@/components/Header';
import { ReactNode, useEffect } from 'react';
import './globals.css';
import Footer from '@/components/Footer';
import { usePathname, useRouter } from 'next/navigation';
import FloatingButtons from '@/components/FloatingButtons';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const noHeaderFooterRoutes = ['/form', '/login'];

  const showHeaderFooter = pathname !== null && 
    !pathname.startsWith('/admin') && 
    !noHeaderFooterRoutes.some(route => pathname.startsWith(route));

  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('authToken');

  useEffect(() => {
    if (pathname.startsWith('/admin') && !isAuthenticated) {
      router.push('/login');
    }
  }, [pathname, router, isAuthenticated]);

  if (pathname.startsWith('/admin') && !isAuthenticated) {
    return null; 
  }

  return (
    <html lang="en">
      <body>
        {showHeaderFooter && <Header />}
        <main>{children}</main>
        {showHeaderFooter && <Footer />}
        <FloatingButtons />
      </body>
    </html>
  );
}