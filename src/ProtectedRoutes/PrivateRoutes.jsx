import jwt_decode from "jwt-decode"
import { Outlet } from "react-router-dom"
import UserHomePage from "../pages/User/UserHomePage/UserHomePage"
import Company_HomePage from "../pages/Company/CompanyHomePage"
import AdminHomePage from "../pages/Admin/AdminHomePage"
import UnknownHomePage from "../pages/UnknownUser/UnknownHomePage"

function PrivateRoutes() {
    const token = localStorage.getItem('token')
    if (token){
        const decode = jwt_decode(token)
        if (decode.role === 'user'){
            return <UserHomePage/>
        } else if (decode.role === 'company'){
            return <Company_HomePage/>
        } else if (decode.role === 'admin' && decode.is_admin){
            return <AdminHomePage/>
        } else{
            return <UnknownHomePage/>
        }
    }
    return <Outlet/> 
}


export default PrivateRoutes
