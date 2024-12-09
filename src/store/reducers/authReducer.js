import { createReducer } from "@reduxjs/toolkit";
import { login, signUp, setUser, logout } from "../actions/authActions";

const initialState = {  
    loading: false,
    error: null,
    users: localStorage.getItem("userEmail") || null,
    userId: localStorage.getItem("userId") || null,
    token: localStorage.getItem("token") || null,
    userRole: localStorage.getItem("userRole") || null
};

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(login.fulfilled, (state, action) => {
            console.log("Login ejecutado correctamente");
            state.loading = false;
            state.error = null;
            state.users = action.payload.user;
            state.token = action.payload.token;
            state.userId = action.payload.user._id;

            if (action.payload.user?.email) {
                localStorage.setItem("userEmail", action.payload.user.email);
            }

            // Verifica el tipo de usuario
            if (action.payload.user?.author) {
                state.userRole = 'author';
                localStorage.setItem("userRole", "author");
            } else if (action.payload.user?.company) {
                state.userRole = 'company';
                localStorage.setItem("userRole", "company");
            }
        })
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.users = null;
            state.token = null;
            state.userRole = null;
        })
        .addCase(login.rejected, (state, action) => {
            console.log("Error en el login");
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");
            state.loading = false;
            state.error = action.error?.message || "Error desconocido";
            state.users = null;
            state.token = null;
            state.userRole = null;
        })
        .addCase(setUser, (state, action) => {
            state.users = action.payload.user;
            state.token = action.payload.token;
            state.userId = action.payload.user?._id;
            
            if (action.payload.user?.author) {
                state.userRole = 'author';
            } else if (action.payload.user?.company) {
                state.userRole = 'company';
            }
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userRole");
            
            state.users = null;
            state.token = null;
            state.error = null;
            state.userId = null;
            state.userRole = null;
            
            window.location.reload();
        })
        .addCase(logout.pending, (state) => {
            state.loading = true;
        })
        .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error al cerrar sesión";
        })
        .addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.users = action.payload.user;
            state.token = action.payload.token;
            state.userId = action.payload.user._id;
            
            if (action.payload.user?.role) {
                state.userRole = action.payload.user.role;
                localStorage.setItem("userRole", action.payload.user.role);
            }
        })
        .addCase(signUp.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "Error en el registro";
            state.users = null;
            state.token = null;
            state.userRole = null;
        });
});

export default authReducer;