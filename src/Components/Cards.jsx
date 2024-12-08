import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMangas } from '../store/actions/CardActions.js';
import Checkboxs from './Checkboxs';
import '../../src/App.css';
import { NavLink, useNavigate } from 'react-router-dom'; // Importa useNavigate

export default function Cards() {
  const dispatch = useDispatch();
  const { loading, mangas, error } = useSelector(state => state.cards);
  const selectedTitle = useSelector(state => state.cards.selectedTitle);
  const selectedGenre = useSelector(state => state.cards.selectedGenre);

  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    dispatch(fetchMangas(selectedTitle, selectedGenre));
  }, [selectedTitle, selectedGenre, dispatch]);

  const genreColors = {
    shonen: 'bg-rose-300',
    seinen: 'bg-orange-400',
    shojo: 'bg-teal-400',
    kodomo: 'bg-purple-400'
  };

  const textColorClasses = {
    shonen: 'text-rose-300',
    seinen: 'text-orange-400',
    shojo: 'text-teal-400',
    kodomo: 'text-purple-400'
  };

  const handleCardClick = (id) => {
    if (window.innerWidth <= 768) { // Detecta dispositivos móviles
      navigate(`/mangas/${id}`);
    }
  };

  return (
    <div>
      <Checkboxs />

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="spinner w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full"></div>
        </div>
      )}
      {error && <p>{"No mangas Found."}</p>}
      {!loading && !error && mangas.length === 0 && <p>No Mangas Found.</p>}

      <div className="container mx-auto bg-white rounded-xl lg:p-20 xl:p-40 md:p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {mangas.map(manga => (
            <div
              key={manga._id}
              className="m-2 flex rounded-xl border shadow-lg relative transition-transform duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(manga._id)}
            >
              <div className={`w-2 h-40 rounded-t-xl ${genreColors[manga.category_id.name.toLowerCase()] || 'bg-gray-500'}`}></div>
              <div className="grid place-items-center w-[50%]">
                <div className='w-[100%] p-5'>
                  <h2 className="text-xl font-bold">{manga.title}</h2>
                  <p className={`${textColorClasses[manga.category_id.name.toLowerCase()]} text-left font-bold text-xl`}>
                    {manga.category_id.name}
                  </p>
                </div>
                <div className='w-[80%] flex'>
                  <NavLink to={`/mangas/${manga._id}`} className="mt-4 bg-teal-200 text-teal-500 text-teal-400 font-bold py-2 px-4  text-center rounded-full hover:bg-teal-300 w-24 h-10 flex items-center justify-center md:block hidden">
                    Read
                  </NavLink>
                </div>
              </div>
              <div className="w-[60%] flex justify-right overflow-hidden">
                <img
                  src={manga.cover_photo}
                  alt={manga.title}
                  className="w-full h-[200px] object-cover rounded-l-[50%] rounded-xl"
                />
              </div>
              {/* Efecto de hojas */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="leaf-fall absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full opacity-75"
                    style={{
                      animationDelay: `${Math.random() * 5}s`,
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${Math.random() * 5 + 5}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
