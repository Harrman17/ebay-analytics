// start page after signing up/logging in
// from this page onwards it is not responsive as this is intented to be used on desktop anyways

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'


export default function Start() {
  return (
    <div>
        <div className='flex flex-col items-center justify-center min-h-screen text-white font-poppins p-24'>
            <h1 className='text-5xl mb-3'>Upload your sales file to get started:</h1>
            <a href='https://www.help-dilato.co.uk/dilato-dashboards' className='text-lg text-accent underline mb-8'>How do I download a sales file?</a>
            <div className='flex flex-col items-center justify-center bg-secondary w-[700px] h-[370px] rounded-2xl'>
                <FontAwesomeIcon icon={faCloudArrowUp} className='h-12 mb-4'/>
                <h2 className='text-2xl'>Choose the csv file to upload</h2>
            </div>
        </div>
    </div>
  )
}
