import {ConfigProvider, App} from "antd";
import {Metadata} from "next";
import {cookies} from "next/headers";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import AdminLoginClient from "@/components/backend/AdminLoginClient";
import {BackendLocaleProvider} from "@/contexts/BackendLocaleContext";
import {BackendAppProvider} from "@/contexts/BackendAppContext";
import AdminLayoutClient from "@/app/(backend)/admin/AdminLayoutClient";
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

async function getAccessToken() {
    const cookieStorage = await cookies();
    return cookieStorage.get('adminToken')?.value;
}

async function getAdminUser() {
    try {
        const cookieStorage = await cookies();
        const userData = cookieStorage.get('adminUser')?.value;
        return userData ? JSON.parse(userData) : null;
    } catch (e) {
        return null;
    }
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const accessToken = await getAccessToken();
    const administrator = await getAdminUser();

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
                    <App>
                        <BackendAppProvider administrator={administrator}>
                            {
                                accessToken ? (
                                    <AdminLayoutClient>{children}</AdminLayoutClient>
                                ) : (
                                    <AdminLoginClient/>
                                )
                            }
                        </BackendAppProvider>
                    </App>
                </AntdRegistry>
            </ConfigProvider>
        </BackendLocaleProvider>
        </body>
        </html>
    );
}
