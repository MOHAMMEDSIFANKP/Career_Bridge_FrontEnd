import React, {useEffect, useState, useRef} from "react";
import { useNavigate, Link } from "react-router-dom";

import jwtDecode from 'jwt-decode';
import { AdminSignin } from "../../services/adminApi";
import Loader from "../../components/Loading/Loading";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminLogin(){
  const navigate = useNavigate()
  const [user,setUser] = useState ({email : '',password : ''});

  const emailInputRef = useRef(null)
  const passInputRef = useRef(null)

  //  For loading
  const [loading,setLoading] = useState(false)
  const handleLoading = () => setLoading((cur)=> !cur)
  

  useEffect(() => {
    emailInputRef.current.focus();
    document.title = 'Login | Career Bridge';

  }, []);


// Validations
  const Validation = () =>{
    if (user.email.trim() === ''){
     toast.error('Email should not be empty')
     return false
    } else if (!isValidEmail(user.email.trim())){
      setUser({email:''})
      emailInputRef.current.focus();
     toast.warn('Enter a valid email')
     return false
    } else if (user.password.trim()===''){
      passInputRef.current.focus();
      toast.error('Password should not be empty')
      return false
    // } else if (user.password.trim().length<6){
    //   passInputRef.current.focus();
    //  toast.warn('Password should be 6 letters')
     return false
    }
    return true
  };
  function isValidEmail(email){
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return Regex.test(email);
  }

// After form submition
const FormHandlerLogin = async (e) => {
  e.preventDefault();
  if (Validation()) {
    AdminSignin(user).then((res) => {
      if (res.status === 200) {
        const token = JSON.stringify(res.data)
        const decoded = jwtDecode(token)
        if (decoded.role === 'admin' && decoded.is_admin) {
          localStorage.setItem("token", token)
          toast.success('Login succesfull')
          navigate('/admin/')
        } else if (decoded.role === 'company') {
          // localStorage.setItem('token', token);
          // navigate('/company/')
        }
        else {
          toast.error('Invalid role')
        }
      } else {
        toast.error('Invalid login credentials')
      }
    })
  }
}

    return(
      <>
      {loading && <Loader />}
        <div className="h-screen grid grid-rows-[.08fr]">
          <div>
            <h1 className="font-bold text-2xl text-purple-600 mt-5 ml-9">Career Bridge</h1>
          </div>
          <div className="flex justify-center items-center">
            <div className="bg-white h-3/5 w-full sm:w-10/12 md:w-6/12 xl:w-3/12 rounded-2xl sm:border border-purple-100 shadow-xl">
              <h3 className="text-3xl font-bold my-10 text-center">Login</h3>
              <div className="m-10">
                <ToastContainer />
                <form onSubmit={FormHandlerLogin}>
                  <div>
                    <input ref={emailInputRef} type="email" value={user.email} id="email" name="email" className="bg-gray-50 border border-gray-400 w-full p-2 rounded-xl focus:outline-none focus:border-purple-500" placeholder="Email"
                      onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                  </div>
                  <div className=" my-4">
                    <input ref={passInputRef} type="password" id="password" name="password" className="bg-gray-50 border border-gray-400  w-full p-2 rounded-xl  focus:outline-none focus:border-purple-500" placeholder="Password"
                      onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                  </div>
                  <div className="flex justify-center">
                    <button type="submit" className="butt px-8 p-2 rounded-3xl font-semibold bg-purple-300 flex justify-center items-center">Sign In</button>
                  </div>
                </form>
               
              </div>
            </div>
          </div>
        </div>
  
  
      </>
    )
}
export default AdminLogin

   // <>{loading && <Loader/>}
    //   <div className="w-full h-screen flex justify-center items-center">
    //     <div className="bg-white rounded-2xl  w-full sm:w-10/12 md:w-6/12 xl:w-3/12 sm:border border-purple-400">
    //       <h3 className="text-3xl font-bold my-10 text-center">Login</h3>
    //       <div className="m-10">
    //       <ToastContainer />
    //         <form onSubmit={FormHandlerLogin}>
    //             <div>
    //             <input  ref={emailInputRef} type="email" value={user.email} id="email" name="email" className="bg-gray-50 border border-gray-400 w-full p-2 rounded-xl focus:outline-none focus:border-purple-500" placeholder="Email" 
    //             onChange={(e) => setUser({...user,[e.target.name]: e.target.value})}/>
    //             </div> 
    //             <div className=" my-4">
    //             <input ref={passInputRef} type="password" id="password" name="password" className="bg-gray-50 border border-gray-400  w-full p-2 rounded-xl  focus:outline-none focus:border-purple-500" placeholder="Password"
    //             onChange={(e) => setUser({...user,[e.target.name]:e.target.value})} />
    //             </div> 
    //             <div className="flex justify-center">
    //             <button type="submit" className="butt px-8 p-2 rounded-3xl font-semibold bg-purple-300 flex justify-center items-center">Sign In</button>
    //             </div>
    //         </form>
    //         <div className="flex justify-between my-3">
    //             <hr className="m-5 w-44 border-1 border-purple-400"/>
    //             <p className="text-gray-500 pt-2">or</p>
    //             <hr className="m-5 w-44 border-1 border-purple-400"/>
    //         </div>
    //         <div onClick={()=>login()} className="flex rounded-3xl py-2 bg-purple-300 items-center">
    //         <img src={userImage} alt="Google logo" className="ml-2 rounded-full h-8" />
    //         <span className="flex-1 text-center font-bold text-white">Continue with Google</span>
    //         </div>
    //         <div id="signInDiv" className="flex rounded-3xl mt-5 py-2 bg-purple-300 items-center">
    //         <img src={userImage} alt="Google logo" className="ml-2 rounded-full h-8" />
    //         <span className="flex-1 text-center font-bold text-white">Continue with Google</span>
    //         </div>
    //         <div className="flex justify-between my-3">
    //             <hr className="my-5 flex-grow border-t-1 border-purple-400"/>
    //             <p className="text-gray-500 sm:text-sm px-3 text-xs pt-3"> <Link to='/choose'> Don't have an Upwork account?</Link></p>
    //             <hr className="my-5 flex-grow border-t-1 border-purple-400"/>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>

    //   const navigate = useNavigate()
//   const [user,setUser] = useState ({email : '',password : ''});

//   const emailInputRef = useRef(null)
//   const passInputRef = useRef(null)

//   //  For loading
//   const [loading,setLoading] = useState(false)
//   const handleLoading = () => setLoading((cur)=> !cur)
  

//   useEffect(() => {
//     emailInputRef.current.focus();
//     document.title = 'Login | Career Bridge';

//   }, []);

//   // For google registratin
//   const [guser, setgUser] = useState([]);

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => setgUser(codeResponse),
//     onError: (error) => console.log('Login Failed:', error)
//   });
//   useEffect(() => {
//     const GoogleAuth = async () => {
//       handleLoading()
//         try {
//             if (!guser) return;
//             const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`, {
//                 headers: {
//                     Authorization: `Bearer ${guser.access_token}`,
//                     Accept: 'application/json'
//                 }
//             });
//             const res = await UserGoogleSignin(response.data);
//               const token = JSON.stringify(res.data)
//               const decoded = jwtDecode(token)
//               if (decoded.role === 'user'){
//                 localStorage.setItem('userToken', token);
//                 navigate('/user/')
//               } else if (decoded.role === 'company'){
//                 localStorage.setItem('companyToken', token);
//                 navigate('/company/home')
//               }         
//               setgUser([])
//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.detail)
//             } else {
//                 toast.error('An error occurred during signup.');
//             }
//         }finally {
//           handleLoading();
//       }
//     };

//     GoogleAuth();
// }, [guser]);

// // Validations
//   const Validation = () =>{
//     if (user.email.trim() === ''){
//      toast.error('Email should not be empty')
//      return false
//     } else if (!isValidEmail(user.email.trim())){
//       setUser({email:''})
//       emailInputRef.current.focus();
//      toast.warn('Enter a valid email')
//      return false
//     } else if (user.password.trim()===''){
//       passInputRef.current.focus();
//       toast.error('Password should not be empty')
//       return false
//     // } else if (user.password.trim().length<6){
//     //   passInputRef.current.focus();
//     //  toast.warn('Password should be 6 letters')
//      return false
//     }
//     return true
//   };
//   function isValidEmail(email){
//     const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//       return Regex.test(email);
//   }

// // After form submition
//   const FormHandlerLogin = async (e) =>{
//     e.preventDefault();
//     if (Validation()){
//       userSignin(user).then((res) =>{
//         if (res.status === 200) {
//           const token = JSON.stringify(res.data)
//           const decoded = jwtDecode(token)
//           if (decoded.role === 'user') {
//               localStorage.setItem("userToken", token)
//               toast.success('Login succesfull')
//               navigate('/user/')
//           } else if (decoded.role ==='company'){
//             localStorage.setItem('companyToken', token);
//             navigate('/company/')
//           }
//            else {
//               toast.error('Invalid user')
//           }
//       } else {
//           toast.error('Invalid login credentials')
//       }
//       })
//     }
//   }