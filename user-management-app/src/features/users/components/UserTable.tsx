import { useState, useEffect } from 'react';
import type { User } from '../../../types/user.types';
import { useAuth } from '../../../hooks/useAuth';
import { USER_ROLES } from '../../../utils/constants';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  loading: boolean;
}

export const UserTable = ({ users, onEdit, onDelete, loading }: UserTableProps) => {
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.userRole === USER_ROLES.ADMIN;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canEditUser = (user: User) => {
    return isAdmin || user.id === currentUser?.id;
  };

  const canDeleteUser = (user: User) => {
    return isAdmin && user.id !== currentUser?.id;
  };

  if (isMobile) {
    // Mobile Card Layout
    return (
      <div className="row g-3">
        {users.map((user) => (
          <div key={user.id} className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-3">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="d-flex align-items-center flex-grow-1">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      <span className="text-white fw-bold">
                        {user.firstName[0]}{user.lastName[0]}
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{user.firstName} {user.lastName}</div>
                      {user.id === currentUser?.id && (
                        <small className="text-primary">(You)</small>
                      )}
                      <div className="small text-muted text-break">{user.email}</div>
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <span className={`badge ${user.userRole === 'admin' ? 'bg-warning text-dark' : 'bg-info'} rounded-pill`}>
                          {user.userRole}
                        </span>
                        <small className="text-muted">
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-1 ms-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => onEdit(user)}
                      disabled={!canEditUser(user) || loading}
                      title={canEditUser(user) ? 'Edit user' : 'You can only edit your own profile'}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onDelete(user)}
                      disabled={!canDeleteUser(user) || loading}
                      title={
                        !isAdmin 
                          ? 'Only admins can delete users' 
                          : user.id === currentUser?.id 
                          ? 'You cannot delete your own account' 
                          : 'Delete user'
                      }
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop Table Layout
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '32px', height: '32px' }}>
                    <span className="text-white fw-bold small">
                      {user.firstName[0]}{user.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <div className="fw-semibold">{user.firstName} {user.lastName}</div>
                    {user.id === currentUser?.id && (
                      <small className="text-muted">(You)</small>
                    )}
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.userRole === 'admin' ? 'bg-warning text-dark' : 'bg-info'} rounded-pill`}>
                  {user.userRole}
                </span>
              </td>
              <td>
                <small className="text-muted">
                  {new Date(user.created_at).toLocaleDateString()}
                </small>
              </td>
              <td className="text-center">
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => onEdit(user)}
                    disabled={!canEditUser(user) || loading}
                    title={canEditUser(user) ? 'Edit user' : 'You can only edit your own profile'}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(user)}
                    disabled={!canDeleteUser(user) || loading}
                    title={
                      !isAdmin 
                        ? 'Only admins can delete users' 
                        : user.id === currentUser?.id 
                        ? 'You cannot delete your own account' 
                        : 'Delete user'
                    }
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};