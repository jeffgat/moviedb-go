import React from 'react';

type SearchProps = {
  searchQuery: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ searchQuery, onChange }: SearchProps) => {
    
  return (
    <div className="w-1/2 mb-8">
      <label htmlFor="search" className="sr-only" />
      <input
        type="text"
        name="search"
        id="search"
        className="text-white bg-neutral-750 block w-full border-2 border-neutral-750 appearance-none rounded-md px-3 py-2 placeholder-slate-400 shadow-sm hover:bg-neutral-700 hover:border-neutral-700 focus:border-neutral-200 focus:outline-none focus:ring-neutral-200 sm:text-sm"
        placeholder="Search by movie title"
        value={searchQuery}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
