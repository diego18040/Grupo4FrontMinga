import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


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
    async ({ _id, message }) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.put(
            "http://localhost:8080/api/comments/updateMessage",
            { _id, message },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return { _id, message };
    }
);


export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (_id) => {
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
    }
);