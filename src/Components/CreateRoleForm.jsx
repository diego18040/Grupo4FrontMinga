import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAuthor } from "../store/actions/RolesActions";
import { clearRoleState } from "../store/reducers/rolesReducer";

const NewRoleFormOne = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.roles || {});
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    dateJoined: "",
    profileImage: "",
  });

  useEffect(() => {
    if (success) {
      dispatch(clearRoleState());
      navigate("/mangas");
    }
  }, [success, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    // Datos del autor
    const authorData = {
      name: `${formData.firstName} ${formData.lastName}`,
      location: formData.location,
      dateJoined: formData.dateJoined,
      profileImage: formData.profileImage,
      email: localStorage.getItem("userEmail"),
      user_id: userId, 
    };

    try {
      await dispatch(createAuthor(authorData)).unwrap();
    } catch (err) {
      console.error("Failed to create author:", err);
    }
  };

  return (
    <div className="flex w-full h-screen mt-16 md:mt-0">
      <div className="flex justify-center items-center w-full p-6">
        <div className="w-full max-w-sm">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <h1 className="text-2xl font-bold text-center mb-6">New Author</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full p-3 border-b border-gray-300 focus:border-pink-500 focus:outline-none"
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full p-3 border-b border-gray-300 focus:border-pink-500 focus:outline-none"
              />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                required
                className="w-full p-3 border-b border-gray-300 focus:border-pink-500 focus:outline-none"
              />

              <input
                type="date"
                name="dateJoined"
                value={formData.dateJoined}
                onChange={handleChange}
                required
                className="w-full p-3 border-b border-gray-300 focus:border-pink-500 focus:outline-none"
              />

              <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="URL Profile Image"
                className="w-full p-3 border-b border-gray-300 focus:border-pink-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 text-white bg-pink-500 hover:bg-pink-400 rounded-full mt-6"
            >
              {loading ? "Processing..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRoleFormOne;
