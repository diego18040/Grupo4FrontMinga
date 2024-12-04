import React from "react";
import { useNavigate } from "react-router-dom";
import mangas from "../assets/mangas.jpg";
import SearchBar from "../Components/SearchBar"
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
      
    </div>
  );
};

export default Mangas;
