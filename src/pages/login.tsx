import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "@nordcloud/gnui";
import { decodeOktaToken } from "../services/jwtDecodeService";
import { OktaTokenPayload } from "../types/types";
import Dashboard from "./Dashboard";

export function Login() {
  const [_loggedInUser, setLoggedInUser] = useState<OktaTokenPayload>();
  const { oktaAuth, authState } = useOktaAuth();
  const isAuthenticated = authState?.isAuthenticated;
  const { pathname } = useLocation();

  const _navigate = useNavigate();

  if (isAuthenticated === false) {
    oktaAuth.signInWithRedirect({ originalUri: pathname }).catch(() => {});
  }

  useEffect(() => {
    if (isAuthenticated === true) {
      const idToken = oktaAuth.getIdToken();
      if (idToken) {
        const decodedToken = decodeOktaToken(idToken);
        setLoggedInUser(decodedToken);
      }
    }
  }, []);

  return isAuthenticated ? (
    <>
      <Dashboard />
    </>
  ) : (
    <Loader position="bottom-center" />
  );
}
