
import React, { useState } from "react";
import { FaMapMarkerAlt, FaBirthdayCake, FaEdit } from 'react-icons/fa'; 

const UserProfile = () => {

  const [isNew, setIsNew] = useState(true); 

  const userData = {
    imageUrl: "https://via.placeholder.com/150", 
    name: "Juan Pérez",
    address: "Venecia",
    birthDate: "1990/05/15",
  };

  // Datos de ejemplo para las cards
  const cardsData = [
    { id: 1, title: "Card 1 - New", description: "This is a new card.", isNew: true },
    { id: 2, title: "Card 2 - Old", description: "This is an old card.", isNew: false },
    { id: 3, title: "Card 3 - New", description: "This is another new card.", isNew: true },
    { id: 4, title: "Card 4 - Old", description: "This is another old card.", isNew: false },
  ];

  const filteredCards = cardsData.filter(card => card.isNew === isNew);

  return (
    <div className="flex flex-col items-center justify-center mt-20 p-8 pb-24">

      <div className="flex items-center justify-center w-full mb-8">
        <div className="w-[100px] mr-8 rounded-full overflow-hidden">
          <img
            src={userData.imageUrl}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-start">
          <h1 className="text-[18px] whitespace-nowrap font-semibold mb-2 md:text-3xl text-center">{userData.name}</h1>

          <div className="flex items-center whitespace-nowrap text-[14px] md:text-xl text-gray-700 mb-2 justify-center">
            <FaMapMarkerAlt className="h-5 w-5 text-gray-600 mr-2" /> 
            {userData.address}
          </div>

          <div className="flex text-[14px] md:text-xl text-gray-500 justify-center">
            <FaBirthdayCake className="h-5 w-5 text-gray-600 mr-2" /> 
            {userData.birthDate}
          </div>
        </div>

        <div className="ml-10">
          <FaEdit className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
        </div>
      </div>

      <div className="flex items-center mb-8 mt-20 justify-center">
        <label className="inline-flex items-center cursor-pointer">
          <span className="text-sm font-medium text-gray-900 mr-3">
            {isNew ? "New" : "Old"}
          </span>
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isNew}
            onChange={() => setIsNew(!isNew)}
          />
          <div
            className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 ${isNew ? "peer-checked:bg-green-600" : "peer-checked:bg-gray-400"}`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-[2px] transition-transform ${isNew ? "translate-x-5" : "translate-x-0"}`}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-900 ml-3">
            {isNew ? "Old" : "New"}
          </span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center">
        {filteredCards.map((card) => (
          <div key={card.id} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-700">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Botón "Manage" fijo al final */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <button  className="w-[200px] h-[6vh]  text-white bg-gradient-to-br rounded-xl from-pink-300 via-pink-400 to-pink-500">
          Manage!
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
