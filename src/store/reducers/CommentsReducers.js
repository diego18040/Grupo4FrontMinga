import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchComments, 
    createComment, 
    updateComment, 
    deleteComment 
} from "../actions/CommentActions";

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
            // Fetch comments
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
            })
            // Create comment
            .addCase(createComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false;
                state.commentsList.unshift(action.payload);
                state.error = null;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update comment
            .addCase(updateComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.loading = false;
                state.commentsList = state.commentsList.map(comment =>
                    comment._id === action.payload._id ? action.payload : comment
                );
                state.error = null;
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete comment
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false;
                state.commentsList = state.commentsList.filter(
                    comment => comment._id !== action.payload
                );
                state.error = null;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectCommentsState = (state) => state.comments;

export default commentsSlice.reducer;