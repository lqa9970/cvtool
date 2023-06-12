/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OktaAuth } from "@okta/okta-auth-js";

const oktaClientconfig = {
  issuer: import.meta.env.VITE_APP_OKTA_ISSUER,
  clientId: import.meta.env.VITE_APP_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + "/login/callback",
};

const useAuthorizationOkta = new OktaAuth(oktaClientconfig);

export default useAuthorizationOkta;
