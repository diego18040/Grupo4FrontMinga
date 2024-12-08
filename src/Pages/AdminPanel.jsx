import React from "react";
import { useNavigate } from "react-router-dom";
import adminpanel from "../assets/adminpanel.jpg"; 


const AdminPanel = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/adminpanel', {
      state: {
        backgroundImage: adminpanel,
        title: "Panel",
      }
    });
  }, [navigate]);

  return null;
};

export default AdminPanel;