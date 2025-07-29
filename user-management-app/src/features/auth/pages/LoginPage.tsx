import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../utils/constants';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="display-4 text-primary mb-2">User Management</h1>
          <p className="lead text-muted">Welcome back! Please sign in to your account.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};