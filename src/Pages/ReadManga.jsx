import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";

export default function ReadManga() {
  const { id } = useParams();  // Obtener id de la URL
  const [currentPage, setCurrentPage] = useState(1);
  const [mangaData, setMangaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/chapters/id/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del capítulo");
        }
    
        const data = await response.json();
        console.log("Datos recibidos:", data); // debug
        
         // accedemos a la propiedad response de la respuesta JSON
    if (data.response && data.response[0]) {
      setMangaData(data.response[0]);
      setLoading(false);
    }
  } catch (error) {
    console.error("Error:", error);
    setError(true);
    setLoading(false);
  }
    };

    if (id) {
      fetchChapterData();
    }
  }, [id]);

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
      <div className="pt-16 pb-20">
        {/* Vista Mobile */}
        <div className="md:hidden">
  {mangaData && mangaData.pages && (
    <img
      src={mangaData.pages[currentPage - 1]}
      alt={`Página ${currentPage}`}
      className="w-full h-auto"
    />
  )}
</div>

        {/* Vista Desktop */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto] max-w-6xl mx-auto gap-4 px-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 2))}
            className="self-center p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="grid grid-cols-2 gap-4">
            {mangaData.pages.slice(currentPage - 1, currentPage + 1).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Página ${currentPage + index}`}
                className="w-full h-auto shadow-lg"
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(mangaData.pages.length, prev + 2)
              )
            }
            className="self-center p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-white shadow-up z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>

          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="px-3 py-1 rounded border"
          >
            {Array.from({ length: mangaData.pages.length }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Page {i + 1}
              </option>
            ))}
          </select>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(mangaData.pages.length, prev + 1)
              )
            }
            disabled={currentPage === mangaData.pages.length}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
