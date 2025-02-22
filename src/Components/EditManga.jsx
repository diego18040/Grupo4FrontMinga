import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import 'tailwindcss/tailwind.css';

const EditManga = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [mangaName, setMangaName] = useState("");
    const [description, setDescription] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/mangas/id/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const manga = response.data.response[0];
                setMangaName(manga.title);
                setImageUrl(manga.cover_photo);
                setDescription(manga.description);
                setPhotoUrl(manga.cover_photo);
                setCategory(manga.category_id.name);
            } catch (error) {
                console.error("Error fetching manga data:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/categories/all', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setCategories(response.data.response);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchManga();
        fetchCategories();
    }, [id]);
    const handleEdit = async () => {
        const result = await Swal.fire({
            title: 'Are you sure you want to edit?',
            text: "Changes will be saved!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, edit it!',
            confirmButtonColor: '#000000',
            cancelButtonColor: '#000000',
            customClass: {
                popup: 'bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500',
                confirmButton: '#000000',
                cancelButton: '#000000'
            }
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const payload = {
                    title: mangaName,
                    description,
                    cover_photo: photoUrl,
                };

                const response = await axios.put(`http://localhost:8080/api/mangas/update/${id}?category=${category}`, payload, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                Swal.fire(
                    'Updated!',
                    'Your manga has been updated.',
                    'success'
                );

                navigate(`/manager/${userId}`);
            } catch (error) {
                console.error("Error updating manga:", error);
                Swal.fire(
                    'Failed!',
                    'Your manga could not be updated.',
                    'error'
                );
            }
        }
    };
    const handleDelete = async () => {
        const result = await Swal.fire({
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
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`http://localhost:8080/api/mangas/deleteone/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                Swal.fire(
                    'Deleted!',
                    'Your manga has been deleted.',
                    'success'
                );

                setTimeout(() => {
                    navigate(`/manager/${userId}`);
                }, 3000);
            } catch (error) {
                console.error("Error deleting manga:", error);
                Swal.fire(
                    'Failed!',
                    'Your manga could not be deleted.',
                    'error'
                );
            }
        }
    };
    return (
        <div className=" w-full h-screen  grid grid-cols-1 md:grid-cols-2 ">
            <div className="  flex justify-center items-center w-full">            
                <div className="  w-full flex justify-center items-center">
                <div className="w-full grid  flex-row justify-center max-w-sm">
                    <h2 className="text-3xl text-center p-10 flex">Edit Manga</h2>
                    <form className="flex flex-col space-y-6 mt-12">
                        <div className="relative w-full">
                            <input
                                id="mangaName"
                                type="text"
                                value={mangaName}
                                onChange={(e) => setMangaName(e.target.value)}
                                className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                                placeholder="Enter the name of the manga"
                            />
                            <label
                                htmlFor="mangaName"
                                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 ${mangaName ? 'text-xs -translate-y-6' : 'text-base'}`}
                            ></label>
                        </div>
                        <div className="relative w-full">
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                                placeholder="Enter the description of the manga"
                            ></textarea>
                            <label
                                htmlFor="description"
                                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 ${description ? 'text-xs -translate-y-6' : 'text-base'}`}
                            ></label>
                        </div>
                        <div className="relative w-full">
                            <input
                                id="photoUrl"
                                type="text"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                                placeholder="Enter the photo URL of the manga"
                            />
                            <label
                                htmlFor="photoUrl"
                                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 ${photoUrl ? 'text-xs -translate-y-6' : 'text-base'}`}
                            ></label>
                        </div>
                        <div className="relative w-full mb-6">
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="p-2 text-gray-500 w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col space-y-6 justify-center">
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="w-[280px] h-[65px] bg-[#34D399] text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center hover:bg-[#2ab380] transition-colors"
                            >
                                Edit
                            </button>
                            <NavLink to={`/${id}/newchapter/`}
                                className="w-[280px] h-[65px] bg-[rgb(234,111,250)] text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center hover:bg-[#f9cdb8] transition-colors"
                            >
                                New Chapter
                            </NavLink>
                            <NavLink to={`/editchapter/${id}`}
                                className="w-[280px] h-[65px] bg-blue-800 text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center hover:bg-[#f9cdb8] transition-colors"
                            >
                                Edit Chapter
                            </NavLink>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="w-[280px] h-[65px] bg-red-500 text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center hover:bg-[#f9cdb8] transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>

            <div className="relative flex justify-center items-center w-full mt-[30px]">
                <div className="w-full p-4 max-w-sm text-center">
                    <h2 className="text-lg text-center">{mangaName}</h2>
                    <img
                        src={imageUrl}
                        alt={mangaName}
                        className="rounded-lg w-[350px] h-[480px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditManga;
