import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["tile.openstreetmap.org"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  env: {
    FOURSQUARE_API_KEY: process.env.FOURSQUARE_API_KEY,
  },
   basePath: '/target-local-add-hunter',
};

export default nextConfig;
