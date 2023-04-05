import {Routes, Route, useNavigate } from "react-router-dom";
import { Security, LoginCallback } from '@okta/okta-react';
import {Login} from "../pages/login";
import { OktaAuth } from '@okta/okta-auth-js';
import useAuthorizationOkta from "../hooks/oktaAuth"


export const AppRoutes = () =>{
    const navigate = useNavigate();
    const restoreOriginalUri = (oktaAuth: OktaAuth, originalUri: string) => {
        navigate('/');
    };
    return (
             <Security oktaAuth={useAuthorizationOkta} restoreOriginalUri={restoreOriginalUri}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login/callback" Component={LoginCallback}/>
                </Routes>
            </Security>
      );   
}