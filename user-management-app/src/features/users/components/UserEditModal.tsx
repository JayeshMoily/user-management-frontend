import { useState, useEffect } from 'react';
import type { User, UpdateUserPayload } from '../../../types/user.types';
import { LoadingSpinner } from '../../../common/components/LoadingSpinner';
import { ErrorAlert } from '../../../common/components/ErrorAlert';

interface UserEditModalProps {
  show: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (id: number, data: UpdateUserPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const UserEditModal = ({ show, user, onClose, onSave, loading, error }: UserEditModalProps) => {
  const [formData, setFormData] = useState<UpdateUserPayload>({
    firstName: '',
    lastName: '',
    email: '',
    userRole: 'nonadmin',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userRole: user.userRole,
      });
      setValidationErrors({});
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !validateForm()) return;
    
    try {
      await onSave(user.id, formData);
      onClose();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleClose = () => {
    setValidationErrors({});
    onClose();
  };

  if (!show || !user) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className={`modal-dialog ${isMobile ? 'modal-fullscreen-sm-down' : 'modal-dialog-centered'}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className={`modal-title ${isMobile ? 'h6' : ''}`}>Edit User</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className={`modal-body ${isMobile ? 'p-3' : ''}`}>
              {error && (
                <ErrorAlert message={error} className="mb-3" />
              )}
              
              <div className="row">
                <div className={`${isMobile ? 'col-12' : 'col-md-6'} mb-3`}>
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className={`form-control ${isMobile ? 'form-control-lg' : ''} ${validationErrors.firstName ? 'is-invalid' : ''}`}
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={loading}
                    style={isMobile ? { fontSize: '16px' } : {}}
                  />
                  {validationErrors.firstName && (
                    <div className="invalid-feedback">{validationErrors.firstName}</div>
                  )}
                </div>
                
                <div className={`${isMobile ? 'col-12' : 'col-md-6'} mb-3`}>
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${isMobile ? 'form-control-lg' : ''} ${validationErrors.lastName ? 'is-invalid' : ''}`}
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={loading}
                    style={isMobile ? { fontSize: '16px' } : {}}
                  />
                  {validationErrors.lastName && (
                    <div className="invalid-feedback">{validationErrors.lastName}</div>
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${isMobile ? 'form-control-lg' : ''} ${validationErrors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  style={isMobile ? { fontSize: '16px' } : {}}
                />
                {validationErrors.email && (
                  <div className="invalid-feedback">{validationErrors.email}</div>
                )}
              </div>
              
              <div className="mb-3">
                <label htmlFor="userRole" className="form-label">User Role</label>
                <select
                  className={`form-select ${isMobile ? 'form-select-lg' : ''}`}
                  id="userRole"
                  name="userRole"
                  value={formData.userRole}
                  onChange={handleInputChange}
                  disabled={loading}
                  style={isMobile ? { fontSize: '16px' } : {}}
                >
                  <option value="nonadmin">Non Admin</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            
            <div className={`modal-footer ${isMobile ? 'p-3' : ''}`}>
              <div className={`${isMobile ? 'd-grid gap-2' : 'd-flex'}`}>
                <button
                  type="button"
                  className={`btn btn-secondary ${isMobile ? 'btn-lg' : ''}`}
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${isMobile ? 'btn-lg' : ''}`}
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner size="sm" text="Saving..." /> : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};