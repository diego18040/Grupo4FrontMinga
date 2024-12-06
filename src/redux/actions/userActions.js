import axios from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import localStorageFn from "../../utils/localStorage.js";
import { apiURL } from "../../utils/apiURL";

export const userSignUp = createAsyncThunk("userSignUp", async (userData) => {
  try {
    const res = await axios.post(apiURL + "auth/signUp", {
      ...userData,
    });
    return res.data;
  } catch (error) {
    console.error("Sign Up Error:", error.response?.data?.error || error.message);
    // Opcional: Puedes manejar el error mostrando un mensaje con alert() o actualizando un estado global/local
    alert("Error: " + (error.response?.data?.error || "Something went wrong."));
    throw new Error(error);
  }
});

export const userSignIn = createAsyncThunk("userSignIn", async (userData) => {
  try {
    const res = await axios.post(apiURL + "auth/signIn", {
      ...userData,
    });
    return res.data;
  } catch (error) {
    console.error("Sign In Error:", error.response?.data?.error || error.message);
    // Opcional: Mostrar el mensaje con alert()
    alert("Error: " + (error.response?.data?.error || "Something went wrong."));
    throw new Error(error);
  }
});

export const logInWithToken = createAsyncThunk("logInWithToken", async () => {
  const token = localStorageFn.getText("token");
  const res = await axios.get(apiURL, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.data;
});

export const userLogOut = createAction("userLogOut", () => {
  return {
    payload: "",
  };
});
