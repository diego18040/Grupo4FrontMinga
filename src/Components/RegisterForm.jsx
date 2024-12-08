import '../App.css'; 
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {signUp} from "../store/actions/authActions";


const LoginForm = () => {
    const [formData, setFormData] = useState({
      email: "",
      photoURL: "",
      password: "",
    });
  
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value,});
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const formattedData = {
        email: formData.email,
        password: formData.password,
        photo: formData.photoURL || "https://res.cloudinary.com/dlczhwmok/image/upload/v1733688343/deffault_user_hoeoud.jpg",
      };
  
      try {
        await dispatch(signUp(formattedData)).unwrap();
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("Error en el registro:", error);
        alert("Hubo un error en el registro, por favor intenta nuevamente.");
      }
    };
  
    const handleCloseModal = () => {
      setIsSuccessModalOpen(false);
      navigate("/");
    };
    
  const signUpWithGoogle = () => {
    window.location.href = "http://localhost:8080/api/auth/signin/google/";
  };
  
  return (
 <>
      <div className="w-full max-w-md  p-6 rounded">
        <h2 className="text-2xl text-32px font-Montserrat text-gray-800 text-center mb-4">
          Welcome!
        </h2>
        <p className="text-center font-Montserrat text-gray-600 mb-6">
          Discover manga and comics, track your progress, have fun, read manga.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-start text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="DragonballZ@Krowl.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photoURL" className="block text-start text-gray-700 mb-2">
              URL
            </label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="URL"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-start text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="...................."
            />
          </div>
            <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    value=""
                    id="disabled-checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  Send notification to my email
                <label htmlFor="disabled-checkbox"  className="ms-2 text-sm text-Montserrat text-12px font-medium text-gray-400 dark:text-gray-500"></label>
                
              
            </div>
          <button
            type="submit"
            className="w-full py-3 font-medium  bg-pink-500 text-white py-2 rounded hover:bg-pink-600 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            Register
          </button>
           {/* Register with Google */}
           <button
              onClick={signUpWithGoogle}
              className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-6 h-6"
                alt="Google Logo"
              />
              <span>Register with Google</span>
            </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <NavLink
            to = "/signin"
            className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
          >
            <span className="text-pink-500">Log in </span>
            </NavLink>
        </p>
        <p className="text-center mt-4">
          Go back to{" "}
          <NavLink
            to = "/"
            className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
          >
            <span className="text-pink-500">home page </span>
            </NavLink>
        </p>
      </div>
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-600">Success!</h2>
            <p className="mt-4 text-gray-700">Your account has been successfully created.</p>
            <button
              onClick={handleCloseModal}
              className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      </>
  );
};

export default LoginForm;
