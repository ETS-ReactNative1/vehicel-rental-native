import axios from 'axios';

// const URL = process.env.NEXT_PUBLIC_API_URL + '/signIn';
const URL = `${process.env.API_URL}/auth/signIn`;

export const loginAuth = body => {
  return axios.post(URL, body);
};

// const URLregister = process.env.API_URL + '/auth/SignUp';
const URLregister = `${process.env.API_URL}/auth/signUp`;

export const registerAuth = body => {
  return axios.post(URLregister, body);
};

export const logoutAuth = token => {
  const URLlogout = `${process.env.API_URL}/auth/logout`;
  return axios.delete(URLlogout, {
    headers: {
      'x-access-token': token,
    },
  });
};