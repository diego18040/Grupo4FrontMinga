import {  createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (chapterId) => {
      const response = await fetch(
        `http://localhost:8080/api/comments/chapter/${chapterId}`
      );
      if (!response.ok) {
        throw new Error("Error fetching comments");
      }
      const data = await response.json();
      return data.response;
    }
  );