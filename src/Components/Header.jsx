import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { logout } from "../store/actions/authActions";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = useSelector((state) => state.authStore?.token);
  const user = useSelector((state) => state.authStore?.users);
  const userEmail = user?.email || localStorage.getItem("userEmail");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };
  
  return (
    <header className="bg-transparent p-4 fixed w-full top-0 left-0 z-50">
      <nav className="flex items-center justify-between relative">
        <div
          className="flex flex-col items-center cursor-pointer space-y-1"
          onClick={toggleMenu}
        >
          <div className="w-8 h-0.5 bg-pink-400"></div>
          <div className="w-8 h-0.5 bg-pink-400"></div>
          <div className="w-8 h-0.5 bg-pink-400"></div>
          <div className="w-8 h-0.5 bg-pink-400"></div>
        </div>

        <div>
          <img src={logo} className="h-14" alt="Logo" />
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white shadow-lg transform transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            className="text-right p-4 text-white"
            onClick={toggleMenu}
          >
            ✕
          </button>
          <ul className="space-y-4 p-4 text-xs">
            <li>
              <NavLink
                to="/"
                className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            
            {token ? (
              // Menú para usuarios autenticados
              <>
                <li>
                  <NavLink
                    to="/mangas"
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Explore Mangas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/newrole"
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Register as Author
                  </NavLink>
                </li>
                <li>
                </li>
                <li className="pt-4">
                  <div className="text-center mb-2 text-white">
                    Welcome, {userEmail || "User"}
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      toggleMenu();
                    }}
                    className="w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              // Menú para usuarios no autenticados
              <>
                <li>
                  <NavLink
                    to="/register"
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signin"
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Sign In
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;