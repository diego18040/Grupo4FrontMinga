import { createReducer } from "@reduxjs/toolkit";
import { login, signUp, setUser, logout } from "../actions/authActions";

const initialState = {  
    loading: false,
    error: null,
    users: localStorage.getItem("userEmail") || null,
    token: localStorage.getItem("token") || null
};

const authReducer = createReducer(initialState, (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
        console.log("Se ejecuto correctamente");
        console.log(action);

            state.loading = false;
            state.error = false;
            state.users = action.payload.user;
            state.token = action.payload.token;
            if (action.payload.user?.email) {
                localStorage.setItem("userEmail", action.payload.user.email);
            }            
        })
        .addCase(login.pending, (state,action) => {
            console.log("Se inicio sign in");
            console.log(action);
            state.loading = true;
            state.error = false;
            state.users = null;
            state.token = null;
        })
        .addCase(login.rejected, (state, action) => {
            console.log("Error en el sign in");
            localStorage.removeItem("token");
            state.loading = false;
            state.error = action.error?.message || "Error desconocido";
            state.users = null;
            state.token = null;
        })
        .addCase(setUser, (state, action) => {
            state.users = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(logout.fulfilled, (state) => {
            console.log("Cierre de sesión exitoso");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("token");
            state.users = null;
            state.token = null;
            state.error = null;

            window.location.reload();
        })
        .addCase(logout.pending, (state) => {
            state.loading = true;
        })
        .addCase(logout.rejected, (state, action) => {
            console.error("Error al cerrar sesión:", action.payload);
            state.loading = false;
            state.error = action.payload;
        });
});

export default authReducer;
