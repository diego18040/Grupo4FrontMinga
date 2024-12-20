import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { logout } from "../store/actions/authActions";
import FavoritesModal from "../Components/FavoritesModals";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = useSelector((state) => state.authStore?.token) || localStorage.getItem("token");
  const userId = useSelector((state) => state.authStore?.userId) || localStorage.getItem("userId");
  const userEmail = useSelector((state) => state.authStore?.users?.email) || localStorage.getItem("userEmail");
  const userPhoto = useSelector((state) => state.authStore?.users?.photo) || localStorage.getItem("userPhoto");
  const userRole = useSelector((state) => state.authStore?.users?.role) || localStorage.getItem("role");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const isRole = (role) => Number(userRole) === role;

  return (
    <header className="bg-transparent p-4 fixed w-full top-0 left-0 z-50">
      <div>
        <FavoritesModal />
      </div>
      <nav className="flex items-center justify-between relative">
        <div className="flex  flex-col items-center cursor-pointer space-y-1" onClick={toggleMenu}>
          <div className="w-8 h-0.5 bg-pink-400"></div>
          <div className="w-8 h-0.5 bg-pink-400"></div>
          <div className="w-8 h-0.5 bg-pink-400"></div>
        </div>

        <div>
          <img src={logo} className="h-24" alt="Logo" />
        </div>

        <div className={`fixed top-0 left-0 h-full w-96 bg-gradient-to-br font-bold from-pink-300 via-pink-400 to-pink-500 text-white shadow-lg transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <button className="text-right p-4 text-white" onClick={toggleMenu}>
            ✕
          </button>

          {token && (
            <div className="p-4 flex flex-col items-center h-48 space-y-2 border-b border-white">
              <img
                src={userPhoto || "https://via.placeholder.com/150"}
                alt="User avatar"
                className="w-28 h-28 rounded-full object-cover "
              />
              <span className="text-white lg:text-xl p-6 font-bold text-sm">{userEmail || "User"}</span>
            </div>
          )}

          <ul className="space-y-4  p-4 text-lg">
            <li>
              <NavLink
                to="/"
                className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>

            {!token && (
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

            {token && isRole(0) && (
              <>
                <li>
                  <NavLink
                    to="/mangas"
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Mangas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/newrole"
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Register Company or Author
                  </NavLink>
                </li>
                <li>
                  <button
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}

            {token && (isRole(1) || isRole(2)) && (
              <>
                <li>
                  <NavLink
                    to="/mangas"
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Mangas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`profile/${userId}}`}
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Profile
                  </NavLink>
                  
                </li>
                <li>
                  <NavLink
                    to={`/manager/${userId}`}
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Manager
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/favourites"
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Favourites
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/adminpanel/${userId}`}
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={toggleMenu}
                  >
                    Admin Panel
                  </NavLink>
                </li>
                <li>
                  <button
                    className="block w-full text-center py-2 px-4 bg-white text-pink-400 rounded"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
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
