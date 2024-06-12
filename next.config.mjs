/**
 * @type {import('next').NextConfig}
 */
import nextPwa from "next-pwa";

const nextWithPWA = nextPwa({
  dest: "public",
  register: true,
  // scope: "/app",
  // disable: process.env.NODE_ENV === "development",
});

const nextConfig = nextWithPWA();

export default nextConfig;
