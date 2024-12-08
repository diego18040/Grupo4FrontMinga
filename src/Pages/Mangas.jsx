import React from "react";
import { useNavigate } from "react-router-dom";
import mangas from "../assets/mangas.jpg";
import SearchBar from "../Components/SearchBar"
import Cards from "../Components/Cards.jsx";
const Mangas = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/mangas', {
      state: {
        backgroundImage: mangas,
        title: "Mangas",
      }
    });
  }, [navigate]);

  return (
    <div className="mangas-container">
    
      <SearchBar /> 
      <Cards/>
      
    </div>
  );
};

export default Mangas;