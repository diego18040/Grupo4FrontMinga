import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Fetch comments
export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (chapterId) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get(
            `http://localhost:8080/api/comments/chapter/${chapterId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data.response;
    }
);

export const createComment = createAsyncThunk(
    "comments/createComment", 
    async (commentData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");

            // Preparar datos para el body
            const requestData = {
                message: commentData.message,
                chapter_id: commentData.chapter_id
            };

            console.log("Request data being sent:", requestData);
            const response = await axios.post(
                `http://localhost:8080/api/comments/create?id=${commentData.user_id}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Server response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Full error details:", error.response?.data);
            throw error.response?.data || error;
        }
    }
);
export const updateComment = createAsyncThunk(
    "comments/updateComment",
    async ({ _id, message, user_id }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");

            const response = await axios.put(
                `http://localhost:8080/api/comments/updateMessage/${_id}`, 
                {
                    message,
                    user_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Update response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating comment:", error.response?.data);
            throw error.response?.data || error;
        }
    }
);

export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async ({ _id, user_id }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");
            await axios.delete(
                `http://localhost:8080/api/comments/deleteOne/${_id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return _id;
        } catch (error) {
            console.error("Error deleting comment:", error.response?.data);
            throw error.response?.data || error;
        }
    }
);