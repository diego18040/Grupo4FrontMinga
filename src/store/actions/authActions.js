import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setUser = createAction("setUser", (datos) => {
  return {
    payload: datos,
  };
});

const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    console.log("Cerrando sesión en el backend...");
    const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local
    const response = await axios.post(
      "http://localhost:8080/api/auth/signout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en la cabecera
        },
      }
    );

    console.log("Logout registrado en el backend", response.data);

    // Limpia el almacenamiento local tras confirmar el logout
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return {}; // No necesitamos un payload específico aquí
  } catch (error) {
    console.error("Error al cerrar sesión:", error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.response?.data || "Error al cerrar sesión");
  }
});

const login = createAsyncThunk("login", async ({ email, password }) => {
  console.log("Entramos al Login");
  const credentials = {
    email: email,
    password: password,
  };
  const response = await axios.post("http://localhost:8080/api/auth/signIn", credentials);
  console.log("Se procesó la solicitud");
  console.log("Response", response.data);
  console.log("Superamos la solicitud de Login");

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userId", response.data.user._id); // Guardar userId en el localStorage
  return response.data;
});

const signUp = createAsyncThunk("signUp", async ({ email, password, photo }) => {
  console.log("Entramos al Registro");
  const newUser = {
    email: email,
    password: password,
    photo: photo,
  };
  const response = await axios.post("http://localhost:8080/api/users/register", newUser);
  console.log("Se procesó la solicitud de registro");
  console.log("Response", response.data);

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userId", response.data.user._id); // Guardar userId en el localStorage
  return response.data;
});

export { login, signUp, setUser, logout };
