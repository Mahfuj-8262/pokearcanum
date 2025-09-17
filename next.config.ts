import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["mafustorage.blob.core.windows.net"],
  },
};

export default nextConfig;
