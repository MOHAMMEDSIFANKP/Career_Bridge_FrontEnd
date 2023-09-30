import React, { useState } from "react";
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { AdminNavBar } from "../../components/Admin/AdminNavBar&Sidebar/AdminNavBar";
import { AdminSideBar } from "../../components/Admin/AdminNavBar&Sidebar/AdminSideBar";
import Admin_UserManagement from "../../components/Admin/Admin_UserManagement/Admin_UserManagement";
import Admin_CompanyManagement from "../../components/Admin/Admin_CompanyManagement/Admin_CompanyManagement";
import AdminNotifications from "../../components/Admin/AdminNotifications/AdminNotifications";
import AdminMore from "../../components/Admin/AdminMore/AdminMore";
import AdminDashboard from "../../components/Admin/AdminDashboard/AdminDashboard";
import { useNavigate } from "react-router-dom";
function AdminHomePage() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };
  const [SelectedList, setSelectedList] = useState("Dashboard");
  const Selections = (data) => {
    setSelectedList(data);
  };

  return (
    <div className="h-screen grid grid-rows-[4rem]">
      <div className="sticky top-0">
        <AdminNavBar />
      </div>
      <div className="grid grid-cols-[6rem,1fr] xl:grid-cols-[20rem,1fr]">
        <div>
          <div className="flex justify-center items-center  xl:mt-0 mt-4 visible xl:invisible">
            <div className="shadow px-5 py-5 text-gray-800 rounded-xl grid grid-rows-5 xl:gap-0 gap-10 ">
              <PresentationChartBarIcon
                className="h-5 w-5"
                onClick={() => setSelectedList("Dashboard")}
              />
              <svg
                onClick={() => setSelectedList("Users")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
              </svg>
              <svg
                onClick={() => setSelectedList("Company")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
               onClick={() => setSelectedList("More")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
              </svg>

              <InboxIcon
                className="h-5 w-5"
                onClick={() => setSelectedList("Inbox")}
              />
              <PowerIcon className="h-5 w-5" onClick={handleSignOut} />
            </div>
          </div>
          <div className="invisible xl:visible xl:-mt-[11rem]">
            <AdminSideBar Selections={Selections} />
          </div>
        </div>
        <div>
          {SelectedList === "Dashboard" ? (
            <AdminDashboard/>
          ) : SelectedList === "Users" ? (
            <Admin_UserManagement />
          ) : SelectedList === "Company" ? (
            <Admin_CompanyManagement />
          ) : SelectedList === "Inbox" ? (
            <AdminNotifications Selections={Selections} />
          ) : SelectedList === 'More'?(
           <AdminMore/>
          ): (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
