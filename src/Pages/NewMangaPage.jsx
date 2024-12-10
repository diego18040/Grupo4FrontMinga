import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewMangaPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [mangaName, setMangaName] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

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
      const token = localStorage.getItem('token');
      const payload = {
        title: mangaName,
        description,
        cover_photo: photoUrl,
      };

      const response = await axios.post(`http://localhost:8080/api/mangas/create/${userId}?category=${category}`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log("Response:", response.data);

      // Muestra el cartel de éxito
      setShowSuccess(true);

      // Redirige después de unos segundos
      setTimeout(() => {
        setShowSuccess(false);
        navigate(`/manager/${userId}`);
      }, 3000);
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
            </div>

            {/* Campo URL de la Foto */}
            <div className="relative w-full">
              <input
                id="photoUrl"
                type="text"
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                  setImageUrl(e.target.value);
                }}
                className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                placeholder="Insert cover photo"
              />
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
                    {cat.name}
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

      {/* Modal de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              🎉 Manga Created Successfully! 🎉
            </h2>
            <p className="text-gray-700">
              "{mangaName}" has been added to your collection.
            </p>
            <img
              src={photoUrl || "https://via.placeholder.com/150"}
              alt="Manga Cover"
              className="rounded-lg mt-4 w-40 h-60 mx-auto object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewMangaPage;