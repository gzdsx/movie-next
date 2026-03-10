import type {Metadata} from "next";
import {ConfigProvider,theme} from 'antd';
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
    title: "小马影视-电影电视剧高清完整视频免费在线观看",
    keywords: "视频,视频分享,视频播放,美剧,Netflix网剧,HBO网剧",
    description: "美剧,韩剧,日剧,泰剧,泰剧,大陆剧,全球综艺和电影第一时间为您呈现,10万+全球最新的影视作品免费在线观看.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
        <head>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7306822352785197"
                    crossOrigin="anonymous"></script>
        </head>
        <body className={`bg-black text-white min-h-screen`}>
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            components: {
                Pagination: {
                    // 针对分页组件的细粒度调整
                    itemBg: '#111828',           // 按钮背景设为纯黑
                    itemActiveBg: '#1677ff',     // 激活项背景
                    itemLinkBg: '#000000',       // 上一页/下一页背景
                    colorText: '#ffffff',        // 文字设为纯白
                    colorTextDisabled: '#4d4d4d',
                    itemActiveColor:'#ffffff'// 禁用状态文字颜色
                },
            }
        }}>
            <Navbar/>
            {children}
            <Footer/>
        </ConfigProvider>
        </body>
        </html>
    );
}
