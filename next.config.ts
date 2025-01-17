import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...existing code...
  images: {
    domains: ['208.109.214.146'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ...existing code...
};

export default nextConfig;