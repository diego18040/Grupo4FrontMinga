import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Carousel from "../Components/Carousel.jsx";

export default function HomeLayout() {
    return (
        <div className="min-h-screen flex flex-col relative">
            <div className="fixed inset-0 w-full h-full z-0">
                <img 
                    src="/ruta-a-tu-imagen.jpg" 
                    alt="background" 
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

            {/* Carousel solo en desktop */}
            <div className="hidden md:block mt-40">
                <Carousel />
            </div>
                <main className="flex-1 lg:mt-36">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}