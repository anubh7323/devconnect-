import API from './apiClient';

export const register = (data: { username: string; email: string; password: string }) => API.post('/auth/register', data);
export const login = (data: { email: string; password: string }) => API.post('/auth/login', data);
export const getProfile = () => API.get('/users/me');
