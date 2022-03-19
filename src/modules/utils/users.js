import axios from 'axios';

// const URL = process.env.NEXT_PUBLIC_API_URL + '/signIn';
const URL = `${process.env.API_URL}/users`;

export const getUsers = token => {
  return axios.get(URL, {
       headers: {'x-access-token': token} 
    })
}
