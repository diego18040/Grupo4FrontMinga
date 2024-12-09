import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import axios from "axios";

const NewMangaPage = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const userId = localStorage.getItem("userId"); // Obtener userId del localStorage

  const [mangaName, setMangaName] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
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

    fetchCategories();
  }, []);
  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token de autenticación
      const payload = {
        title: mangaName,
        description,
        cover_photo: photoUrl,
      };

      console.log("Payload:", payload);

      const response = await axios.post(`http://localhost:8080/api/mangas/create/${userId}?category=${category}`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log("Response:", response.data);

      alert("Manga created successfully!");

      // Redirigir inmediatamente después del mensaje satisfactorio
      navigate(`/manager/${userId}`);
    } catch (error) {
      console.error("Error creating manga:", error);
      alert("Failed to submit.");
    }
  };
  return (
    <div className="flex w-full h-screen">
      {/* Contenedor del formulario */}
      <div className="flex justify-center ml-[90px] items-center w-2/3 p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl text-center p-10 flex">New Manga</h2>

          <form className="flex flex-col space-y-6 mt-12">
            {/* Campo Nombre del Manga */}
            <div className="relative w-full">
              <input
                id="mangaName"
                type="text"
                value={mangaName}
                onChange={(e) => setMangaName(e.target.value)}
                className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                placeholder="Insert title"
              />
              <label
                htmlFor="mangaName"
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 ${mangaName ? 'text-xs -translate-y-6' : 'text-base'}`}
              ></label>
            </div>

            {/* Campo Descripción */}
            <div className="relative w-full">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                placeholder="Insert description"
              ></textarea>
              <label
                htmlFor="description"
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 ${description ? 'text-xs -translate-y-6' : 'text-base'}`}
              ></label>
            </div>

            {/* Campo URL de la Foto */}
            <div className="relative w-full">
              <input
                id="photoUrl"
                type="text"
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                  setImageUrl(e.target.value); // Actualizar el estado de imageUrl
                }}
                className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                placeholder="Insert cover photo"
              />
              <label
                htmlFor="photoUrl"
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 ${photoUrl ? 'text-xs -translate-y-6' : 'text-base'}`}
              ></label>
            </div>
            {/* Campo Select para elegir la Categoría */}
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
                    {cat.name} {/* Mostrar el nombre literal */}
                  </option>
                ))}
              </select>
            </div>

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

      {/* Contenedor de la imagen con el título encima */}
      <div className="relative flex justify-center items-center w-full mt-[30px]">
        <div className="w-full p-4 max-w-sm text-center hidden sm:block">
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

export default NewMangaPage;
