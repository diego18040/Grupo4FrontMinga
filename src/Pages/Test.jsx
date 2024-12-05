import React from "react";
import Cards from "../Components/Cards.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import Checkboxs from "../Components/Checkboxs.jsx";



export default function Test() {
  return (
    <>
      <main className="flex flex-col items-center">
        This is Test. Diviértanse :D
      </main>
      <section>
        <div className="h-[20vh]">
          <SearchBar />

          <Cards />

        </div>
      </section>

    </>
  );
}
