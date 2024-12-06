import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
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
    element: <PanelLayout />,
    children: [
      
      { path: "/mangas", element: <Mangas /> },
      { path: "/adminpanel", element: <AdminPanel /> },
      { path: "/profile", element: <Profile /> },
      { path: "/mangas/:id", element: <MangasId /> },
      { path: "/manager", element: <Manager /> },
      { path: "/readmanga/:id", element: <ReadManga /> },
      {path: "/comments/:id", element: <Comments />},
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
      { path: "signin", element: <SignIn/>}
    ],
  },
]);


function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
