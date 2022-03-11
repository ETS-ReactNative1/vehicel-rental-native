import axios from 'axios';

// const URL = process.env.NEXT_PUBLIC_API_URL + '/signIn';
const URL = 'https://arka-vehicle-rental.herokuapp.com/history';

export const postPayment = (body) => { //token
  return axios.post(URL, body)
}
// , {
//     headers: {'x-access-token': token} 
//  }