import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/users",
        destination: "http://slim:8080/users",
      },
      {
        source: "/api/users/:id",
        destination: "http://slim:8080/users/:id",
      },
    ];
  },
};

export default nextConfig;
