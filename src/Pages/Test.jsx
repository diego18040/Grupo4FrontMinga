// import React from "react";
// import Header from "../Components/Header";
// import Hero from "../Components/Hero";
// import '../App.css'; 

// export default function Test() {
//   return (
//     <>
    
//       <Header />

    
//       <Hero 
//         backgroundImage= './public/mangas.jpg'
//         title="MANGAS"
//       />

    
//       <main className="flex flex-col items-center py-10">
       
//       </main>

//     </>
//   );
// }

import React from "react";
import CardsEdit from "../Components/CardsEdit";
import Cards from "../Components/Cards";
import Carousel from "../Components/Carousel"


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
<Carousel></Carousel>
      </div>

    </>
  );
}
