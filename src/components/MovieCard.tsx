export interface Movie {
    id?: number;
    vid?: string;
    title?: string;
    thumbnail?: string;
    remarks?: string;
    actors?: string;
    directors?: string;
    description?: string;
    source_name?: string;
}


export const MovieCard = ({movie = {}, linkTarget = "_blank"}: { movie: Movie, linkTarget?: string }) => {
    return (
        <div>
            <div className="pt-[145%] relative overflow-hidden">
                <a href={`/video/${movie.vid}`} title={`主演:${movie.actors}`} target={linkTarget}>
                    <img
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="w-full h-full object-cover absolute top-0 left-0 transition-all duration-300 ease-in-out hover:scale-110"
                    />
                    <div
                        className="absolute bg-linear-to-t from-black/80 to-transparent bottom-0 w-full py-1.5 px-1 text-white text-right">{movie.remarks}</div>
                </a>
            </div>
            <div className="p-2">
                <h3 className="text-sm font-semibold truncate text-center">
                    <a href={`/video/${movie.vid}`} target={linkTarget} title={`主演:${movie.actors}`}>{movie.title}</a>
                </h3>
            </div>
        </div>
    );
};
