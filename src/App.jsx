import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ChoosePage from './pages/ChoosePage'
import UnknownHomePage from './pages/UnknownUser/UnknownHomePage'
import UserRoute from './routes/user'
import CompanyRoute from './routes/company'
import AdminRoute from './routes/Admin'
import Private_routes from './Protected_Routes/Private_routes'

function App() {

  return (
   <div>
    <Router>
      <Routes>
      <Route element={<Private_routes/>} >
      <Route path='/' exact element={<UnknownHomePage/>} />
      <Route path='/login/' exact element={<LoginPage/>} />
      <Route path='/choose' exact element={<ChoosePage/>} />
      </Route>
      <Route path='/user/*' element={<UserRoute/>} />
      <Route path='/company/*' element={<CompanyRoute/>} />
      <Route path='/admin/*' element={<AdminRoute/>} />
      </Routes>
    </Router>
   </div>
  )
}

export default App
