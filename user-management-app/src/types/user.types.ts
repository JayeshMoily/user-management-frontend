export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userRole: 'admin' | 'nonadmin';
  created_at: string;
  updated_at: string;
  is_deleted?: boolean | number;
  deleted_at?: string | null;
}

export interface UpdateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  userRole?: string;
}

export interface UsersState {
  list: User[];
  allUsers: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

export interface UsersResponse {
  message: string;
  users: User[];
}