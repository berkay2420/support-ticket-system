import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";
// @ts-ignore
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  }
};

export default withSentryConfig(nextConfig, {
  org: "aydnorg",
  project: "ticketing-app",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
});