import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGenres, fetchMangas } from '../store/actions/CardActions.js';

export default function Checkboxs() {
    const dispatch = useDispatch();
    const { genres, selectedGenre } = useSelector(state => state.cards);
    const selectedTitle = useSelector(state => state.cards.selectedTitle);
    const [activeGenres, setActiveGenres] = useState(selectedGenre);

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    const handleGenreClick = (genre) => {
        let newActiveGenres;
        if (activeGenres.includes(genre)) {
            newActiveGenres = activeGenres.filter(g => g !== genre);
        } else {
            newActiveGenres = [...activeGenres, genre];
        }

        setActiveGenres(newActiveGenres);
        dispatch(fetchMangas(selectedTitle, newActiveGenres));
        dispatch({ type: 'SET_SELECTED_GENRE', payload: newActiveGenres });
    };

    const handleAllClick = () => {
        setActiveGenres([]);
        dispatch(fetchMangas(selectedTitle, []));
        dispatch({ type: 'SET_SELECTED_GENRE', payload: [] });
    };

    const genreColors = {
        all: {
            bg: 'bg-gray-200',
            text: 'text-gray-500',
            hover: 'hover:bg-gray-300 hover:text-gray-700'
        },
        shonen: {
            bg: 'bg-rose-200',
            text: 'text-rose-300',
            hover: 'hover:bg-rose-300 hover:text-rose-500'
        },
        seinen: {
            bg: 'bg-orange-300',
            text: 'text-orange-400',
            hover: 'hover:bg-orange-400 hover:text-orange-600'
        },
        shojo: {
            bg: 'bg-teal-200',
            text: 'text-teal-300',
            hover: 'hover:bg-teal-300 hover:text-teal-500'
        },
        kodomo: {
            bg: 'bg-purple-300',
            text: 'text-purple-400',
            hover: 'hover:bg-purple-400 hover:text-purple-600'
        }
    };

    return (
        <div className='flex '>
            <div className="flex text-xs md:text-sm gap-1 p-2  w-full">
                <button
                    className={`py-2 px-4 rounded-full font-roboto font-bold ${genreColors.all.bg} ${genreColors.all.text} ${genreColors.all.hover}`}
                    onClick={handleAllClick}
                >
                    All
                </button>
                {genres.map(genre => (
                    <button
                        key={genre._id}
                        className={`py-2 px-4 rounded-full font-roboto font-bold ${genreColors[genre.name.toLowerCase()].bg || 'bg-gray-500'} ${genreColors[genre.name.toLowerCase()].text || 'text-white'} ${genreColors[genre.name.toLowerCase()].hover} ${activeGenres.includes(genre.name) ? 'bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white' : ''}`}
                        onClick={() => handleGenreClick(genre.name)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

