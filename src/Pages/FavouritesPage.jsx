import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeFavorite } from '../store/actions/FavActions';
import favourites from "../assets/favourites.jpg"; 

export default function FavoritesPage() {


    
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate('/favourites', {
          state: {
            backgroundImage: favourites,
            title: "Favourites",
          }
        });
    }, [navigate]);


    const { favorites } = useSelector(state => state.favorites);
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

    const handleRemoveFavorite = (mangaId) => {
        dispatch(removeFavorite(mangaId));
    };
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl text-center mb-10">Favorites</h2>
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
    );
}
