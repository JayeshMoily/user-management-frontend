import api from './axios.config';
import type { LoginPayload, RegisterPayload, AuthResponse } from '../types/auth.types';

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post('/login', payload);
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<{ message: string; userId: number }> => {
    const response = await api.post('/register', payload);
    return response.data;
  },
};