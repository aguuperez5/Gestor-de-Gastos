import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gestor-de-gastos-backend.onrender.com/api',
});

export const registerUser = (data) => api.post('/users/register', data);
export const loginUser = (data) => api.post('/users/login', data);
export const getGastos = (token, params = {}) =>
  api.get('/gastos', { headers: { Authorization: `Bearer ${token}` }, params });
export const createGasto = (data, token) =>
  api.post('/gastos', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateGasto = (id, data, token) =>
  api.put(`/gastos/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteGasto = (id, token) =>
  api.delete(`/gastos/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export default api;