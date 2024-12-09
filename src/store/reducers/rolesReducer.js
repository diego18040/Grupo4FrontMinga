import { createSlice } from "@reduxjs/toolkit";
import { createAuthor, createCompany } from "../actions/RolesActions";

const initialState = {
    loading: false,
    error: null,
    success: false,
    data: null
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        clearRoleState: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAuthor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAuthor.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.data = action.payload;
            })
            .addCase(createAuthor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.data = action.payload;
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearRoleState } = rolesSlice.actions;
export default rolesSlice.reducer;