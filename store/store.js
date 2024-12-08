import {configureStore} from "@reduxjs/toolkit";
import {userSignUpReducer} from "../src/redux/reducers/userReducers.js";
import authReducer from "./reducer/authReducer.js"
import cardReducer from "../store/reducer/CardReducer.js"

const store = configureStore({
  reducer: {
    userSignUpReducer,
    authStore: authReducer,
    cards: cardReducer
  }
});

export default store;