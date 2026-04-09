import {ConfigProvider, theme} from "antd";
import Navbar from "@/components/Navbar";
import NavMobile from "@/components/NavMobile";
import Footer from "@/components/Footer";
import {Metadata} from "next";
import {LocaleProvider} from "@/contexts/LocaleContext";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import "./globals.css";

export const metadata: Metadata = {
    title: "小马影视-电影电视剧高清完整视频免费在线观看",
    keywords: "视频,视频分享,视频播放,美剧,Netflix网剧,HBO网剧",
    description: "美剧,韩剧,日剧,泰剧,泰剧,大陆剧,全球综艺和电影第一时间为您呈现,10万+全球最新的影视作品免费在线观看.",
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh" className="dark w-full overflow-x-hidden relative">
        <head>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7306822352785197"
                    crossOrigin="anonymous"></script>
        </head>
        <body className={`bg-black text-white min-h-screen w-full overflow-x-hidden relative overscroll-x-none`}>
        <AntdRegistry>
            <LocaleProvider>
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
                    <NavMobile/>
                    {children}
                    <Footer/>
                </ConfigProvider>
            </LocaleProvider>
        </AntdRegistry>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VBSMKS0Q1P"></script>
        <script>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VBSMKS0Q1P');
            `}
        </script>
        </body>
        </html>
    );
}
