import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Importar useParams para obtener el id de la URL
import axios from "axios";

const NewChapterPage = () => {
    const { id } = useParams(); // Obtener el id del manga desde la URL
    const navigate = useNavigate(); // Inicializar useNavigate
    const userId = localStorage.getItem("userId"); // Obtener userId del localStorage

    const [chapterTitle, setChapterTitle] = useState("");
    const [order, setOrder] = useState(0); // Cambiar el nombre a order para reflejar el formato del cuerpo
    const [photoUrls, setPhotoUrls] = useState([""]); // Estado para múltiples URLs de imágenes
    const [imageUrls, setImageUrls] = useState([]);

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
            const token = localStorage.getItem('token'); // Obtener el token de autenticación
            const payload = {
                title: chapterTitle,
                pages: photoUrls, // Enviar múltiples URLs de imágenes como pages
                order: order, // Asegurarnos de enviar el orden correcto
            };

            console.log("Payload:", payload);

            const response = await axios.post(`http://localhost:8080/api/chapters/create/${id}`, payload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log("Response:", response.data);

            alert("Chapter created successfully!");

            // Redirigir inmediatamente después del mensaje satisfactorio
            navigate(`/manager/${userId}`);
        } catch (error) {
            console.error("Error creating chapter:", error);
            alert("Failed to submit.");
        }
    };
    return (
        <div className="flex w-full h-screen">
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
                            <label
                                htmlFor="chapterTitle"
                                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 ${chapterTitle ? 'text-xs -translate-y-6' : 'text-base'}`}
                            ></label>
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
                            <label
                                htmlFor="order"
                                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 ${order ? 'text-xs -translate-y-6' : 'text-base'}`}
                            ></label>
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
                                <label
                                    htmlFor={`photoUrl-${index}`}
                                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 ${photoUrl ? 'text-xs -translate-y-6' : 'text-base'}`}
                                ></label>
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
