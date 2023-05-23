import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  credits: any;
  creditsLoading: boolean;
}

const Credits = ({ credits, creditsLoading }: Props) => {
  const [directors, setDirectors] = useState([]);

  const getDirectors = () => {
    const directors = credits.crew
      // remove duplicates
      .reduce((uniqueDirectors: any, director: any) => {
        const isDirectorExists = uniqueDirectors.some(
          (uniqueDirector: any) => uniqueDirector.name === director.name
        );

        if (!isDirectorExists) {
          uniqueDirectors.push(director);
        }

        return uniqueDirectors;
      }, [])
      // get directors
      .filter((person: any) => person.known_for_department.includes('Directing'))
      // sort by popularity
      .sort((a: any, b: any) => b.popularity - a.popularity)
      // use the top 3
      .slice(0, 3);

    return directors;
  };

  useEffect(() => {
    if (!credits) return;

    setDirectors(getDirectors());
  }, [credits]);

  return (
    <>
      {!creditsLoading && !credits ? (
        <div>Could not fetch movie cast/crew.</div>
      ) : (
        <>
          <section className="my-12">
            <h3 className="text-2xl font-semibold text-center mb-4">Directors</h3>
            <motion.ul
              role="list"
              className="mx-auto grid max-w-2xl gap-4 text-center grid-cols-1 sm:grid-cols-3 lg:mx-0 lg:max-w-none"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {directors.map((director: any, idx: number) => (
                <li key={director.id} className="bg-neutral-850 rounded-md py-4">
                  <div className="aspect-[3/4] mx-auto w-24 rounded-md overflow-hidden relative">
                    <Image
                      className="mx-auto flex-shrink-0"
                      src={
                        director.profile_path
                          ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                          : '/images/person-placeholder.png'
                      }
                      fill={true}
                      sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px"
                      alt=""
                    />
                  </div>
                  <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-100">
                    {director.name}
                  </h3>
                  <p className="text-sm leading-6 text-gray-400">{director.character}</p>
                </li>
              ))}
            </motion.ul>
          </section>

          <section className="my-12">
            <h3 className="text-2xl font-semibold text-center mb-4">Cast</h3>
            <motion.ul
              role="list"
              className="mx-auto grid max-w-2xl grid-cols-2 gap-4 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {credits.cast.map((actor: any, idx: number) => {
                if (idx < 8) {
                  return (
                    <li key={actor.name} className="bg-neutral-850 rounded-md py-4">
                      <div className="aspect-[3/4] mx-auto w-24 rounded-md overflow-hidden relative">
                        <Image
                          className="mx-auto flex-shrink-0"
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                              : '/images/person-placeholder.png'
                          }
                          fill={true}
                          sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px"
                          alt=""
                        />
                      </div>
                      <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-100">
                        {actor.name}
                      </h3>
                      <p className="text-sm leading-6 text-gray-400">{actor.character}</p>
                    </li>
                  );
                }
              })}
            </motion.ul>
          </section>
        </>
      )}
    </>
  );
};

export default Credits;
