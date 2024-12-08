import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import {GoogleOAuthProvider} from "@react-oauth/google";
import './index.css'
import App from './App.jsx'
import store from "../store/store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <GoogleOAuthProvider clientId={import.meta.env["VITE_GOOGLE_CLIENT_ID"]}>
  <StrictMode>
    <App />
  </StrictMode>
  </GoogleOAuthProvider>
  </Provider>
);
