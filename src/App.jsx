import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { BeritaList } from './pages/BeritaList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/:name/:path' element={<BeritaList/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
