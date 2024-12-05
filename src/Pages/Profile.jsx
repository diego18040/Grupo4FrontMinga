import React from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpg";
import ProfileForm from "../Components/ProfilePanel";  
  
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

  return (
    <div className="profile-panel-container">
      <ProfileForm />
    </div>
  );
};

export default ProfilePanel;
