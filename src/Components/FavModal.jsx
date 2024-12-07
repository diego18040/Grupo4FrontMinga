
// import React, { useState } from "react";
// import companyauthor from "../assets/companyauthor.jpg";

// const CreateMangaForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     description: "",
//   });

//   // Manejar los cambios en los campos del formulario
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Enviar el formulario
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Datos del formulario: ", formData);
//   };

//   return (
//     <div className="flex flex-col md:flex-row w-full h-screen mt-4 md:mt-0">
//       {/* Contenedor del formulario a la izquierda (50% de la pantalla) */}
//       <div className="w-full md:w-1/2 h-full flex justify-center items-center p-4">
//         <div className="relative p-6 ml-4 bg-white w-full max-w-sm rounded-lg">
//           <h2 className="text-3xl  p-12 text-center">New Manga</h2>
//           <form className="ml-4" onSubmit={handleSubmit}>
//             {/* Campo de título */}
//             <div className="mb-4">
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 placeholder="Insert title"
//                 className="w-full p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
//               />
//             </div>

//             {/* Campo de categoría */}
//             <div className="mb-4">
//               <select
//                 id="category"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//                 className="w-full text-gray-400 p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
//               >
//                 <option value="">Insert description</option>
//                 <option value="kodomo">Kodomo</option>
//                 <option value="shonen">Shonen</option>
//                 <option value="seinen">Seinen</option>
//                 <option value="shojo">Shojo</option>
//               </select>
//             </div>

//             {/* Campo de descripción */}
//             <div className="mb-4">
//               <input
//                 type="text"
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 placeholder="Insert description"
//                 className="w-full p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
//               />
//             </div>

//             {/* Botón rosa */}
//             <button
//               type="submit"
//               className="w-[67vw] md:w-[21vw] p-3 mt-4 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white rounded-3xl hover:bg-pink-400"
//             >
//               Send
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Contenedor de la imagen  */}
//       <div className="relative w-full md:w-1/2 h-full hidden sm:block">
//         {/* Capa oscura sobre la imagen */}
//         <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

//         <img
//           src={companyauthor} // Imagen a la derecha
//           alt="Default"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default CreateMangaForm;