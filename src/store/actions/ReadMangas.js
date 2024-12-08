import {  createAsyncThunk } from "@reduxjs/toolkit";


export const fetchChapter = createAsyncThunk(
  "manga/fetchChapter",
  async (id) => {
    const response = await fetch(`http://localhost:8080/api/chapters/id/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener los datos del capítulo");
    }
    const data = await response.json();
    return data.response[0];
  }
);