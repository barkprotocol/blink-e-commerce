/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://orange-orbit-7vrjx6wwwqq6hx9x-3000.app.github.dev/api/:path*',
        },
      ];
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Custom-Header',
              value: 'bark-custom-header-value',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  