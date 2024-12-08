import React from "react";
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.png"; 
import defaultImage from "../assets/changerole.jpg"; 

import person1 from "../assets/person1.jpg"; 
import person2 from "../assets/person2.jpg"; 
import person3 from "../assets/person3.jpg"; 
import persona from "../assets/person4.jpg"; 
import personb from "../assets/person5.jpg"; 
import personc from "../assets/person6.jpg"; 

const NewRole = () => {
  const navigate = useNavigate(); 

  const handleJoinAsAuthor = () => {
    navigate("/NewRoleForm");
  };

  const handleJoinAsCompany = () => {
    navigate("/NewComponyForm");
  };

 
  const peopleImages = [person1, person2, person3];
  const peopleImages1 = [persona, personb, personc];

  return (
    <div className="flex w-full h-screen mt-16 md:mt-0 ">
      {/* Contenedor izquierdo (formulario y botones) */}
      <div className="flex justify-center items-center w-full md:w-2/3 p-6  ">
        <div className="w-full max-w-sm text-center ">
          {/* Contenedor del logo y texto */}
          <div className="flex flex-col items-center mb-4 ">
            {/* Texto encima del logo */}
            <p className="text-4xl p-8 text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 mb-2 whitespace-nowrap">
              Change role to
            </p>

            {/* Logo */}
            <img
              src={logo}
              alt="Logo"
              className="w-[17vh] h-[17vh] mb-6 mx-auto"
            />
          </div>

          {/* Contenedor de los botones */}
          <div className="flex flex-col items-center space-y-4">
            {/* Botón Join as Author */}
            <button
              onClick={handleJoinAsAuthor}
              className="md:w-[40vw] md:h-[12vh]  border border-pink-500 text-pink-500 rounded-2xl xl:text-3xl md:text-sm hover:bg-pink-400 transition-colors bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-transparent bg-clip-text relative flex justify-between items-center px-8"
            >
              {/* Contenedor de las imágenes */}
              <div className="relative flex items-center space-x-2">
                {/* Círculo superior (imagen de persona 1) */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white absolute top-0 left-1/2 transform -translate-x-1/2">
                  <img src={peopleImages1[1]} alt="Person 1" className="w-full h-full object-cover" />
                </div>

                {/* Círculo inferior izquierdo (persona 2) */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                  <img src={peopleImages1[2]} alt="Person 2" className="w-full h-full object-cover" />
                </div>

                {/* Círculo inferior derecho (persona 3) */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white ml-8">
                  <img src={peopleImages1[0]} alt="Person 3" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Texto a la derecha de las imágenes */}
              <div className="ml-8 text-left">
                <p className=" font-bold md:text-sm sm:text-sm ">Join as an Author!</p>
                <p className="text-sm ">I’m a company and I want to publish my comics</p>
              </div>
            </button>

            {/* Botón Join as Company */}
            <button
              onClick={handleJoinAsCompany}
              className="md:w-[40vw] md:h-[12vh] border border-pink-500 text-pink-500 rounded-2xl  hover:bg-pink-400 transition-colors bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-transparent bg-clip-text relative flex justify-between items-center px-8"
            >
              {/* Contenedor de las imágenes */}
              <div className="relative flex items-center space-x-2">
                {/* Círculo superior (imagen de persona 1) */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white absolute top-0 left-1/2 transform -translate-x-1/2">
                  <img src={peopleImages[1]} alt="Person 1" className="w-full h-full object-cover" />
                </div>

                {/* Círculo inferior izquierdo (persona 2) */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                  <img src={peopleImages[0]} alt="Person 2" className="w-full h-full object-cover" />
                </div>

                {/* Círculo inferior derecho (persona 3) */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white ml-6">
                  <img src={peopleImages[2]} alt="Person 3" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Texto a la derecha de las imágenes */}
              <div className="ml-8 text-left">
                <p className=" font-bold md:text-sm sm:text-sm">Join as Company!</p>
                <p className="text-sm ">I’m a company and I want to publish my comics</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor derecho (imagen de fondo) */}
      <div className="relative justify-center items-center w-2/3 h-full hidden md:block">
        {/* Capa oscura sobre la imagen */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        <img
          src={defaultImage}
          alt="Default"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default NewRole;