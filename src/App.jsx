import { useEffect } from "react";
import { setUser } from "./store/actions/authActions.js";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import axios from "axios";
import HomeLayout from './Layouts/HomeLayout.jsx';
import CreateLayout from './layouts/CreateLayout.jsx';
import PanelLayout from './Layouts/PanelLayout.jsx'
import SignInLayout from './Layouts/SignInLayout.jsx';
import RolesLayaut from './Layouts/RolesLayaut.jsx'
import Home from './Pages/Home.jsx'
import Mangas from './Pages/Mangas.jsx';
import NotFound from './Pages/NotFound.jsx';
import MangasId from './Pages/MangasId.jsx';
import AdminPanel from './Pages/AdminPanel.jsx'
import EditChapter from './Pages/EditChapter.jsx'
import Register from './Pages/Register.jsx'
import Profile from './Pages/Profile.jsx'
import ReadManga from './Pages/ReadManga.jsx'
import Manager from './Pages/Manager.jsx';
import Test from './Pages/Test.jsx';
import SignIn from './Pages/SignIn.jsx'
import Comments from './Pages/Coments.jsx'
import EditAuthor from './Pages/EditAuthor.jsx';
import EditCompany from './Pages/EditCompany'
import CreateRoles from './Layouts/CreateRoles.jsx';
import NewRoleForm from './Components/NewRoleForm.jsx';


import SignRoute from "./Components/SignRoute.jsx";

const ProtectedRoute = ({ children }) => {
  const isOnline = useSelector((store) => store.userSignUpReducer.isOnline);
  const token = localStorage.getItem("token");
  return isOnline && token ? children : <Navigate to="signin" />;
};


const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "/*", element: <NotFound /> },
      { path: "/test", element: <Test /> },

    ],
  },
  {
    element: < CreateLayout />,
    children: [
      { path: "editauthor/:id", element: <EditAuthor /> },
      { path: "editchapter/:id", element: <EditChapter /> },
      { path: "editcompany/:id", element: <EditCompany /> },
      { path: "editchapter", element: <EditChapter /> },

    ]
  },

  {
    element: <CreateRoles />,
    children: [
      { path: "/newroleform", element: <NewRoleForm /> },
      {}
    
    ],
  },
  {
    element: <PanelLayout />,
    children: [

      { path: "/mangas", element: <Mangas /> },
      { path: "/adminpanel", element: <AdminPanel /> },
      { path: "/profile", element: <Profile /> },
      { path: "/mangas/:id", element: <MangasId /> },
      { path: "/manager", element: <Manager /> },
      { path: "/readmanga/:id", element: <ReadManga /> },
      { path: "/comments/:id", element: <Comments /> },
    ],
  },

  {
    element: <RolesLayaut />,
    children: [
      { path: "/newrole", element: <RolesLayaut /> },
      
    ],
  },
  {
    element: <SignInLayout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "signin", element: (
      <SignRoute>
        <SignIn/>
      </SignRoute>)}
    ],
  },
]);

// Function to validate the token
const loginWithToken = async (token) => {
  try {
    /*if (!userId) {
      throw new Error("userId no está definido");
    }*/
    console.log("Se ejecutó Login With Token");
    
    const response = await axios.get(
      `http://localhost:8080/api/users/validatetoken`, // Incluye el userId en la ruta
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.response;
  } catch (error) {
    console.error("Error al validar token:", error);
    return null;
  }
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Captura el token y el userId desde la URL
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromURL = queryParams.get("token");
    const userIdFromURL = queryParams.get("userId");
    const userPhotoFromURL = queryParams.get("userPhoto")

    if (tokenFromURL && userIdFromURL) {
      localStorage.setItem("token", tokenFromURL);
      localStorage.setItem("userId", userIdFromURL); // Guarda el userId en localStorage
      localStorage.setItem("userPhoto",userPhotoFromURL);
      window.history.replaceState({}, document.title, "/"); // Elimina parámetros de la URL
    }
  
    // Valida el token y el userId desde localStorage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userPhoto = localStorage.getItem("userPhoto");

    console.log("Token desde localStorage:", token);
    console.log("UserID desde localStorage:", userId);
    console.log ("UserPhoto desde localStorage",userPhoto)

    if (token && userId && userPhoto) {
      loginWithToken(token, userId, userPhoto).then((user) => {
        if (user) {
          dispatch(setUser({ user, token }));
          if (!localStorage.getItem("userEmail") && user.email) {
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userPhoto", user.photo);
          }
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userPhoto")

        }
      });
    }
  }, [dispatch]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
