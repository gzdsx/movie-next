import {apiGet} from "@/lib/api";
import Carousel, {Slide} from "@/components/Carousel";
import MovieList from "@/components/MovieList";
import MoviePagination from "@/components/MoviePagination";
import MatchFilter from "@/components/MatchFilter";

const getSlides = async () => {
    const res = await apiGet('/swipers/26/slides');
    return [...res.data.items];
}

const getMovies = async (page: number, params?: any) => {
    const offset = (page - 1) * 30;
    const res = await apiGet('/movies', {...params, type: 'match', offset, limit: 30});
    return res.data;
};

export default async function Page({searchParams}: any) {
    const slides: Slide[] = await getSlides();
    const {page = 1, tag = ''} = await searchParams;
    const {items: movies, total} = await getMovies(1, {tag});
    return (
        <>
            <Carousel slides={slides}/>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-y-2 mb-4">
                    <MatchFilter current={tag}/>
                </div>
                <MovieList title="最近更新" movies={movies}/>
                <MoviePagination total={total} current={Number(page)} pageSize={30}/>
            </div>
        </>
    );
}
