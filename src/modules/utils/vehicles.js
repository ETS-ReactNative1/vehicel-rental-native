import axios from 'axios';

const getCar = axios.get(`${process.env.API_URL}/vehicles?page=1&limit=8&types=car`);

const getMotorbike = axios.get(
  `${process.env.API_URL}/vehicles?page=1&limit=8&types=motorbike`
);

const getBike = axios.get(`${process.env.API_URL}/vehicles?page=1&limit=8&types=bike`);

export const getAllVehicle = () => {
  return axios.all([getCar, getMotorbike, getBike]);
};

export const getVehicleCategory = (type) => {
  const URL_TYPE = `${process.env.API_URL}/vehicles?page=1&limit=8&types=${type}`  
  return axios.get(URL_TYPE);
};

const URL = `${process.env.API_URL}/vehicles/`;

export const getVehicles = () => {
  return axios.get(URL+'all');
};

///:id
export const getVehicle = id => {
  return axios.get(URL + id);
};
export const deleteVehicle = id => {
  return axios.delete(URL + id, {
    headers: {'x-access-token': token},
  });
};

// const URL = `${process.env.API_URL}/vehicles/` ;
export const updateVehicle = id => {
  return axios.patch(URL + id, body, {
    headers: {'x-access-token': token},
  });
};

const AddURL = `${process.env.API_URL}/vehicles`;
export const addVehicle = (token, body) => {
  return axios.post(AddURL, body, {
    headers: {'x-access-token': token},
  });
};

// const URLCategory = `${process.env.API_URL}/vehicles/byOrder?by=type&order=desc&page=1&limit=10` ;
// export const getVehicleCategory = () => {
//   return axios.get(URLCategory)
// }

export const filterVehicle = (vtype, search, location) => {
  const FilterURL = `${process.env.API_URL}/vehicles?page=1&limit=8&types=${vtype}&name=${search}&location=${location}`;
  return axios.get(FilterURL);
};
