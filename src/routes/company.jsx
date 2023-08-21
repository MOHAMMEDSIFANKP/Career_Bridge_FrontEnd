import { Routes, Route } from 'react-router-dom'
import Company_Register_Page from '../pages/Company/CompanyRegister_Page'
import CompanyHomePage from '../pages/Company/CompanyHomePage'
import CompanyProtected from '../ProtectedRoutes/CompanyProtexted'
import PrivateRoutes from '../ProtectedRoutes/PrivateRoutes'
function CompanyRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path='/signup' element={<Company_Register_Page />} />
            </Route>
            <Route element={<CompanyProtected />}>
                <Route path='/' element={<CompanyHomePage />} />
            </Route>
        </Routes>
    )
}
export default CompanyRoutes

