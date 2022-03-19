import axios from 'axios';

const URL = `${process.env.API_URL}/history/` ;
export const getHistory = (id) => {
  return axios.get(URL + id)
}

export const delHistory = (id) => {
  return axios.delete(URL + id)
}