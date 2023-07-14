import axios from 'axios';
import { API_URL } from '../constants';
import { Auth } from '../types';

export const login = (payload: Auth) => {
  return axios.post(`${API_URL}/login`, payload);
};
