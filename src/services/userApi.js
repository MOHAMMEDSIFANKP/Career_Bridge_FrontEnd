import { userAxiosInstant } from "../utils/axiosUtils";

const userSignup = (values) =>{
    return userAxiosInstant.post('/api/register/', values, {withCredentials: true})
}

export {userSignup}