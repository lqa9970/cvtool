import jwtDecode from 'jwt-decode';
import { OktaTokenPayload } from '../types/types';

export const decodeOktaToken = (token: string): OktaTokenPayload => {
  return jwtDecode<OktaTokenPayload>(token);
};
