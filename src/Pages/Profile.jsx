
// import React, { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";  
// import profile from "../assets/profile.jpg";
// import ProfileForm from "../Components/ProfilePanel";  
// import Hero from "../Components/Hero";  

// const ProfilePanel = () => {
//   const navigate = useNavigate();
//   const location = useLocation();  

//   useEffect(() => {
  
//     navigate('/profile', {
//       state: {
//         backgroundImage: profile,
//         title: "Profile",
//       }
//     });
//   }, [navigate]);

//   const isProfilePage = location.pathname === "/profile"; 

//   return (
//     <>
     
//       <div style={{ display: isProfilePage ? 'block' : 'none' }}>
//         <Hero backgroundImage={profile} title="Profile" />
//       </div>

//      <div><ProfileForm /></div>
      
//     </>
//   );
// };

// export default ProfilePanel;

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";  
import profile from "../assets/profile.jpg";
import ProfileForm from "../Components/ProfilePanel";  
import Hero from "../Components/Hero";  

const ProfilePanel = () => {
  const navigate = useNavigate();
  const location = useLocation();  

  useEffect(() => {
    // Asegúrate de redirigir solo si no estamos ya en /profile
    if (location.pathname !== "/profile") {
      navigate('/profile', {
        state: {
          backgroundImage: profile,
          title: "Profile",
        }
      });
    }
  }, [navigate, location.pathname]);

  return (
    <>
      {/* El Hero se maneja internamente, así que no necesitamos agregarlo aquí. */}
      <ProfileForm />
    </>
  );
};

export default ProfilePanel;
