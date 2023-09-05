import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ChoosePage from './pages/ChoosePage'
import UnknownHomePage from './pages/UnknownUser/UnknownHomePage'
import UserRoutes from './routes/user'
import CompanyRoutes from './routes/company'
import AdminRoutes from './routes/Admin'
import PrivateRoutes from './ProtectedRoutes/PrivateRoutes'
import MailConfirm from './pages/MailConfirm'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import RestPassword from './pages/ForgotPassword/RestPassword'

function App() {

  return (
   <div>
    <Router>
      <Routes>
      <Route element={<PrivateRoutes/>} >
      <Route path='/' exact element={<UnknownHomePage/>} />
      <Route path='/login/' exact element={<LoginPage/>} />
      <Route path='/choose' exact element={<ChoosePage/>} />
      <Route path='/confirm' exact element={<MailConfirm />} />
      <Route path='/resetpassword' exact element={<RestPassword />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />

      </Route>
      <Route path='/user/*' element={<UserRoutes/>} />
      <Route path='/company/*' element={<CompanyRoutes/>} />
      <Route path='/admin/*' element={<AdminRoutes/>} />
      </Routes>
    </Router>
   </div>
  )
}

export default App
