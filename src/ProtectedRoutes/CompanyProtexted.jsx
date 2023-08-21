import jwt_decode from 'jwt-decode'
import {Outlet } from 'react-router-dom'
import UnknownHomePage from '../pages/UnknownUser/UnknownHomePage'
import UserHomePage from '../pages/User/UserHomePage/UserHomePage'
import AdminHomePage from '../pages/Admin/AdminHomePage'

function CompanyProtected() {
  const token = localStorage.getItem('token')
  if (token){
    const decode = jwt_decode(token)
    if (decode.role === 'user'){
      return <UserHomePage/>
    } else if (decode.role === 'company'){
      return <Outlet/>
    } else if (decode.role === 'admin' && decode.is_admin){
      return <AdminHomePage/>
    } else{
      return <UnknownHomePage/>
    }
  } else {
    return <UnknownHomePage/>
  }
  
}

export default CompanyProtected