import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
    <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
