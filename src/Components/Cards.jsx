import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMangas } from '../store/actions/CardActions.js';


export default function Cards() {
  const dispatch = useDispatch();
  const { loading, mangas, error } = useSelector(state => state.cards);
  const selectedTitle = useSelector(state => state.cards.selectedTitle);
  const selectedGenre = useSelector(state => state.cards.selectedGenre);

  useEffect(() => {
    dispatch(fetchMangas(selectedTitle, selectedGenre));
  }, [selectedTitle, selectedGenre, dispatch]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!mangas || mangas.length === 0) return <p>No mangas found.</p>;

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

  return (
    <div>
      <div>

      </div>

      <div className="container mx-auto bg-white rounded-xl lg:p-20 xl:p-40 md:p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {mangas.map(manga => (
            <div key={manga._id} className="m-2 flex rounded-xl border">
              <div className={`w-2 h-40 rounded-t-xl ${genreColors[manga.category_id.name.toLowerCase()] || 'bg-gray-500'}`}></div>
              <div className="grid place-items-center w-[50%]">
                <div className='w-[100%] p-5'>
                  <h2 className="text-xl font-bold">{manga.title}</h2>
                  <p className={`${textColorClasses[manga.category_id.name.toLowerCase()]} text-left font-bold text-xl`}>
                    {manga.category_id.name}
                  </p>
                </div>
                <div className='w-[80%] flex'>
                  <button className="mt-4 bg-teal-200 text-white text-teal-400 font-bold py-2 px-4 rounded-full hover:bg-teal-300 w-24 h-10">Read</button>
                </div>
              </div>
              <div className="w-[60%] flex justify-right overflow-hidde">
                <img
                  src={manga.cover_photo}
                  alt={manga.title}
                  className="w-full h-[200px] object-cover rounded-l-[50%] rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
