import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    location: "",
    birthdate: "",
    profileUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">New Author</h2>

          {/* Avatar placeholder */}
          <div className="mt-6 mx-auto w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="border-b border-gray-300">
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-0 py-2 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Lucas Ezequiel"
              />
            </div>

            <div className="border-b border-gray-300">
              <input
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full px-0 py-2 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Silva"
              />
            </div>

            <div className="border-b border-gray-300">
              <input
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="block w-full px-0 py-2 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Buenos Aires, Argentina"
              />
            </div>

            <div className="border-b border-gray-300">
              <input
                name="birthdate"
                type="date"
                required
                value={formData.birthdate}
                onChange={handleChange}
                className="block w-full px-0 py-2 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400"
              />
            </div>

            <div className="border-b border-gray-300">
              <input
                name="profileUrl"
                type="text"
                required
                value={formData.profileUrl}
                onChange={handleChange}
                className="block w-full px-0 py-2 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="URL Profile Image"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
