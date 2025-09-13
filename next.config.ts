import type { NextConfig } from "next";

const API_BASE = process.env.API_BASE_URL || "http://localhost:8800";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "firebasestorage.googleapis.com" }],
  },
  async rewrites() {
    return [
      // proxy ALL /api/* calls from Next -> Express
      { source: "/api/:path*", destination: `${API_BASE}/api/:path*` },
    ];
  },
};

export default nextConfig;
