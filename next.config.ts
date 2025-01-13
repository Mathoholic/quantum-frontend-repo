import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...existing code...
  images: {
    domains: ['localhost'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ...existing code...
};

export default nextConfig;