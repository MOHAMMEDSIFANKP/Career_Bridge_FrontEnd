import React,{useEffect, useRef, useState} from "react";
import userImage from '../../../assets/icons8-google.svg';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [user, setUser] = useState ({fname:'',lname:'',email:'',password:'',cpassword:'',check:false})
    console.log(user)
    const FirstInputRef = useRef(null)
    useEffect(() => {
        FirstInputRef.current.focus();
        document.title = 'SignUp | Career Bridge';    
      }, []);

      function isValidEmail(email){
        const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return Regex.test(email);
      }

//   After form submition
    const FormHandlerSignup = async (e) =>{
        e.preventDefault();
        if (user.fname.trim() ===''){
            return toast.error('Fist name should not be empty')
        } else if (user.lname.trim() ===''){
            return toast.error('Last name should not be empty')
        } else if (user.email.trim()===''){
            return toast.error('Email should not be empty')
        }  else if (!isValidEmail(user.email.trim())){
            setUser({email:''})
            return toast.error('Enter a valid Email')
        } else if (user.password.trim() === ''){
            return toast.error('Password should not be empty')
        }else if (user.password.trim().length<6){   
            return toast.warn('Password should be 6 letters')
        } else if (user.cpassword ===''){
            return toast.error('Confirm Password should not be empty')
        } else if (user.password != user.cpassword){
            return toast.error('Password and Confirm password should not be same')
        }  else if (user.check===false){
            return toast.error('Checkbox should not be empty')
        }
    }

    return (
        <div className="h-screen flex flex-col items-start">
            <h1 className="font-bold text-2xl text-purple-600 mt-5 ml-9">Career Bridge</h1>
            <div className="bg-white rounded-2xl w-6/12 lg:w-4/12 xl:w-3/12 sm:border border-purple-400 mx-auto sm:mt-28 grid grid-row-8 gap-2">
                <div>
                    <h3 className="text-2xl font-medium my-8 text-center">Sign up to find work you love</h3>
                </div>
                <form onSubmit={FormHandlerSignup}>
                    <div>
                        <div className="mx-10 grid grid-cols-2 gap-5">
                            <div>
                                <input ref={FirstInputRef} type="text" name="fname" className="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="first name" 
                                onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}/>
                            </div>
                            <div className="w-full">
                                <input type="text" name="lname" className="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="last name" 
                                 onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}/>
                            </div>
                        </div>
                        <div className="mx-10 my-3">
                            <input type="email" name="email" className="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="Email" 
                             onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}/>
                        </div>
                        <div className="mx-10 my-3">
                            <input type="password" name="password" className="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="Password"
                             onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
                        </div>
                        <div className="mx-10 mt-3">
                            <input type="password" name="cpassword" className="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="Confim password"
                             onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
                        </div>
                    </div>
                    <div className="mx-10 my-3 flex justify-between">
                        <input type="checkbox" name="check" value={user}
                         onChange={(e)=>setUser({...user,[e.target.name]:true})}/>
                        <p className="text-xs ms-3 mt-3">Yes, I understand and agree to the <span className="text-purple-400 p-2"> Terms of Service,</span> including the <span className="text-purple-400">User Agreement and Privacy Policy. </span></p>
                    </div>
                    <div className="mx-10 mb-2 mt-5">
                        <button type="submit" className="w-full p-2 bg-purple-300 rounded-3xl font-bold">Create My account</button>
                    </div>
                </form>

                    <div className="mx-10 flex items-center">
                     <hr className="m-5 w-full
                      border-1 border-purple-400"/>
                      <p className="text-sm">or</p>
                     <hr className="m-5 w-full border-1 border-purple-400"/>
                    </div>
                    <div className="flex mx-10 rounded-3xl mt-1 py-1 bg-purple-300 items-center">
                    <img src={userImage} alt="Google logo" className="ml-2 rounded-full h-8" />
                    <span className="flex-1 text-center font-bold text-white">Continue with Google</span>
                    </div>
                    <div className="mx-10 mt-6 flex justify-center items-center mb-9">
                    <hr className="flex-grow border-t-1 border-purple-400"/>
                    <p className="text-xs px-2">Already have an account? <span className="text-purple-400">Log in</span></p>
                    <hr className="flex-grow border-t-1 border-purple-400"/>
                    </div>
                    <ToastContainer />
            </div>
        </div>
    )
}

export default SignUp
