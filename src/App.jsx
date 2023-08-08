import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User_Login from './pages/user/login/login'
import User_Home from './pages/user/home/home'
import Choos from './pages/user/register/choose'
import './App.css'

function App() {

  return (
   <div>
    <Router>
      <Routes>
      <Route path='/' exact element={<User_Home/>} />
      <Route path='/login' exact element={<User_Login/>} />
      <Route path='/choose' exact element={<Choos/>} />
      </Routes>
    </Router>
   </div>
  )
}

export default App
