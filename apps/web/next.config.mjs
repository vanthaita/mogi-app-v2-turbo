/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (config) => {
    //     // Ensure 'fs' module is ignored in client-side builds
    //     config.resolve.fallback = { 
    //         ...config.resolve.fallback, 
    //         fs: false 
    //     };

    //     return config;
    // },
    async rewrites() {
        return [
          {
            source: '/auth/:path*',
            destination: 'http://localhost:3001/auth/:path*' // Proxy tới server
          },
        ]
    },
};

export default nextConfig;
