import axios from 'axios';
import { API_URL } from '../constants';
import { User } from '../types';

// Define a type alias for Job IDs
type JobId = number | string | undefined;
// Create a new user
export const createUser = (user: User) => {
  return axios.post(`${API_URL}/users`, user);
};
// Get all users
export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`);
};
// Delete a user by username
export const deleteUser = (username: string) => {
  return axios.delete(`${API_URL}/users?username=${username}`);
};

// Add a job offer using helper function
export const addJobOfferHelper = (data: any) => {
  data.ACTION = "Add"
  return axios.post(`${API_URL}/jobOffer`, data);
}
// Delete a job offer by ID
export const deleteJobOffer = (id: string | number) => {
  const payload = {
    ACTION: "REMOVE",
    id: id,
  };
  return axios.post(`${API_URL}/jobOffer`, JSON.stringify(payload));
};
// Get a job offer by ID
export const getJobOfferById = (id: JobId) => {
  return axios.get(`${API_URL}/jobOffer?id=${id}`);
}
// Update a job offer using helper function
export const updateJobOfferHelper = (data: any) => {
  data.ACTION = "Update";
  return axios.post(`${API_URL}/jobOffer`, data);
}

// Get job offers associated with a specific user
export const getMyJobOffers = (username: any) => {
  const data = { username: username };
  return axios.get(`${API_URL}/jobOffer`, {params: data});
}

// Get applicants for a specific job offer
export const getApplicats = (username: string, jobId: string | number | undefined) => {
  const params = {
    username: username,
    action: "getApplicants",
    jobId: jobId
  }
  return axios.get(`${API_URL}/application`, {params: params});
}
// Get applicant's resume by username
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
// Reject an application
export const rejectApplication = (username: string, jobId: JobId) => {
  const payload: Object = {
    ACTION: "SELECT",
    username,
    jobId,
    status: "Rejected"
  }
  return axios.post(`${API_URL}/application`, payload);
}
// Select a candidate for interview
export const selectCandidateForInterview = (username: string, jobId: any) =>{
  const payload: Object = {
    ACTION: "SELECT",
    username,
    jobId,
    status: "Accepted"
  }
  return axios.post(`${API_URL}/application`, payload);
}