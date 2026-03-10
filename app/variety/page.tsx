import {apiGet} from "@/lib/api";
import Carousel, {Slide} from "@/components/Carousel";
import RegionFilter from "@/components/RegionFilter";
import YearFilter from "@/components/YearFilter";
import MovieList from "@/components/MovieList";
import MoviePagination from "@/components/MoviePagination";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "综艺-小马影视",
    keywords: "视频,视频分享,视频播放,美剧,Netflix网剧,HBO网剧",
    description: "美剧,韩剧,日剧,泰剧,泰剧,大陆剧,全球综艺和电影第一时间为您呈现,10万+全球最新的影视作品免费在线观看.",
};

const getSlides = async () => {
    const res = await apiGet('/swipers/4/slides');
    return [...res.data.items];
}

const getMovies = async (page: number, params?: any) => {
    const offset = (page - 1) * 30;
    const res = await apiGet('/movies', {...params, type: 'variety', offset, limit: 30});
    return res.data;
};

export default async function Page({searchParams}: any) {
    const slides: Slide[] = await getSlides();
    const {page = 1, tag = '', year = '', region = ''} = await searchParams;
    const {items: movies, total} = await getMovies(1, {tag, year, region});
    return (
        <>
            <Carousel slides={slides}/>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-y-2 mb-4">
                    <RegionFilter current={region}/>
                    <YearFilter current={year}/>
                </div>
                <MovieList title="最新影片" movies={movies}/>
                <MoviePagination total={total} current={Number(page)} pageSize={30}/>
            </div>
        </>
    );
}
