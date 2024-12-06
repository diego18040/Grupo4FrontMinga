import React from "react";
import SignInForm from "../Components/SignInForm";
import backgroundImg from "../assets/signin.jpg";

const SignIn = () => {
  const handleFormSubmit = (formData) => {
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="h-screen flex">
      {/* Imagen en la mitad izquierda */}
      <div className="hidden lg:block w-1/2">
        <img
          src={backgroundImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenedor del formulario en la mitad derecha */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-50">
        <SignInForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default SignIn;
