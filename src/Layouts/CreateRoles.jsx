import React from "react";
import Header from "../Components/Header";
import CreateRoleform from "../Components/CreateRoleForm";


const CreateRoles= ({ children }) => {
    return (
        <div className="h-screen flex flex-col">
        
          <Header />
    
         
          <main>{children}</main>
            
          <CreateRoleform />
          
        </div>
      );
    };
    
    export default CreateRoles;