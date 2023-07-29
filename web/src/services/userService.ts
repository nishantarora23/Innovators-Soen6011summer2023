import axios from 'axios';
import { API_URL } from '../constants';
import { User } from '../types';

export const createUser = (user: User) => {
  return axios.post(`${API_URL}/users`, user);
};

export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const deleteUser = (username: string) => {
  return axios.delete(`${API_URL}/users?username=${username}`);
};


export const addJobOfferHelper = (data: any) => {
  data.ACTION = "Add"
  return axios.post(`${API_URL}/jobOffer`, data);
}

export const deleteJobOffer = (id: string | number) => {
  const payload = {
    ACTION: "REMOVE",
    id: id,
  };
  return axios.post(`${API_URL}/jobOffer`, JSON.stringify(payload));
};

export const getJobOfferById = (id: string | number) => {
  return axios.get(`${API_URL}/jobOffer?id=${id}`);
}
export const updateJobOfferHelper = (data: any) => {
  data.ACTION = "Update";
  return axios.post(`${API_URL}/jobOffer`, data);
}


export const getMyJobOffers = (username: any) => {
  const data = { username: username };
  return axios.get(`${API_URL}/jobOffer`, {params: data});
}

export const getApplicats = (username: string, id: string | number | undefined) => {
  return axios.get(`${API_URL}/application?username=${username}`);
}

export const getApplicantResume = (username: string) => {
  return axios.get(`${API_URL}/resume?username=${username}`, {responseType: 'blob'});
}