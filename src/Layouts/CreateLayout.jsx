import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";

const CreateLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <Header />

      <main className="p-6">{children}</main>

      <Outlet />
    </div>
  );
};

export default CreateLayout;
