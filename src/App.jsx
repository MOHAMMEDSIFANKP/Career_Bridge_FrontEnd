import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User_Login from './pages/user/login/login'
import User_Home from './pages/user/home/home'
import Choos from './pages/user/register/choose'
import SignUp from './pages/user/register/register'
import Userprofile from './routes/user/user'
// import companyprofile from './routes/company/company'
import './App.css'

function App() {

  return (
   <div>
    <Router>
      <Routes>
      <Route path='/' exact element={<User_Home/>} />
      <Route path='/login' exact element={<User_Login/>} />
      <Route path='/choose' exact element={<Choos/>} />
      <Route path='/signup' exact element={<SignUp/>} />
      <Route path='/user/*' element={<Userprofile/>} />
      {/* <Route path='/company/*' element={<companyprofile/>} /> */}
      </Routes>
    </Router>
   </div>
  )
}

export default App
