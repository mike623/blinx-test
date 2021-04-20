import axios from "axios";

const toData = (d) => d.data;

export const searchItem = (q) => {
  return axios.post(`/items?q=${q}`).then(toData);
};

export const getTransaction = () => axios.get(`/transactions`).then(toData);
