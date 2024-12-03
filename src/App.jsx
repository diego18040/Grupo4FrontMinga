import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import HomeLayout from './Layouts/HomeLayout.jsx';
import CreateLayout from './Layouts/CreateLayout.jsx';
import PanelLayout from './Layouts/PanelLayout.jsx'
import SignInLayout from './Layouts/SignInLayout.jsx';
import Home from './Pages/Home.jsx'
import Mangas from './Pages/Mangas.jsx';
import NotFound from './Pages/NotFound.jsx';
import MangasId from './Pages/MangasId.jsx';
import EditAuthor from './Pages/EditAuthor.jsx'
import EditCompany from './Pages/EditCompany.jsx'
import AdminPanel from './Pages/AdminPanel.jsx'
import EditChapter from './Pages/EditChapter.jsx'
import Register from './Pages/Register.jsx'
import Profile from './Pages/Profile.jsx'
import ReadManga from './Pages/ReadManga.jsx'
import Manager from './Pages/Manager.jsx';
import Test from './Pages/Test.jsx';

const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "/*", element: <NotFound /> },
      { path: "/test", element: <Test /> },
      { path: "/mangas", element: <Mangas /> },
   
      
    ],
  },
  {
    element: < CreateLayout />,
    children: [

      { path: "editauthor", element: <EditAuthor /> },
      { path: "editchapter", element: <EditChapter /> },
      { path: "editcompany", element: <EditCompany /> },
    ]
  },
  {
    element: <PanelLayout />,
    children: [
      
     
      { path: "/adminpanel", element: <AdminPanel /> },
    
      { path: "/mangas", element: <Mangas /> },
      { path: "/profile", element: <Profile /> },
      { path: "/mangas/:id", element: <MangasId /> },
      { path: "/manager", element: <Manager /> },
      { path: "/readmanga", element: <ReadManga /> },
    ],
  },
  {
    element: <SignInLayout />,
    children: [
      { path: "register", element: <Register /> },
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
