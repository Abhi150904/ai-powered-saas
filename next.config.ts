import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    middlewareClientMaxBodySize: '80mb',
  },
};

export default nextConfig;
