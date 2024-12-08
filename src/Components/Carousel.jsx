import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/categories/all');
        setCategories(response.data.response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000); // 10 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [categories, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (categories.length === 0) return <p>Loading...</p>;

  const currentCategory = categories[currentIndex];

  return (
    <div className="w-[90%] mx-auto ">
      <div className="hidden md:flex w-full h-[30vh] md:h-[25vh] bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 items-center rounded-xl">
        <button onClick={handlePrev} className="bg-white p-2 rounded-full mx-4">←</button>
       
        <div className=" flex-1 flex">
          <div className=" flex-1 justify-around flex ">
            
            <div className=' w-[100%] h-[100%]  '>
              <img
                src={currentCategory.character_photo}
                alt="character"
                className="w-[70%] h-[100%] object-contain "
              />
            </div>
            <div className='  w-[40%] h-[100%] '>
              <img
                src={currentCategory.cover_photo}
                alt="cover"
                className=" w-[100%] h-[100%] object-contain mt-[-50px] rounded-xl "
              />
            </div>
          </div>


          
          <div className="flex-1 flex flex-col justify-center p-4 ">
            <div className="w-[80%]">
              <h2 className="text-white font-montserrat text-2xl font-medium leading-6 text-left">
                {currentCategory.name}
              </h2>
              <p className="text-white font-roboto text-base font-normal leading-4 text-left">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </div>
        <button onClick={handleNext} className="bg-white p-2 rounded-full mx-4">→</button>
      </div>
    </div>
  );
};

export default Carousel;