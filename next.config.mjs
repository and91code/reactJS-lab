/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = withPWA({
  disable: process.env.NODE_ENV === "development",
  register: true,
  // scope: "/app",
});

export default nextConfig;
