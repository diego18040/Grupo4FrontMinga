import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const createAuthor = createAsyncThunk(
    "roles/createAuthor",
    async (authorData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No authentication token found");

            const response = await axios.post(
                "http://localhost:8080/api/authors/create",
                {
                    name: authorData.name,
                    location: authorData.location,
                    dateJoined: authorData.dateJoined,
                    profileImage: authorData.profileImage,
                    email: authorData.email,
                    user_id: authorData.user_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
);

export const createCompany = createAsyncThunk(
    "roles/createCompany",
    async (companyData) => {
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            if (!userId) throw new Error("User ID is required");

            const response = await axios.post(
                "http://localhost:8080/api/companies/create",
                {
                    ...companyData,
                    user_id: userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error details:", error.response?.data);
            throw error.response?.data || error;
        }
    }
);