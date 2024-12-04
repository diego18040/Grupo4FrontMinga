import React, { useState } from 'react';
import seinen from '../assets/seinen.png'
import seinen1 from '../assets/seinen1.jpg'
import kodomo from '../assets/kodomo.png'
import kodomo1 from '../assets/kodomo1.jpg'
import shojo from '../assets/shojo.png'
import shojo1 from '../assets/shojo1.jpg'



const mangas = [
    {
        portadaImage: 'https://s3-alpha-sig.figma.com/img/511b/7568/ef59acdd63429092bed163f4a51dbf16?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hDzv~2pMQFEWP7Zi~ned1RdI8nzVFHM2OKsmj53bHb0GUYoxpaXpEB~5h9gtORdfdVzR6utWscaZrpWJ7Whrhs8cD1jo0Bid2BgUIbKn4139nUmb4gzyjxv3K~XGiZ20JCt7KUR31ermhGvKfj82IBQJEXrFzjPc54wF0vD~rQtGpn7RqWgQaoDld8sfCR2ncSLEdcLLG2RP~oh92xQ6wr4DLl1vXexpY2iuL5eFH0GeylVadJ9ed5WtRtMbGFRA5nmC2y2tHpTDxGYjCTaebXh41zwU4KDqCOFzrZWSWn6uR469aMZC4R6dKCY~c5jCNIHuPLilUzn5bzbZfuR~yA__',
        fadeImage: 'https://s3-alpha-sig.figma.com/img/74c1/1422/523fb73c0843c17b79f58c0508ca9f7a?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oUkFdHoi5gV4bZGLJGwRYums6sPbdtkK5UQQkEiIGD68OegMtjeXxwZGHb7uWtgTBMWyQA9px-3SgK7G2CKvzyYz5mF8mJHFcYiJpWsv0URMaT~5ryyYG0GQuODyDMrbenpYzetNiYwrI0Q8AgSgp7vLs5kldZAQBHEHmxIAOIT5mm7N3JE8I-J3HfKsgZXcldcgFZi~wDEMhhOvpW0OinHThHdnQGAAIYFmYm1JufdP5g4699oM1dU-dgfib8XheTa3JKescJZvD6Gg1TuPqpE6xUpoTF8XgvpKAoPPjrepsn6YWfxLUuawwaU4GHVpiEsSO4N~Q8iccS3uU2IzPA__',
        mangaName: 'Shonen',
        description: 'Is the manga that is aimed at adolescent boys. They are series with large amounts of action, in which humorous situations often occur. The camaraderie between members of a collective or a combat team stands out.',
    },
    {
        portadaImage: seinen1,
        fadeImage: seinen,
        mangaName: "Seinen",
        description: 'Is the manga aimed at adult men. These stories tend to have more complex plots, deal with more serious issues, and often contain more graphic content. They can range from slice-of-life stories to intense thrillers and action-packed adventures.',
    },
    {
        portadaImage: kodomo1,
        fadeImage: kodomo,
        mangaName: 'Kodomo',
        description: 'Is the manga aimed at young children. These stories are simple, fun, and designed to be both entertaining and educational. They often teach lessons about friendship, honesty, and other important values.',
    },
    {
        portadaImage: shojo1,
        fadeImage: shojo,
        mangaName: 'Shojo',
        description: 'Is the manga targeted at adolescent girls. These stories often revolve around romance, personal relationships, and emotional development. They frequently explore themes of love, heartbreak, and self-discovery.',
    },
];


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
