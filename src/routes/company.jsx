import { Routes, Route } from "react-router-dom";
import Company_Register_Page from "../pages/Company/CompanyRegister_Page";
import CompanyHomePage from "../pages/Company/CompanyHomePage";
import CompanyProtected from "../ProtectedRoutes/CompanyProtexted";
import PrivateRoutes from "../ProtectedRoutes/PrivateRoutes";
import CompanyCreations from "../pages/Company/RegistrationSteps/CompanyCreations";
import CompanyProfile from "../pages/Company/CompanyProfile/CompanyProfile";
function CompanyRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/signup" element={<Company_Register_Page />} />
      </Route>
      {/* <Route element={<CompanyProtected />}> */}
        <Route path="/" element={<CompanyHomePage />} />
        <Route path="/createcompany" element={<CompanyCreations />} />
        <Route path="/profile" element={<CompanyProfile />} />
        
      {/* </Route> */}
    </Routes>
  );
}
export default CompanyRoutes;
