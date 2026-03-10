import {Movie, MovieCard} from "./MovieCard";

interface MovieListProps {
    title?: string;
    movies: Movie[];
}

export default function MovieList({title, movies}: MovieListProps) {
    return (
        <div className="mb-8">
            {
                title && <h2 className="text-2xl font-bold mb-4">{title}</h2>
            }
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    );
}
