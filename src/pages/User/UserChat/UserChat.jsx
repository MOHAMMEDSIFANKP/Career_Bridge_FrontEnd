import React from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import defaultprofile from "../../../assets/defaultprofile.jpeg";
function UserChat() {
  return (
    <div className="grid h-screen w-full grid-rows-[5rem,1fr]">
      <div>
        <NavbarDefault />
      </div>
      <div className="container mx-auto flex justify-center h-full py-2 items-center">
        <div className="border rounded-2xl shadow h-full grid grid-cols-[20rem,1fr]  w-full mx-10">
          <div className="border-e grid grid-rows-[5rem,1fr]">
            <div className="flex justify-center items-center">
              <div className="bg-purple-50 w-full grid grid-cols-[2rem,1fr,2rem] mx-3 rounded-xl py-2">
                <div className="flex justify-center items-center">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <div>
                  {" "}
                  <input
                    placeholder="Search"
                    type="text"
                    className="bg-transparent  w-full text-gray-800 placeholder-gray-700 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mx-4">
              <p className="font-bold text-gray-800">Chat</p>
              <div className="bg-purple-50 rounded-xl my-3 grid grid-cols-[3.5rem,1fr,2rem]">
                <div className="rounded-full flex justify-center items-center my-1 ms-2 w-10 h-10 bg-red-400">
                  <img src={defaultprofile} alt="" className="rounded-full" />
                </div>
                <div className="flex justify-start items-center">
                  <p className="text-gray-800 capitalize">Mohammed Sifan</p>
                </div>
                <div>3</div>
              </div>
            </div>
          </div>
          {/* Chatting section */}
          <div className="grid grid-rows-[4rem,1fr]">
            <div className="border-b flex items-center">
              <div className="rounded-full flex justify-center items-center my-1 ms-2 w-10 h-10">
                <img src={defaultprofile} alt="" className="rounded-full" />
              </div>
              <p className="ms-2 text-gray-800 capitalize">Mohammed sifan</p>
            </div>
            <div className="grid grid-rows-[1fr,4rem]">
              <div class="p-4 overflow-auto h-[44.4rem]">
                {/* Sender Message */}
                <div class="flex justify-end mb-2">
                  <div class="bg-purple-50 shadow border text-gray-800 py-1 px-4 rounded-md max-w-xs">
                    Hello! This is a
                  </div>
                  <div className="rounded-full flex justify-center items-center -me-3 ms-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                </div>

                {/* eceiver Message  */}
                <div class="flex mb-2">
                  <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                  <div class="shadow py-1 px-4 rounded-md max-w-xs">
                    Hi there! This is a message from the receiver.
                  </div>
                </div>
                  {/* Sender Message */}
                  <div class="flex justify-end mb-2">
                  <div class="bg-purple-50 shadow border text-gray-800 py-1 px-4 rounded-md max-w-xs">
                    Hello! This is a
                  </div>
                  <div className="rounded-full flex justify-center items-center -me-3 ms-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                </div>

                {/* eceiver Message  */}
                <div class="flex mb-2">
                  <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                  <div class="shadow py-1 px-4 rounded-md max-w-xs">
                    Hi there! This is a message from the receiver.
                  </div>
                </div>
                  {/* Sender Message */}
                  <div class="flex justify-end mb-2">
                  <div class="bg-purple-50 shadow border text-gray-800 py-1 px-4 rounded-md max-w-xs">
                    Hello! This is a
                  </div>
                  <div className="rounded-full flex justify-center items-center -me-3 ms-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                </div>

                {/* eceiver Message  */}
                <div class="flex mb-2">
                  <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                  <div class="shadow py-1 px-4 rounded-md max-w-xs">
                    Hi there! This is a message from the receiver.
                  </div>
                </div>
                  {/* Sender Message */}
                  <div class="flex justify-end mb-2">
                  <div class="bg-purple-50 shadow border text-gray-800 py-1 px-4 rounded-md max-w-xs">
                    Hello! This is a
                  </div>
                  <div className="rounded-full flex justify-center items-center -me-3 ms-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                </div>

                {/* eceiver Message  */}
                <div class="flex mb-2">
                  <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                  <div class="shadow py-1 px-4 rounded-md max-w-xs">
                    Hi there! This is a message from the receiver.
                  </div>
                </div>
                  {/* Sender Message */}
                  <div class="flex justify-end mb-2">
                  <div class="bg-purple-50 shadow border text-gray-800 py-1 px-4 rounded-md max-w-xs">
                    Hello! This is a
                  </div>
                  <div className="rounded-full flex justify-center items-center -me-3 ms-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                </div>

                {/* eceiver Message  */}
                <div class="flex mb-2">
                  <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                  <div class="shadow py-1 px-4 rounded-md max-w-xs">
                    Hi there! This is a message from the receiver.
                  </div>
                </div>
                  {/* Sender Message */}
                  <div class="flex justify-end mb-2">
                  <div class="bg-purple-50 shadow border text-gray-800 py-1 px-4 rounded-md max-w-xs">
                    Hello! This is a
                  </div>
                  <div className="rounded-full flex justify-center items-center -me-3 ms-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                </div>

                {/* eceiver Message  */}
                <div class="flex mb-2">
                  <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                  <div class="shadow py-1 px-4 rounded-md max-w-xs">
                    Hi there! This is a message from the receiver.
                  </div>
                </div>
                  {/* Sender Message */}
                  <div class="flex justify-end mb-2">
                  <div class="bg-purple-50 shadow border text-gray-800 py-1 px-4 rounded-md max-w-xs">
                    Hello! This is a
                  </div>
                  <div className="rounded-full flex justify-center items-center -me-3 ms-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                </div>

                {/* eceiver Message  */}
                <div class="flex mb-2">
                  <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-7 h-7 ">
                    <img src={defaultprofile} alt="" className="rounded-full" />
                  </div>
                  <div class="shadow py-1 px-4 rounded-md max-w-xs">
                    Hi there! This is a message from the receiver.
                  </div>
                </div>
              </div>
              <div className="border-t flex justify-center items-center">
                <div className="w-full mx-5 grid grid-cols-[1fr,2rem]">
                  <div className="bg-purple-100 py-2 rounded-full w-full px-4">
                    <input
                      placeholder="Message"
                      type="text"
                      className="bg-transparent w-full text-gray-800 placeholder-gray-700 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-center items-center ms-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-gray-800"
                    >
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChat;
