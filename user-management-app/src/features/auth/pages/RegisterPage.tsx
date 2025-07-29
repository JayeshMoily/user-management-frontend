import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../utils/constants';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light py-4">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="display-4 text-primary mb-2">User Management</h1>
          <p className="lead text-muted">Create your account to get started.</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};