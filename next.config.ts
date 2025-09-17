import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mafustorage.blob.core.windows.net",
        pathname: "/**"
      }
    ],
  },
};

export default nextConfig;
