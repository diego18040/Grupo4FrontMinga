import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChaptersByMangaId = createAsyncThunk(
  'chapters/fetchChaptersByMangaId',
  async (mangaId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8080/api/chapters/manga/${mangaId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);
