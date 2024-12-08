import { StrictMode } from 'react'
import { Provider } from 'react-redux'
/* import { GoogleOAuthProvider } from "@react-oauth/google" */
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   {/*  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}
      <StrictMode>
        <App />
      </StrictMode>
 {/*    </GoogleOAuthProvider> */}
  </Provider>
)