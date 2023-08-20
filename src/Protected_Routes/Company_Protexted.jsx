import jwt_decode from 'jwt-decode'
import {Outlet } from 'react-router-dom'
import UnknownHomePage from '../pages/UnknownUser/UnknownHomePage'
import User_HomePage from '../pages/user/home/User_HomePage'
function Company_Protected() {
  const token = localStorage.getItem('token')
  if (token){
    const decode = jwt_decode(token)
    if (decode.role === 'user'){
      return <User_HomePage/>
    } else if (decode.role === 'company'){
      return <Outlet/>
    } 
  } else {
    return <UnknownHomePage/>
  }
  
}

export default Company_Protected