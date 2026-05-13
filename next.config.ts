import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.chenranning.com",
          },
        ],
        destination: "https://chenranning.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
