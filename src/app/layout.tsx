"use client";

import Header from "@/components/Header";
import { ReactNode, useEffect } from "react";
import "./globals.css";
import Footer from "@/components/Footer";
import { usePathname, useRouter } from "next/navigation";
import FloatingButtons from "@/components/FloatingButtons";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const noHeaderFooterRoutes = ["/form", "/login"];

  const showHeaderFooter =
    pathname !== null &&
    !pathname.startsWith("/admin") &&
    !noHeaderFooterRoutes.some((route) => pathname.startsWith(route));

  const showFloatingButtons =
    pathname !== null && !pathname.startsWith("/admin");

  const isAuthenticated =
    typeof window !== "undefined" && localStorage.getItem("authToken");

  useEffect(() => {
    if (pathname.startsWith("/admin") && !isAuthenticated) {
      router.push("/login");
    }
  }, [pathname, router, isAuthenticated]);

  // if (pathname.startsWith("/admin") && !isAuthenticated) {
  //   return null;
  // }

  return (
    <html>
      <body className="min-h-screen flex flex-col">
        {showHeaderFooter && <Header />}
        <div className="flex-grow">{children}</div>
        {showHeaderFooter && <Footer />}
        {showFloatingButtons && <FloatingButtons />}
      </body>
    </html>
  );
}
