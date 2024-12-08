import React, { useState } from "react";
import editchapterImg from "../assets/edithchapter.jpg"; 

const EditChapterForm = () => {
  const [mangaName, setMangaName] = useState("");
  const [chapter, setChapter] = useState("");
  const [date, setDate] = useState("");
  const [dataToEdit, setDataToEdit] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  return (
    <div className="flex w-full h-screen ">
      {/* Contenedor del formulario */}
      <div className="flex justify-center ml-[90px] items-center w-2/3 p-6 ">
        <div className="w-full max-w-sm ">
          <h2 className="text-3xl text-center p-10 flex ">Edit Chapter</h2>
          
          <form className="flex flex-col space-y-6 mt-12"> 
            {/* Campo Nombre del Manga */}
            <div className="relative w-full ">
              <input
                id="mangaName"
                type="text"
                value={mangaName}
                onChange={(e) => setMangaName(e.target.value)}
                className="w-full max-w-[280px] bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
                placeholder="Enter the name of the manga"
              />
              <label
                htmlFor="mangaName"
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 ${mangaName ? 'text-xs -translate-y-6' : 'text-base'}`}
              >
                Name of the manga
              </label>
            </div>

            {/* Campo Select para elegir el Capítulo */}
            <div className="relative w-full mb-6">
              <select
                id="chapter"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="p-2 text-gray-500 w-full max-w-[280px] bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              >
                <option value="">select Chapter</option>
                <option value="Chapter 1">Chapter 1</option>
                <option value="Chapter 2">Chapter 2</option>
                <option value="Chapter 3">Chapter 3</option>
              </select>
            </div>

            {/* Campo Select para elegir la Fecha */}
            <div className="relative w-full mb-6">
              <select
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 text-gray-500 w-full max-w-[280px] bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              >
                <option value="">select Date</option>
                <option value="2024-12-01">December 1, 2024</option>
                <option value="2024-12-02">December 2, 2024</option>
                <option value="2024-12-03">December 3, 2024</option>
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
                Data to Edit
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
<div className="relative flex justify-center items-center w-full mt-[30px]  ">
<div className="w-full p-4 max-w-sm text-center hidden sm:block">
<h2 className="text-lg text-center">Chapter #1 - Discover the word</h2>
  
  {/* Imagen */}
  <img
    src={editchapterImg}
    alt="Edit Chapter"
    className="rounded-lg w-[350px] h-[480px] "
  />
</div>


    </div>
    </div>
  );
};
export default EditChapterForm;