import api from './axios.config';
import type { UpdateUserPayload, UsersResponse } from '../types/user.types';

export const usersApi = {
  getUsers: async (): Promise<UsersResponse> => {
    const response = await api.get('/users');
    return response.data;
  },

  getAllUsers: async (): Promise<UsersResponse> => {
    const response = await api.get('/admin/users/all');
    return response.data;
  },

  updateUser: async (id: number, payload: UpdateUserPayload): Promise<{ message: string }> => {
    const response = await api.put(`/user/${id}`, payload);
    return response.data;
  },

  deleteUser: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  },
};