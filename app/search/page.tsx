import type {Metadata} from "next";
import {apiGet} from "@/lib/api";
import MovieList from "@/components/MovieList";
import MoviePagination from "@/components/MoviePagination";
import {Search} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "搜索-小马影视",
    keywords: "视频,视频分享,视频播放,美剧,Netflix网剧,HBO网剧",
    description: "美剧,韩剧,日剧,泰剧,泰剧,大陆剧,全球综艺和电影第一时间为您呈现,10万+全球最新的影视作品免费在线观看.",
};

const getMovies = async (page: number, params?: any) => {
    try {
        const offset = (page - 1) * 30;
        const res = await apiGet('/movies', {...params, type: 'film', offset, limit: 30});
        return res.data;
    }catch (e) {
        console.log(e);
        return {items: [], total: 0};
    }
};

export default async function Page({searchParams}: any) {
    const {page = 1, q = '', orderby = ''} = await searchParams;
    const {items: movies, total} = await getMovies(page, {q, orderby});
    return (
        <>
            <div className="flex items-center justify-center mt-8">
                <form method="get" action="/search" className="w-full md:max-w-1/2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            name={'q'}
                            defaultValue={q}
                            placeholder="搜索影片..."
                            className="bg-gray-800 text-white px-4 py-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500">
                            <Search size={20}/>
                        </button>
                    </div>
                </form>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-x-4 mb-4 border-bottom border-gray-600 pb-4">
                    <Link
                        href={`/search?q=${q}`}
                        className={`border rounded px-2 py-1 text-white ${orderby !== 'views' ? 'bg-red-400 border-red-400' : 'bg-gray-800 border-gray-800'}`}
                    >
                        <span className="text-sm">最近更新</span>
                    </Link>
                    <Link href={`/search?q=${q}&orderby=views`}
                          className={`border rounded px-2 py-1 text-white ${orderby === 'views' ? 'bg-red-400 border-red-400' : 'bg-gray-800 border-gray-800'}`}>
                        <span className="text-sm">播放最多</span>
                    </Link>
                </div>
                <MovieList movies={movies}/>
                <MoviePagination total={total} current={Number(page)} pageSize={30}/>
            </div>
        </>
    );
}
