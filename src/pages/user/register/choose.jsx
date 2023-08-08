import React from "react";
function Choos(){
    return(
        <div className="h-screen bg-red-800 flex flex-col items-start">
        <h1 className="font-bold text-2xl text-purple-600 mt-5 ml-9">Career Bridge</h1>
        <div className="bg-white rounded-2xl w-full sm:w-10/12 md:w-6/12 lg:w-4/12 xl:w-3/12 border border-purple-400 mx-auto my-10">
        <div className="bg-black flex justify-center">
            <div className="bg-green-700 h-40 my-8 me-2 ms-3">
                <p>I’m a client, hiring
                    for a project</p>
            </div>
            <div className="bg-yellow-600 my-8 me-2">
                <p>I’m a freelancer, 
                looking for work</p>
            </div>
        </div>
        <button className="">Join</button>
        </div>
      </div>
      
    )
}
export default Choos