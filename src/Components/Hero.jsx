

import React from "react";
import { useLocation } from "react-router-dom";  
import '../App.css'; 

const Hero = ({ title, backgroundImage }) => {
  const location = useLocation();  

  // Si estamos en la página de perfil, el componente no se muestra en pantallas móviles.
  if (location.pathname === "/profile") {
    return (
      <div className="relative h-screen z-9 bg-gray-100 sm:block hidden">
        <div className="relative h-2/3">
          
          {/* Capa oscura */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-9"></div>
          
          {/* Imagen de fondo */}
          <img
            src={backgroundImage}
            alt="Imagen de fondo"
            className="h-full w-full object-cover"
          />
          
          {/* Título */}
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-[64px] font-bold text-white text-center z-20">
            {title}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen z-9 bg-gray-100">
      <div className="relative h-2/3">
        
        {/* Capa oscura */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-9"></div>
        
        {/* Imagen de fondo */}
        <img
          src={backgroundImage}
          alt="Imagen de fondo"
          className="h-full w-full object-cover"
        />
        
        {/* Título */}
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-[64px] font-bold text-white text-center z-20">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Hero;
