import {ConfigProvider, App} from "antd";
import {Metadata} from "next";
import {SessionProvider} from "next-auth/react";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {LocaleProvider} from "@/contexts/LocaleContext";
import './globals.css';

export const metadata: Metadata = {
    title: "小马影视-电影电视剧高清完整视频免费在线观看",
    keywords: "视频,视频分享,视频播放,美剧,Netflix网剧,HBO网剧",
    description: "美剧,韩剧,日剧,泰剧,泰剧,大陆剧,全球综艺和电影第一时间为您呈现,10万+全球最新的影视作品免费在线观看.",
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh" className="w-full overflow-x-hidden relative">
        <body className={`bg-black text-white min-h-screen w-full overflow-x-hidden relative overscroll-x-none`}>
        <LocaleProvider>
            <ConfigProvider theme={{}}>
                <AntdRegistry>
                    <SessionProvider>
                        <App>
                            {children}
                        </App>
                    </SessionProvider>
                </AntdRegistry>
            </ConfigProvider>
        </LocaleProvider>
        </body>
        </html>
    );
}
