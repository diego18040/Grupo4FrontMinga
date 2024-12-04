import React from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpg"; 


const ProfilePanel = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/profile', {
      state: {
        backgroundImage: profile,
        title: "Profile",
      }
    });
  }, [navigate]);

  return null;
};

export default ProfilePanel;