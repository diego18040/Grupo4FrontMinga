

// export default Mangas;

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
<div className="sm:block visible">
  <SearchBar />
</div>

      <div className="mangas-container relative -top-[42vh]  left-1/2 transform -translate-x-1/2 w-[95%] bg-white p-8 rounded-lg shadow-lg flex items-center justify-center opacity-100 sm:flex-row ">

<Cards />

</div>
</div>
  );
};

export default Mangas;
