
import { createSlice } from '@reduxjs/toolkit';
import { fetchChaptersByMangaId} from '../actions/chaptersActions.js';

const initialState = {
  chapterList: [],
  status: 'idle',
  error: null
};

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChaptersByMangaId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChaptersByMangaId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chapterList = action.payload.response || [];
      })
      .addCase(fetchChaptersByMangaId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default chaptersSlice.reducer;