'use client';
import { fetchWithToken } from '@/utils/fetchers';
import useSWR from 'swr';
import { Spinner } from '@/components';
import Credits from './Credits';
import Details from './Details';
import Link from 'next/link';

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

  if (detailsLoading || creditsLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 sm:p-12 md:p-24">
      <Link
        href="/"
        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      >
        Back to movies
      </Link>
      {detailsError ? (
        <>
          <h1 className="text-4xl font-bold mb-8 text-center">
            Sorry, something went wrong with the movie details request.
            <br />
            Please try again later.
          </h1>
          <p>Error: {detailsError.status_message}</p>
        </>
      ) : (
        <Details details={details} detailsLoading={detailsLoading} />
      )}
      {creditsError ? (
        <>
          <h1 className="text-4xl font-bold mb-8 text-center">
            Sorry, something went wrong with the cast and crew request.
            <br />
            Please try again later.
          </h1>
          <p>Error: {creditsError.status_message}</p>
        </>
      ) : (
        <Credits credits={credits} creditsLoading={creditsLoading} />
      )}
    </div>
  );
};

export default page;
