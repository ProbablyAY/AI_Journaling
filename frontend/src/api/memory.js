import { apiClient } from '../lib/apiClient';
export const listApprovedMemory = () => apiClient.get('/memory');
export const approveMemory = (id) => apiClient.post(`/memory/${id}/approve`);
export const rejectMemory = (id) => apiClient.post(`/memory/${id}/reject`);
