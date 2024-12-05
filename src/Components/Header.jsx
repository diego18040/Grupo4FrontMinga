import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Funciones de navegación
  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // Cierra el menú después de navegar
  };

  return (
    <header className="bg-transparent p-4 fixed w-full top-0 left-0 z-50">
      <nav className="flex items-center justify-between relative">
        <div
          className="flex flex-col items-center cursor-pointer space-y-1"
          onClick={toggleMenu}
        >
          <div className="w-8 h-0.5 bg-pink-400"></div>
          <div className="w-8 h-0.5 bg-pink-400"></div>
          <div className="w-8 h-0.5 bg-pink-400"></div>
          <div className="w-8 h-0.5 bg-pink-400"></div>
        </div>

        <div>
          <img
            src="https://media.discordapp.net/attachments/1283412538482233413/1312193501609459752/image.png?ex=674b9aee&is=674a496e&hm=2c299bc96ee51404584ccce835e2730ba871ed0fc358a8e9ddd76d4065c80ff8&=&format=webp&quality=lossless"
            alt="Logo"
            className="h-14"
          />
        </div>

        <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white shadow-lg transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-200"
            onClick={toggleMenu}
          >
            ✕
          </button>
          <ul className="space-y-4 p-4 text-xs mt-16">
            <li>
              <button 
                onClick={() => handleNavigate('/')}
                className="w-full text-center py-2 px-4 bg-white text-pink-400 rounded hover:bg-gray-100 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigate('/signup')}
                className="w-full text-center py-2 px-4 bg-white text-pink-400 rounded hover:bg-gray-100 transition-colors"
              >
                Register
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigate('/signin')}
                className="w-full text-center py-2 px-4 bg-white text-pink-400 rounded hover:bg-gray-100 transition-colors"
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;