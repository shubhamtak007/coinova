import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
    devIndicators: false,
    productionBrowserSourceMaps: false,
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
            }
        ]
    }
};

export default nextConfig;
