import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";

const SignInLayout = () => {
  const location = useLocation();
  const { state } = location; 

    return (
      <div>
      <Header logo={state?.logo} />
      <div>
        <Outlet />
      </div>
    </div>
    );
};

export default SignInLayout