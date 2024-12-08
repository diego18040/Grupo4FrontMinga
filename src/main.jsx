import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx';
import { store } from '../src/store/store.js'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)