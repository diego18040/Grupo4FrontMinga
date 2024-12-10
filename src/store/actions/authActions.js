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
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8080/api/auth/signout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Logout registrado en el backend", response.data);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");

    return {};
  } catch (error) {
    console.error("Error al cerrar sesión:", error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.response?.data || "Error al cerrar sesión");
  }
});

const login = createAsyncThunk("login", async ({ email, password }) => {
  try {
    console.log("Iniciando proceso de login");
    const credentials = {
      email,
      password,
    };

    const response = await axios.post("http://localhost:8080/api/auth/signIn", credentials);
    console.log("Login exitoso:", response.data);


    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.user._id);
    localStorage.setItem("userEmail", response.data.user.email);

        try {
          const userDetailsResponse = await axios.get(
            `http://localhost:8080/api/users/${response.data.user._id}`,
            {
              headers: {
                Authorization: `Bearer ${response.data.token}`
              }
            }
          );


if (userDetailsResponse.data.user.author) {
  localStorage.setItem("userRole", "author");
} else if (userDetailsResponse.data.user.company) {
  localStorage.setItem("userRole", "company");
}


  return {
    ...response.data,
    userRole: localStorage.getItem("userRole")
  };
} catch (error) {
  console.error("Error al obtener detalles del usuario:", error);
  return response.data;
}
} catch (error) {
console.error("Error en login:", error.response?.data || error.message);
throw error.response?.data || error;
}
});
const signUp = createAsyncThunk("signUp", async ({ email, password, photo }) => {
  try {
    console.log("Iniciando registro de usuario");
    const newUser = {
      email: email,
      password: password,
      photo: photo,
    };

    const response = await axios.post("http://localhost:8080/api/users/register", newUser);
    console.log("Registro exitoso:", response.data);


    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.user._id);
    localStorage.setItem("userEmail", response.data.user.email);

    if (response.data.user.role) {
      localStorage.setItem("userRole", response.data.user.role);
    }

    return response.data;
  } catch (error) {
    console.error("Error en registro:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
});

export { login, signUp, setUser, logout };