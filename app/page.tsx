'use client';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import { fetchWithToken } from '@/utils/fetchers';
import { Spinner } from '@/components';
import { moviesAtom } from '@/atoms/movieAtom';

export default function Home() {
  const FETCH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/day?language=en-US?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';

  const [movies, setMovies] = useAtom(moviesAtom);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, isLoading } = useSWR([FETCH_URL, TOKEN], ([url, token]) =>
    fetchWithToken(url, token)
  );

  useEffect(() => {
    if (!data) return;
    // init movie state
    setMovies(data.results);
    setFilteredMovies(data.results);
  }, [data]);

  useEffect(() => {
    // would likely pass the search query to the search api and throttle or debounce the api call in production
    // https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1
    const filtered = movies.filter((movie: any) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // use original movies state if no search query
    searchQuery === '' ? setFilteredMovies(movies) : setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Sorry, something went wrong with the request.
          <br />
          Please try again later.
        </h1>
        <p>Error: {error.status_message}</p>
      </main>
    );
  }

  if (!isLoading && !data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Sorry, movies could not be fetched.
          <br />
          Please try again later.
        </h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-12 md:p-24">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Movie DB
      </motion.h1>
      <SearchBar searchQuery={searchQuery} onChange={handleSearchInput} />
      <ul
        role="list"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {isLoading ? (
          <div className="col-span-5 mt-40">
            <Spinner />
          </div>
        ) : (
          <>
            {filteredMovies.map((movie: any, idx: number) => (
              <MovieCard movie={movie} index={idx} key={movie.id} />
            ))}
          </>
        )}
      </ul>
    </main>
  );
}
