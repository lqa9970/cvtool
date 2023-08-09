import { useOktaAuth } from "@okta/okta-react";
import { Outlet, Navigate } from "react-router-dom";
import { Loader } from "@nordcloud/gnui";

function AuthRoute() {
  const { authState } = useOktaAuth();

  if (!authState) {
    <Loader position="bottom-center" />
  }

  return authState?.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default AuthRoute;
