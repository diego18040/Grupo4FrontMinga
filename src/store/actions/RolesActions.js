import { createAsyncThunk } from "@reduxjs/toolkit";

// Acción para crear autor
export const createAuthor = createAsyncThunk(
    "roles/createAuthor",
    async (authorData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/api/authors/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: authorData.name,
                    email: authorData.email
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to create author");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
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