import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home'
import Search from './pages/Search'
import Detail from './pages/Detail'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <BaseLayout>
        <Routes>
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/details/:id' element={<Detail />} />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  </React.StrictMode>,
)
