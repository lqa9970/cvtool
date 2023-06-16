import { OktaAuth } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import useAuthorizationOkta from "../hooks/useOktaAuth";
import CVPreview from "../pages/CVPreview";
import CreateCV from "../pages/CVProfile";
import { Login } from "../pages/login";
import SearchDashboard from "../pages/SearchDashboard";
import StaffDashboard from "../pages/StaffDashboard";

export function AppRoutes() {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth: OktaAuth, _originalUri: string) => {
    navigate("/");
  };
  return (
    <Security
      oktaAuth={useAuthorizationOkta}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/callback" Component={LoginCallback} />
        <Route path="/" element={<Login />} />
        <Route path="/cv" element={<CreateCV />} />
        <Route path="/search" element={<SearchDashboard />} />
        <Route path="/preview" element={<CVPreview employee={null} />} />
        <Route path="/staff" element={<StaffDashboard />} />
      </Routes>
    </Security>
  );
}
