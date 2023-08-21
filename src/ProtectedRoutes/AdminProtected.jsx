import jwt_decode from 'jwt-decode'
import { Outlet } from 'react-router-dom'
import CompanyHomePage from '../pages/Company/CompanyHomePage'
import UserHomePage from '../pages/User/UserHomePage/UserHomePage'
import UnknownHomePage from '../pages/UnknownUser/UnknownHomePage'
function AdminProtected() {
    const token = localStorage.getItem('token')
    if (token) {
        const decode = jwt_decode(token)
        if (decode.role === 'user') {
            return <UserHomePage />
        }else if (decode.role === 'company'){
            return <CompanyHomePage/>
        } else if (decode.role === 'admin' && decode.is_admin) {
            return <Outlet />
        } else{
            return <UnknownHomePage />
        }
    } else {
        return <UnknownHomePage />
    }

}


export default AdminProtected