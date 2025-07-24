import axiosInstance from './axiosInstance';
import { API_URLS } from './apiUrls';

export const login = (payload: { username: string; password: string }) => {
  return axiosInstance.post(API_URLS.login, payload);
};

export const register = (payload: { username: string; password: string }) => {
  return axiosInstance.post(API_URLS.register, payload);
};

export const getUsers = () => axiosInstance.get(API_URLS.getUsers);

export const getAllUsers = () => axiosInstance.get(API_URLS.getAllUsers);

export const updateUser = (id: string | number, data: any) =>
  axiosInstance.put(API_URLS.updateUser(id), data);

export const deleteUser = (id: string | number) =>
  axiosInstance.delete(API_URLS.deleteUser(id));

export const sendChat = (payload: any) => axiosInstance.post(API_URLS.sendChat, payload);

export const getChat = (convId: string) => axiosInstance.get(API_URLS.getChat(convId));

export const getConversations = () => axiosInstance.get(API_URLS.getConversations);