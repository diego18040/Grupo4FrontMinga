import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "../store/actions/RolesActions";
import { clearRoleState } from "../store/reducers/rolesReducer";

const NewRoleFormTwo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.roles || {});
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
      name: "",
      website: "",
      profileImage: "",
      description: "",
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

      try {
          await dispatch(createCompany({
              ...formData,
              user_id: userId
          })).unwrap();
      } catch (err) {
          console.error("Failed to create company:", err);
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
  
            <h1 className="text-2xl font-bold text-center mb-6">New Company</h1>
  
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              </div>
  
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full p-3 border-b border-gray-300 focus:border-pink-500 focus:outline-none"
                />
  
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Website"
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
  
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
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
export default NewRoleFormTwo;
