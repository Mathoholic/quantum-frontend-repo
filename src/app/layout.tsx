// import Header from '@/components/Header';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <header>Header</header> */}
        {/* <Header/> */}
        <main>{children}</main>
        {/* <footer>Footer</footer> */}
      </body>
    </html>
  );
}
