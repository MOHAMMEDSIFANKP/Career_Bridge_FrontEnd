import React, { useState } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import {MyinfoComponent} from "../../../components/Profile/MyinfoComponent";
import { PasswordSecurity } from "../../../components/Profile/PasswordSecurity";

function UserProfilePage() {
  const [option,setOption] = useState('myinfo')
  console.log(option);
  return (
    <>
      <div className="h-screen">
        <div>
          <NavbarDefault />
        </div>
        <div className="container mx-auto flex ps-20 mt-20">
          <div className="flex-row w-2/6">
            <div>
              <h1 className="text-4xl font-sans font-bold">Settings</h1>
            </div>
            <div className="mt-10 font-bold text-gray-700">
              <ul className="text-lg ">
                <li className={option==='myinfo'? 'text-purple-400' : 'hover:text-purple-400 cursor-pointer '}
                onClick={()=>setOption('myinfo')}>My info</li>
                <li className={option==='password&security'? 'text-purple-400 my-2' : 'hover:text-purple-400 cursor-pointer my-2'}
                 onClick={()=>setOption('password&security')}>Password & Security</li>
                <li className={option==='terms'? 'text-purple-400 my-2' : 'hover:text-purple-400 cursor-pointer my-2'}
                 onClick={()=>setOption('terms')}>Terms</li>
                <li className={option==='notification'? 'text-purple-400 my-2' : 'hover:text-purple-400 cursor-pointer my-2'}
                 onClick={()=>setOption('notification')}>Notification Settigs</li>
                <li className={option==='members&Permision'? 'text-purple-400 my-2' : 'hover:text-purple-400 cursor-pointer my-2'}
                 onClick={()=>setOption('members&Permision')}>members & Permision</li>
                <li className="my-2 text-red-900 cursor-pointer"
                onClick={()=>setOption('deleteaccount')}>Delete Account</li>
              </ul>
            </div>
          </div>
          <div className="w-full">
            <div className="container mx-auto">
            {option === 'myinfo' && <MyinfoComponent/>}
            {option === 'password&security' && <PasswordSecurity/>}
            {option === 'terms' && <MyinfoComponent/>}
            {option === 'notification' && <MyinfoComponent/>}
            {option === 'members&Permision' && <MyinfoComponent/>}
            </div>
          </div>  
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
