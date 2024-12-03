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
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import SearchBar from "../Components/SearchBar"; // Importa la barra de búsqueda
import '../App.css'; 

export default function Test() {
  return (
    <>
      <Header />
    
      <Hero 
        backgroundImage='./public/mangas.jpg'
        title="MANGAS"
      />
      
      {/* Barra de búsqueda debajo del título */}
      <SearchBar /> 

      <main className="flex flex-col items-center py-10">
        {/* Contenido adicional */}
      </main>
      <section className="py-10 max-w-screen-xl mx-auto">
        <div className="">
     
        </div>
      </section>
      <Footer></Footer>

    </>
  );
}
