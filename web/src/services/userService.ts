import axios from 'axios';
import { API_URL } from '../constants';
import { User } from '../types';

type JobId = number | string | undefined;

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

export const getJobOfferById = (id: JobId) => {
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

export const getApplicats = (username: string, jobId: string | number | undefined) => {
  const params = {
    username: username,
    action: "getApplicants",
    jobId: jobId
  }
  return axios.get(`${API_URL}/application`, {params: params});
}

export const getApplicantResume = (username: string) => {
  return axios.get(`${API_URL}/resume?username=${username}`, {responseType: 'blob'});
}

export const deleteApplication = (username: string, jobId: JobId) => {
  const payload = {
    ACTION: "REMOVE",
    username,
    jobId
  }
  return axios.post(`${API_URL}/application`, payload);
}

export const rejectApplication = (username: string, jobId: JobId) => {
  const payload: Object = {
    ACTION: "SELECT",
    username,
    jobId,
    status: "Rejected"
  }
  return axios.post(`${API_URL}/application`, payload);
}

export const selectCandidateForInterview = (username: string, jobId: any) =>{
  const payload: Object = {
    ACTION: "SELECT",
    username,
    jobId,
    status: "Accepted"
  }
  return axios.post(`${API_URL}/application`, payload);
}