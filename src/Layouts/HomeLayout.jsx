import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Carousel from "../Components/Carousel.jsx";

export default function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="hidden md:block mt-24">
        <Carousel />
      </div>
      <main className="mt-15 pt-6 rounded-xl mb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}