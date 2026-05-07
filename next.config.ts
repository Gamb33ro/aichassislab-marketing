import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/aichassislab',
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
