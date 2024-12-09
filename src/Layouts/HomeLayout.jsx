import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Carousel from "../Components/Carousel.jsx";

export default function HomeLayout() {
    return (
        <div className="min-h-screen flex flex-col relative">
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
            <div className="hidden md:block mt-40">
                <Carousel />
            </div>
                <main className=" p-o md:p-[5%] flex-1 lg:mt-30 ">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}