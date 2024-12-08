import React from "react";
import Header from "../Components/Header";
import EditChapterForm from "../components/EditChapterForm";

const CreateLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <Header />

      <main className="p-6">{children}</main>

      <EditChapterForm />
    </div>
  );
};

export default CreateLayout;