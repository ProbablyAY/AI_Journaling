import { apiClient } from '../lib/apiClient';
export const createSession = () => apiClient.post('/sessions');
export const listSessions = () => apiClient.get('/sessions');
export const getSession = (id) => apiClient.get(`/sessions/${id}`);
export const endSession = (id) => apiClient.post(`/sessions/${id}/end`);
export const getRealtimeToken = (id) => apiClient.post(`/sessions/${id}/realtime-token`);
export const sendUtteranceBatch = (id, items) => apiClient.post(`/sessions/${id}/utterances/batch`, { items });
