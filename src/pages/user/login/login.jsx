import React, {useEffect} from "react";
import userImage from '../../../assets/icons8-google.svg';
function User_Login(){
  useEffect(() => {
    document.title = 'Sign in';
  }, []);
    return(
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white rounded-2xl  w-full sm:w-10/12 md:w-6/12 lg:w-4/12 xl:w-3/12 border border-purple-400">
          <h3 className="text-3xl font-bold my-10 text-center">Login</h3>
          <div className="m-10">
            <form>
                <div>
                <input type="email" id="email" class="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="Email" />
                </div> 
                <div className=" my-4">
                <input type="password" id="password" class="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="Password" />
                </div> 
                <div className="flex justify-center">
                <button className="butt px-8 p-2 rounded-3xl font-semibold bg-purple-500 flex justify-center items-center">Sign In</button>
                </div>
            </form>
            <div className="flex justify-between my-3">
                <hr className="m-5 w-44 border-1 border-purple-400"/>
                <p className="text-gray-500 pt-2">or</p>
                <hr className="m-5 w-44 border-1 border-purple-400"/>
            </div>
            <div className="flex rounded-3xl py-2 bg-purple-500 items-center">
            <img src={userImage} alt="Google logo" className="ml-2 rounded-full h-8" />
            <span className="flex-1 text-center font-bold text-white">Continue with Google</span>
            </div>
            <div className="flex rounded-3xl mt-5 py-2 bg-purple-500 items-center">
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