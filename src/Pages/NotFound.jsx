import { NavLink } from "react-router-dom";
import error404 from "../assets/404.png";

const Error404 = () => {
  return (
    <main className="bg-gray-800 min-h-screen flex flex-col justify-center items-center">
      <section
        className="p-4 sm:p-8 sm:px-10 lg:px-16 rounded-lg text-white bg-opacity-75 flex flex-col items-center justify-center text-center 
                   bg-cover bg-center bg-no-repeat sm:bg-none"
        style={{
          backgroundImage: `url(${error404})`,
          minHeight: "100vh",
          maxHeight: "100vh",
          width: "100%",
        }}
      >
        <h1 className="text-3xl sm:text-5xl font-semibold mb-4">
          ERROR <span className="text-red-500">404</span>
        </h1>
        <h3 className="text-lg sm:text-xl mb-6">
          Sorry, the page you're looking for doesn't exist
        </h3>
        <NavLink to="/" className="transition-transform duration-300">
          <button className="py-2 px-6 bg-white text-pink-400 rounded border border-gray-400 hover:border-gray-600 cursor-pointer transform hover:scale-105">
            Go Back Home
          </button>
        </NavLink>
      </section>
    </main>
  );
};

export default Error404;






