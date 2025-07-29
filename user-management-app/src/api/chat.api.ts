import api from './axios.config';
import type { SendMessagePayload, ChatResponse } from '../types/chat.types';

export const chatApi = {
  sendMessage: async (payload: SendMessagePayload): Promise<{ message: string; chatId: number }> => {
    const response = await api.post('/chat/send', payload);
    return response.data;
  },

  getChatHistory: async (convId: string): Promise<ChatResponse> => {
    const response = await api.get(`/chat/${convId}`);
    return response.data;
  },
};