import { UserData } from '../../types';

export const SUBMIT_USER_DATA = 'SUBMIT_USER_DATA';

export const submitUserData = (userData: UserData) => ({
  type: SUBMIT_USER_DATA,
  payload: userData,
});
