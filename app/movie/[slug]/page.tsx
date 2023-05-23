'use client';
import { fetchWithToken } from '@/utils/fetchers';
import useSWR from 'swr';
import Image from 'next/image';

type Props = {
  params: any;
};

const page = ({ params }: Props) => {
  const TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

  const {
    data: details,
    error: detailsError,
    isLoading: detailsLoading
  } = useSWR(
    [`${BASE_URL}/movie/${params.slug}?language=en-US?api_key=${API_KEY}`, TOKEN],
    ([url, token]) => fetchWithToken(url, token)
  );
  const {
    data: credits,
    error: creditsError,
    isLoading: creditsLoading
  } = useSWR(
    [`${BASE_URL}/movie/${params.slug}/credits?language=en-US?api_key=${API_KEY}`, TOKEN],
    ([url, token]) => fetchWithToken(url, token)
  );
  console.log('d', details);
  console.log('c', credits);

  if (detailsLoading || creditsLoading) {
    return <div>Loading..</div>;
  }

  if (!detailsLoading && !details) {
    return <div>Could not fetch movie details.</div>;
  }

  if (!credits && !credits) {
    return <div>Could not fetch movie credits.</div>;
  }

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

  const directors = getDirectors();

  return (
    <div className="mx-auto px-24">
      <div className="flex items-center justify-center py-12">
        <div className="aspect-[3/4] rounded-md overflow-hidden relative w-full h-full min-w-[200px] max-w-[300px] max-h-[400px]">
          {/* todo - loading states/skeletons for these */}
          <Image
            priority
            // refactor out base url
            className="mx-auto flex-shrink-0"
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            fill={true}
            sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px"
            alt=""
          />
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
            {details.title}
          </h2>
          <p className="mt-6 leading-8 text-gray-400">{details.overview}</p>
        </div>
      </div>

      <section className="my-12">
        <h3 className="text-2xl font-semibold text-center mb-4">Directors</h3>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl gap-4 text-center grid-cols-3 lg:mx-0 lg:max-w-none"
        >
          {directors.map((director: any, idx: number) => (
            <li key={director.id} className="bg-neutral-850 rounded-md py-4">
              <div className="aspect-[3/4] mx-auto w-24 rounded-md overflow-hidden relative">
                {/* todo - loading states/skeletons for these */}
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
        </ul>
      </section>

      <section className="my-12">
        <h3 className="text-2xl font-semibold text-center mb-4">Cast</h3>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-2 gap-4 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {credits.cast.map((actor: any, idx: number) => {
            if (idx < 8) {
              return (
                <li key={actor.name} className="bg-neutral-850 rounded-md py-4">
                  <div className="aspect-[3/4] mx-auto w-24 rounded-md overflow-hidden relative">
                    {/* todo - loading states/skeletons for these */}
                    <Image
                      className="mx-auto flex-shrink-0"
                      // refactor out base url
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
        </ul>
      </section>
    </div>
  );
};

export default page;
