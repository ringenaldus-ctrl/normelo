import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/aanvragen",
        destination: "https://normelo.nl/aanmelden",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
