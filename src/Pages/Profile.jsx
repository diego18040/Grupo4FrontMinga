
import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import SearchBar from "../Components/SearchBar"; 
import '../App.css'; 

export default function ProfileLayou() {
  return (
    <>
      <Header />
    
      <Hero 
        backgroundImage='./public/mangas.jpg'
        title="MANGAS"
      />
      
    
      <SearchBar /> 

      <main className="flex flex-col items-center py-10">
       
      </main>
    </>
  );
}
