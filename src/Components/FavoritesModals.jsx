import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeFavorite } from '../store/actions/FavActions';

export default function FavoritesModal() {
    const { favorites } = useSelector(state => state.favorites);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const genreColors = {
        shonen: 'bg-rose-300',
        seinen: 'bg-orange-400',
        shojo: 'bg-teal-400',
        kodomo: 'bg-purple-400'
    };

    const textColorClasses = {
        shonen: 'text-rose-300',
        seinen: 'text-orange-400',
        shojo: 'text-teal-400',
        kodomo: 'text-purple-400'
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleRemoveFavorite = (mangaId) => {
        dispatch(removeFavorite(mangaId));
    };

    return (
        <div>
            {favorites.length > 0 && (
                <button
                    className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center"
                    onClick={toggleModal}
                >
                    ★
                </button>
            )}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-40">
                    <div className={`bg-white rounded-xl lg:p-20 xl:p-40 md:p-0 relative w-3/4 max-w-2xl transform transition-transform duration-700 ease-out ${isOpen ? 'scale-100 opacity-100 animate-kamui' : 'scale-50 opacity-0'}`}>
                        <button
                            className="absolute top-2 left-2 text-gray-700"
                            onClick={toggleModal}
                        >
                            ✖
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            {favorites.length > 0 ? (
                                favorites.map(manga => (
                                    <div key={manga._id} className="m-2 flex flex-col rounded-xl border no-underline text-black">
                                        <NavLink
                                            to={`/mangas/${manga._id}`}
                                            className="flex flex-1"
                                        >
                                            <div className={`w-2 h-40 rounded-t-xl ${genreColors[manga.category_id.name.toLowerCase()] || 'bg-gray-500'}`}></div>
                                            <div className="grid place-items-center w-[50%]">
                                                <div className='w-[100%] p-5'>
                                                    <h2 className="text-xl font-bold">{manga.title}</h2>
                                                    <p className={`${textColorClasses[manga.category_id.name.toLowerCase()]} text-left font-bold text-xl`}>
                                                        {manga.category_id.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-[60%] flex justify-right overflow-hidden">
                                                <img
                                                    src={manga.cover_photo}
                                                    alt={manga.title}
                                                    className="w-full h-[200px] object-cover rounded-l-[50%] rounded-xl"
                                                />
                                            </div>
                                        </NavLink>
                                        <button
                                            onClick={() => handleRemoveFavorite(manga._id)}
                                            className="mt-2 bg-red-500 text-white py-1 px-4 rounded-full self-center hover:bg-red-600"
                                        >
                                            REMOVE
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No favorites added yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
