// next.config.ts
import type { NextConfig } from "next";

const raw = process.env.API_BASE_URL;
if (!raw) {
  throw new Error("❌ Missing API_BASE_URL environment variable at build time");
}
const serverAPIBase = raw.replace(/\/+$/, ""); // no trailing slash

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${serverAPIBase}/api/:path*`,
      },
    ];
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
