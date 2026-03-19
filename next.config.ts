import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone', // 减少运行时依赖
    reactStrictMode: true,
    typescript: {ignoreBuildErrors: true},
    images: {unoptimized: process.env.NODE_ENV === 'production'},
    async rewrites() {
        return [];
    },
};

export default nextConfig;
