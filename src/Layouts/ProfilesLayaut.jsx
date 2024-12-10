
import React from "react";
import Header from "../Components/Header";  // Asegúrate de que el path sea correcto
import { Outlet } from "react-router-dom";  // Este se usa para renderizar las rutas hijas

const ProfileLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* El Header debe contener algún contenido dentro */}
      <Header className="bg-blue-600 text-white p-4 text-center">
        {/* Aquí puedes poner algún contenido dentro de Header si es necesario */}
        <h1>Mi Perfil</h1>
      </Header>
      <main className="container mx-auto p-4">
        <Outlet /> {/* Aquí se renderizarán los componentes hijos */}
      </main>
    </div>
  );
};

export default ProfileLayout;
