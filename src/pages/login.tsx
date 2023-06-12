import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomCalendar from '../components/Calendar/Calendar';
import { decodeOktaToken } from '../services/jwtDecodeService';
import { OktaTokenPayload } from '../types/types';
import Dashboard from './Dashboard';
import StaffingDashboard from './StaffingDashboard';

export function Login() {
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
}
