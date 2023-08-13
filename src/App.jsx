import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage1 from './pages/user/authendication/LoginPage'
import User_Home from './pages/user/home/home'
import Choos from './pages/user/register/choose'
import SignUpPage from './pages/user/authendication/SignUpPage'
import Userprofile from './routes/user/user'
// import companyprofile from './routes/company/company'
import './App.css'

function App() {

  return (
   <div>
    <Router>
      <Routes>
      <Route path='/' exact element={<User_Home/>} />
      <Route path='/login/' exact element={<LoginPage1/>} />
      <Route path='/choose' exact element={<Choos/>} />
      <Route path='/signup' exact element={<SignUpPage/>} />
      <Route path='/user/*' element={<Userprofile/>} />
      {/* <Route path='/company/*' element={<companyprofile/>} /> */}
      </Routes>
    </Router>
   </div>
  )
}

export default App
