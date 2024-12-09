import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch comments action (existing)
export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (chapterId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(
            `http://localhost:8080/api/comments/chapter/${chapterId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        if (!response.ok) {
            throw new Error("Error fetching comments");
        }
        
        const data = await response.json();
        return data.response;
    }
);

// Create comment action
export const createComment = createAsyncThunk(
    "comments/createComment",
    async ({ message, chapter_id }) => {
        const response = await fetch("http://localhost:8080/api/comments/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, chapter_id }),
        });
        if (!response.ok) {
            throw new Error("Error creating comment");
        }
        const data = await response.json();
        return data.response;
    }
);

// Update comment action
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ _id, message }) => {  // Cambiado de comment_id a _id
      const response = await fetch("http://localhost:8080/api/comments/updateMessage", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
              _id,  // Aseguramos que se envíe el _id
              message 
          }),
      });
      if (!response.ok) {
          throw new Error("Error updating comment");
      }
      const data = await response.json();
      return { _id, message }; // Retornamos el objeto actualizado
  }
);

// Delete comment action
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (_id) => {
      const response = await fetch(`http://localhost:8080/api/comments/deleteOne/${_id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          }
      });
      if (!response.ok) {
          throw new Error("Error deleting comment");
      }
      return _id;
  }
);