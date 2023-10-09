import React, { useEffect, useRef, useState } from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";
import defaultprofile from "../../../assets/defaultprofile.jpeg";
import { useQuery } from "react-query";
import Loader from "../../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { wsApiUrl } from "../../../constants/constants";
import { userAxiosInstant } from "../../../utils/axiosUtils";
import { UsersListing } from "../../../services/companyApi";
import { useLocation } from "react-router-dom";
function CompanyChat() {
  const location = useLocation();
  const UserData = location.state && location.state.sel;
  const { CompanyInfo } = useSelector((state) => state.company);
  const [UsersList, setUsersList] = useState([]);
  const [Search, setSearch] = useState("");

  const [senderdetails, setSenderDetails] = useState(CompanyInfo);
  const [recipientdetails, setRecipientDetails] = useState({});
  const [clientstate, setClientState] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();

  useEffect(() => {
    if (UserData) {
      setRecipientDetails({
        id: UserData.user.id,
        email: UserData.user.email,
        profile_image: UserData.user.profile_image,
      });
    }
  }, [UserData]);
  const onButtonClicked = () => {
    if (messageRef.current.value.trim() == "") {
      return;
    }
    clientstate.send(
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderdetails.email,
        receiverUsername: recipientdetails.email,
      })
    );
    messageRef.current.value = "";
  };

  const setUpChat = () => {
    userAxiosInstant.get(`chat/user-previous-chats/${senderdetails.id}/${recipientdetails.id}/`).then((response) => {
      if (response.status == 200) {
          setMessages(response.data)
      }
  })
    const client = new W3CWebSocket(
      `${wsApiUrl}/ws/chat/${senderdetails.id}/?${recipientdetails.id}`
    );
    setClientState(client);
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: dataFromServer.message,
            sender_username: dataFromServer.senderUsername,
          },
        ]);
      }
    };

    client.onclose = () => {
      console.log("Websocket disconnected", event.reason);
    };

    return () => {
      client.close();
    };
  };
  useEffect(() => {
    if (senderdetails.id != null && recipientdetails.id != null) {
      setUpChat();
    }
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [senderdetails, recipientdetails]);

  //  For Searching
  const HandleSearch = async (e) => {
    setSearch(e.target.value);
    try {
      const res = await UsersListing(CompanyInfo.id, e.target.value);
      setUsersList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Clear data
  const clearSearchAndFetchAll = async () => {
    setSearch("");
    try {
      const res = await UsersListing(CompanyInfo.id, "");
      setUsersList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Data fech in backend
  async function GetUserList() {
    try {
      const res = await UsersListing(CompanyInfo.id, Search);
      setUsersList(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  //---------------------------- React quary---------------------------------------//
  const { data, isLoading, isError } = useQuery(
    "GetUserList",
    GetUserList
  );
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>There was an error fetching data</h1>;
  }
  //---------------------------- React quary---------------------------------------//

  return (
    <div className="grid h-screen w-full grid-rows-[5rem,1fr]">
      <div>
        <NavbarDefault />
      </div>
      <div className="container mx-auto flex justify-center items-center">
        <div className="border rounded-2xl shadow grid grid-cols-[20rem,1fr]  w-full mx-10">
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
                    value={Search}
                    onChange={HandleSearch}
                    className="bg-transparent  w-full text-gray-800 placeholder-gray-700 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  {Search ? (
                    <svg
                      onClick={clearSearchAndFetchAll}
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
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="mx-4">
              <p className="font-bold text-gray-800">Chat</p>

              {UsersList.length > 0 ? (
                UsersList.map((users, index) => (
                  <div
                    key={index}
                    className="bg-purple-50 cursor-pointer rounded-xl my-3 grid grid-cols-[3.5rem,1fr,2rem]"
                    onClick={() =>
                      setRecipientDetails({
                        id: users.userId,
                        email: users.email,
                        profile_image: users.profile_image,
                      })
                    }
                  >
                    <div className="rounded-full flex justify-center items-center my-1 ms-2 w-10 h-10">
                      <img
                        src={users.profile_image || defaultprofile}
                        alt=""
                        className="rounded-full h-9 w-9 border"
                      />
                    </div>
                    <div className="flex justify-start items-center">
                      <p className="text-gray-800 text-sm capitalize">
                        {users.first_name} {users.last_name}
                      </p>
                    </div>
                    <div>{users.someValue}</div>
                  </div>
                ))
              ) : (
                <p className="text-center font-bold text-gray-600">
                  No companies found
                </p>
              )}
            </div>
          </div>
          {/* Chatting section */}
          {recipientdetails.email ? (
            <div className="grid grid-rows-[4rem,1fr]">
              <div className="border-b flex items-center">
                <div className="rounded-full flex justify-center items-center my-1 ms-2 w-10 h-10">
                  <img
                    src={
                      recipientdetails?.profile_image
                        ? recipientdetails.profile_image
                        : defaultprofile
                    }
                    alt=""
                    className="rounded-full h-9 w-9"
                  />
                </div>
                <p className="ms-2 text-gray-800 capitalize">Mohammed sifan</p>
              </div>
              <div className="grid grid-rows-[1fr,4rem]">
                <div class="p-4 overflow-auto h-[44.4rem]">
                  {messages.map((message, index) =>
                    senderdetails.email === message.sender_email ||
                    senderdetails.email === message.sender_username ? (
                      <>
                        <div class="flex justify-end mb-2" key={index}>
                          <div class="bg-purple-50 shadow border text-gray-800 py-1 px-4 rounded-md max-w-xs">
                            {message.message}
                          </div>
                          <div className="rounded-full flex justify-center items-center -me-3 ms-1 w-7 h-7 ">
                            <img
                              src={
                                senderdetails.profile_image
                                  ? senderdetails.profile_image
                                  : defaultprofile
                              }
                              alt=""
                              className="rounded-full w-5 h-5"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="flex mb-2" key={index}>
                          <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-7 h-7 ">
                            <img
                              src={
                                recipientdetails.profile_image
                                  ? recipientdetails.profile_image
                                  : defaultprofile
                              }
                              alt=""
                              className="rounded-full w-5 h-5"
                            />
                          </div>
                          <div class="shadow py-1 px-4 rounded-md max-w-xs">
                            {message.message}
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>
                <div className="border-t flex justify-center items-center">
                  <div className="w-full mx-5 grid grid-cols-[1fr,2rem]">
                    <div className="bg-purple-100 py-2 rounded-full w-full px-4">
                      <input
                        placeholder="Message"
                        type="text"
                        ref={messageRef}
                        className="bg-transparent w-full text-gray-800 placeholder-gray-700 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-center items-center ms-3">
                      <svg
                        onClick={onButtonClicked}
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
          ) : (
            <div className="bg-purple-50 flex h-[52rem] justify-center items-center rounded-xl">
              <p className="font-bold text-xl text-gray-600">Select A Person</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyChat;
