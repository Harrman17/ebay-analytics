import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '/src/firebase.js'



export default function Signup() {

  const [userSignup, setUserSignup] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  })

  const [submitError,setSubmitError] = useState({
    show: false,
    msg: ""
  })
 
  
  
  function handleInput(e) {
    setUserSignup(prevInput => {
      return {
        ...prevInput,
        [e.target.name]: e.target.value
      }
    })
  }



  const handleSignup = async (e) => {
    e.preventDefault()
    if (userSignup.password !== userSignup.confirmpassword) {
      setSubmitError(prevValue => {return {
        show: true,
        msg: "Passwords do not match!"
      }})
    } else {
      try {
        const user = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      ) 
      console.log(user)
      setUserSignup(prevInput => {return {
        email: "",
        password: "",
        confirmpassword: ""
      }})
      } catch (error) {
          let errorMsg = error.message
          console.log(errorMsg)
      }
    }
  }


  return (
    <div className='h-screen flex justify-center items-center text-white font-ubuntu'>
      <div className='bg-secondary h-[600px] w-[530px] rounded-2xl'>
        <form onSubmit={handleSignup} className='flex flex-col items-center justify-center'>
          <h1 className='text-3xl mt-7 mb-7 font-medium'>Create Account</h1>
          <div className='mb-6'>
            <label className='text-lg block'>Email Address</label>
            <input value={userSignup.email} name='email' onChange={handleInput} className='h-10 w-[350px] rounded-lg text-black pl-2' type='email' autoComplete="off"></input>
          </div>
          <div className='mb-6'>
            <label className='text-lg block'>Password</label>
            <input value={userSignup.password} name='password' onChange={handleInput} className='h-10 w-[350px] rounded-lg text-black pl-2' type='password' autoComplete="off"></input>
          </div>
          <div className='mb-9'>
            <div className="flex gap-6">
              <label className='text-lg block'>Confirm Password</label>
              {submitError.show && <p className="text-sm text-test m-1">{submitError.msg}</p>}
            </div>
            <input value={userSignup.confirmpassword} name='confirmpassword' onChange={handleInput} className='h-10 w-[350px] rounded-lg text-black pl-2' type='password' autoComplete="off"></input>
          </div>
          <button className='bg-accent w-[300px] h-12 rounded-2xl text-lg'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}
