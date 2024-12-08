import React, { useState } from "react";
import { ChevronLeft, ChevronRight} from "lucide-react";


export default function ReadManga() {
  const [currentPage, setCurrentPage] = useState(1);

  // Datos de ejemplo del manga
  const mangaData = {
    title: "Alice in Borderland",
    chapter: 1,
    totalPages: 42,
    pages: [
      "https://upload.wikimedia.org/wikipedia/en/5/5d/Alice_in_Borderland_cover.jpeg",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Contenedor principal */}
      <div className="pt-16 pb-20">
        {/* vista mobile */}
        <div className="md:hidden">
          <img
            src="/ejemplo-manga-page.jpg"
            alt={`Page ${currentPage}`}
            className="w-full h-auto"
          />
        </div>

        {/* vista desktop */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto] max-w-6xl mx-auto gap-4 px-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 2))}
            className="self-center p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/5/5d/Alice_in_Borderland_cover.jpeg"
              alt={`Page ${currentPage}`}
              className="w-full h-auto shadow-lg"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/en/5/5d/Alice_in_Borderland_cover.jpeg"
              alt={`Page ${currentPage + 1}`}
              className="w-full h-auto shadow-lg"
            />
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(mangaData.totalPages, prev + 2))
            }
            className="self-center p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* footer */}
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
            {[...Array(mangaData.totalPages)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Page {i + 1}
              </option>
            ))}
          </select>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(mangaData.totalPages, prev + 1))
            }
            disabled={currentPage === mangaData.totalPages}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
