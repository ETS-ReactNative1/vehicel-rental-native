import axios from 'axios';

// const URL = process.env.NEXT_PUBLIC_API_URL + '/signIn';
const URL = process.env.NEXT_PUBLIC_API_URL + '/signIn';

export const loginAuth = body => {
  return axios.post(URL, body);
};
