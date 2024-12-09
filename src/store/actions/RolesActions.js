import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const createAuthor = createAsyncThunk(
    "roles/createAuthor",
    async (authorData) => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);

            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await axios.post(
                "http://localhost:8080/api/authors/create",
                {
                    name: authorData.name,
                    email: authorData.email,
                    userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error("Create author error:", error);
            throw error.response?.data || error.message;
        }
    }
);

// Acción para crear compañía
export const createCompany = createAsyncThunk(
    "roles/createCompany",
    async (companyData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/api/companies/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: companyData.name,
                    email: companyData.email,
                    website: companyData.website
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to create company");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);