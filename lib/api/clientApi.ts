
import { apiClient } from './api';
import type { User } from '@/types/user';


interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}


export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};


export const registerUser = async (credentials: RegisterCredentials): Promise<User> => {
  const response = await apiClient.post('/auth/register', credentials);
  return response.data;
};


export const logoutUser = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};


export const checkSession = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get('/auth/session');
    return response.data;
  } catch (error) {
    return null;
  }
};


export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get('/users/me');
  return response.data;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.patch('/users/me', userData);
  return response.data;
};