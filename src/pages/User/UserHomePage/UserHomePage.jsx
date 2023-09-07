import React from "react";
import { NavbarDefault } from "../../../components/Navbar/NavBar";

function UserHomePage() {
  return (
    <>
      <div className="h-screen grid grid-rows-[5rem,]">
        <div>
          <NavbarDefault />
        </div>
        <div className="grid grid-cols-[1fr,14rem]">
          <div className="flex justify-center mt-32">
            <div className="h-4/5 mx-20 border border-purple-400">
              <div>
                
              </div>
            </div>
          </div>
          <div>2</div>
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
