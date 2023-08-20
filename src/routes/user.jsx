import { Routes, Route } from 'react-router-dom';
import Step2Page from '../pages/user/registerstep/StepsPage';
import User_HomePage from '../pages/user/home/User_HomePage';
import SignUpPage from '../pages/user/authendication/SignUpPage'
import User_Protected from '../Protected_Routes/User_Protected';
import Private_routes from '../Protected_Routes/Private_routes';
function UserProfile() {

  return (
    <Routes>
      <Route element={<Private_routes/>}>
        <Route path='/signup' exact element={<SignUpPage />} />
      </Route>
      <Route element={<User_Protected />}>
        <Route path='/' element={<User_HomePage />} />
        <Route path='/steps' element={<Step2Page />} />
      </Route>
    </Routes>
  );
}

export default UserProfile;
