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
    Education : [],
    Language : [],
    Skills : [],
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

        // Experience
        setExperiences: (state, action)=>{
            state.experiences.push(action.payload);
        },
        EditExpeience:(state, action) =>{
            const { index, updatedExperience } = action.payload;
            state.experiences[index] = updatedExperience;

        },
        DeteteExperience: (state, action)=>{
            const index = action.payload;
            state.experiences.splice(index, 1);
        },
        
        // Education
        SetEducation: (state, action) =>{
            state.Education.push(action.payload);
        },
        EditEducation: (state, action) =>{
            const {index, updatedEducation} = action.payload;
            state.Education[index] = updatedEducation;
        },
        DeleteEducation: (state, action) =>{
            const index = action.payload;
            state.Education.splice(index, 1)
        },
        // Language
        SetLanguage: (state, action) =>{
            state.Language.push(action.payload)
        },
        DeleteLanguage: (state, action) =>{
            const index = action.payload;
            state.Language.splice(index, 1)
        },
        // Skills
        SetSkills : (state, action)=>{
            state.Skills.push(action.payload)
        },
        DeleteSkills: (state, action)=>{
            const index = action.payload;
            state.Skills.splice(index, 1)
        }


    }
})

export const {setUserDetails, LogoutDetails,setRole,setExperiences,EditExpeience,DeteteExperience,SetEducation,EditEducation,DeleteEducation,SetLanguage,DeleteLanguage,SetSkills,DeleteSkills} = userSlice.actions;
export default userSlice.reducer;