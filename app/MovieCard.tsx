import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  movie: any; // todo -type
  index: number;
};

const MovieCard = ({ movie, index }: Props) => {
  return (
    <li
      key={movie.id}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-md overflow-hidden bg-neutral-800 text-center shadow hover:opacity-70 transition-all"
    >
      <Link href={`/movie/${movie.id}`}>
        <div className="flex flex-1 flex-col">
          <div className="p-4 pb-2">
            <div className="flex justify-between text-neutral-50">
              <dt className="text-xs font-semibold uppercase text-yellow-400 opacity-80">
                Release Date
              </dt>
              <dt className="text-xs font-semibold uppercase text-yellow-400 opacity-80">Rating</dt>
            </div>

            <div className="flex justify-between text-neutral-50 opacity-80">
              <dd className="text-sm">{movie.release_date}</dd>
              <dd className="text-sm">{movie.vote_average.toFixed(1)} / 10</dd>
            </div>
          </div>
          <div className="aspect-[3/4] w-15 relative">
            {/* todo - loading states/skeletons for these */}
            <Image
              priority={index < 8}
              className="mx-auto flex-shrink-0"
              // refactor out base url
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              fill={true}
              sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center flex-1 p-4 w-full">
            <h3 className="font-bold text-neutral-50">{movie.title}</h3>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default MovieCard;
