import { useOktaAuth } from "@okta/okta-react";
import { Outlet, Navigate } from "react-router-dom";
import { Loader } from "semantic-ui-react";

function AuthRoute() {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <Loader active />;
  }

  return authState?.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default AuthRoute;
