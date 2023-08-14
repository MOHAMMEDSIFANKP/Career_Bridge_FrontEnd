import { Routes, Route } from 'react-router-dom';
import Step_1 from '../../pages/user/registerstep/user/Step1Page';
import Step_2 from '../../pages/user/registerstep/user/Step2Page';
import Showpage from '../../pages/user/authendication/MailConfirmPage';
import { useEffect } from 'react';

function UserProfile() {

    useEffect(()=>{
        console.log('iam iama aia');
    })

  return (
    <div>    
      <Routes>
        <Route path='confirm' element={<Showpage/>} />
        <Route path='step1' element={<Step_1/>} />
        <Route path='step2' element={<Step_2/>} />
      </Routes>
    </div>
  );
}

export default UserProfile;
