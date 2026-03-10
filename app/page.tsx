import Carousel from '../components/Carousel';
import MovieList from '../components/MovieList';
import {apiGet} from "@/lib/api";

const getLatestMovies = async () => {
    const res = await apiGet('/movies', {offset: 0, limit: 12, types: 'film,variety,documentary,anime,tv'});
    return res.data.items;
};

const getPopularMovies = async () => {
    const res = await apiGet('/movies', {
        offset: 0,
        limit: 12,
        orderby: 'views',
        types: 'film,variety,documentary,anime,tv'
    });
    return res.data.items;
};

const getSlides = async () => {
    const res = await apiGet('/swipers/1/slides');
    return [...res.data.items];
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
        </>
    );
}
