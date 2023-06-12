import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useLocation, useNavigate } from "react-router-dom";
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
    oktaAuth
      .signInWithRedirect({ originalUri: pathname })
      .then(() => null)
      .catch(() => null);
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
    <div>
      <p>Logging In ...</p>
    </div>
  );
}
