import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
    devIndicators: false,
    turbopack: {
        root: path.join(__dirname)
    },
    images: {
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
