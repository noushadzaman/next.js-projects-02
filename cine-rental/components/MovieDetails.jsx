import { getDictionary } from "@/app/[lang]/dictionaries";
import Sidebar from "@/components/Sidebar";
import Movies from "@/db/data.json";
import Image from "next/image";
import { notFound } from 'next/navigation'

const MovieDetails = async ({ id, lang }) => {
    const movieId = id;
    const movie = Movies?.results.find((movie) => movie.id === Number(movieId));
    if (!movie) {
        notFound();
    }
    const dict = await getDictionary(lang);

    return (
        <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
            <Sidebar lang={lang} />
            <section>
                <div>
                    <Image
                        width={1500}
                        height={1500}
                        className="w-full object-cover max-h-[300px] lg:max-h-[500px]"
                        src={movie?.backdrop_path}
                        alt=""
                    />
                </div>

                <div className="grid grid-cols-12 py-12 gap-8">
                    <div className="col-span-2">
                        <Image width={150} height={150} src={movie?.poster_path} alt="" />
                    </div>
                    <div className="col-span-8">
                        <h2 className="font-bold text-slate-300 text-2xl">
                            {movie?.original_title}
                        </h2>
                        <p className="my-2 text-slate-400 italic">{movie?.overview}</p>
                        <ul className="text-slate-300 space-y-2 my-8">
                            <li>{dict.Release_Date} : {movie?.release_date}</li>
                            <li>{dict.Average_Vote} : {movie?.vote_average}</li>
                            <li>{dict.Vote_Count} : {movie?.vote_count}</li>
                            <li>{dict.Popularity}: {movie?.popularity}</li>
                        </ul>
                    </div>
                    <div className="col-span-2 space-y-4">
                        <button className="py-2 w-full bg-primary font-medium text-slate-800 rounded-md">
                            Stream In HD
                        </button>
                        <button className="py-2 w-full bg-primary font-medium text-slate-800 rounded-md">
                            Download In HD
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MovieDetails;