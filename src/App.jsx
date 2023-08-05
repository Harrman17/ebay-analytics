import React from 'react'
import './index.css'
import Signup from './components/Signup'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </div>
  )
}
