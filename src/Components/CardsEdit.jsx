import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMangasEdit } from '../store/actions/CardsEditActions';
import edit from "../assets/editar.png";
import del from "../assets/eliminar.png";
import CheckboxsEdit from './CheckboxEdit';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 

export default function CardsEdit() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const userId = localStorage.getItem("userId"); 
    const dispatch = useDispatch();
    const { loading, mangas, error } = useSelector(state => state.cards);
    const selectedTitle = useSelector(state => state.cards.selectedTitle);
    const selectedGenre = useSelector(state => state.cards.selectedGenre);

    useEffect(() => {
        dispatch(fetchMangasEdit(id, selectedTitle, selectedGenre)); 
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
        const token = localStorage.getItem('token'); 
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                popup: 'bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500',
                confirmButton: '#000000',
                cancelButton: '#000000'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:8080/api/mangas/deleteone/${mangaId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
    
                    console.log("Response:", response.data);
    
                    Swal.fire(
                        'Deleted!',
                        'Your manga has been deleted.',
                        'success'
                    );
    
                    dispatch(fetchMangasEdit(id, selectedTitle, selectedGenre));
                } catch (error) {
                    console.error("Error deleting manga:", error);
                    Swal.fire(
                        'Failed!',
                        'Your manga could not be deleted.',
                        'error'
                    );
                }
            }
        });
    };
    
    

    return (
        <div>
            <CheckboxsEdit />
            <NavLink to={`/newmanga/`} className="mt-4 bg-purple-300 text-purple-400 font-bold py-2 px-4 rounded-full hover:bg-teal-300 w-24 h-10">NEW MANGA</NavLink>
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            )}
            {!loading && (error || mangas.length === 0) && (
                <div className="container mx-auto bg-white rounded-xl lg:p-20 xl:p-40 md:p-0">
                    <div className="flex justify-center items-center">
                        <div className="m-2 flex flex-col rounded-xl border shadow-xl  items-center md:h-full md:w-[100%] ">
                            <img src="https://steamuserimages-a.akamaihd.net/ugc/872995211537498517/8D23E6262B562DD56E459168830DDB3510D82242/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" alt="No Mangas Found" className="w-[200px] h-[200px] mt-2 mb-4 md:w-[500px] md:h-[400px] md:m-2 rounded-xl " />
                            <p className="text-3xl font-bold text-center">No Mangas Found!</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="container mx-auto bg-white rounded-xl lg:p-20 xl:p-40 md:p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {mangas.map((manga, index) => (
                        <div key={manga._id} className={`m-2 flex rounded-xl border shadow-lg transform transition-transform duration-200 hover:scale-110 cursor-pointer ${index === mangas.length - 1 && mangas.length % 2 !== 0 ? 'md:col-span-2 justify-self-center md:w-[410px]' : ''}`}>
                            <div className={`w-2 h-40 rounded-t-md ${manga.category_id && manga.category_id.name ? genreColors[manga.category_id.name.toLowerCase()] : 'bg-gray-500'}`}></div>
                            <div className="grid place-items-center w-[50%]">
                                <div className="w-[100%]">
                                    <div className="w-[50%] flex">
                                        <div className="p-2">
                                            
                                        <NavLink to={`/editmanga/${manga._id}`}><img src={edit} alt="edit" /></NavLink>
                                        </div>
                                        <div className="p-2">
                                            <NavLink className="" onClick={() => handleDelete(manga._id)}><img src={del} alt="delete" /></NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[65%] w-[100%] p-5">
                                    <h2 className="text-xl font-bold">{manga.title}</h2>
                                    <p className={`${manga.category_id && manga.category_id.name ? textColorClasses[manga.category_id.name.toLowerCase()] : ''} text-left font-bold text-xl`}>
                                        {manga.category_id && manga.category_id.name}
                                    </p>
                                    <div></div>
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



