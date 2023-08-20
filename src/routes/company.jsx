import { Routes, Route } from 'react-router-dom'
import Company_Register_Page from '../pages/company/Company_Register_Page'
import Company_HomePage from '../pages/company/Company_HomePage'
import Company_Protected from '../Protected_Routes/Company_Protexted'
import Private_routes from '../Protected_Routes/Private_routes'
function companyprofile() {
    return (
        <Routes>
            <Route element={<Private_routes />}>
                <Route path='/signup' element={<Company_Register_Page />} />
            </Route>
            <Route element={<Company_Protected />}>
                <Route path='/' element={<Company_HomePage />} />
            </Route>
        </Routes>
    )
}
export default companyprofile

