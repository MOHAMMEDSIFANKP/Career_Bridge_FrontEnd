import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CompanyInfo: {},
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyDetails: (state, action) => {
      state.CompanyInfo = action.payload.CompanyInfo;
    },
    LogoutCompanyDetails: (state, action) => {
      state.CompanyInfo = {};
    },
  },
});

export const { setCompanyDetails, LogoutCompanyDetails } = companySlice.actions;
export default companySlice.reducer;
