import { fetchComments } from "../actions/CommentActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentsList: [],
  loading: false,
  error: null,
};


const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsList = action.payload;
        state.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.commentsList = [];
      });
  },
});

// Selectores
export const selectCommentsState = (state) => state.comments;

export default commentsSlice.reducer;
