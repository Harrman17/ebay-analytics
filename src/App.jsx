import React, { useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Start from './pages/Start'
import { onAuthStateChanged, getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'

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
  
  onAuthStateChanged(getAuth(), (user) => {
    if (user) { //if logged in
      setPersistence(getAuth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(getAuth, userLogin.email, userLogin.password)
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
      })
    }
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
