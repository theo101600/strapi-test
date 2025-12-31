/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "brilliant-confidence-b9365d20fc.media.strapiapp.com",
      },
    ],
  },
};

module.exports = nextConfig;
