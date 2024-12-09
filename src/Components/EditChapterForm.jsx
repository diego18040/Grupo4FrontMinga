import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditChapterForm = () => {
  const { id } = useParams(); // Obtener el id del manga desde la URL
  const [mangaName, setMangaName] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [dataToEdit, setDataToEdit] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchMangaAndChapters = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación
        const mangaResponse = await axios.get(`http://localhost:8080/api/mangas/id/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const manga = mangaResponse.data.response[0];
        setMangaName(manga.title);
        setImageUrl(manga.cover_photo);

        const chaptersResponse = await axios.get(`http://localhost:8080/api/chapters/manga/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setChapters(chaptersResponse.data.response);
      } catch (error) {
        console.error("Error fetching manga or chapters data:", error);
      }
    };

    fetchMangaAndChapters();
  }, [id]);
  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token de autenticación
      const payload = {
        title: mangaName,
        pages: [dataToEdit],
      };

      console.log("Payload:", payload);

      const response = await axios.put(`http://localhost:8080/api/chapters/update/${selectedChapter}`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log("Response:", response.data);

      alert("Chapter updated successfully!");
    } catch (error) {
      console.error("Error updating chapter:", error);
      alert("Failed to update.");
    }
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
    const chapter = chapters.find(ch => ch._id === e.target.value);
    setSelectedPage(chapter.pages[0]); // Seleccionar la primera página por defecto
    setDataToEdit(chapter.pages[0]); // Actualizar el campo dataToEdit con la primera página
  };

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);
    setDataToEdit(e.target.value); // Actualizar el campo dataToEdit
  };

  return (
    <div className="flex w-full h-screen">
      {/* Contenedor del formulario */}
      <div className="flex justify-center ml-[90px] items-center w-2/3 p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl text-center p-10 flex">Edit Chapter</h2>

          <form className="flex flex-col space-y-6 mt-12">
            {/* Campo Nombre del Manga */}
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
              />
            </div>
            {/* Campo Select para elegir el Capítulo */}
            <div className="relative w-full mb-6">
              <select
                id="chapter"
                value={selectedChapter}
                onChange={handleChapterChange}
                className="p-2 text-gray-500 w-full max-w-[280px] bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              >
                <option value="">Select Chapter</option>
                {chapters.map(chapter => (
                  <option key={chapter._id} value={chapter._id}>
                    {chapter.title}
                  </option>
                ))}
              </select>
            </div>
            {/* Campo Select para elegir la Página */}
            <div className="relative w-full mb-6">
              <select
                id="page"
                value={selectedPage}
                onChange={handlePageChange}
                className="p-2 text-gray-500 w-full max-w-[280px] bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              >
                <option value="">Select Page</option>
                {selectedChapter && chapters.find(ch => ch._id === selectedChapter).pages.map((page, index) => (
                  <option key={index} value={page}>
                    Page {index + 1}
                  </option>
                ))}
              </select>
            </div>
            {/* Campo para editar los datos */}
            <div className="relative w-full mb-6">
              <input
                id="dataToEdit"
                type="text"
                value={dataToEdit}
                onChange={(e) => setDataToEdit(e.target.value)}
                className="w-full p-2 max-w-[280px] bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
                placeholder="Enter data to edit"
              />
              <label
                htmlFor="dataToEdit"
                className={`absolute p-3 left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${dataToEdit ? 'text-xs -translate-y-6' : 'text-base'}`}
              >
              
              </label>
            </div>
            {/* Botones de acción */}
            <div className="flex flex-col space-y-6 justify-center">
              <button
                type="button"
                onClick={handleEdit}
                className="w-[280px] h-[65px] bg-[#34D399] text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center hover:bg-[#2ab380] transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-[280px] h-[65px] bg-[#FBDDCC] text-[#EE837F] px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center hover:bg-[#f9cdb8] transition-colors"
              >
                Delete
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

export default EditChapterForm;
