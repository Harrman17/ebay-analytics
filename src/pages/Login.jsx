import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '/src/firebase.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
 
export default function Login({ userLogin, setUserLogin }) {

  useEffect(() => {
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        grecaptcha.render('Login-reCaptcha')
      })
    }
  },[])


  const [submitNotification,setSubmitNotification] = useState({
    show: false,
    msg: ""
  }) // notification for any responses from requests e.g form submition

  function handleInput(e) {
    setUserLogin(prevInput => {return {
      ...prevInput,
      [e.target.name]: e.target.value
    }})
  }

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault(e)
    if (grecaptcha.getResponse() == "") {
      setSubmitNotification(prevValue => {return{
          show: true,
          msg: "Please complete the reCaptcha!"
        }})
    } else {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          userLogin.email,
          userLogin.password
        )
        setUserLogin(prevInput => {return{
          email: "",
          password: ""
        }}) // so form inputs are blank once it is submitted
        if (user) {
          navigate("/Getting-Started")
        }
      } catch(error) {
        console.log(error)
        if (error == "FirebaseError: Firebase: Error (auth/user-not-found).") {
          setSubmitNotification(prevValue => {return {
            show: true,
            msg: "User does not exist."
          }})
        } else if (error == "FirebaseError: Firebase: Error (auth/wrong-password).") {
          setSubmitNotification(prevValue => {return{
            show: true,
            msg: "Your email/password is incorrect"
          }})
        } else if (error == "FirebaseError: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
          setSubmitNotification(prevValue => {return {
            show: true,
            msg: "User blocked, please try again later"
          }})
        }
      }
    } 
  }



  return (
    <div>
      <div className='flex justify-start items-center w-full h-24 p-4 absolute top-5 left-0'>
        <img className='h-28 hidden sm:inline-block' src='/ebayanalyticscut.png'></img>
        <Link to='/Dashboard' className='justify-end bg-secondary p-4 rounded-2xl text-white ml-auto mr-8 hover:bg-hoversecondary'>
          <button onClick={() => {console.log("button working")}}>
            Skip to test the dashboard
          </button>
        </Link>
      </div>
      <div className='h-screen flex justify-center items-center text-white font-poppins'>
        <div className='sm:bg-secondary h-[530px] w-[530px] rounded-2xl overflow-hidden p-5'>
          <form className='flex flex-col items-center justify-center' onSubmit={handleLogin}>
            <h1 className='text-3xl mb-5 font-medium'>Welcome Back!</h1>
            {submitNotification.show &&
            <div className='bg-red w-[350px] h-10 rounded-md mb-4 flex flex-row items-center p-3'>
              <FontAwesomeIcon icon={faX} className='h-3 mr-4 mt-0.5 cursor-pointer' onClick={() => setSubmitNotification(prevValue => {return{...prevValue, show: false}})}/>
              <p className='text-lg'>{submitNotification.msg}</p>
            </div>}
            <div className='mb-6'>
            <label className='text-lg block'>Email Address</label>
            <input value={userLogin.email} autoComplete='off' name='email' type='email' className='h-10 w-[350px] rounded-xl text-black pl-2 font-medium'  onChange={handleInput}></input>
            </div>
            <div className='mb-9'>
            <label className='text-lg block'>Password</label>
            <input value={userLogin.password} autoComplete='off' name='password' type='password' className='h-10 w-[350px] rounded-xl text-black pl-2 font-medium' onChange={handleInput}></input>
            </div>
            <div id='Login-reCaptcha' className="g-recaptcha mb-6 -mt-3" data-sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} data-theme="dark"></div>
            <button className='bg-accent w-[300px] h-12 rounded-2xl text-lg mb-5'>Log In</button>
            <p>Don't have an account? <Link to='/' className='underline text-accent'>Sign Up</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}
