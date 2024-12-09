import { createSlice } from "@reduxjs/toolkit";
import { createAuthor } from "../actions/RolesActions";

const initialState = {
    author: null,
    loading: false,
    error: null,
    success: false
};

const authorSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {
        clearAuthorState: (state) => {
            state.author = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAuthor.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createAuthor.fulfilled, (state, action) => {
                state.loading = false;
                state.author = action.payload;
                state.error = null;
                state.success = true;
            })
            .addCase(createAuthor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.success = false;
            });
    }
});

export const { clearAuthorState } = authorSlice.actions;
export default authorSlice.reducer;
