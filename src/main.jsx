import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProvider } from './Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // if we remove 'React.StrictMode', then the console.log() will show the output only once.
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
