// ProfileForm.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
 

  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSave = () => {
    alert("Data saved");
  };

  const handleDelete = () => {
    alert("Account deleted");
    setName('');
    setSurname('');
    setAddress('');
    setImageUrl('');
    setBirthdate('');
  };



  return (
    <div className={`
 w-full md:absolute md:top-[60%] md:left-1/2 md:transform md:-translate-x-1/2 
  bg-white rounded-lg shadow-lg 
  p-4 md:p-8 
  max-w-[95%] mx-auto
  mt-24 md:mt-0
    `}>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full">
        {/* Contenedor del formulario */}
        <div className="w-full md:w-[60%] lg:w-[50%] xl:w-[40%] p-4 md:p-10 md:pt-[6%] gap-6 md:mr-24">
          <form>
            {/* Campo Nombre */}
            <div className="relative w-full mb-6">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
                placeholder="Enter your name"
              />
              <label
                htmlFor="name"
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${name ? 'text-xs -translate-y-6' : 'text-base'}`}
              >
                Enter your name
              </label>
            </div>

            {/* Campo Apellido */}
            <div className="relative w-full mb-6">
              <input
                id="surname"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
                placeholder="Enter your surname"
              />
              <label
                htmlFor="surname"
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${surname ? 'text-xs -translate-y-6' : 'text-base'}`}
              >
                Enter your surname
              </label>
            </div>

            {/* Campo Dirección */}
            <div className="relative w-full mb-6">
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
                placeholder="Enter your address"
              />
              <label
                htmlFor="address"
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${address ? 'text-xs -translate-y-6' : 'text-base'}`}
              >
                Enter your address
              </label>
            </div>

            {/* Campo Fecha de Nacimiento */}
            <div className="relative w-full mb-6">
              <input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 appearance-none text-base"
              />
              <label
                htmlFor="birthdate"
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${birthdate ? 'text-xs -translate-y-6' : 'text-base'}`}
              >
                Birthdate
              </label>
            </div>

            {/* Campo URL Imagen */}
            <div className="relative w-full mb-6">
              <input
                id="imageUrl"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
                placeholder="Enter the image URL"
              />
              <label
                htmlFor="imageUrl"
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${imageUrl ? 'text-xs -translate-y-6' : 'text-base'}`}
              >
                Enter the image URL
              </label>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col space-y-6 justify-center">
              <button
                type="button"
                onClick={handleSave}
                className="w-full h-[65px] bg-[#34D399] text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[15px] font-bold leading-[29.26px] text-center hover:bg-[#2ab380] transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full h-[65px] bg-[#FBDDCC] text-[#EE837F] px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[15px] font-bold leading-[29.26px] text-center hover:bg-[#f9cdb8] transition-colors"
              >
                Delete account
              </button>
            </div>
          </form>
        </div>

        {/* Imagen de perfil */}
        <div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0 md:ml-24">
          <div className="w-32 md:w-40 h-32 md:h-40 rounded-full overflow-hidden mx-auto">
            <img
              src={imageUrl || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;