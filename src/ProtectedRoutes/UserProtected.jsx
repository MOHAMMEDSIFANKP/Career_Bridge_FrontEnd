import jwt_decode from 'jwt-decode'
import { Outlet } from 'react-router-dom'
import UnknownHomePage from '../pages/UnknownUser/UnknownHomePage'
import Company_HomePage from '../pages/Company/CompanyHomePage'
import AdminHomePage from '../pages/Admin/AdminHomePage'
import Position from '../pages/User/RegisterSteps/Position'
function UserProtected() {
  const token = localStorage.getItem('token')
  if (token){
    const decode = jwt_decode(token)
    if (decode.role === 'user'){

      return <Outlet/>

    } else if (decode.role === 'company'){
      return <Company_HomePage/>
    } else if (decode.role === 'admin' && decode.is_admin){
      return <AdminHomePage/>
    } else{
      return <UnknownHomePage/>
    }
  } else {
    return <UnknownHomePage/>
  }
  
}

export default UserProtected