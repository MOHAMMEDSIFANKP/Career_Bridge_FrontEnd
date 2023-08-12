import React, {useEffect, useState, useRef} from "react";

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';import userImage from '../../../assets/icons8-google.svg';

function User_Login(){
  const [user,setUser] = useState ({email : '',password : ''});
  const emailInputRef = useRef(null)
  const passInputRef = useRef(null)
  console.log(user.email,user.password)
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');
  useEffect(() => {
    if (message) {
      if (message.length === 13) {
        toast.error(message);
      } else {
        toast.success(message,);
      }
    }
  }, []);  
  useEffect(() => {
    emailInputRef.current.focus();
    document.title = 'Login | Career Bridge';

  }, []);

  function isValidEmail(email){
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return Regex.test(email);
  }

// After form submition
  const FormHandlerLogin = async (e) =>{
    e.preventDefault();
    if (user.email.trim() === ''){
      return toast.error('Email should not be empty')
    } else if (!isValidEmail(user.email.trim())){
      setUser({email:''})
      emailInputRef.current.focus();
      return toast.warn('Enter a valid email')
    } else if (user.password.trim()===''){
      passInputRef.current.focus();
      toast.error('Password should not be empty')
    } else if (user.password.trim().length<6){
      passInputRef.current.focus();
      return toast.warn('Password should be 6 letters')
    }
  }
    return(
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white rounded-2xl  w-full sm:w-10/12 md:w-6/12 xl:w-3/12 border border-purple-400">
          <h3 className="text-3xl font-bold my-10 text-center">Login</h3>
          <div className="m-10">
          <ToastContainer />
            <form onSubmit={FormHandlerLogin}>
                <div>
                <input  ref={emailInputRef} type="email" value={user.email} id="email" name="email" className="bg-gray-50 border border-purple-400 w-full p-2 rounded-xl" placeholder="Email" 
                onChange={(e) => setUser({...user,[e.target.name]: e.target.value})}/>
                </div> 
                <div className=" my-4">
                <input ref={passInputRef} type="password" id="password" name="password" className="bg-gray-50 border border-purple-400  w-full p-2 rounded-xl" placeholder="Password"
                onChange={(e) => setUser({...user,[e.target.name]:e.target.value})} />
                </div> 
                <div className="flex justify-center">
                <button type="submit" className="butt px-8 p-2 rounded-3xl font-semibold bg-purple-300 flex justify-center items-center">Sign In</button>
                </div>
            </form>
            <div className="flex justify-between my-3">
                <hr className="m-5 w-44 border-1 border-purple-400"/>
                <p className="text-gray-500 pt-2">or</p>
                <hr className="m-5 w-44 border-1 border-purple-400"/>
            </div>
            <div className="flex rounded-3xl py-2 bg-purple-300 items-center">
            <img src={userImage} alt="Google logo" className="ml-2 rounded-full h-8" />
            <span className="flex-1 text-center font-bold text-white">Continue with Google</span>
            </div>
            <div className="flex rounded-3xl mt-5 py-2 bg-purple-300 items-center">
            <img src={userImage} alt="Google logo" className="ml-2 rounded-full h-8" />
            <span className="flex-1 text-center font-bold text-white">Continue with Google</span>
            </div>
            <div className="flex justify-between my-3">
                <hr className="m-5 w-14 border-1 border-purple-400"/>
                <p className="text-gray-500 text-sm pt-2">Don't have an Upwork account?</p>
                <hr className="m-5 w-14 border-1 border-purple-400"/>
            </div>
          </div>
        </div>
      </div>
    </>
      
    )
}
export default User_Login