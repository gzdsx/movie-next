import {ConfigProvider, App} from "antd";
import {Metadata} from "next";
import {cookies} from "next/headers";
import {SessionProvider} from "next-auth/react";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import AdminRootLayout from "@/app/(backend)/admin/AdminRootLayout";
import AdminLoginClient from "@/components/backend/AdminLoginClient";
import {BackendLocaleProvider} from "@/contexts/BackendLocaleContext";
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

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const tokenStorage = await cookies();
    const accessToken = tokenStorage.get('adminToken')?.value;
    return (
        <html lang="zh" className="w-full overflow-x-hidden relative">
        <body className={`bg-black text-white min-h-screen w-full overflow-x-hidden relative overscroll-x-none`}>
        <BackendLocaleProvider>
            <ConfigProvider theme={{
                components: {
                    Button: {
                        iconGap: 4
                    }
                },
                token: {
                    colorPrimary: '#55b5a5',
                    colorLink: '#55b5a5',
                }
            }}>
                <AntdRegistry>
                    <SessionProvider>
                        <App>
                            {
                                accessToken ? (
                                    <AdminRootLayout>{children}</AdminRootLayout>
                                ) : (
                                    <AdminLoginClient/>
                                )
                            }
                        </App>
                    </SessionProvider>
                </AntdRegistry>
            </ConfigProvider>
        </BackendLocaleProvider>
        </body>
        </html>
    );
}
