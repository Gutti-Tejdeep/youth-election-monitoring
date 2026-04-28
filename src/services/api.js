import axios from 'axios';

const API = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── User APIs ───────────────────────────────────────────
export const loginUser = (data) => API.post('/users/login', data);
export const registerUser = (data) => API.post('/users/register', data);
export const verifyOtpAPI = (email, otp) => API.post(`/users/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
export const updateUserAPI = (id, data) => API.put(`/users/${id}`, data);
export const getAllUsersAPI = () => API.get('/users/all');
export const deleteUserAPI = (id) => API.delete(`/users/delete/${id}`);

// ─── Volunteer APIs ──────────────────────────────────────
export const getVolunteers = () => API.get('/volunteers');
export const addVolunteerAPI = (data) => API.post('/volunteers', data);
export const deleteVolunteerAPI = (id) => API.delete(`/volunteers/${id}`);
export const updateVolunteerAPI = (id, data) => API.put(`/volunteers/${id}`, data);

// ─── Incident APIs ───────────────────────────────────────
export const getIncidents = () => API.get('/incidents');
export const addIncidentAPI = (data) => API.post('/incidents', data);
export const deleteIncidentAPI = (id) => API.delete(`/incidents/${id}`);

// ─── Report APIs ─────────────────────────────────────────
export const getReports = () => API.get('/reports');
export const addReportAPI = (data) => API.post('/reports', data);
export const deleteReportAPI = (id) => API.delete(`/reports/${id}`);

// ─── Interaction APIs ────────────────────────────────────
export const getInteractions = () => API.get('/interactions');
export const addInteractionAPI = (data) => API.post('/interactions', data);
export const deleteInteractionAPI = (id) => API.delete(`/interactions/${id}`);

export default API;
