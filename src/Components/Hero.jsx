import '../App.css'; 
import React from "react";

const Hero = ({ title, backgroundImage }) => {
  return (
    <div className="relative h-screen bg-gray-100 hidden md:block">
   
      <div className="relative h-2/3">
        <img
          src={backgroundImage}
          alt="Imagen de fondo"
          className="h-full w-full object-cover"
        />
        
        <h1 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white text-center">
          {title}
        </h1>
      </div>

    
    </div>
  );
};

export default Hero;
