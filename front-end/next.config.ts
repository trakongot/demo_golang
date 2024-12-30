import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Cho phép HTTP
        hostname: 'localhost', // Cho phép localhost
        port: '8080', // Cổng 8080 nếu bạn sử dụng cổng này
      },
      {
        protocol: 'https', // Cho phép HTTPS
        hostname: '**', // Cho phép tất cả các hostname với HTTPS
      },
    ],
  },
};

export default nextConfig;
