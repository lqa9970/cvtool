import { useLocation, useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { OktaTokenPayload } from '../types/types';
import { decodeOktaToken } from '../services/jwtDecodeService';

export const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState<OktaTokenPayload>();
  const { oktaAuth, authState } = useOktaAuth();
  const isAuthenticated = authState?.isAuthenticated;
  const { pathname } = useLocation();

  const navigate = useNavigate();

  if (isAuthenticated === false) {
    oktaAuth.signInWithRedirect({ originalUri: pathname });
  }
  useEffect(() => {
    if (isAuthenticated == true) {
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
};
