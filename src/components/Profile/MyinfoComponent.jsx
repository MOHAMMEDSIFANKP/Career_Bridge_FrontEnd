import EditIcon from '../../assets/Edit.png'
import Defaultprofile from '../../assets/ProfileImg.jpeg'
import { useState,useEffect } from 'react';
// Redex
import { useDispatch } from "react-redux";
import { setExperiences } from '../../Redux/UserSlice';
import { useSelector } from "react-redux/es/hooks/useSelector";


function MyinfoComponent() {
  const { UserInfo } = useSelector((state) => state.user);
  
  useEffect(()=>{
  },[UserInfo])
  return (
    <>
      <div className="w-full flex">
        <div>
          <p className="text-3xl font-bold "> My info</p>
          <p className="mt-3 mb-8">This is a client account</p>
        </div>
      </div>
      <div className="me-10 h-60 rounded-2xl border border-purple-400">
       <div className="flex justify-between">
        <div className='flex items-end ms-5 text-xl font-bold'><p>Account</p></div>
        <div><div className='w-8 h-8 rounded-full border border-purple-400 me-4 mt-4 flex justify-center items-center'><img src={EditIcon } className='w-5' alt="" /></div></div>
       </div>
        <div className='mx-5 flex items-center'>
            <div className='w-1/5'>
              <div className='mt-4'>
              <img className='w-24 border border-purple-400 rounded-full' src={UserInfo ? UserInfo.profile_image : Defaultprofile} alt="Profile image" />
              </div>
            </div>
            <div>
            <p className='font-bold text-xl'>{UserInfo.first_name}  {UserInfo.last_name}</p>
            </div>
        </div>
      </div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </>
  );
}

export default MyinfoComponent