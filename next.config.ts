import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
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
                destination: 'http://xiaomavv.localhost/storage/:path*',
            },
            {
                source: '/vue-admin/:path*',
                destination: 'http://xiaomavv.localhost/vue-admin/:path*',
            }
        ];
    },
};

export default nextConfig;
