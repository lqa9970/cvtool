import { OktaAuth } from '@okta/okta-auth-js';

const oktaClientconfig = {
  issuer: 'https://dev-nordcloud.okta.com',
  clientId: '0oa8srt4yr0BUNzz05d7',
  redirectUri: window.location.origin + '/login/callback'
};

const oktaAuthClient = new OktaAuth(oktaClientconfig);

export default oktaAuthClient;
