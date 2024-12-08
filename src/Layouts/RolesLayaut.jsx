
import React from "react";
import Header from "../Components/Header";
import NewRoleForm from "../Components/NewRoleForm";

const RolesLayaut = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
    
      <Header />

      {/* Main content */}
      <main>{children}</main>
      <NewRoleForm />
    </div>
  );
};

export default RolesLayaut ;
