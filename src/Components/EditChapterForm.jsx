import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditChapterForm = () => {
  const { id } = useParams();
  const [mangaName, setMangaName] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [dataToEdit, setDataToEdit] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchMangaAndChapters = async () => {
      try {
        const token = localStorage.getItem('token');
        const mangaResponse = await axios.get(`http://localhost:8080/api/mangas/id/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const manga = mangaResponse.data.response[0];
        setMangaName(manga.title);
        setImageUrl(manga.cover_photo);

        const chaptersResponse = await axios.get(`http://localhost:8080/api/chapters/manga/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setChapters(chaptersResponse.data.response);
      } catch (error) {
        console.error("Error fetching manga or chapters data:", error);
      }
    };

    fetchMangaAndChapters();
  }, [id]);
  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title: mangaName,
        pages: [dataToEdit],
      };

      console.log("Payload:", payload);

      const response = await axios.put(`http://localhost:8080/api/chapters/update/${selectedChapter}`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log("Response:", response.data);

      alert("Chapter updated successfully!");
    } catch (error) {
      console.error("Error updating chapter:", error);
      alert("Failed to update.");
    }
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
    const chapter = chapters.find(ch => ch._id === e.target.value);
    setSelectedPage(chapter.pages[0]);
    setDataToEdit(chapter.pages[0]);
  };

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);
    setDataToEdit(e.target.value);
  };

  return (
    <div className="container w-[88%] h-screen  grid grid-cols-1 lg:grid-cols-2 ">
      <div className=" border border-blue-300 ">
        <div className=" border w-full flex justify-center items-center">
          <div className=" border w-full  justify-center max-w-sm">
            <div className="border ">
              <h2 className="  text-3xl text-center ml-[32%] flex ">Edit Chapter</h2>

              <form className="flex flex-col space-y-6 mt-12 ml-20">

                <div className="border relative w-full">
                  <input
                    id="mangaName"
                    type="text"
                    value={mangaName}
                    onChange={(e) => setMangaName(e.target.value)}
                    className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                    placeholder="Enter the name of the manga"
                  />
                  <label
                    htmlFor="mangaName"
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 p-2 text-base whitespace-nowrap"
                  >

                  </label>

                </div>

                <div className=" relative w-full mb-6">
                  <select
                    id="chapter"
                    value={selectedChapter}
                    onChange={handleChapterChange}
                    className="p-2 text-gray-500 w-full max-w-[280px] bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
                  >
                    <option value="">Select Chapter</option>
                    {chapters.map(chapter => (
                      <option key={chapter._id} value={chapter._id}>
                        {chapter.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="  relative w-full mb-6">
                  <select
                    id="page"
                    value={selectedPage}
                    onChange={handlePageChange}
                    className="p-2 text-gray-500 w-full max-w-[280px] bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
                  >
                    <option value="">Select Page</option>
                    {selectedChapter && chapters.find(ch => ch._id === selectedChapter).pages.map((page, index) => (
                      <option key={index} value={page}>
                        Page {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className=" relative w-full mb-6">
                  <input
                    id="mangaName"
                    type="text"
                    value={dataToEdit}
                    onChange={(e) => setDataToEdit(e.target.value)}
                    className="w-full max-w-[280px] bg-transparent focus:outline-none border-b-2 border-gray-300 focus:border-blue-500 text-base"
                    placeholder="URL image"
                  />
                </div>

                <div className="flex flex-col space-y-6 justify-center">

                  <div className="flex flex-col space-y-4 justify-center items-center">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="w-[100%] h-14 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center transition-colors duration-300 hover:from-blue-300 hover:via-blue-400 hover:to-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="w-[100%] h-14 bg-gradient-to-br from-red-300 via-red-400 to-red-500 text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[20px] font-bold leading-[29.26px] text-center transition-colors duration-300 hover:from-green-300 hover:via-green-400 hover:to-green-500"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


      <div className="border border-red-600 relative flex justify-center items-center w-full ">
        <div className="w-full p-4 max-w-sm text-center ">
          <h2 className="text-lg text-center">{mangaName}</h2>
          <img
            src={imageUrl}
            alt={mangaName}
            className="rounded-lg w-[350px] h-[480px]"
          />
        </div>
      </div>
    </div>
  );
};

export default EditChapterForm;
