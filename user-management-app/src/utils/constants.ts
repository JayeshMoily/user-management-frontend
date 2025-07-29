export const API_BASE_URL = 'http://localhost:5000/api';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
  GROUP_CHAT: '/chat',
  MEMBER_LIST: '/members',
  MANAGE_MEMBERS: '/manage-members',
  ALL_MEMBERS: '/all-members',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  NON_ADMIN: 'nonadmin',
} as const;

export const CHAT_CONV_ID = 'general';

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
} as const;