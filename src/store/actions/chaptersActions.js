// src/store/features/chapters/chaptersActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChaptersByMangaId = createAsyncThunk(
    'chapters/fetchChaptersByMangaId',
    async (mangaId) => {
      const response = await axios.get(`http://localhost:8080/api/chapters/manga/${mangaId}`);
      return response.data;
    }
  );