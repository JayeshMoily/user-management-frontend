import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { loginUser, registerUser, logout, clearError } from '../features/auth/authSlice';
import type { LoginPayload, RegisterPayload } from '../types/auth.types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  const login = (payload: LoginPayload) => {
    return dispatch(loginUser(payload));
  };

  const register = (payload: RegisterPayload) => {
    return dispatch(registerUser(payload));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
    clearError: clearAuthError,
  };
};