import axios from "axios";
import {UserUrl, CompanyUrl, AdminUrl} from '../constants/constants'

// setting for Request time out
const createAxioxClient = (baseURL)=>{
    const client = axios.create({
        baseURL,
        timeout: 8000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!"
    })
    return client
}

const attatToken = (req, tokenName) =>{
    let authToken = localStorage.getItem(tokenName.access)
    if (authToken){
        req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req
}

const userAxiosInstant = createAxioxClient(UserUrl)
userAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attatToken(req, 'token')
    return modifiedReq
})

const CompanyAxiosInstant = createAxioxClient(CompanyUrl)
CompanyAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attatToken(req, 'token')
    return modifiedReq
})


const adminAxiosInstant = createAxioxClient(AdminUrl)
adminAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attatToken(req, 'token')
    return modifiedReq
})

export { userAxiosInstant, CompanyAxiosInstant, adminAxiosInstant}