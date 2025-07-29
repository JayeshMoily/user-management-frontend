import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { fetchUsers, updateUser, deleteUser } from '../usersSlice';
import { UserTable } from '../components/UserTable';
import { UserEditModal } from '../components/UserEditModal';
import { ConfirmDialog } from '../../../common/components/ConfirmDialog';
import { LoadingSpinner } from '../../../common/components/LoadingSpinner';
import { ErrorAlert } from '../../../common/components/ErrorAlert';
import type { User, UpdateUserPayload } from '../../../types/user.types';
import { useAuth } from '../../../hooks/useAuth';
import { USER_ROLES } from '../../../utils/constants';

export const ManageMembers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useAuth();
  const { list: users, loading, error } = useSelector((state: RootState) => state.users);
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const isAdmin = currentUser?.userRole === USER_ROLES.ADMIN;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleSaveUser = async (id: number, data: UpdateUserPayload) => {
    setActionLoading(true);
    try {
      await dispatch(updateUser({ id, payload: data })).unwrap();
      setEditingUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;

    setActionLoading(true);
    try {
      await dispatch(deleteUser(deletingUser.id)).unwrap();
      setDeletingUser(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className={`${isMobile ? 'd-block' : 'd-flex justify-content-between align-items-center'} mb-4`}>
        <div className={isMobile ? 'mb-3' : ''}>
          <h2 className={`mb-1 ${isMobile ? 'h4' : ''}`}>Manage Members</h2>
          <p className={`text-muted mb-0 ${isMobile ? 'small' : ''}`}>
            {isAdmin 
              ? 'Edit and manage all team members' 
              : 'View members and edit your own profile'
            }
          </p>
        </div>
        <div className={`d-flex align-items-center ${isMobile ? 'justify-content-center' : ''}`}>
          <span className={`badge bg-primary ${isMobile ? 'fs-6' : 'fs-6'} px-3 py-2`}>
            {users.length} {users.length === 1 ? 'Member' : 'Members'}
          </span>
        </div>
      </div>

      {/* Permission Notice for Non-Admins */}
      {!isAdmin && (
        <div className="alert alert-info mb-4">
          <i className="bi bi-info-circle me-2"></i>
          <strong>Note:</strong> You can only edit your own profile. Contact an administrator to modify other user accounts.
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-4">
          <ErrorAlert message={error} />
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <LoadingSpinner text="Loading members..." />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-people display-1 text-muted mb-3"></i>
          <h4 className="text-muted">No members available</h4>
          <p className="text-muted">There are no active members in the system.</p>
        </div>
      ) : isMobile ? (
        // Mobile: No card wrapper, just the content
        <div>
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-people me-2 text-primary"></i>
            <h5 className="mb-0">Members List</h5>
          </div>
          <UserTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            loading={actionLoading}
          />
        </div>
      ) : (
        // Desktop: Card wrapper
        <div className="card">
          <div className="card-header bg-light">
            <h5 className="card-title mb-0">
              <i className="bi bi-table me-2"></i>
              Members List
            </h5>
          </div>
          <div className="card-body p-0">
            <UserTable
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              loading={actionLoading}
            />
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      <UserEditModal
        show={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveUser}
        loading={actionLoading}
        error={error}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        show={!!deletingUser}
        title="Delete User"
        message={`Are you sure you want to delete ${deletingUser?.firstName} ${deletingUser?.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingUser(null)}
      />
    </div>
  );
};