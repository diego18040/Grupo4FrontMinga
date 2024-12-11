import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const NewChapterPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const [chapterTitle, setChapterTitle] = useState("");
    const [order, setOrder] = useState(0);
    const [photoUrls, setPhotoUrls] = useState([""]);  // Array para manejar múltiples URLs de fotos
    const [imageUrls, setImageUrls] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePhotoUrlChange = (index, value) => {
        const newPhotoUrls = [...photoUrls];
        newPhotoUrls[index] = value;
        setPhotoUrls(newPhotoUrls);

        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const addPhotoUrlInput = () => {
        setPhotoUrls([...photoUrls, ""]);
        setImageUrls([...imageUrls, ""]);
    };

    const removePhotoUrlInput = (index) => {
        const newPhotoUrls = photoUrls.filter((_, i) => i !== index);
        setPhotoUrls(newPhotoUrls);

        const newImageUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newImageUrls);
    };
    const handleCreate = async () => {
        try {
            const token = localStorage.getItem('token');
            const payload = {
                title: chapterTitle,
                pages: photoUrls,
                order: order,
            };

            const response = await axios.post(`http://localhost:8080/api/chapters/create/${id}`, payload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log("Response:", response.data);

            // Mostrar SweetAlert de éxito
            Swal.fire({
                title: 'Chapter Created Successfully!',
                text: `Chapter title: ${chapterTitle}`,
                icon: 'success',
                confirmButtonColor: '#000000',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500',
                    title: 'text-2xl font-bold mb-4',
                    confirmButton: '#000000',                  

                    



                }
            }).then(() => {
                navigate(`/manager/${userId}`);
            });
        } catch (error) {
            console.error("Error creating chapter:", error);
            Swal.fire({
                title: 'Failed to Submit!',
                text: 'There was an error creating the chapter. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'bg-white rounded-lg',
                    title: 'text-2xl font-bold mb-4',
                    confirmButton: 'bg-red-500 text-white rounded-full p-2 mt-4',
                }
            });
        }
    };
    return (
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 justify-center">
            {/* Modal de éxito */}
            {isModalOpen && (
                <div className="border fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="border bg-white rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Chapter Created Successfully!</h2>
                        <p className="text-lg">{chapterTitle}</p>
                        <div className="mt-4">
                            {imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Chapter page ${index + 1}`}
                                    className="rounded-lg w-[200px] h-[300px] mb-4"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Contenedor del formulario */}
            <div className="w-full h-auto grid grid-cols-1">
                <div className="flex justify-center items-center w-full">
                    <div className="w-full flex justify-center items-center">
                        <div className="w-full grid flex-row justify-center max-w-sm">
                            <h2 className="text-3xl text-center p-10 flex">New Chapter</h2>
                            <form className="flex flex-col space-y-6 mt-12">
                                <div className="relative w-full">
                                    <input
                                        id="chapterTitle"
                                        type="text"
                                        value={chapterTitle}
                                        onChange={(e) => setChapterTitle(e.target.value)}
                                        className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                                        placeholder="Insert title"
                                    />
                                </div>
                                <div className="relative w-full">
                                    <input
                                        id="order"
                                        type="number"
                                        value={order}
                                        onChange={(e) => setOrder(e.target.value)}
                                        className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                                        placeholder="Insert order"
                                    />
                                </div>

                                {/* Campos URL de las Fotos */}
                                {photoUrls.map((photoUrl, index) => (
                                    <div className="relative w-full" key={index}>
                                        <input
                                            id={`photoUrl-${index}`}
                                            type="text"
                                            value={photoUrl}
                                            onChange={(e) => handlePhotoUrlChange(index, e.target.value)}
                                            className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                                            placeholder="Insert pages"
                                        />
                                        {photoUrl && (
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 p-1 text-red-600"
                                                onClick={() => removePhotoUrlInput(index)}
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {photoUrls.length === 0 && (
                                    <div className="text-center text-gray-500">New Chapter Page</div>
                                )}

                                <button
                                    type="button"
                                    onClick={addPhotoUrlInput}
                                    className="w-[280px] h-[65px] bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center transition-colors duration-300 hover:from-blue-300 hover:via-blue-400 hover:to-blue-500"
                                >
                                    Add Page
                                </button>
                                {/* Botones de acción */}
                                <div className="flex flex-col space-y-6 justify-center">
                                    <button
                                        type="button"
                                        onClick={handleCreate}
                                        className="w-[280px] h-[65px] bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center transition-colors duration-300 hover:from-blue-300 hover:via-blue-400 hover:to-blue-500"
                                    >
                                        SEND
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenedor de las imágenes con el título encima */}
            <div className="relative flex justify-center items-center w-full mt-[30px]">
                <div className="w-full p-4 max-w-sm text-center">
                    <h2 className="text-lg text-center">{chapterTitle}</h2>
                    {imageUrls.length > 0 ? (
                        imageUrls.map((url, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={url}
                                    alt={`Cover photo ${index + 1}`}
                                    className="rounded-lg w-[350px] h-[480px] mb-4"
                                />
                                <button
                                    type="button"
                                    className="absolute rounded-full bg-red-500 top-0 right-0 p-2 m-2 text-black"
                                    onClick={() => removePhotoUrlInput(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 h-[200px] text-4xl">Cover Photo</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewChapterPage;
