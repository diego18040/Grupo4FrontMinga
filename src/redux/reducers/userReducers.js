import { createReducer } from "@reduxjs/toolkit";
import localStorageFn from "../../utils/localStorage.js";
import { userSignUp, userSignIn, logInWithToken, userLogOut } from "../actions/userActions.js";

const initialState = {
  user: {},
  token: "",
  isOnline: false,
};

export const userSignUpReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userSignUp.fulfilled, (store, action) => {
      localStorageFn.set("token", action.payload.token);
      console.log("Welcome to MyTynerary, " + action.payload.response.name); // Mensaje en consola
      return {
        ...store,
        user: action.payload.response,
        token: action.payload.token,
        isOnline: true,
      };
    })
    .addCase(userSignUp.rejected, (store) => {
      return {
        ...store,
        user: {},
        token: "",
        isOnline: false,
      };
    })
    .addCase(userSignIn.fulfilled, (store, action) => {
      localStorageFn.set("token", action.payload.token);
      console.log(
        "Ah... you're back here, " + action.payload.response.name + " ... again"
      ); // Mensaje en consola
      return {
        ...store,
        user: action.payload.response,
        token: action.payload.token,
        isOnline: true,
      };
    })
    .addCase(userSignIn.rejected, (store) => {
      return {
        ...store,
        user: {},
        token: "",
        isOnline: false,
      };
    })
    .addCase(logInWithToken.fulfilled, (store, action) => {
      return {
        ...store,
        user: action.payload.response,
        token: action.payload.token,
        isOnline: true,
      };
    })
    .addCase(logInWithToken.pending, (store) => {
      return {
        ...store,
        user: {},
        token: "",
        isOnline: false,
      };
    })
    .addCase(logInWithToken.rejected, (store) => {
      return {
        ...store,
        user: {},
        token: "",
        isOnline: false,
      };
    })
    .addCase(userLogOut, (store) => {
      if (store.isOnline) {
        localStorageFn.remove("token");
        console.log("Good bye, git gud 😜"); // Mensaje en consola
      }
      return {
        ...store,
        user: {},
        token: "",
        isOnline: false,
      };
    });
});
