import React from "react";
import CardsEdit from "../Components/CardsEdit";
import Cards from "../Components/Cards";



export default function Test() {
  return (
    <>
      <main className="flex flex-col items-center">
        This is Test. Diviértanse :D
      </main>
      <section>

        <div className=" border">

        </div>



        <div className="container mx-auto bg-white rounded-xl lg:p-20 xl:p-40 md:p-0">

          <CardsEdit></CardsEdit>
          <Cards></Cards>


        </div>

    

      </section>

      <div>

      </div>

    </>
  );
}
