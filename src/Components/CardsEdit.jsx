import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMangasEdit } from '../store/actions/CardsEditActions';
import edit from "../assets/editar.png";
import del from "../assets/eliminar.png";
import CheckboxsEdit from './CheckboxEdit';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function CardsEdit() {
    const { id } = useParams(); // Obtener el id del creador desde la URL
    const navigate = useNavigate(); // Inicializar useNavigate
    const userId = localStorage.getItem("userId"); // Obtener userId del localStorage
    const dispatch = useDispatch();
    const { loading, mangas, error } = useSelector(state => state.cards);
    const selectedTitle = useSelector(state => state.cards.selectedTitle);
    const selectedGenre = useSelector(state => state.cards.selectedGenre);

    useEffect(() => {
        dispatch(fetchMangasEdit(id, selectedTitle, selectedGenre)); // Pasar el id aquí
    }, [id, selectedTitle, selectedGenre, dispatch]);

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

    const handleDelete = async (mangaId) => {
        try {
            const token = localStorage.getItem('token'); // Obtener el token de autenticación
            console.log(`http://localhost:8080/api/mangas/deleteone/${mangaId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const response = await axios.delete(`http://localhost:8080/api/mangas/deleteone/${mangaId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log("Response:", response.data);

            alert("Manga deleted successfully!");

      
            setTimeout(() => {
                navigate(`/manager/${userId}`);
            }, 100);
        } catch (error) {
            console.error("Error deleting manga:", error);
            alert("Failed to delete manga.");
        }
    };

    return (
        <div>
            <CheckboxsEdit />
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <svg className="animate-spin h-16 w-16 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                </div>
            )}
            {!loading && (error || mangas.length === 0) && (
                <div className="container mx-auto bg-white rounded-xl lg:p-20 xl:p-40 md:p-0">
                    <div className="flex justify-center items-center">
                        <div className="m-2 flex flex-col rounded-xl border shadow-lg p-8 items-center md:p-20 md:w-[60%]">
                            <img src="https://steamuserimages-a.akamaihd.net/ugc/872995211537498517/8D23E6262B562DD56E459168830DDB3510D82242/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" alt="No Mangas Found" className="w-32 h-32 mb-4 md:w-64 md:h-64" />
                            <p className="text-xl font-bold">No Mangas Found</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="container mx-auto bg-white rounded-xl lg:p-20 xl:p-40 md:p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {mangas.map((manga, index) => (
                        <div key={manga._id} className={`m-2 flex rounded-xl border shadow-lg transform transition-transform duration-200 hover:scale-110 cursor-pointer ${index === mangas.length - 1 && mangas.length % 2 !== 0 ? 'md:col-span-2' : ''}`}>
                            <div className={`w-2 h-40 rounded-t-md ${manga.category_id && manga.category_id.name ? genreColors[manga.category_id.name.toLowerCase()] : 'bg-gray-500'}`}></div>
                            <div className="grid place-items-center w-[50%]">
                                <div className="w-[100%]">
                                    <div className="w-[50%] flex">
                                        <div className="p-2">
                                            <button className=""><img src={edit} alt="edit" /></button>
                                        </div>
                                        <div className="p-2">
                                            <button className="" onClick={() => handleDelete(manga._id)}><img src={del} alt="delete" /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[65%] w-[100%] p-5">
                                    <h2 className="text-xl font-bold">{manga.title}</h2>
                                    <p className={`${manga.category_id && manga.category_id.name ? textColorClasses[manga.category_id.name.toLowerCase()] : ''} text-left font-bold text-xl`}>
                                        {manga.category_id && manga.category_id.name}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="w-[80%] flex">
                                        <NavLink to={`/editmanga/${manga._id}`} className="mt-4 bg-purple-300 text-purple-400 font-bold py-2 px-4 rounded-full hover:bg-teal-300 w-24 h-10">EDIT</NavLink>
                                    </div>
                                    <div className="w-[80%] flex">
                                        <button className="mt-4 bg-teal-200 text-teal-500 font-bold py-2 px-4 rounded-full hover:bg-teal-300 w-24 h-10" onClick={() => handleDelete(manga._id)}>DELETE</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50%] flex justify-right overflow-hidden">
                                <img src={manga.cover_photo} alt={manga.title} className="w-full h-[200px] md:h-[300px] object-cover rounded-l-[50%] rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
