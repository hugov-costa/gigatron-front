import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/users",
        destination: "http://slim:8080/users",
      },
    ];
  },
};

export default nextConfig;
