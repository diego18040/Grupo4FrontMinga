import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeFavorite } from '../store/actions/FavActions';
import SearchBarFavorites from "../Components/SearchFavorites";
import favourites from "../assets/favourites.jpg";

export default function FavoritesPage() {
    const navigate = useNavigate();
    const { favorites } = useSelector(state => state.favorites);
    const dispatch = useDispatch();
    const [searchResults, setSearchResults] = useState([]);

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

    React.useEffect(() => {
        navigate('/favourites', {
            state: {
                backgroundImage: favourites,
                title: "Favourites",
            }
        });
    }, [navigate]);

    const handleSearch = (results) => {
        setSearchResults(results);
    };

    const handleRemoveFavorite = (mangaId) => {
        dispatch(removeFavorite(mangaId));
    };

    const displayedFavorites = searchResults.length > 0 ?
        favorites.filter(manga => searchResults.includes(manga._id)) :
        favorites;

    return (
        <div >
            <div className="sm:block visible block  z-10 relative top-[-450px] sm:w-full w-[100%] mx-auto">
                <SearchBarFavorites onSearch={handleSearch} data={favorites} />
            </div>

            <div className="mangas-container relative -top-[42vh] left-1/2 transform -translate-x-1/2 w-[100%] bg-white p-8 rounded-lg shadow-lg flex items-center justify-center opacity-100 sm:flex-row">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-[65%] ">
                    {displayedFavorites.length > 0 ? (
                        displayedFavorites.map(manga => (
                            <div key={manga._id} className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden ">
                                <NavLink to={`/mangas/${manga._id}`} className="flex flex-1 relative">
                                    <div className={`w-2 h-full ${genreColors[manga.category_id.name.toLowerCase()] || 'bg-gray-500'}`} />
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
                                    className="w-[50%] bg-red-500 justify-center center text-white py-2 px-4 hover:bg-red-600 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-lg text-gray-500">
                            {searchResults.length > 0 ? "No matches found" : "No favorites added yet"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}