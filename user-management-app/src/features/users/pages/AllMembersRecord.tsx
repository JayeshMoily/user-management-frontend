import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { fetchAllUsers } from '../usersSlice';
import { LoadingSpinner } from '../../../common/components/LoadingSpinner';
import { ErrorAlert } from '../../../common/components/ErrorAlert';
import { formatDate } from '../../../utils/dateFormatter';
import type { User } from '../../../types/user.types';

export const AllMembersRecord = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allUsers, loading, error } = useSelector((state: RootState) => state.users);
  const [sortField, setSortField] = useState<keyof User>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...allUsers].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) aValue = '';
    if (bValue === null || bValue === undefined) bValue = '';

    // Convert to string for comparison
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();

    if (sortDirection === 'asc') {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });

  const getSortIcon = (field: keyof User) => {
    if (sortField !== field) return 'bi-arrows-expand';
    return sortDirection === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
  };

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className={`${isMobile ? 'd-block' : 'd-flex justify-content-between align-items-center'} mb-4`}>
        <div className={isMobile ? 'mb-3' : ''}>
          <h2 className={`mb-1 ${isMobile ? 'h4' : ''}`}>All Members Record</h2>
          <p className={`text-muted mb-0 ${isMobile ? 'small' : ''}`}>Comprehensive user database with all details</p>
        </div>
        <div className={`d-flex align-items-center ${isMobile ? 'justify-content-center flex-wrap gap-2' : 'gap-3'}`}>
          <span className={`badge bg-success ${isMobile ? 'fs-7' : 'fs-6'} px-2 py-1`}>
            {allUsers.filter(u => !u.is_deleted).length} Active
          </span>
          <span className={`badge bg-danger ${isMobile ? 'fs-7' : 'fs-6'} px-2 py-1`}>
            {allUsers.filter(u => u.is_deleted).length} Deleted
          </span>
          <span className={`badge bg-primary ${isMobile ? 'fs-7' : 'fs-6'} px-2 py-1`}>
            {allUsers.length} Total
          </span>
        </div>
      </div>

      {/* Admin Notice */}
      <div className="alert alert-warning mb-4">
        <i className="bi bi-shield-lock me-2"></i>
        <strong>Admin Only:</strong> This page contains sensitive user information including deleted accounts. Handle with care.
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
          <LoadingSpinner text="Loading all users..." />
        </div>
      ) : allUsers.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-database display-1 text-muted mb-3"></i>
          <h4 className="text-muted">No records available</h4>
          <p className="text-muted">There are no user records in the system.</p>
        </div>
      ) : isMobile ? (
        // Mobile Card Layout
        <div>
          {/* Sort Controls for Mobile */}
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <small className="text-muted fw-semibold">Sort by:</small>
              <div className="d-flex gap-2">
                <select 
                  className="form-select form-select-sm" 
                  value={sortField}
                  onChange={(e) => handleSort(e.target.value as keyof User)}
                  style={{ width: 'auto' }}
                >
                  <option value="id">ID</option>
                  <option value="firstName">First Name</option>
                  <option value="lastName">Last Name</option>
                  <option value="email">Email</option>
                  <option value="userRole">Role</option>
                  <option value="created_at">Created</option>
                  <option value="updated_at">Updated</option>
                </select>
                <button 
                  className="btn btn-outline-secondary btn-sm px-2"
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                >
                  <i className={`bi ${sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'}`}></i>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="row g-3">
            {sortedUsers.map((user) => (
              <div key={user.id} className="col-12">
                <div className={`card border-0 shadow-sm ${user.is_deleted ? 'border-danger opacity-75' : ''}`}>
                  <div className="card-body p-3">
                    <div className="d-flex align-items-start justify-content-between">
                      <div className="d-flex align-items-center flex-grow-1">
                        <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${user.is_deleted ? 'bg-secondary' : 'bg-primary'}`} style={{ width: '40px', height: '40px' }}>
                          <span className="text-white fw-bold small">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <div className={`fw-semibold ${user.is_deleted ? 'text-danger' : ''}`}>
                            {user.firstName} {user.lastName}
                            <small className="text-muted ms-2">#{user.id}</small>
                          </div>
                          <div className="small text-muted text-break">{user.email}</div>
                          <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                            <span className={`badge ${user.userRole === 'admin' ? 'bg-warning text-dark' : 'bg-info'} rounded-pill`}>
                              {user.userRole}
                            </span>
                            {user.is_deleted ? (
                              <span className="badge bg-danger">Deleted</span>
                            ) : (
                              <span className="badge bg-success">Active</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional Details */}
                    <div className="mt-3 pt-2 border-top">
                      <div className="row text-center">
                        <div className="col-4">
                          <small className="text-muted d-block">Created</small>
                          <small className="fw-semibold">{formatDate(user.created_at)}</small>
                        </div>
                        <div className="col-4">
                          <small className="text-muted d-block">Updated</small>
                          <small className="fw-semibold">{formatDate(user.updated_at)}</small>
                        </div>
                        <div className="col-4">
                          <small className="text-muted d-block">Deleted</small>
                          <small className={`fw-semibold ${user.deleted_at ? 'text-danger' : ''}`}>
                            {user.deleted_at ? formatDate(user.deleted_at) : '-'}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Footer Stats */}
          <div className="card mt-4 bg-light">
            <div className="card-body p-3">
              <div className="row text-center">
                <div className="col-4">
                  <div className="fw-bold text-primary">{allUsers.length}</div>
                  <small className="text-muted">Total</small>
                </div>
                <div className="col-4">
                  <div className="fw-bold text-success">{allUsers.filter(u => !u.is_deleted).length}</div>
                  <small className="text-muted">Active</small>
                </div>
                <div className="col-4">
                  <div className="fw-bold text-danger">{allUsers.filter(u => u.is_deleted).length}</div>
                  <small className="text-muted">Deleted</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Desktop Table Layout
        <div className="card">
          <div className="card-header bg-light">
            <h5 className="card-title mb-0">
              <i className="bi bi-table me-2"></i>
              Complete User Database
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-sm mb-0">
                <thead className="table-dark">
                  <tr>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('id')}
                      style={{ cursor: 'pointer' }}
                    >
                      ID <i className={`bi ${getSortIcon('id')} ms-1`}></i>
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('firstName')}
                      style={{ cursor: 'pointer' }}
                    >
                      First Name <i className={`bi ${getSortIcon('firstName')} ms-1`}></i>
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('lastName')}
                      style={{ cursor: 'pointer' }}
                    >
                      Last Name <i className={`bi ${getSortIcon('lastName')} ms-1`}></i>
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('email')}
                      style={{ cursor: 'pointer' }}
                    >
                      Email <i className={`bi ${getSortIcon('email')} ms-1`}></i>
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('userRole')}
                      style={{ cursor: 'pointer' }}
                    >
                      Role <i className={`bi ${getSortIcon('userRole')} ms-1`}></i>
                    </th>
                    <th>Status</th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('created_at')}
                      style={{ cursor: 'pointer' }}
                    >
                      Created <i className={`bi ${getSortIcon('created_at')} ms-1`}></i>
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('updated_at')}
                      style={{ cursor: 'pointer' }}
                    >
                      Updated <i className={`bi ${getSortIcon('updated_at')} ms-1`}></i>
                    </th>
                    <th>Deleted</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user) => (
                    <tr key={user.id} className={user.is_deleted ? 'text-danger opacity-75' : ''}>
                      <td className="fw-bold">{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>
                        <span className="text-break">{user.email}</span>
                      </td>
                      <td>
                        <span className={`badge ${user.userRole === 'admin' ? 'bg-warning text-dark' : 'bg-info'} rounded-pill`}>
                          {user.userRole}
                        </span>
                      </td>
                      <td>
                        {user.is_deleted ? (
                          <span className="badge bg-danger">Deleted</span>
                        ) : (
                          <span className="badge bg-success">Active</span>
                        )}
                      </td>
                      <td>
                        <small className="text-muted">
                          {formatDate(user.created_at)}
                        </small>
                      </td>
                      <td>
                        <small className="text-muted">
                          {formatDate(user.updated_at)}
                        </small>
                      </td>
                      <td>
                        {user.deleted_at ? (
                          <small className="text-danger">
                            {formatDate(user.deleted_at)}
                          </small>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer bg-light">
            <div className="row text-center">
              <div className="col-md-4">
                <small className="text-muted">
                  <strong>Total Records:</strong> {allUsers.length}
                </small>
              </div>
              <div className="col-md-4">
                <small className="text-muted">
                  <strong>Active Users:</strong> {allUsers.filter(u => !u.is_deleted).length}
                </small>
              </div>
              <div className="col-md-4">
                <small className="text-muted">
                  <strong>Deleted Users:</strong> {allUsers.filter(u => u.is_deleted).length}
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};