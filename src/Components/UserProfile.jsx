import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaBirthdayCake, FaEdit } from 'react-icons/fa';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import profile from "../assets/profile.jpg";

const UserProfile = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.authStore?.userId) || localStorage.getItem("userId"); // Obtener userId del estado o localStorage

  React.useEffect(() => {
    navigate(`/profile/${userId}`, {
      state: {
        backgroundImage: profile,
        title: "Profile",
      }
    });
  }, [navigate]);

  const [isNew, setIsNew] = useState(true);
  const [authorData, setAuthorData] = useState({
    imageUrl: "",
    name: "",
    lastName: "",
    city: "",
    country: "",
    birthDate: "",
  });

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }
        if (!userId) {
          console.error("No userId found");
          return;
        }
        const response = await axios.get(`http://localhost:8080/api/authors/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = response.data.response[0];
        console.log("Author data:", data); // Aquí se añaden los datos traídos por la petición
        setAuthorData({
          imageUrl: data.photo,
          name: data.name,
          lastName: data.last_name,
          city: data.city,
          country: data.country,
          birthDate: new Date(data.date).toLocaleDateString(),
        });
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthorData();
  }, [userId]);

  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }
        if (!userId) {
          console.error("No userId found");
          return;
        }
        const response = await axios.get(`http://localhost:8080/api/mangas/creator/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = response.data.response;
        console.log("Cards data:", data); // Aquí se añaden los datos traídos por la petición
        setCardsData(data);
      } catch (error) {
        console.error("Error fetching cards data:", error);
      }
    };

    fetchCardsData();
  }, [userId]);

  const filteredCards = cardsData; // No filtrar por isNew por ahora, para simplificar

  return (
    <div className="flex flex-col items-center justify-center mt-20 p-8 pb-24">
      <div className="flex items-center justify-center w-full mb-8">
        <div className="w-[100px] mr-8 rounded-full overflow-hidden">
          <img
            src={authorData.imageUrl}
            alt="Author"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-start">
          <h1 className="text-[18px] whitespace-nowrap font-semibold mb-2 md:text-3xl text-center">
            {`${authorData.name} ${authorData.lastName}`}
          </h1>

          <div className="flex items-center whitespace-nowrap text-[14px] md:text-xl text-gray-700 mb-2 justify-center">
            <FaMapMarkerAlt className="h-5 w-5 text-gray-600 mr-2" />
            {`${authorData.city}, ${authorData.country}`}
          </div>

          <div className="flex text-[14px] md:text-xl text-gray-500 justify-center">
            <FaBirthdayCake className="h-5 w-5 text-gray-600 mr-2" />
            {authorData.birthDate}
          </div>
        </div>
        <div className="ml-10">
          <NavLink to={"/mangas"}>
          <FaEdit className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
          </NavLink>
        </div>
      </div>

      <div className="bg-transparent">
        <div className="grid grid-cols-2 lg:gap-10 bg-transparent">
          {filteredCards.map((card, index) => (
            <div
              key={card._id}
              className={`justify-center items-center bg-transparent ${index === filteredCards.length - 1 && filteredCards.length % 2 !== 0 ? 'col-span-2 justify-self-center' : ''
                }`}
            >
              <div className="bg-transparent h-[400px] bg-gray-100 w-[100%] rounded-lg p-4 shadow-md md:flex justify-center items-center">
                <img src={card.cover_photo} className="h-full lg:h-full object-cover rounded-xl" alt={card.title}></img>
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Botón "Manage" fijo al final */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <NavLink to={`/manager/${userId}`} className="w-[200px] h-[6vh] text-white bg-gradient-to-br rounded-xl from-pink-300 via-pink-400 to-pink-500">
          Manage!
        </NavLink>
      </div>
    </div>
  );
};

export default UserProfile;
