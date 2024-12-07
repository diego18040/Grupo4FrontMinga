/* <<<<<<< HEAD
import '../App.css'; 
import React from "react";

const Hero = ({ title, backgroundImage }) => {
  return (
    <div className="relative h-screen bg-gray-100 hidden md:block">
      <div className="relative h-2/3">
       
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        
        <img
          src={backgroundImage}
          alt="Imagen de fondo"
          className="h-full w-full object-cover"
        />
        
        <h1 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white text-center z-20">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Hero; */
import '../App.css'; 
import React from "react";

const Hero = ({ title, backgroundImage }) => {
  return (
    <div className="relative h-screen bg-gray-100">
    
      <div className="relative h-2/3">
      
        <img
          src={backgroundImage}
          alt="Imagen de fondo"
          className="h-full w-full object-cover"
        />

       
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

    
        <h1 className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white text-center">
          {title}
        </h1>
      </div>

     
 
    </div>
  );
};

export default Hero;
