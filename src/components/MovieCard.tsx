import Link from "next/link";

export interface Movie {
    id?: number;
    vid?: string;
    title?: string;
    thumbnail?: string;
    remarks?: string;
}


export const MovieCard = ({movie = {}, linkTarget = "_blank"}: { movie: Movie, linkTarget?: string }) => {
    return (
        <div>
            <div className="pt-[145%] relative overflow-hidden">
                <Link href={`/video/${movie.vid}`} target={linkTarget} prefetch={false}>
                    <img
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="w-full h-full object-cover absolute top-0 left-0 transition-all duration-300 ease-in-out hover:scale-110"
                    />
                    <div
                        className="absolute bg-linear-to-t from-black/80 to-transparent bottom-0 w-full py-1.5 px-1 text-white text-right">{movie.remarks}</div>
                </Link>
            </div>
            <div className="p-2">
                <h3 className="text-sm font-semibold truncate text-center">
                    <Link href={`/video/${movie.vid}`} target={linkTarget} title={movie.title} prefetch={false}>{movie.title}</Link>
                </h3>
            </div>
        </div>
    );
};
