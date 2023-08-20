import { adminAxiosInstant } from "../utils/axiosUtils";

const AdminSignin = (values) =>{
    return adminAxiosInstant.post('token/', values, {withCredentials: true})
}

export {AdminSignin}