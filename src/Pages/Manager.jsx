import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import manager from "../assets/companyauthor.jpg";
import CardsEdit from "../Components/CardsEdit";
import axios from "axios";

const Manager = () => {
  const { id } = useParams(); // Obtener el id del creador desde la URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("Loading...");

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/mangas/creator/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const { data } = response;
        if (data.response && data.response.length > 0) {
          const name = data.response[0].author_id ? data.response[0].author_id.name : data.response[0].company_id.name;
          setTitle(name);
        } else {
          setTitle("No Name Found");
        }
      } catch (error) {
        console.error("Error fetching title:", error);
        setTitle("Error fetching name");
      }
    };

    fetchTitle();
  }, [id]);

  useEffect(() => {
    navigate(`/manager/${id}`, {
      state: {
        backgroundImage: manager,
        title: title, // Actualiza el título con el nombre obtenido
      }
    });
  }, [navigate, title, id]);

  return (
    <div>
      <div className="sm:block visible"></div>

      <div className="mangas-container relative -top-[500px] -mb-[500px] left-1/2 transform -translate-x-1/2 w-[95%] bg-white p-8 rounded-lg shadow-lg flex items-center justify-center opacity-100 sm:flex-row flex-col-reverse">
        <CardsEdit />
      </div>
    </div>
  );
};

export default Manager;
