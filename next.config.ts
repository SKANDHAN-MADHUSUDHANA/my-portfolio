import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
