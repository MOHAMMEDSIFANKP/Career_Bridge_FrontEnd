import jwt_decode from 'jwt-decode'
import { Outlet } from 'react-router-dom'
import UnknownHomePage from '../pages/UnknownUser/UnknownHomePage'
import Company_HomePage from '../pages/company/Company_HomePage'

function User_Protected() {
  const token = localStorage.getItem('token')
  if (token){
    const decode = jwt_decode(token)
    console.log(decode);
    if (decode.role === 'user'){
      return <Outlet/>
    } else if (decode.role === 'company'){
      return <Company_HomePage/>
    } 
  } else {
    return <UnknownHomePage/>
  }
  
}

export default User_Protected