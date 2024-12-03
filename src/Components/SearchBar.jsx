import React from 'react';
import { FaSearch } from 'react-icons/fa'; 

export default function SearchBar() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2">
    <div className="relative">
      <input
        type="text"
        placeholder="Find your manga here..."
        className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 shadow-md focus:outline-none "
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  </div>
  );
}
