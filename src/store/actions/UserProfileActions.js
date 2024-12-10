import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Acción para obtener datos del autor
export const fetchAuthorData = createAsyncThunk(
  'userProfile/fetchAuthorData',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const url = `http://localhost:8080/api/authors/${userId}`;
      console.log('Fetching author data from URL:', url);
      const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('Author data response:', response.data);

      const data = response.data.response[0];
      return {
        id: data._id,
        imageUrl: data.photo,
        name: data.name,
        lastName: data.last_name,
        city: data.city,
        country: data.country,
        birthDate: new Date(data.date).toLocaleDateString(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción para obtener las tarjetas creadas por el autor
export const fetchCardsData = createAsyncThunk(
  'userProfile/fetchCardsData',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const url = `http://localhost:8080/api/mangas/creator/${userId}`;
      console.log('Fetching cards data from URL:', url);
      const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('Cards data response:', response.data);

      return response.data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
