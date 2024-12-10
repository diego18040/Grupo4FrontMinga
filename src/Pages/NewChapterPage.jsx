import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewChapterPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const [chapterTitle, setChapterTitle] = useState("");
    const [order, setOrder] = useState(0);
    const [photoUrls, setPhotoUrls] = useState([""]);
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

            // Mostrar el modal
            setIsModalOpen(true);

            // Ocultar el modal después de unos segundos y redirigir
            setTimeout(() => {
                setIsModalOpen(false);
                navigate(`/manager/${userId}`);
            }, 3000);
        } catch (error) {
            console.error("Error creating chapter:", error);
            alert("Failed to submit.");
        }
    };

    return (
        <div className="flex w-full h-screen">
            {/* Modal de éxito */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 text-center">
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
            <div className="flex justify-center ml-[90px] items-center w-2/3 p-6">
                <div className="w-full max-w-sm">
                    <h2 className="text-3xl text-center p-10 flex">New Chapter</h2>

                    <form className="flex flex-col space-y-6 mt-12">
                        {/* Campo Nombre del Capítulo */}
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

                        {/* Campo Orden */}
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
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addPhotoUrlInput}
                            className="w-[280px] h-[65px] bg-blue-300 text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center hover:bg-[#2ab380] transition-colors"
                        >
                            Add Page
                        </button>

                        {/* Botones de acción */}
                        <div className="flex flex-col space-y-6 justify-center">
                            <button
                                type="button"
                                onClick={handleCreate}
                                className="w-[280px] h-[65px] bg-[#34D399] text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center hover:bg-[#2ab380] transition-colors"
                            >
                                SEND
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Contenedor de las imágenes con el título encima */}
            <div className="relative flex justify-center items-center w-full mt-[30px]">
                <div className="w-full p-4 max-w-sm text-center hidden sm:block">
                    <h2 className="text-lg text-center">{chapterTitle}</h2>
                    {imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Cover photo ${index + 1}`}
                            className="rounded-lg w-[350px] h-[480px] mb-4"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewChapterPage;
