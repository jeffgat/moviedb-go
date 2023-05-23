import React from 'react';
import Image from 'next/image';

interface Props {
  details: any;
  detailsLoading: boolean;
}

const Details = ({ detailsLoading, details }: Props) => {
  return (
    <>
      {!detailsLoading && !details ? (
        <div>Could not fetch movie details.</div>
      ) : (
        <div className="flex flex-col lg:flex-row text-center lg:text-left items-center justify-center my-12 border-2 border-neutral-850 rounded-md p-4 lg:p-0">
          <div className="aspect-[3/4] rounded-md overflow-hidden relative w-full h-full min-w-[200px] max-w-[300px] max-h-[400px]">
            <Image
              priority
              className="mx-auto flex-shrink-0"
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              fill={true}
              sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px"
              alt=""
            />
          </div>
          <div className="p-2 lg:p-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
              {details.title}
            </h2>
            <p className="mt-6 leading-8 text-gray-400">{details.overview}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
