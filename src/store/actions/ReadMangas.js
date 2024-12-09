import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchChapter = createAsyncThunk(
  'chapters/fetchChapterById',
  async (chapterId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8080/api/chapters/id/${chapterId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.response[0];
  }
);