import { Routes, Route } from 'react-router-dom';
import UserHomePage from '../pages/User/UserHomePage/UserHomePage';
import SignUpPage from '../pages/User/SignUpPage/SignUpPage';
import UserProtected from '../ProtectedRoutes/UserProtected';
import PrivateRoutes from '../ProtectedRoutes/PrivateRoutes';
import UserProfilePage from '../pages/User/UserProfilePage/UserProfilePage';
import Position from '../pages/User/RegisterSteps/Position';
import Role from '../pages/User/RegisterSteps/Role';
import Experience from '../pages/User/RegisterSteps/Experience';
import Education from '../pages/User/RegisterSteps/Education';
import Languages from '../pages/User/RegisterSteps/Languages';
import Skills from '../pages/User/RegisterSteps/Skills';
import ProfileCreation from '../pages/User/RegisterSteps/ProfileCreation';
import Notifications from '../pages/User/Notifications/Notifications';
import Jobs from '../pages/User/Jobs/Jobs';
function UserRoutes() {

  return (
    <Routes>
      <Route element={<PrivateRoutes/>}>
      <Route path='/signup' exact element={<SignUpPage />} />
      </Route>
      <Route element={<UserProtected />}>
        <Route path='/' element={<UserHomePage />} />
        <Route path='/position' element={<Position/>}/>
        <Route path='/role' element={<Role/>} />
        <Route path='/experience' element={<Experience/>} />
        <Route path='/education' element={<Education/>} />
        <Route path='/languages' element={<Languages/>} />
        <Route path='/profile' element={<UserProfilePage/>}/>
        <Route path='/skills' element={<Skills/>}/>
        <Route path='/profilecreation' element={<ProfileCreation/>}/>
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
      </Route>
    </Routes>
  );
}

export default UserRoutes;
