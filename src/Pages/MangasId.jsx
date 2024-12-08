
import { MessageSquareMore, MessageSquare } from "lucide-react";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchChaptersByMangaId } from "../../store/actions/chaptersActions";


export default function MangasId() {
  const { id } = useParams();  // id de la url
  const [activeTab, setActiveTab] = useState("manga");
  const dispatch = useDispatch();
  //  estado de los capítulos del store
  const { chapterList, status, error } = useSelector((state) => state.chapters);

  const mangaData = {
    title: "Naruto: And That's Why You're Disqualified!! #8",
    coverImage: "https://www.gratistodo.com/wp-content/uploads/2016/09/Naruto-Wallpapers-11.jpg",
    rating: 4.5,
    chapters: 265,
    language: "Eng",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
  };

  // id desde la ruta
  useEffect(() => {
    if (id) {
      dispatch(fetchChaptersByMangaId(id));
    }
  }, [dispatch, id]);

  return (
    <div className="max-w-full mx-auto mt-16">
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
        {/* Sección izquierda - Información del manga */}
        <div className="md:w-1/2 lg:w-2/5">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-[400px] md:h-[500px]">
              <img
                src={mangaData.coverImage}
                alt={mangaData.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">
                {mangaData.title}
              </h1>

              {/* Botones de reacción */}
              <div className="flex justify-center gap-6 mb-6">
                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200">
                  👍
                </button>
                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200">
                  👎
                </button>
                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200">
                  😮
                </button>
                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200">
                  😍
                </button>
              </div>

              {/* Estadísticas */}
              <div className="bg-white rounded-bl-2xl rounded-br-2xl p-4 shadow-lg">
                <div className="flex justify-between items-center divide-x divide-black">
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold">{mangaData.rating}/5</div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold">
                      {status === 'succeeded' && Array.isArray(chapterList) ? chapterList.length : 0}
                    </div>
                    <div className="text-xs text-gray-400">Chapters</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold">{mangaData.language}</div>
                    <div className="text-xs text-gray-400">Language</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección derecha - Tabs y contenido */}
        <div className="md:w-1/2 lg:w-3/5 space-y-6 lg:mt-10">
          {/* Tabs para desktop */}
          <div className="hidden md:flex gap-4 justify-center">
            <button
              className={`px-8 py-3 rounded-full ${activeTab === "manga" ? "bg-pink-500 text-white" : "bg-gray-200"
                } hover:bg-pink-600`}
              onClick={() => setActiveTab("manga")}
            >
              Manga
            </button>
            <button
              className={`px-8 py-3 rounded-full ${activeTab === "chapters" ? "bg-pink-500 text-white" : "bg-gray-200"
                } hover:bg-gray-300`}
              onClick={() => setActiveTab("chapters")}
            >
              Chapters
            </button>
          </div>

          {/* Tabs para mobile */}
          <div className="flex md:hidden gap-4 justify-center">
            <button
              className={`px-8 py-3 rounded-full ${activeTab === "manga" ? "bg-pink-500 text-white" : "bg-gray-200"
                } hover:bg-pink-600`}
              onClick={() => setActiveTab("manga")}
            >
              Manga
            </button>
            <button
              className={`px-8 py-3 rounded-full ${activeTab === "chapters" ? "bg-pink-500 text-white" : "bg-gray-200"
                } hover:bg-gray-300`}
              onClick={() => setActiveTab("chapters")}
            >
              Chapters
            </button>
          </div>

          {/* Contenido según el tab activo */}
          {activeTab === "manga" ? (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <p className="text-gray-600 leading-relaxed">
                {mangaData.description}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Chapters</h2>

              {/* Estado de carga */}
              {status === 'loading' && <p>Loading chapters...</p>}
              {status === 'failed' && <p>Error: {error}</p>}

              {/* Lista de capítulos */}
              <div className="space-y-4">
                {status === 'succeeded' && Array.isArray(chapterList) && chapterList.map((chapter) => (
                  <div
                    key={chapter._id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={chapter.cover_photo}
                        alt={`Chapter ${chapter.title}`}
                        className="w-24 h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded shadow-md transition-transform hover:scale-105"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-base md:text-lg lg:text-xl">
                          Chapter #{chapter.title}
                        </p>
                        <p className="text-sm md:text-base text-gray-500">
                          {chapter.pages?.length || 0} pages {/* cantidad de páginas */}
                        </p>
                      </div>
                      <div className="md:hidden">
                        <MessageSquareMore className="w-5 h-5 text-black" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
                        <MessageSquare className="w-5 h-5" />
                        <span>Comments</span>
                      </button>
                      <button className="px-8 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600">
                        Read
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}