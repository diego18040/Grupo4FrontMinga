import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setUser = createAction("setUser", (datos) => {
  return {
    payload: datos,
  };
});

const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    console.log("Cerrando sesi贸n en el backend...");
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
    console.error("Error al cerrar sesi贸n:", error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.response?.data || "Error al cerrar sesi贸n");
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

    
    //  datos en localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.user._id);
    localStorage.setItem("userEmail", response.data.user.email);
    localStorage.setItem("role", response.data.user.role);

        try {
          const userDetailsResponse = await axios.get(
            `http://localhost:8080/api/users/${response.data.user._id}`,
            {
              headers: {
                Authorization: `Bearer ${response.data.token}`
              }
            }
          );


// ver el rol basado en la respuesta
if (userDetailsResponse.data.user.author) {
  localStorage.setItem("userRole", "author");
} else if (userDetailsResponse.data.user.company) {
  localStorage.setItem("userRole", "company");
}

  // agregar el rol a la respuesta
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
    const newUser = { email, password, photo };
    const response = await axios.post("http://localhost:8080/api/users/register", newUser);

    console.log("Respuesta del backend:", response.data);

    if (!response.data.user || !response.data.user._id) {
      throw new Error("El registro no devolvió un usuario válido.");
    }

    localStorage.setItem("userId", response.data.user._id);
    localStorage.setItem("userEmail", response.data.user.email);

    return response.data;
  } catch (error) {
    console.error("Error en registro:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
});




export { login, signUp, setUser, logout };
