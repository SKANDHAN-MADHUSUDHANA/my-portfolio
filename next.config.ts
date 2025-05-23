import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/my-portfolio" : "",
  assetPrefix: isGithubPages ? "/my-portfolio/" : "",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
