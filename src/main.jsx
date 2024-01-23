import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient=new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter >
            <div className="sm:block hidden">
              <ToastContainer autoClose={1500} className={'toast-container'} />
            </div>
            <App />
          </BrowserRouter >
        </QueryClientProvider>
  </React.StrictMode>,
)
