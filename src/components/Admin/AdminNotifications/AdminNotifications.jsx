import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../../Loading/Loading";
import { AdminNotification,AdminNotificationRead } from "../../../services/adminApi";
function AdminNotifications({Selections}) {
  const [NotificationList, setNotificaton] = useState([]);
  async function GetNotification() {
    const res = await AdminNotification();
    setNotificaton(res.data);
  }
  const Isread = async (id,path)=>{
   try {
    const data = {
        is_read : true
    }
    const res = await AdminNotificationRead(data,id)
    if (res.status === 200){
        const res2 = await AdminNotification();
        setNotificaton(res2.data);
        Selections(path)
    }
   } catch (error) {
    console.log(error);
   }
  }
  // ---------------------------------react quary-------------------------------------//
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["usersjoblist"],
    queryFn: () => GetNotification(),
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <h1 className="text-center mt-20 font-bold text-2xl text-purple-400">
        Something went Wrong
      </h1>
    );
  }
  // ---------------------------------react quary-------------------------------------//

  return (
    <>
      <div className="ps-6 mt-6 flex text-3xl items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
          />
        </svg>
        <p className="ms-3 font-bold">Notification</p>
      </div>
      <div className="overflow-y-auto mt-7 ms-2 me-5 rounded-xl shadow border h-[48rem]">
        {NotificationList.map((notify, index) => (
          <div key={index} className={`border rounded-xl mx-3 my-3 flex items-center justify-between h-16 shadow cursor-pointer ${notify.is_read ? '': 'bg-purple-50'}`} >
            <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6 ms-8 me-3 text-gray-700 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p className="text-xl text-gray-700 ">{notify.message}</p>
            </div>
            <div>
                <button className="me-7 text-gray-700 font-bold" onClick={()=>Isread(notify.id,notify.path)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminNotifications;
