import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    id: "",
    email: "",
    profile_image: "",
    role: "",
    is_compleated:"",
    is_google:"",
    JobFiledRedex:"",
    JobTitleRedex:"",
    experiences: [],
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails: (state, action) => {
            state.id = action.payload.id;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
            state.profile_image = action.payload.profile_image;
            state.role = action.payload.role;
            state.is_compleated = action.payload.is_compleated;
            state.is_google = action.payload.is_google;
        },
        LogoutDetails: (state, action)=>{
            state.id =  "";
            state.first_name = "";
            state.last_name = "";
            state.email =  "";
            state.profile_image =  "";
            state.role =  "";
            state.is_compleated = "";
            state.is_google = "";
        },
        setRole: (state, action)=>{
            state.JobFiledRedex = action.payload.JobFiledRedex
            state.JobTitleRedex = action.payload.JobTitleRedex
        },
        setExperiences: (state, action)=>{
            state.experiences.push(action.payload);
        }
        
    }
})

export const {setUserDetails, LogoutDetails,setRole,setExperiences} = userSlice.actions;
export default userSlice.reducer;