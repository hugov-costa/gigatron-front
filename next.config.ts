import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "http://slim:8080/",
      },
      {
        source: "/api/users",
        destination: "http://slim:8080/users",
      },
      {
        source: "/api/users/:id",
        destination: "http://slim:8080/users/:id",
      },
      {
        source: "/api/users/login",
        destination: "http://slim:8080/users/login",
      },
    ];
  },
};

export default nextConfig;
