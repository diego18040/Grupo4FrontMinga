import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import profile from "../assets/profile.jpg"
 

//`/profile/${userId}`
const ProfilePanel = () => {
  
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(`/editauthor/${userId}`, {
      state: {
        backgroundImage: profile,
        title: "Profile",
      }
    });
  }, [navigate]);
  
  const { id: userId } = useParams(); // Obtener userId desde la URL

  const [authorData, setAuthorData] = useState({
    name: '',
    lastName: '',
    city: '',
    country: '',
    birthDate: '',
    imageUrl: ''
  });


  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to save the changes?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.put(`http://localhost:8080/api/authors/update/${userId}`, {
            name: authorData.name,
            last_name: authorData.lastName,
            city: authorData.city,
            country: authorData.country,
            date: authorData.birthDate,
            photo: authorData.imageUrl
          }, {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (response.status === 200) {
            Swal.fire(
              'Saved!',
              'The author has been updated.',
              'success'
            ).then(() => {
              navigate(`/profile/${userId}`); // Redirigir a la pÃ¡gina /manager/${userId}
            });
          }
        }
      });
    } catch (error) {
      console.error("Error updating author data:", error);
      Swal.fire(
        'Error!',
        'There was an error updating the author.',
        'error'
      );
    }
  };

  const handleDelete = () => {
    alert("Data deleted");

    setAuthorData({
      name: '',
      lastName: '',
      city: '',
      country: '',
      birthDate: '',
      imageUrl: ''
    });
  };

  return (
    <div className="absolute top-[10%] md:top-1/2 left-1/2 transform -translate-x-1/2 w-[95%] bg-white p-8 rounded-lg shadow-lg flex items-center justify-center opacity-100 sm:flex-row flex-col-reverse">
      <div className="w-full sm:w-4/4 md:w-[60%] lg:w-[50%] xl:w-[40%] p-10 pt-[6%] gap-6 opacity-100 sm:mr-24 sm:mb-0 mb-8">
        <form>
          <div className="relative w-full mb-6">
            <input
              id="name"
              type="text"
              value={authorData.name}
              onChange={(e) => setAuthorData({ ...authorData, name: e.target.value })}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              placeholder="Enter your name"
            />
            <label
              htmlFor="name"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${authorData.name ? 'text-xs -translate-y-6' : 'text-base'}`}
            >
              Enter your name
            </label>
          </div>
          <div className="relative w-full mb-6">
            <input
              id="surname"
              type="text"
              value={authorData.lastName}
              onChange={(e) => setAuthorData({ ...authorData, lastName: e.target.value })}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              placeholder="Enter your lastName"
            />
            <label
              htmlFor="surname"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${authorData.lastName ? 'text-xs -translate-y-6' : 'text-base'}`}
            >
              Enter your lastName
            </label>
          </div>

          <div className="relative w-full mb-6">
            <input
              id="city"
              type="text"
              value={authorData.city}
              onChange={(e) => setAuthorData({ ...authorData, city: e.target.value })}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              placeholder="Enter your city"
            />
            <label
              htmlFor="city"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${authorData.city ? 'text-xs -translate-y-6' : 'text-base'}`}
            >
              Enter your city
            </label>
          </div>
          <div className="relative w-full mb-6">
            <input
              id="country"
              type="text"
              value={authorData.country}
              onChange={(e) => setAuthorData({ ...authorData, country: e.target.value })}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              placeholder="Enter your country"
            />
            <label
              htmlFor="country"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${authorData.country ? 'text-xs -translate-y-6' : 'text-base'}`}
            >
              Enter your country
            </label>
          </div>

          <div className="relative w-full mb-6">
            <input
              id="birthdate"
              type="date"
              value={authorData.birthDate}
              onChange={(e) => setAuthorData({ ...authorData, birthDate: e.target.value })}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 appearance-none text-base"
            />
            <label
              htmlFor="birthdate"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${authorData.birthDate ? 'text-xs -translate-y-6' : 'text-base'}`}
            />
          </div>

          <div className="relative w-full mb-6">
            <input
              id="imageUrl"
              type="text"
              value={authorData.imageUrl}
              onChange={(e) => setAuthorData({ ...authorData, imageUrl: e.target.value })}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              placeholder="Enter the image URL"
            />
            <label
              htmlFor="imageUrl"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${authorData.imageUrl ? 'text-xs -translate-y-6' : 'text-base'}`}
            >
              Enter the image URL
            </label>
          </div>

          <div className="flex flex-col space-y-6 justify-center">
            <button
              type="button"
              onClick={handleSave}
              className="w-full h-[65px] bg-[#34D399] text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[15px] font-bold leading-[29.26px] text-center"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full h-[65px] bg-[#FBDDCC] text-[#EE837F] px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[15px] font-bold leading-[29.26px] text-center"
            >
              Delete account
            </button>
          </div>
        </form>
      </div>

      <div className="w-full sm:w-1/3 flex justify-center sm:ml-24 sm:mb-0 mb-8 sm:mt-0 mt-[5vh]">
        <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
          <img
            src={authorData.imageUrl || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;