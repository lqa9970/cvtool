import { useLocation } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useEffect } from 'react';

export const  Login = () => {
    
    const { oktaAuth, authState } = useOktaAuth();
    const isAuthenticated = authState?.isAuthenticated;
    const { pathname } = useLocation();

    if (isAuthenticated === false) {
        oktaAuth.signInWithRedirect({ originalUri: pathname });        
    }
    if (isAuthenticated == true){
        useEffect(() => {
            const idToken = oktaAuth.getIdToken();
            if (idToken) {
                console.log(idToken);
            }
        }, []);
    }
    
    return (
        isAuthenticated?
        (<div>
            <p>Logged in!</p>
        </div>):
        
        (<div>
            <p>Logging In ...</p>
        </div>)

    )
}