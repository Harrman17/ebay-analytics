import React from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Start from './pages/Start'


export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Getting-Started' element={<Start />} />
      </Routes>
    </div>
  )
}
