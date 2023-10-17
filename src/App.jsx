import React, { useEffect, useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Start from './pages/Start'
import Dashboard from './pages/Dashboard'


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
 
  //we're scrapping all this authentication shit now lets move onto using papaparse and getting this dashboard setup, no point in wasting time in this broken project, need to move on. ALL PROJECTS WON'T BE PERFECT

  return (
    <div>
      <Routes>
        <Route path='/' 
        element={<Signup userSignup={userSignup} setUserSignup={setUserSignup}/>}/>
        <Route 
        path='/Login' 
        element={<Login userLogin={userLogin} setUserLogin={setUserLogin}/>}/>
        <Route 
        path='/Getting-Started' 
        element={<Start userLogin={userLogin}/>} />
        <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}
