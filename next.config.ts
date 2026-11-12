import type { NextConfig } from "next";
import { getStorefrontImageOrigins } from "./src/config/cms-media";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: getStorefrontImageOrigins().map((origin) => {
      const url = new URL(origin);
      return {
        protocol: url.protocol.slice(0, -1) as "http" | "https",
        hostname: url.hostname,
        port: url.port,
        pathname: "/**",
      };
    }),
  },
};

export default nextConfig;
