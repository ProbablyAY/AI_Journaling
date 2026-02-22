import { apiClient } from '../lib/apiClient';
export const signup = (email, password) => apiClient.post('/auth/signup', { email, password });
export const login = (email, password) => apiClient.post('/auth/login', { email, password });
export const logout = () => apiClient.post('/auth/logout');
export const getMe = () => apiClient.get('/me');
export const deleteMe = () => apiClient.delete('/me');
