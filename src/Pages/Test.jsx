import React from "react";
import Cards from "../Components/Cards.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import Checkboxs from "../Components/Checkboxs.jsx";
import Carousel from "../Components/Carousel.jsx";



export default function Test() {
  return (
    <>
      <main className="flex flex-col items-center">
        This is Test. Diviértanse :D
      </main>
      <section>

        <div className=" border">
          <SearchBar />
        </div>



        <div className="container mx-auto bg-white rounded-xl lg:p-20 xl:p-40 md:p-0">
          <Checkboxs />
          <Cards />
        </div>

      </section>

      <div>
   <Carousel/>
         </div>

    </>
  );
}
