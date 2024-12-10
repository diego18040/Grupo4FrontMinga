import { MessageSquareMore, MessageSquare } from "lucide-react";
import { useParams, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChaptersByMangaId } from "../store/actions/chaptersActions";
import { fetchMangas } from "../store/actions/CardActions";
import { addFavorite } from "../store/actions/FavActions";
import { createSelector } from "@reduxjs/toolkit";


export default function MangasId() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("manga");
  const dispatch = useDispatch();

  const selectMangaById = createSelector(
    [(state) => state.cards?.mangas || [], (_, id) => id],
    (mangas, id) => mangas.find((m) => m._id === id)
  );
  const manga = useSelector((state) => selectMangaById(state, id));
  const { chapterList, status: chaptersStatus, error: chaptersError } = useSelector((state) => state.chapters);
  const { loading: mangaStatus, error: mangaError } = useSelector((state) => state.cards || {});
  const favorites = useSelector(state => state.favorites.favorites);

  useEffect(() => {
    if (id) {
      dispatch(fetchMangas());
      dispatch(fetchChaptersByMangaId(id));
    }
  }, [dispatch, id]);

  const handleAddFavorite = () => {
    if (manga && !favorites.some(fav => fav._id === manga._id)) {
      dispatch(addFavorite(manga));
    } else {
      alert('This manga is already in your favorites!');
    }
  };

  if (mangaStatus === "loading" || chaptersStatus === "loading") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (mangaStatus === "failed" || chaptersStatus === "failed") {
    return <div className="text-center text-red-500">Error: {mangaError || chaptersError}</div>;
  }

  return (
    <div className="max-w-full mx-auto mt-16">

      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
        {/* Left section */}
        <div className="md:w-1/2 lg:w-2/5">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-[400px] md:h-[500px]">
              <img
                src={manga?.cover_photo}
                alt={manga?.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">{manga?.title}</h1>

              <div className="flex justify-center gap-6 mb-6">
                <button 
                  onClick={handleAddFavorite}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  👍
                </button>
                <button className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  👎
                </button>
                <button className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  😮
                </button>
                <button className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  😍
                </button>
              </div>

              <div className="bg-white rounded-bl-2xl rounded-br-2xl p-4 shadow-lg">
                <div className="flex justify-between items-center divide-x divide-black">
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold">{manga?.rating || 4}/5</div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold">
                      {Array.isArray(chapterList) ? chapterList.length : 0}
                    </div>
                    <div className="text-xs text-gray-400">Chapters</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold">{manga?.category || "English"}</div>
                    <div className="text-xs text-gray-400">Category</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="md:w-1/2 lg:w-3/5 space-y-6 lg:mt-10">
          {/* Tabs */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setActiveTab("manga")}
              className={`px-8 py-3 rounded-full transition-colors ${
                activeTab === "manga" 
                  ? "bg-pink-500 text-white" 
                  : "bg-gray-200 hover:bg-pink-400"
              }`}
            >
              Manga
            </button>
            <button
              onClick={() => setActiveTab("chapters")}
              className={`px-8 py-3 rounded-full transition-colors ${
                activeTab === "chapters" 
                  ? "bg-pink-500 text-white" 
                  : "bg-gray-200 hover:bg-pink-400"
              }`}
            >
              Chapters
            </button>
          </div>

          {/* Content */}
          {activeTab === "manga" ? (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <p className="text-gray-600 leading-relaxed">
                {manga?.description || "No description available"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Chapters</h2>
              <div className="space-y-4">
                {Array.isArray(chapterList) &&
                  chapterList.map((chapter) => (
                    <div
                      key={chapter._id}
                      className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4"
                    >
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <img
                          src={chapter.pages[0] || manga?.cover_photo}
                          alt={`Chapter ${chapter.title}`}
                          className="w-24 h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded shadow-md transition-transform hover:scale-105"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-base md:text-lg lg:text-xl">
                            Chapter #{chapter.order}
                          </p>
                          <p className="text-sm md:text-base text-gray-500">
                            {chapter.pages?.length || 0} pages
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                        <NavLink
                          to={`/comments/${chapter._id}`}
                          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          <MessageSquare className="w-5 h-5" />
                          <span className="hidden md:inline">Comments</span>
                        </NavLink>
                        <NavLink
                          to={`/readmanga/${chapter._id}`}
                          className="px-8 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                        >
                          Read
                        </NavLink>
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