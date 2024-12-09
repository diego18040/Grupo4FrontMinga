import React from "react";
import { useNavigate } from "react-router-dom";
import mangas from "../assets/mangas.jpg";
import SearchBar from "../Components/SearchBar"
import Cards from "../Components/Cards.jsx";
import CardsEdit from "../Components/CardsEdit.jsx";
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
    <div>
<div className="">
  <SearchBar />
</div>

      <div className="">

<Cards />

</div>


    </div>
  );
};

export default Mangas;
