import '../App.css'; 
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../../store/actions/authActions";
import { NavLink } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading = false, error = null } = useSelector((state) => state.authStore || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:8080/api/auth/signin/google/";
  };

/*   const loading = authStore.loading;
  const error = authStore.error; */


  return (
    <>
      <div className="w-full max-w-md  p-6 rounded ">
        <h1 className="text-2xl text-32px font-Montserrat text-gray-800 text-center mb-4">Welcome <span className="font-Montserrat text-32px text-pink-500">back</span>!</h1>
        <p className="text-center font-Montserrat text-gray-600 mb-6">Discover manga and comics, track your progress, have fun, read manga. </p>
        
        <form onSubmit={handleSubmit} className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-start text-slate-700 pb-2 block">Email</p>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="DragonballZ@Krowl.com"
              />
            </label>

            <label htmlFor="password">
              <p className="font-medium  text-start text-slate-700 pb-2">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="...................."
              />
            </label>

          {/* <div className="flex flex-row justify-between">
              <div>
                <label htmlFor="remember">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 border-slate-200 focus:bg-indigo-600"
                  />
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="font-medium text-indigo-600">
                  Forgot Password?
                </a
              </div>
            </div>*/}

            <button
              type="submit"
              className="w-full py-3 font-medium  bg-pink-500 text-white py-2 rounded hover:bg-pink-600 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Login</span>
            </button>

            <div className="my-5">
          <button
            onClick={loginWithGoogle}
            className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-6 h-6"
              alt="Google Logo"
            />
            <span>Login with Google</span>
          </button>
        </div>
        </div>
        </form>

        {loading && (
          <p className="text-center text-teal-400 mt-2">Loading...</p>
        )}
        {error && <p className="text-center text-red-500 mt-2">{error}</p>}
        <p className="text-center mt-4">
          you don´t an account yet?{" "}
          <NavLink
            to = "/register"
            className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
          >
            <span className="text-pink-500">Sign up </span>
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
      
    </>
  );
};

export default SignInForm;
