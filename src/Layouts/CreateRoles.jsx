// CreateRoles.jsx
import React from "react";
import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import NewRoleFormTwo from "../Pages/RoleCompany";
import NewRoleFormOne from "../Components/CreateRoleForm"; // Add this import


const CreateRoles = ({ children }) => {
    const location = useLocation();
    const selectedRole = location.state?.role;

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main>{children}</main>
            {selectedRole === 'Company' && <NewRoleFormTwo />}
            {selectedRole === 'Author' && <NewRoleFormOne />}
        </div>
    );
};

export default CreateRoles;