// start page after signing up/logging in
// from this page onwards it is not responsive as this is intented to be used on desktop anyways

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faX } from '@fortawesome/free-solid-svg-icons'
import { auth } from '/src/firebase.js'
import { useNavigate } from 'react-router-dom'

export default function Start({userLogin}) {

  const [dragActive,setDragActive] = useState(false)
  const [submitNotification,setSubmitNotification] = useState({
    show: false,
    msg: ""
  })

  const navigate = useNavigate()
  const handleUser = () => {
    if (auth.currentUser == null) {
      console.log("user not found")
      navigate('/')
    }
  }


  const handleDrag = (e) => {
    e.preventDefault()
    if (e.type == "dragenter" || e.type == "dragover") {
      setDragActive(true)
    } else if (e.type == "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation() //prevents bubbling
    setDragActive(false)

    const droppedFile = e.dataTransfer.files

    if (!droppedFile[0].type.match('csv')) {  
      setSubmitNotification(prevValue => {return{
        show: true,
        msg: "Please make sure you are uploading a .csv file"
      }})
    } else if (droppedFile && droppedFile.length == 1) { //checks for specifically 1 file in the data transfer object array
      console.log('one csv file was dropped')
    }
  }



  const handleClick = (e) => {
    const clickedFile = e.target.files // file uploaded using normal click method
    console.log(clickedFile)
    if (!clickedFile.type.match('csv')) {
      console.log("not csv mate")
    }
  }




  return (
    <div>
        <div className='flex flex-col items-center justify-center min-h-screen text-white font-poppins p-24'>
            <h1 className='text-5xl mb-3'>Upload your Ebay sales file to get started:</h1>
            <a href='https://www.help-dilato.co.uk/dilato-dashboards' className='text-lg text-accent underline mb-8'>How do I download a sales file?</a>
            { submitNotification.show &&
            <div className='bg-red w-[450px] h-10 rounded-md mb-4 flex flex-row items-center p-3'>
              <FontAwesomeIcon icon={faX} className='h-3 mr-4 mt-0.5 cursor-pointer' onClick={() => setSubmitNotification(prevValue => {return{...prevValue, show: false}})}/>
              <p className='text-lg'>{submitNotification.msg}</p>
            </div>}
            <form>
              <input type='file' id='file-input' className='hidden' accept='.csv'/>
              <label htmlFor='file-input' className='h-full'>
                <div onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} onClick={handleClick} className={`${dragActive ? 'bg-hoversecondary' : 'bg-secondary'} flex flex-col items-center justify-center w-[700px] h-[370px] rounded-2xl border-solid border-black border-2 cursor-pointer hover:bg-hoversecondary`}>
                  <FontAwesomeIcon icon={faCloudArrowUp} className='h-12 mb-4'/>
                  <p className='text-2xl'>Choose the csv file to upload</p>
                </div>
              </label>
            </form>
        </div>
    </div>
  )
}
