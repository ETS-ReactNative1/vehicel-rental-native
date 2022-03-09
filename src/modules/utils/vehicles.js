import axios from 'axios';

const getCar = axios.get(
  `https://arka-vehicle-rental.herokuapp.com/vehicles/byOrder?by=cars&order=asc&page=1&limit=3`,
);

const getMotorbike = axios.get(
  `https://arka-vehicle-rental.herokuapp.com/vehicles/byOrder?by=cars&order=asc&page=1&limit=3`,
);

const getBike = axios.get(
  `https://arka-vehicle-rental.herokuapp.com/vehicles/byOrder?by=cars&order=asc&page=1&limit=3`,
);

export const getAllVehicle = () => {
  return axios.all([getCar, getMotorbike, getBike]);
};

///:id
const URL = `https://arka-vehicle-rental.herokuapp.com/vehicles/` ;
export const getVehicle = (id) => {
  return axios.get(URL + id)
}
