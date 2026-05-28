import Navbar from "@/components/Navbar";
import NavMobile from "@/components/NavMobile";
import Footer from "@/components/Footer";
import {Metadata} from "next";
import {LocaleProvider} from "@/contexts/LocaleContext";
import "./(frontend)/globals.css";

export const metadata: Metadata = {
    title: "你找的页面不存在-小马影视",
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

export default function NotFoundPage() {
    return (
        <LocaleProvider>
            <Navbar/>
            <NavMobile/>
            <div
                className="flex flex-col gap-y-4 items-center justify-center mx-auto px-4 py-4 ext-white min-h-80 md:min-h-160">
                <h1 className="text-2xl font-bold mb-2">你找的页面不存在</h1>
                <div>
                    <a href={'/'} className={'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm'}>返回首页</a>
                </div>
            </div>
            <Footer/>
        </LocaleProvider>
    );
}