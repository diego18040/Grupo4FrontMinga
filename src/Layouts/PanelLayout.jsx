import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import { Outlet, useLocation } from "react-router-dom";

const PanelLayout = () => {
  const location = useLocation();
  const { state } = location; 

  return (
    <div>
      <Header logo={state?.logo} />
      {state && (
        <Hero backgroundImage={state.backgroundImage} title={state.title} />
      )}
      <div>
        <Outlet />
      </div>
      <main className="flex flex-col items-center py-10">
        {state && state.children}
      </main>
    </div>
  );
};

export default PanelLayout;