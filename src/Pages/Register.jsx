import React from "react";
import LoginForm from "../Components/RegisterForm";
import backgroundImg from "../assets/register.jpg";


const Register = () => {
  const handleFormSubmit = () => {
    
  };

  return (
    <div className="h-screen flex">
      {/* Contenedor del formulario en la mitad derecha */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-50">
        <LoginForm onSubmit={handleFormSubmit} />
      </div>
      <div className="hidden lg:block w-1/2">
        <img
          src={backgroundImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
