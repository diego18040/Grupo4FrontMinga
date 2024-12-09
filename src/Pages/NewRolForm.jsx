import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewRoleForm = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState(""); // Estado para el rol seleccionado
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    website: "",
  });

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

   
    console.log(formData);
    
    navigate("/success"); 
  };

  return (
    <div className="flex w-full h-screen mt-16 md:mt-0">
      {/* Contenedor izquierdo (Formulario) */}
      <div className="flex justify-center items-center w-full md:w-2/3 p-6">
        <div className="w-full max-w-sm text-center">
          {/* Contenedor del título y descripción */}
          <div className="flex flex-col items-center mb-4">
            <p className="text-4xl p-8 text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 mb-2 whitespace-nowrap">
              Complete your profile
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Selección de rol */}
            <div className="flex justify-center items-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setRole("Author")}
                className={`${
                  role === "Author" ? "bg-pink-400" : "bg-pink-300"
                } text-white p-3 rounded-2xl w-1/3`}
              >
                Author
              </button>
              <button
                type="button"
                onClick={() => setRole("Company")}
                className={`${
                  role === "Company" ? "bg-pink-400" : "bg-pink-300"
                } text-white p-3 rounded-2xl w-1/3`}
              >
                Company
              </button>
            </div>

            {/* Campo de nombre */}
            <div className="flex flex-col items-start mb-4">
              <label htmlFor="name" className="text-lg font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-2 rounded-md border border-gray-300"
              />
            </div>

            {/* Campo de correo */}
            <div className="flex flex-col items-start mb-4">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-2 rounded-md border border-gray-300"
              />
            </div>

            {/* Campos específicos según el rol */}
            {role === "Company" && (
              <>
                <div className="flex flex-col items-start mb-4">
                  <label htmlFor="companyName" className="text-lg font-semibold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="p-2 rounded-md border border-gray-300"
                  />
                </div>
                <div className="flex flex-col items-start mb-4">
                  <label htmlFor="website" className="text-lg font-semibold">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="p-2 rounded-md border border-gray-300"
                  />
                </div>
              </>
            )}

            {/* Botón de enviar */}
            <button
              type="submit"
              className="w-full p-3 text-white bg-pink-500 rounded-2xl hover:bg-pink-400"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Contenedor derecho (imagen de fondo opcional) */}
      <div className="relative justify-center items-center w-2/3 h-full hidden md:block">
        {/* Imagen de fondo opcional */}
        <img
          src="https://via.placeholder.com/800x600"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
    </div>
  );
};

export default NewRoleForm;
