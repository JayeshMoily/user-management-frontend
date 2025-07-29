import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { fetchUsers, setSearchTerm } from '../usersSlice';
import { UserCard } from '../components/UserCard';
import { LoadingSpinner } from '../../../common/components/LoadingSpinner';
import { ErrorAlert } from '../../../common/components/ErrorAlert';
import { useDebounce } from '../../../hooks/useDebounce';

export const MemberList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: users, loading, error, searchTerm } = useSelector((state: RootState) => state.users);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    
    const term = searchTerm.toLowerCase();
    return users.filter(user => 
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Member List</h2>
          <p className="text-muted mb-0">View all active team members</p>
        </div>
        <div className="d-flex align-items-center">
          <span className="badge bg-primary fs-6 px-3 py-2">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'Member' : 'Members'}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6 col-lg-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search members by name or email..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
            {localSearchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setLocalSearchTerm('')}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>
      </div>

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
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-people display-1 text-muted mb-3"></i>
          <h4 className="text-muted">
            {searchTerm ? 'No members found' : 'No members available'}
          </h4>
          <p className="text-muted">
            {searchTerm 
              ? `No members match "${searchTerm}". Try adjusting your search.`
              : 'There are no active members in the system.'
            }
          </p>
          {searchTerm && (
            <button
              className="btn btn-outline-primary"
              onClick={() => setLocalSearchTerm('')}
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Search Results Info */}
          {searchTerm && (
            <div className="mb-3">
              <small className="text-muted">
                Showing {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''} for "{searchTerm}"
              </small>
            </div>
          )}

          {/* Members Grid */}
          <div className="row g-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="col-sm-6 col-md-4 col-lg-3">
                <UserCard user={user} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};