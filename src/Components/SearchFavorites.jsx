import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBarFavorites = ({ onSearch, data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filteredResults = data.filter(manga => 
        manga.title.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(manga => manga._id);
      onSearch(filteredResults);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]); 

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Find your manga here..."
          className="justify-center w-full h-[6vh] py-2 px-4 pl-10 rounded-lg border border-gray-300 shadow-md focus:outline-none"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBarFavorites;