import React from "react";
import heroImage from "../../src/assets/homecta.jpg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  // Obtener el estado de forma más segura
  const authStore = useSelector(state => state.authStore);
  const token = authStore?.token;
  const isAuthenticated = Boolean(token);

  // Props del botón basados en autenticación
  const buttonProps = isAuthenticated 
    ? { to: "/mangas", text: "Explore" }
    : { to: "/signin", text: "Sign In" };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-bottom md:bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: "50% 10%",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative w-full h-full text-white">
        {/* Mobile */}
        <div className="md:hidden flex flex-col justify-center items-center h-full px-4">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Live the emotion of the manga
          </h1>
          <p className="text-lg mb-2 text-center">
            Find the perfect manga for you
          </p>
          <p className="text-sm mb-6 flex items-center gap-2">
            #MingaForever <span className="text-red-500">❤</span>
          </p>
          <NavLink
            to={buttonProps.to}
            className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-3 rounded-lg transition-colors"
          >
            {buttonProps.text}
          </NavLink>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex flex-col items-center justify-center h-full">
          <h1 className="text-6xl font-bold mb-6 text-center max-w-7xl">
            Live the emotion of the manga
          </h1>
          <div className="flex flex-col items-start pr-[calc(53%-24rem)]">
            <p className="text-xl mb-3">Find the perfect manga for you</p>
            <p className="text-sm mb-6 flex items-center gap-2">
              #MingaForever <span className="text-red-500">❤</span>
            </p>
            <NavLink
              to={buttonProps.to}
              className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-3 rounded-lg transition-colors"
            >
              {buttonProps.text}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}