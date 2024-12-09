import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import profile from "../assets/profile.jpg";
import ProfileForm from "../Components/ProfilePanel";
import Hero from "../Components/Hero";

const ProfilePanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/profile") {
      navigate('/profile', {
        state: {
          backgroundImage: profile,
          title: "Profile",
        }
      });
    }
  }, [navigate, location.pathname]);
  const isProfilePage = location.pathname === "/profile"; 
  return (
    <>
      {isProfilePage && (
        <div className="hidden md:block">
          <Hero backgroundImage={profile} title="Profile" />
        </div>
      )}
      <ProfileForm />
    </>
  );
};

export default ProfilePanel;
