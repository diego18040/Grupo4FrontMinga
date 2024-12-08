import React from "react";
import { useNavigate } from "react-router-dom";
import manager from "../assets/companyauthor.jpg";

const Manager = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/manager', {
      state: {
        backgroundImage: manager,
        title: "CompanyName or AuthorName",

      }
    });
  }, [navigate]);

  return null
};

export default Manager;