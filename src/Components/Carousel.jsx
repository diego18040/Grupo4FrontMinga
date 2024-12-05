import React, { useState } from 'react';


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mangas.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mangas.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentManga = mangas[currentIndex];

  return (
    <div className="w-[90%] mx-auto">
      <div className="hidden md:flex w-full h-[30vh] md:h-[25vh] bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 items-center rounded-xl">
        <button onClick={handlePrev} className="bg-white p-2 rounded-full mx-4">←</button>
        <div className="flex-1 flex">
          <div className="flex-1 justify-around flex overflow-visible">
            <div></div>
            <img
              src={currentManga.fadeImage}
              alt="fade"
              className="w-[50%] ml-[-150px] h-[100%] object-contain mt-[-15px]"
            />
            <img
              src={currentManga.portadaImage}
              alt="portada"
              className="w-[30%] ml-[-90px] h-[90%] object-contain mt-[-50px] rounded-xl"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center p-4">
            <div className="w-[80%]">
              <h2 className="text-white font-montserrat text-2xl font-medium leading-6 text-left">
                {currentManga.mangaName}
              </h2>
              <p className="text-white font-roboto text-base font-normal leading-4 text-left">
                {currentManga.description}
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
