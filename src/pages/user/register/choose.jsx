import React, { useState } from "react";
import image1 from '../../../assets/users.png';
import image2 from '../../../assets/hiring.webp';

function Choos() {
  const [selectedOption, setSelectedOption] = useState('client'); // 'client' or 'freelancer'

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="h-screen flex flex-col items-start">
      <h1 className="font-bold text-2xl text-purple-600 mt-5 ml-9">Career Bridge</h1>
      <div className="bg-white rounded-2xl sm:w-10/12 md:w-6/12 lg:w-4/12 xl:w-4/12 border border-purple-400 mx-auto mt-16 grid grid-row-2 gap-2">
        <div>
          <p className="text-2xl font-bold text-center m-8">Join as a client or freelancer</p>
        </div>
        <form action="">
          <div className="grid grid-cols-2 gap-5">
            <div
              className={`border rounded-xl ms-16 grid grid-row-2 ${
                selectedOption === 'client' ? 'border-purple-500 bg-purple-200' : ''
              }`}
              onClick={() => handleOptionChange('client')}
            >
              <div className="grid grid-cols-2">
                <div>
                  <img src={image2} alt="" className="h-8 lg:h-16 m-2" />
                </div>
                <div className="flex justify-end items-start mx-3 my-3">
                  <input type="radio" checked={selectedOption === 'client'} />
                </div>
              </div>
              <div>
                <p className="font-medium m-3">I’m a client, hiring for a project</p>
              </div>
            </div>
            <div
              className={`me-16 border rounded-xl grid grid-row-2 ${
                selectedOption === 'freelancer' ? 'border-purple-500 bg-purple-200' : ''
              }`}
              onClick={() => handleOptionChange('freelancer')}
            >
              <div className="grid grid-cols-2">
                <div>
                  <img src={image1} alt="" className="h-6 lg:h-16 m-2" />
                </div>
                <div className="flex justify-end items-start mx-3 my-3">
                  <input type="radio" checked={selectedOption === 'freelancer'} />
                </div>
              </div>
              <div>
                <p className="font-medium m-3">I’m a freelancer, looking for work</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="butt w-60 p-2 mt-8  text-white rounded-3xl font-semibold bg-purple-500">
              {selectedOption === 'client' ? 'Sign In' : 'Apply as a freelancer'}
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-5 mb-8">
          <p className="text-sm p-1">Already have an account? <span className="text-purple-400 ps-1 text-sm">Log In</span></p>
        </div>
      </div>
    </div>
  );
}

export default Choos;
