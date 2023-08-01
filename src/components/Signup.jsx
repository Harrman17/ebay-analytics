import React, { useState,useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '/src/firebase.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'



export default function Signup() {

  const [userSignup, setUserSignup] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  })

  const [submitNotification,setSubmitNotification] = useState({
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
      setSubmitNotification(prevValue => {return {
        show: true,
        msg: "Passwords do not match!"
      }})
    } else if (grecaptcha.getResponse() == "") {
      setSubmitNotification(prevValue => {return {
        show: true,
        msg: "Please complete the reCaptcha!"
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
      setSubmitNotification(prevValue => {return{
        ...prevValue,
        show: false
      }})
      } catch (error) {
          let errorMsg = error.message
          console.log(errorMsg)
      }
    }
  }




  return (
    <div className='h-screen flex justify-center items-center text-white font-poppins'>
      <div className='bg-secondary h-[600px] w-[530px] rounded-2xl'>
        <form onSubmit={handleSignup} className='flex flex-col items-center justify-center'>
          <h1 className='text-3xl mt-7 mb-5 font-medium'>Create Account</h1>
          {submitNotification.show &&
          <div className='bg-red w-[350px] h-10 rounded-md mb-4 flex flex-row items-center p-3'>
           <FontAwesomeIcon icon={faX} className='h-3 mr-4 mt-0.5 cursor-pointer' onClick={() => setSubmitNotification(prevValue => {return{...prevValue, show: false}})}/>
           <p className='text-lg'>{submitNotification.msg}</p>
          </div>}
          <div className='mb-6'>
            <label className='ml-1 text-lg block'>Email Address</label>
            <input value={userSignup.email} name='email' onChange={handleInput} className='h-10 w-[350px] rounded-xl text-black pl-2 font-medium' type='email' autoComplete="off" required></input>
          </div>
          <div className='mb-6'>
            <label className='ml-1 text-lg block'>Password</label>
            <input value={userSignup.password} name='password' onChange={handleInput} className='h-10 w-[350px] rounded-xl text-black pl-2' type='password' autoComplete="off" required></input>
          </div>
          <div className='mb-9'>
            <div className="flex gap-6">
              <label className='ml-1 text-lg block'>Confirm Password</label>
            </div>
            <input value={userSignup.confirmpassword} name='confirmpassword' onChange={handleInput} className='h-10 w-[350px] rounded-xl text-black pl-2' type='password' autoComplete="off" required></input>
          </div>
          <div className="g-recaptcha mb-6 -mt-3" data-sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} data-theme="dark"></div>
          <script src="https://www.google.com/recaptcha/api.js" async defer></script>
          <button className='bg-accent w-[300px] h-12 rounded-2xl text-lg'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}
