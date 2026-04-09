import Carousel from '../../components/Carousel';
import MovieList from '../../components/MovieList';
import {apiGet} from "@/lib/api";
import AdsenseBanner from "@/components/AdsenseBanner";

const getLatestMovies = async () => {
    try {
        const res = await apiGet('/movies', {offset: 0, limit: 12, types: 'film,variety,documentary,anime,tv'});
        return res.data.items;
    } catch (e) {
        console.log(e);
        return [];
    }
};

const getPopularMovies = async () => {
    try {
        const res = await apiGet('/movies', {
            offset: 0,
            limit: 12,
            orderby: 'random',
            types: 'film,variety,documentary,anime,tv'
        });
        return res.data.items;
    } catch (e) {
        console.log(e);
        return [];
    }
};

const getSlides = async () => {
    try {
        const res = await apiGet('/swipers/1/slides');
        return [...res.data.items];
    } catch (e) {
        console.log(e);
        return [];
    }
};

export default async function Home() {
    const latestMovies = await getLatestMovies();
    const popularMovies = await getPopularMovies();
    const slides = await getSlides();
    return (
        <>
            <Carousel slides={slides}/>
            <div className="container mx-auto px-4 py-8">
                <MovieList title="最近更新" movies={latestMovies}/>
                <MovieList title="热门影片" movies={popularMovies}/>
            </div>
            <AdsenseBanner dataAdSlot="9313405668"/>
        </>
    );
}
