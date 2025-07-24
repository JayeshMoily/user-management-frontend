const BASE_URL = 'http://localhost:5000';

export const API_URLS = {
  login: `${BASE_URL}/api/login`,
  register: `${BASE_URL}/api/register`,
  getUsers: `${BASE_URL}/api/users`,
  getAllUsers: `${BASE_URL}/api/admin/users/all`,
  updateUser: (id: string | number) => `${BASE_URL}/api/user/${id}`,
  deleteUser: (id: string | number) => `${BASE_URL}/api/user/${id}`,
  sendChat: `${BASE_URL}/api/chat/send`,
  getChat: (convId: string) => `${BASE_URL}/api/chat/${convId}`,
  getConversations: `${BASE_URL}/api/conversations`,
};
