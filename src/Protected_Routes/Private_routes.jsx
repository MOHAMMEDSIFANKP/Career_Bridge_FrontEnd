import jwt_decode from "jwt-decode"
import { Outlet } from "react-router-dom"
import User_HomePage from '../pages/user/home/User_HomePage'
import Company_HomePage from "../pages/company/Company_HomePage"

function Private_routes() {
    const token = localStorage.getItem('token')
    if (token){
        const decode = jwt_decode(token)
        if (decode.role === 'user'){
            return <User_HomePage/>
        } else if (decode.role === 'company'){
            return <Company_HomePage/>
        }
    }
    return <Outlet/> 
}


export default Private_routes
