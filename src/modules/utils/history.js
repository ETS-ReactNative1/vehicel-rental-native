import axios from 'axios';

const URL = `${process.env.API_URL}/history/` ;
export const getHistory = token => {
  return axios.get(URL, {
    headers: {'x-access-token': token} 
 })
}

export const delHistory = (id) => {
  // const URLDelete = `${process.env.API_URL}/history/${id}` ;
  return axios.delete(URL+id)
}