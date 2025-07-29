import type { User } from '../../../types/user.types';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`;
  
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body text-center">
        {/* User Avatar */}
        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
          <span className="text-white fw-bold fs-4">{initials}</span>
        </div>
        
        {/* User Info */}
        <h5 className="card-title mb-2">{user.firstName} {user.lastName}</h5>
        <p className="card-text text-muted mb-2">{user.email}</p>
        
        {/* Role Badge */}
        <span className={`badge ${user.userRole === 'admin' ? 'bg-warning text-dark' : 'bg-info'} rounded-pill`}>
          {user.userRole}
        </span>
        
        {/* Member Since */}
        <div className="mt-3 pt-3 border-top">
          <small className="text-muted">
            Member since {new Date(user.created_at).toLocaleDateString()}
          </small>
        </div>
      </div>
    </div>
  );
};