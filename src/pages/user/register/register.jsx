import React from "react";
import userImage from '../../../assets/icons8-google.svg';

function SignUp() {
    return (
        <div className="h-screen flex flex-col items-start">
            <h1 className="font-bold text-2xl text-purple-600 mt-5 ml-9">Career Bridge</h1>
            <div className="bg-white rounded-2xl sm:w-10/12 md:w-6/12 lg:w-4/12 xl:w-4/12 border border-purple-400 mx-auto mt-16 grid grid-row-8 gap-2">
                <div>
                    <h3 className="text-2xl font-medium my-8 text-center">Sign up to find work you love</h3>
                </div>
                    <div>
                        <div className="mx-10 grid grid-cols-2 gap-5">
                            <div>
                                <input type="text" id="fname" class="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="first name" />
                            </div>
                            <div className="w-full">
                                <input type="text" id="lname" class="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="last name" />
                            </div>
                        </div>
                        <div className="mx-10 my-3">
                            <input type="email" id="email" class="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="Email" />
                        </div>
                        <div className="mx-10 my-3">
                            <input type="password" id="password" class="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="Password" />
                        </div>
                        <div className="mx-10 mt-3">
                            <input type="password" id="confimpassword" class="bg-gray-50 border border-gray-300 w-full p-2 rounded-xl" placeholder="Confim password" />
                        </div>
                    </div>
                    <div className="mx-10 flex justify-between">
                        <input type="checkbox"/>
                        <p className="text-xs ms-3 mt-3">Yes, I understand and agree to the <span className="text-purple-400 p-2"> Terms of Service,</span> including the <span className="text-purple-400">User Agreement and Privacy Policy. </span></p>
                    </div>
                    <div className="mx-10 my-3">
                        <button className="w-full p-2 bg-purple-500 rounded-3xl">Create My account</button>
                    </div>
                    <div className="mx-10 flex items-center">
                     <hr className="m-5 w-full
                      border-1 border-purple-400"/>
                      <p className="text-sm">or</p>
                     <hr className="m-5 w-full border-1 border-purple-400"/>
                    </div>
                    <div className="flex mx-10 rounded-3xl mt-1 py-1 bg-purple-500 items-center">
                    <img src={userImage} alt="Google logo" className="ml-2 rounded-full h-8" />
                    <span className="flex-1 text-center font-bold text-white">Continue with Google</span>
                    </div>
                    <div className="mx-10 mt-3 flex justify-center items-center mb-10">
                    <hr className="flex-grow border-t-1 border-purple-400"/>
                    <p className="text-xs px-2">Already have an account? <span className="text-purple-400">Log in</span></p>
                    <hr className="flex-grow border-t-1 border-purple-400"/>

                    </div>
            </div>
        </div>
    )
}

export default SignUp
