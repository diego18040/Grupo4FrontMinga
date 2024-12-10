import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfilePanel from "../Components/ProfilePanel"; // Asegúrate de que esta ruta es correcta

export default function EditAuthor() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el userId desde la URL
  const profile = "../assets/profile.jpg"; // URL de la imagen del perfil
  
  useEffect(() => {
    if (id) {
      navigate('', {
        state: {
          backgroundImage: profile,
          title: "Profile",
        }
      });
    }
  }, [navigate, id, profile]);

  return (
    <>
      <main className="flex flex-col items-center">
        <ProfilePanel />
      </main>
      <section className="py-10 max-w-screen-xl mx-auto">
        <div className="">
        </div>
      </section>
    </>
  );
}
