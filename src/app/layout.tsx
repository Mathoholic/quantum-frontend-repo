// RootLayout.tsx
"use client";

import Header from "@/components/Header";
import { ReactNode, useEffect } from "react";
import "./globals.css";
import Footer from "@/components/Footer";
import { usePathname, useRouter } from "next/navigation";
import FloatingButtons from "@/components/FloatingButtons";
import Head from "next/head";

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

  // useEffect(() => {
  //   // Dynamically load the external JS script
  //   const script = document.createElement("script");
  //   script.src = "https://panorama-slider.uiinitiative.com/assets/index.d2ce9dca.js";
  //   script.type = "module";
  //   script.crossOrigin = "anonymous";
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <html>
      <body className="min-h-screen flex flex-col">
        {/* Global Head for external CSS */}
        

        {showHeaderFooter && <Header />}
        <div className="flex-grow">{children}</div>
        {showHeaderFooter && <Footer />}
        {showFloatingButtons && <FloatingButtons />}
      </body>
    </html>
  );
}
