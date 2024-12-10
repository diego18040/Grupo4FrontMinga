import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, X, ArrowDownWideNarrow, Rows } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapter } from "../store/actions/ReadMangas";
import { selectMangaState } from "../store/reducers/ReadReducer";
import Comments from "./Coments";

export default function ReadManga() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [showComments, setShowComments] = useState(false);
  const [readingMode, setReadingMode] = useState('normal');
  const dispatch = useDispatch();
  const { chapterData: mangaData, loading, error } = useSelector(selectMangaState);

  useEffect(() => {
    if (id) {
      dispatch(fetchChapter(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <div className="text-center mt-10">Cargando datos del capítulo...</div>;
  }

  if (error || !mangaData) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error al cargar los datos. Intenta nuevamente.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-16 pb-20 relative">
        {readingMode === 'normal' ? (
          <>
            {/* Vista Mobile - Modo Normal */}
            <div className="md:hidden relative">
              {mangaData && mangaData.pages && (
                <>
                  <img
                    src={mangaData.pages[currentPage - 1]}
                    alt={`Página ${currentPage}`}
                    className="w-full h-auto"
                  />

                  {/* Flechas laterales móvil */}
                  <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white disabled:opacity-0"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(mangaData.pages.length, prev + 1))}
                      disabled={currentPage === mangaData.pages.length}
                      className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white disabled:opacity-0"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Vista Desktop - Modo Normal */}
            <div className="hidden md:grid grid-cols-[auto_1fr_auto] max-w-[90vw] xl:max-w-7xl mx-auto gap-4 px-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 2))}
                className="self-center p-2 rounded-full hover:bg-gray-200"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div className="grid grid-cols-2 gap-2 w-full">
                {mangaData.pages.slice(currentPage - 1, currentPage + 1).map((url, index) => (
                  <div key={index} className="aspect-[2/3] relative flex items-center justify-center bg-gray-900">
                    <img
                      src={url}
                      alt={`Página ${currentPage + index}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(mangaData.pages.length, prev + 2))}
                className="self-center p-2 rounded-full hover:bg-gray-200"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </>
        ) : (
          // Modo Scroll para ambas vistas
          <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4">
            {mangaData && mangaData.pages && mangaData.pages.map((url, index) => (
              <div key={index} className="mb-2 bg-gray-900 flex items-center justify-center">
                <img
                  src={url}
                  alt={`Página ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        )}

        {/* Botón de comentarios flotante - Solo desktop */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`fixed right-4 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-all z-[9999] ${readingMode === 'scroll'
              ? 'block bottom-4' // Visible en ambos (móvil y desktop) en modo scroll
              : 'hidden md:flex bottom-24 md:bottom-20' // Solo desktop en modo normal
            }`}
        >
          <MessageSquare className="w-6 h-6" />
        </button>

        {/* Panel de comentarios */}
        <div
          className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[9998] ${showComments ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">Comentarios</h2>
            <button
              onClick={() => setShowComments(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="h-full overflow-y-auto pb-20">
            <Comments chapterId={id} />
          </div>
        </div>
      </div>

      {/* Footer - Solo desktop */}
      {readingMode === 'normal' && (
        <footer className="fixed bottom-0 w-full bg-white/90 backdrop-blur-sm shadow-up z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            {/* Vista Mobile - Solo selector y comentarios */}
            <div className="md:hidden flex justify-center items-center gap-2">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="px-3 py-1 rounded-lg border border-gray-200 bg-white/80"
              >
                {Array.from({ length: mangaData.pages.length }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowComments(!showComments)}
                className="p-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>

            {/* Vista Desktop - Navegación moderna */}
            <div className="hidden md:flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-all transform hover:scale-105 disabled:hover:scale-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-medium">Previous</span>
                </button>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(mangaData.pages.length, prev + 1))}
                  disabled={currentPage === mangaData.pages.length}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-all transform hover:scale-105 disabled:hover:scale-100"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Indicador de página actual */}
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
                  <input
                    type="number"
                    min={1}
                    max={mangaData.pages.length}
                    value={currentPage}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= mangaData.pages.length) {
                        setCurrentPage(value);
                      }
                    }}
                    className="w-12 bg-transparent text-center font-medium focus:outline-none"
                  />
                  <span className="text-gray-500">
                    / {mangaData.pages.length}
                  </span>
                </div>

                {/* Mini navegación de páginas */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const pageNum = currentPage - 2 + i;
                    if (pageNum < 1 || pageNum > mangaData.pages.length) return null;
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${currentPage === pageNum
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Botón flotante para cambiar modo de lectura */}
      <button
        onClick={() => setReadingMode(readingMode === 'normal' ? 'scroll' : 'normal')}
        className="fixed left-4 bottom-20 md:bottom-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 z-[9999]"
      >
        {readingMode === 'normal' ? (
          <ArrowDownWideNarrow className="w-6 h-6" />
        ) : (
          <Rows className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}