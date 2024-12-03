import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import { Outlet } from "react-router-dom";

const PanelLayout = ({ title, backgroundImage, children }) => {
  return (
    <div>
      <Header />
      <Hero backgroundImage = {backgroundImage} title={title} />
      <div>
      <Outlet />
      </div>
      <main className="flex flex-col items-center py-10">{children}</main>
    </div>
  );
};

export default PanelLayout;

