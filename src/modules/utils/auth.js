import axios from 'axios';

const URL = `${process.env.API_URL}/auth/login`;
export const loginAuth = body => {
  console.log('urusvskj : ', URL)
  return axios.post(URL, body);
};

const URLregister = `${process.env.API_URL}/auth/register`;
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

export const fp = body => {
  const URLfp = `${process.env.API_URL}/auth/forgot`;
  console.log('url fp',URLfp)
  return axios.post(URLfp, body);
};

export const co = body => {
  const URL = `${process.env.API_URL}/auth/cekotp`;
  console.log('cek url', URL);
  return axios.post(URL, body);
};

export const rp = body => {
  const URL = `${process.env.API_URL}/auth/resetPassword`;
  return axios.post(URL, body);
};