import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
    cacheComponents: true,
    devIndicators: false,
    productionBrowserSourceMaps: false,
    reactStrictMode: false,
    turbopack: {
        root: path.join(__dirname)
    },
    images: {
        minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'coin-images.coingecko.com',
                port: '',
                pathname: '/**'
            }, {
                protocol: 'https',
                hostname: 'assets.coingecko.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
