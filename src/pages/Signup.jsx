import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '/src/firebase.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'




export default function Signup({ userSignup, setUserSignup }) {


  useEffect(() => {
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        grecaptcha.render('Signup-reCaptcha')
      })
    }
  },[])

  const [submitNotification,setSubmitNotification] = useState({
    show: false,
    msg: ""
  }) // notification for any responses from requests e.g form submition

  
  function handleInput(e) {
    setUserSignup(prevInput => {
      return {
        ...prevInput,
        [e.target.name]: e.target.value
      }
    })
  }

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    if (userSignup.password.length < 6) {
      setSubmitNotification(prevValue => {return{
        show: true,
        msg: "Your password is too short"
      }})
      return
    }


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
      setUserSignup(prevInput => {return {
        email: "",
        password: "",
        confirmpassword: ""
      }}) // so form inputs go blank once it is submitted
      setSubmitNotification(prevValue => {return{
        ...prevValue,
        show: false
      }})
      if (user) {
        navigate("/Getting-Started")
      }
      } catch (error) {
          let errorMsg = error.message
          if (errorMsg === "Firebase: Error (auth/email-already-in-use).") {
            setSubmitNotification(prevValue => {return{
              show: true,
              msg: "Email already in use."
            }})
          }
      }
    }
  }


  return (
    <div>
      <div className='flex items-center w-full h-24 p-4 absolute top-5 left-0'>
        <img className='justify-start h-28 hidden sm:inline-block' src='/ebayanalyticscut.png'></img>
        <Link to='/Dashboard' className='justify-end bg-secondary p-4 rounded-2xl text-white ml-auto mr-8 hover:bg-hoversecondary'>
          <button onClick={() => {console.log("button working")}}>
            Skip to test the dashboard
          </button>
        </Link>
      </div>
      <div className='h-screen flex justify-center items-center text-white font-poppins'>
        <div className='sm:bg-secondary h-[600px] w-[530px] rounded-2xl sm:overflow-hidden'>
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
            <div id='Signup-reCaptcha' className="g-recaptcha mb-6 -mt-3" data-sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} data-theme="dark"></div>
            <button className='bg-accent w-[300px] h-12 rounded-2xl text-lg mb-5'>Sign Up</button>
            <p>Already have an account? <Link to='/Login' className='underline text-accent'>Log In</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}
