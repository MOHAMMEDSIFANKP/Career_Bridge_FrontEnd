import React from 'react'
import User_Home from '../../../components/user/home/User_Home'
import { NavbarDefault } from '../../../components/Navbar/NavBar'

function UserHomePage() {
  return (
    <div>
        <NavbarDefault/>
        <User_Home/>
    </div>
  )
}

export default UserHomePage