import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMangas } from '../store/actions/CardActions.js';

export default function SearchBar() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const selectedGenre = useSelector(state => state.cards.selectedGenre);
  
  useEffect(() => {
    dispatch(fetchMangas(title, selectedGenre));
  }, [title, selectedGenre, dispatch]);
  const handleChange = (e) => {
    setTitle(e.target.value);
    dispatch({ type: 'SET_SELECTED_TITLE', payload: e.target.value });
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2">
      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Find your manga here..."
          className="justify-center w-full h-[6vh] py-2 px-4 pl-10 rounded-lg border border-gray-300 shadow-md focus:outline-none"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
}
