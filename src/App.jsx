import React, { useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Start from './pages/Start'

export default function App() {

  const [userSignup, setUserSignup] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  })
  
  
  const [userLogin,setUserLogin] = useState({
    email: "",
    password: ""
  })
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup 
        userSignup={userSignup} 
        setUserSignup={setUserSignup}/>}/>
        <Route path='/Login' element={<Login 
        userLogin={userLogin} 
        setUserLogin={setUserLogin}/>}/>
        <Route path='/Getting-Started' element={<Start 
        userLogin={userLogin}/>} />
      </Routes>
    </div>
  )
}
