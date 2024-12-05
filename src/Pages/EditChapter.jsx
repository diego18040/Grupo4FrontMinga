// src/pages/EditChapter.jsx

import React from "react";
import CreateLayout from "../layouts/CreateLayout";  // Asegúrate de que la ruta sea correcta
import EditChapterForm from "../components/EditChapterForm"; // Asegúrate de que la ruta sea correcta

const EditChapter = () => {
  return (
    <CreateLayout>
      {/* Aquí solo se renderiza una vez el formulario */}
      <EditChapterForm />
    </CreateLayout>
  );
};

export default EditChapter;
