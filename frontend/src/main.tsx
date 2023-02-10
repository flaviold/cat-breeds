import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import App from './App'
import BreedGrid from './components/BreedGrid'
import { CssBaseline } from '@mui/material'
import BaseLayout from './layouts/BaseLayout'

// import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <BreedGrid />
  },
  {
    path: '/details/:id',
    element: <App />,
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <BaseLayout>
      <RouterProvider router={router} />
    </BaseLayout>
  </React.StrictMode>,
)
