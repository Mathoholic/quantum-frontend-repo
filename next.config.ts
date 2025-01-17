import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...existing code...
  images: {
    domains: ['api.quantumkids.in'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ...existing code...
};

export default nextConfig;