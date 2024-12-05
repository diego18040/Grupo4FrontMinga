import React from "react";
import heroImage from "../../src/assets/homecta.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 w-full"></div>

      {/* Contenido */}
      <div className="relative flex flex-col w-full h-full text-white">
        <div className="md:hidden flex flex-col justify-center items-center h-full px-4">
          <h1 className="text-5xl font-bold mb-4 text-center w-96">
            Live the emotion of the manga
          </h1>
          <p className="text-lg mb-4 text-center">
            Find the perfect manga for you
          </p>
          <p className="text-sm mb-6 flex items-center gap-2">
            #MingaForever <span className="text-red-500">❤</span>
          </p>
          <button
            onClick={handleSignIn}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-full transition-colors"
          >
            Sign In!
          </button>
        </div>
        <div className="hidden md:flex flex-col justify-center h-full pl-32 max-w-3xl">
          <h1 className="text-6xl font-bold mb-6">
            Live the emotion of the manga
          </h1>
          <p className="text-xl mb-3">
            Find the perfect manga for you
          </p>
          <p className="text-sm mb-6 flex items-center gap-2">
            #MingaForever <span className="text-red-500">❤</span>
          </p>
          <button
            onClick={handleSignIn}
            className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-3 rounded-lg w-fit transition-colors"
          >
            Sign In!
          </button>
        </div>
      </div>
    </div>
  );
}