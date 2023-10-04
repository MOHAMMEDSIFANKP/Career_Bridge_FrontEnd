import React, { useEffect, useState } from 'react'
import { NavbarDefault } from '../../../components/Navbar/NavBar'
import AllapplyedList from '../../../components/user/Dashboard/AllapplyedList';
import AcceptedList from '../../../components/user/Dashboard/AcceptedList';
import PendingList from '../../../components/user/Dashboard/PendingList';

function Dashboard() {
    const [selected, setselected] = useState("all");
    useEffect(()=>{
      document.title = 'Dashboard | Career Bridge'
    },[])
  return (
    <>
    <div className='grid grid-rows-[5rem,1fr]'>
        <div>
            <NavbarDefault/>
        </div>
        <div className='container mx-auto'>
        <>
      <div className="flex justify-center">
        <div className="border h-[52rem] w-full mt-4 rounded-xl mx-5 shadow-lg grid grid-rows-[9rem,1fr]">
          <div className="border-b">
            <p className="font-bold text-2xl ms-10 mt-4">Applyed Job list</p>
            <p className="ms-10">See information about all Applyed List</p>
            <div className="bg-gray-100 w-2/5 h-9 rounded-xl ms-10 mt-2 grid grid-cols-3">
              <div
                className={`flex justify-center font-bold text-gray-600 cursor-pointer items-center  hover:font-bold hover:rounded-xl hover:bold ${
                  selected === "all"
                    ? "bg-gray-400 rounded-xl font-bold text-white"
                    : ""
                }`}
                onClick={() => setselected("all")}
              >
                <p className="">All</p>
              </div>
              <div
                className={`flex justify-center font-bold text-gray-600 cursor-pointer items-center hover:font-bold hover:rounded-xl hover:bold  ${
                  selected === "accepted"
                    ? "bg-gray-400 rounded-xl font-bold text-white"
                    : ""
                }`}
                onClick={() => setselected("accepted")}
              >
                <p className="">Accepted</p>
              </div>
              <div
                className={`flex justify-center font-bold text-gray-600 cursor-pointer items-center  hover:font-bold hover:rounded-xl hover:bold ${
                  selected === "pending"
                    ? "bg-gray-400 rounded-xl font-bold text-white"
                    : ""
                }`}
                onClick={() => setselected("pending")}
              >
                <p className="">Pending</p>
              </div>
            
            </div>
          </div>
          <div className="overflow-auto">
            {selected === "all" ? (
              <AllapplyedList />
            ) : selected === "accepted" ? (
             <AcceptedList/>
            ) :(
                <PendingList/>
            ) }
          </div>
        </div>
      </div>
    </>
        </div>
    </div>
    </>
  )
}

export default Dashboard
