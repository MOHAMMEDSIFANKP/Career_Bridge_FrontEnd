import React from 'react'
import MailconfirmImg from '../assets/mailConfirm.jpg'
import { Link } from 'react-router-dom'
function MailConfirm() {
  return (
    <div className='h-screen grid grid-rows'>
       <div className='shadow h-20 flex items-center justify-between'>
       <h1 className="font-bold text-2xl text-purple-600 ml-9">Career Bridge</h1>
       <Link to='/login' className=" text-sm text-black me-5">Login</Link>
       </div>
       <div className='container mx-auto h-screen grid grid-rows-[.08fr]'>
           <div className='text-center mt-10'>
           <h1 className='font-extrabold text-3xl text-purple-500'>Check Your Mail and Confirm</h1>
           </div>
           <div className='flex justify-center h-4/5 '>
            <img src={MailconfirmImg} className='w-full sm:w-5/6' alt="" />
           </div>
       </div>
    </div>
  )
}

export default MailConfirm