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
  return axios.post(`${API_URL}/jobOffer`, data);
}

export const getMyJobOffers = (data: any) => {
  return axios.get(`${API_URL}/jobOffer?username=${data}`);
}

export const deleteJobOffer = (id: string | number) => {
  return axios.delete(`${API_URL}/jobOffer?username=${id}`);
};

export const getJobOfferById = (id: string | number) => {
  return axios.get(`${API_URL}/jobOffer?id=${id}`);
}