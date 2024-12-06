import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setUser = createAction("setUser", (datos) => {
  return {
    payload: datos,
  };
});

const logout = createAction("logout");

const login = createAsyncThunk("login", async ({ email, password }) => {
  console.log("Entramos al Login");
  const credentials = {
    email: email,
    password: password,
  };
  const response = await axios.post("http://localhost:8080/api/auth/signin", credentials);
  console.log("Se procesó la solicitud");
  console.log("Response", response.data);
  console.log("Superamos la solicitud de Login");

  localStorage.setItem("token", response.data.token);
  return response.data;
});

const signUp = createAsyncThunk("signUp", async ({ name, lastname, email, password, photo, country }) => {
  console.log("Entramos al Registro");
  const newUser = {
    name: name,
    lastname: lastname,
    email: email,
    password: password,
    photo: photo,
    country: country,
  };
  const response = await axios.post("http://localhost:8080/api/users/register", newUser);
  console.log("Se procesó la solicitud de registro");
  console.log("Response", response.data);

  localStorage.setItem("token", response.data.token);
  return response.data;
});

export { login, signUp, setUser, logout };
