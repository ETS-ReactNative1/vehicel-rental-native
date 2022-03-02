import axios from 'axios';

// const URL = process.env.NEXT_PUBLIC_API_URL + '/signIn';
const URL = 'https://arka-vehicle-rental.herokuapp.com/auth/signIn';

export const loginAuth = body => {
  return axios.post(URL, body);
};

// const URLregister = process.env.API_URL + '/auth/SignUp';
const URLregister = 'https://arka-vehicle-rental.herokuapp.com/auth/signUp';

export const registerAuth = body => {
  return axios.post(URLregister, body);
};
