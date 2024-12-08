import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from "../store/store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
);
