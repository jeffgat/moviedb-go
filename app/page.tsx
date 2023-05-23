'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import useSWR from 'swr';
import { fetchWithToken } from '@/utils/fetchers';

export default function Home() {
  const FETCH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/day?language=en-US?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, isLoading } = useSWR([FETCH_URL, TOKEN], ([url, token]) =>
    fetchWithToken(url, token)
  );

  useEffect(() => {
    if (!data) return;
    setMovies(data.results);
    setFilteredMovies(data.results);
  }, [data]);

  // todo - this sets filteredMovies back to [] when you go back, needs to be sorted
  useEffect(() => {
    // could pass search query into the api call
    // https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1
    const filtered = movies.filter((movie: any) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    searchQuery === '' ? setFilteredMovies(movies) : setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isLoading === false && !data) {
    return <div>Movies could not be fetched. Please try again later.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Movie DB</h1>
      <SearchBar searchQuery={searchQuery} onChange={handleSearchInput} />
      {/* grid to be fixed */}
      <ul
        role="list"
        className="grid grid-cols-1 auto-cols-min gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {filteredMovies.map((movie: any, idx: number) => (
          <MovieCard movie={movie} index={idx} key={movie.id} />
        ))}
      </ul>
    </main>
  );
}
