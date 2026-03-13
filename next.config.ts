import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone', // 减少运行时依赖
    reactStrictMode: true,
    typescript: {ignoreBuildErrors: true},
    images: {unoptimized: process.env.NODE_ENV === 'production'},
    async rewrites() {
        return [
            {
                // 匹配前端所有以 /api 开头的请求
                source: '/api/:path*',
                // 转发到你的 Laravel 开发服务器
                destination: 'http://xiaomavv.localhost/api/:path*',
            },
            {
                source: '/storage/:path*',
                destination: 'https://next.xiaomavv.com/storage/:path*',
            }
        ];
    },
};

export default nextConfig;
