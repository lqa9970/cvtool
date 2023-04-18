import { Routes, Route, useNavigate } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { Login } from '../pages/login';
import { OktaAuth } from '@okta/okta-auth-js';
import useAuthorizationOkta from '../hooks/oktaAuth';
import Navbar from '../components/Navbar/Navbar';
import CreateCV from '../pages/CVProfile';

export const AppRoutes = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = (oktaAuth: OktaAuth, originalUri: string) => {
    navigate('/');
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
      </Routes>
    </Security>
  );
};
