import { useOktaAuth } from "@okta/okta-react";
import { Outlet, Navigate } from "react-router-dom";

function AuthRoute() {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <p>Loading...</p>;
  }

  return authState?.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default AuthRoute;
