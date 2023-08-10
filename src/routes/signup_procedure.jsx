import { Routes, Route } from 'react-router-dom'
import Step_1 from '../pages/user/registerstep/step1'
function SignupProcedure(){
    return(
        <div>
            <Routes>
                <Route path='/step1' element={<Step_1/>} />
            </Routes>
        </div>
    )
}
export default SignupProcedure