import { fetchChapter } from "../actions/ReadMangas";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    chapterData: null,
    loading: false,
    error: null,
};

const mangaSlice = createSlice({
    name: "manga",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChapter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChapter.fulfilled, (state, action) => {
                state.loading = false;
                state.chapterData = action.payload;
                state.error = null;
            })
            .addCase(fetchChapter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.chapterData = null;
            });
    },
});

export const selectMangaState = (state) => state.manga;

export default mangaSlice.reducer;