import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGenres, fetchMangas } from '../store/actions/CardActions.js';

export default function Checkboxs() {
    const dispatch = useDispatch();
    const { genres, error } = useSelector(state => state.cards);
    const selectedTitle = useSelector(state => state.cards.selectedTitle);

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    const handleGenreClick = (genre) => {
        dispatch(fetchMangas(selectedTitle, genre));
        dispatch({ type: 'SET_SELECTED_GENRE', payload: genre });
    };

    const handleAllClick = () => {
        dispatch(fetchMangas(selectedTitle, ''));
        dispatch({ type: 'SET_SELECTED_GENRE', payload: '' });
    };

    const genreColors = {
        all: {
            bg: 'bg-gray-200',
            text: 'text-gray-500'
        },
        shonen: {
            bg: 'bg-rose-200',
            text: 'text-rose-300'
        },
        seinen: {
            bg: 'bg-orange-300',
            text: 'text-orange-400'
        },
        shojo: {
            bg: 'bg-teal-200',
            text: 'text-teal-300'
        },
        kodomo: {
            bg: 'bg-purple-300',
            text: 'text-purple-400'
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!genres || genres.length === 0) return <p>No genres found.</p>;

    return (
        <div className='flex'>
            <div className="flex flex-wrap gap-2 p-4 justify-center">
                <button
                    className={`py-2 px-4 rounded-full font-roboto font-bold ${genreColors.all.bg} ${genreColors.all.text}`}
                    onClick={handleAllClick}
                >
                    All
                </button>
                {genres.map(genre => (
                    <button
                        key={genre._id}
                        className={`py-2 px-4 rounded-full font-roboto font-bold ${genreColors[genre.name.toLowerCase()].bg || 'bg-gray-500'} ${genreColors[genre.name.toLowerCase()].text || 'text-white'}`}
                        onClick={() => handleGenreClick(genre.name)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
