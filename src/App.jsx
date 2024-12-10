import { useEffect } from "react";
import { setUser } from "./store/actions/authActions.js";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import axios from "axios";
import HomeLayout from './Layouts/HomeLayout.jsx';
import CreateLayout from './layouts/CreateLayout.jsx';
import PanelLayout from './Layouts/PanelLayout.jsx';
import SignInLayout from './Layouts/SignInLayout.jsx';
import RolesLayaut from './Layouts/RolesLayaut.jsx';
import Home from './Pages/Home.jsx';
import Mangas from './Pages/Mangas.jsx';
import NotFound from './Pages/NotFound.jsx';
import MangasId from './Pages/MangasId.jsx';
import AdminPanel from './Pages/AdminPanel.jsx';
import EditChapter from './Pages/EditChapter.jsx';
import Register from './Pages/Register.jsx';
import Profile from './Pages/Profile.jsx';
import ReadManga from './Pages/ReadManga.jsx';
import Manager from './Pages/Manager.jsx';
import Test from './Pages/Test.jsx';
import SignIn from './Pages/SignIn.jsx';
import Comments from './Pages/Coments.jsx';
import EditAuthor from './Pages/EditAuthor.jsx';
import EditCompany from './Pages/EditCompany';
import CreateRoles from './Layouts/CreateRoles.jsx';
import SignRoute from "./Components/SignRoute.jsx";
import EditMangaPage from "./Pages/EditMangaPage.jsx";
import NewMangaPage from "./Pages/NewMangaPage.jsx";
import NewChapterPage from "./Pages/NewChapterPage.jsx"
import NewRoleFormTwo from "./Pages/RoleCompany.jsx";
import NewRoleFormOne from "./Components/CreateRoleForm.jsx";
import NewRole from "./Components/NewRoleForm.jsx";

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
    element: <CreateLayout />,
    children: [
      { path: "/editauthor/:id", element: <EditAuthor /> },
      { path: "/editchapter/:id", element: <EditChapter /> },
      { path: "/editcompany/:id", element: <EditCompany /> },
      { path: "/editmanga/:id", element: <EditMangaPage /> },
      { path: "/newmanga/", element: <NewMangaPage /> },
      { path: "/:id/newchapter/", element: <NewChapterPage /> },
      

    ]
  },
  {
    //el que agarra
    element: <CreateRoles />,
    children: [
      { path: "/NewroleformOne", element: <NewRoleFormOne /> },
      {path:"/NewRoleFormTwo",element:<NewRoleFormTwo/>}
    ],
  },
  {
    element: <PanelLayout />,
    children: [
      { path: "/mangas", element: <Mangas /> },
      { path: "/adminpanel", element: <AdminPanel /> },
      { path: "/profile", element: <Profile /> },
      { path: "/mangas/:id", element: <MangasId /> },
      { path: "/manager/:id", element: <Manager/> },
      { path: "/readmanga/:id", element: <ReadManga /> },
      { path: "/comments/:id", element: <Comments /> },
    ],
  },
  {
    //elegir autor o company
    //pero a la vez esta en la page NewRoleForm , y para exportar se llama NEWROLE
    element: <RolesLayaut />,
    children: [
      { path: "/newrole", element: <NewRole /> },

    ],
  },
  {
    element: <SignInLayout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "signin", element: <SignRoute><SignIn /></SignRoute> }
    ],
  },
]);


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromURL = queryParams.get("token");
    const userIdFromURL = queryParams.get("userId");
    const UserEmailFromURL = queryParams.get("userEmail");
    const userPhotoFromURL = queryParams.get("userPhoto");

    if (tokenFromURL && userIdFromURL) {
      localStorage.setItem("token", tokenFromURL);
      localStorage.setItem("userId", userIdFromURL);
      localStorage.setItem("userEmail",UserEmailFromURL);
      localStorage.setItem("userPhoto",userPhotoFromURL);
      window.history.replaceState({}, document.title, "/");
      
      const user = { _id: userIdFromURL };
      dispatch(setUser({ user, token: tokenFromURL }));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>

  );
}

export default App;