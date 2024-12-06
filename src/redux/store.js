import {configureStore} from "@reduxjs/toolkit";
import {userSignUpReducer} from "./reducers/userReducers.js";
import authReducer from "../../store/reducer/authReducer"

const store = configureStore({
  reducer: {
    userSignUpReducer,
    authStore: authReducer
  }
});

export default store;