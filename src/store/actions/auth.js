import {ACTION_STRING} from '../actions/actionString';
import {loginAuth} from '../../modules/utils/auth';

export const loginAction = body => {
  return {
    type: ACTION_STRING.authLogin,
    payload: loginAuth(body),
  };
};

export const logoutAction = () => {
  return {
    type: ACTION_STRING.logoutAuth,
  };
};