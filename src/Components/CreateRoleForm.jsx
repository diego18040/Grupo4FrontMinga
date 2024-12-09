import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAuthor, createCompany } from "../store/actions/RolesActions";
import { clearRoleState } from "../store/reducers/rolesReducer";

const NewRoleForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.roles);

  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    website: "",
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
    console.log("Enviando datos:", { role, formData });

    try {
      if (role === "Author" || !role) {
        await dispatch(
          createAuthor({
            name: formData.name,
            email: formData.email,
          })
        ).unwrap();
      }
      if (role === "Company" || !role) {
        await dispatch(
          createCompany({
            name: formData.companyName || formData.name,
            email: formData.email,
            website: formData.website,
          })
        ).unwrap();
      }
    } catch (err) {
      console.error("Error creating role:", err);
    }
  };

  return (
    <div className="flex w-full h-screen mt-16 md:mt-0">
      <div className="flex justify-center items-center w-full md:w-2/3 p-6">
        <div className="w-full max-w-sm text-center">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col items-center mb-4">
            <p className="text-4xl p-8 text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 mb-2 whitespace-nowrap">
              Complete your profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setRole("Author")}
                className={`${
                  role === "Author" ? "bg-pink-400" : "bg-pink-300"
                } text-white p-3 rounded-2xl w-1/3`}
              >
                Author
              </button>
              <button
                type="button"
                onClick={() => setRole("Company")}
                className={`${
                  role === "Company" ? "bg-pink-400" : "bg-pink-300"
                } text-white p-3 rounded-2xl w-1/3`}
              >
                Company
              </button>
            </div>

            <div className="flex flex-col items-start mb-4">
              <label htmlFor="name" className="text-lg font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200"
              />
            </div>

            <div className="flex flex-col items-start mb-4">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200"
              />
            </div>

            {role === "Company" && (
              <>
                <div className="flex flex-col items-start mb-4">
                  <label htmlFor="companyName" className="text-lg font-semibold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded-md border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200"
                  />
                </div>
                <div className="flex flex-col items-start mb-4">
                  <label htmlFor="website" className="text-lg font-semibold">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 text-white ${
                loading
                  ? "bg-pink-300 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-400"
              } rounded-2xl transition-colors`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <div className="relative justify-center items-center w-2/3 h-full hidden md:block">
        <img
          src="https://via.placeholder.com/800x600"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
    </div>
  );
};

export default NewRoleForm;
