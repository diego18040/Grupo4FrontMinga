

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import companyauthor from "../assets/companyauthor.jpg";

const CreateRole = () => {
  const location = useLocation();
  const role = location.state?.role; 

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    name: "",
    surname: "",
    address: "",
    birthdate: "",
    photoUrl: "",
    website: "",
    profileImageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="flex w-full h-screen mt-16 md:mt-0">
      {/* Left container */}
      <div className=" flex justify-center items-center w-full md:w-2/3 p-6">
        <div className=" md:mt-20 w-full max-w-sm text-center">
          <div className="flex flex-col items-center mb-4">
            <p className="text-3xl p-2 bg-clip-text bg-gradient-to-br text-blacks mb-2 whitespace-nowrap">
              {role === "Author" ? "New Author" : "New Company"}
            </p>

            {/* Profile Image under the title */}
            <div className="mb-4">
              <img
                src={companyauthor} // Default image for Author or Company
                alt="Company or Author"
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-300"
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Fields for Author */}
              {role === "Author" && (
                <>
                  {/* Name */}
                  <div className="mb-4">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Insert name"
                      className="w-full p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Surname */}
                  <div className="mb-4">
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      required
                      placeholder="Insert surname"
                      className="w-full p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Insert address"
                      className="w-full p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Birthdate */}
                  <div className="mb-4">
                    <input
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Profile picture URL */}
                  <div className="mb-4">
                    <input
                      type="url"
                      id="photoUrl"
                      name="photoUrl"
                      value={formData.photoUrl}
                      onChange={handleChange}
                      required
                      placeholder="URL Profile Image"
                      className="w-full p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Fields for Company */}
              {role === "Company" && (
                <>
                  {/* Company Website */}
                  <div className="mb-4">
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      required
                      placeholder="Insert company website"
                      className="w-full p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Company Profile Image URL */}
                  <div className="mb-4">
                    <input
                      type="url"
                      id="profileImageUrl"
                      name="profileImageUrl"
                      value={formData.profileImageUrl}
                      onChange={handleChange}
                      required
                      placeholder="URL Profile Image"
                      className="w-full p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Company Description */}
                  <div className="mb-4">
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Insert company description"
                      className="w-full p-2 border-b-2 max-w-[280px] border-gray-300 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-[100%]  p-3 mt-4 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white rounded-3xl hover:bg-pink-400"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Image container */}
      <div className="relative w-full  md:w-1/2 h-full  hidden sm:block">
        <div className="absolute top-0 left-0 w-full  h-full bg-black opacity-50 z-10"></div>

        <img
          src={companyauthor} 
          alt="Company or Author"
          className="w-full h-full  object-cover"
        />
      </div>
    </div>
  );
};

export default CreateRole;
