import { Routes, Route } from 'react-router-dom';
import Step2Page from '../pages/User/RegisterSteps/StepsPage';
import UserHomePage from '../pages/User/UserHomePage/UserHomePage';
import SignUpPage from '../pages/User/SignUpPage/SignUpPage';
import UserProtected from '../ProtectedRoutes/UserProtected';
import PrivateRoutes from '../ProtectedRoutes/PrivateRoutes';
import UserProfilePage from '../pages/User/UserProfilePage/UserProfilePage';
function UserRoutes() {

  return (
    <Routes>
      <Route element={<PrivateRoutes/>}>
     
        <Route path='/signup' exact element={<SignUpPage />} />
      </Route>
      {/* <Route element={<UserProtected />}> */}
        <Route path='/' element={<UserHomePage />} />
        <Route path='/steps' element={<Step2Page />} />
        <Route path='/profile' element={<UserProfilePage/>}/>
      {/* </Route> */}
    </Routes>
  );
}

export default UserRoutes;
