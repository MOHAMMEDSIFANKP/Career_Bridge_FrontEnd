import { adminAxiosInstant } from "../utils/axiosUtils";

const AdminSignin = (values) =>{
    return adminAxiosInstant.post('token/', values, {withCredentials: true})
}

const GetLanguages = () =>{
    return adminAxiosInstant.get('LanguageListCreateAPIView', {withCredentials: true})
}
export {AdminSignin,GetLanguages}