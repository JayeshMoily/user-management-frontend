import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES, USER_ROLES } from '../utils/constants';

export const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 768);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const { user, logout } = useAuth();
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  // Handle window resize with comprehensive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Update device type states
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
      setIsDesktop(width > 1024);
      
      // Auto-collapse sidebar on mobile and tablet
      if (width <= 768) {
        setSidebarCollapsed(true);
      } else if (width <= 1024) {
        // On tablet, keep current state but allow manual control
      } else {
        // On desktop, expand by default
        setSidebarCollapsed(false);
      }
      
      // Close user menu on resize
      setShowUserMenu(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const navigationItems = [
    {
      path: ROUTES.GROUP_CHAT,
      label: 'Group Chat',
      icon: 'bi-chat-dots',
    },
    {
      path: ROUTES.MEMBER_LIST,
      label: 'Member List',
      icon: 'bi-people',
    },
    {
      path: ROUTES.MANAGE_MEMBERS,
      label: 'Manage Members',
      icon: 'bi-gear',
    },
    ...(user?.userRole === USER_ROLES.ADMIN
      ? [
          {
            path: ROUTES.ALL_MEMBERS,
            label: 'All Members Record',
            icon: 'bi-table',
          },
        ]
      : []),
  ];

  return (
    <div className="d-flex min-vh-100">
      {/* Mobile/Tablet Backdrop */}
      {!sidebarCollapsed && (isMobile || isTablet) && (
        <div 
          className="position-fixed w-100 h-100"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            left: 0,
            top: 0,
          }}
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`bg-dark text-white d-flex flex-column transition-all position-fixed ${
          sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
        }`}
        style={{
          width: sidebarCollapsed ? '60px' : (isMobile ? '280px' : '250px'),
          height: '100vh',
          transition: 'all 0.3s ease',
          zIndex: 1000,
          left: (isMobile || isTablet) && sidebarCollapsed ? '-60px' : '0',
        }}
      >
        {/* Logo/Header */}
        <div className="p-3 border-bottom border-secondary">
          <div className="d-flex align-items-center">
            <i className="bi bi-person-circle fs-4 text-primary"></i>
            {!sidebarCollapsed && (
              <span className="ms-2 fw-bold">User Management</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow-1 py-3">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`d-flex align-items-center px-3 py-2 text-white text-decoration-none sidebar-item ${
                isActive(item.path) ? 'active' : ''
              }`}
              style={{
                backgroundColor: isActive(item.path) ? 'rgba(13, 110, 253, 0.2)' : 'transparent',
                borderLeft: isActive(item.path) ? '3px solid #0d6efd' : '3px solid transparent',
              }}
            >
              <i className={`bi ${item.icon} fs-5`}></i>
              {!sidebarCollapsed && <span className="ms-3">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-top border-secondary mt-auto">
          <div className="p-3 position-relative" ref={userMenuRef}>
            {sidebarCollapsed ? (
              // Collapsed: Show only logout icon
              <div 
                className="d-flex align-items-center justify-content-center"
                onClick={handleLogout}
                style={{ 
                  cursor: 'pointer',
                  borderRadius: '8px',
                  padding: '8px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                title="Logout"
              >
                <i className="bi bi-box-arrow-right text-white fs-4"></i>
              </div>
            ) : (
              // Expanded: Show full user profile with dropdown
              <div 
                className="d-flex align-items-center user-profile-container"
                onClick={toggleUserMenu}
                style={{ cursor: 'pointer' }}
              >
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <span className="text-white fw-bold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div className="ms-3 flex-grow-1">
                  <div className="fw-semibold text-white">{user?.firstName} {user?.lastName}</div>
                  <small className="text-muted">{user?.userRole}</small>
                </div>
                <i className={`bi ${showUserMenu ? 'bi-chevron-up' : 'bi-chevron-down'} text-muted`}></i>
              </div>
            )}
            
            {/* User Menu Dropdown - Only show when sidebar is expanded */}
            {showUserMenu && !sidebarCollapsed && (
              <div 
                className="position-absolute bottom-100 mb-2"
                style={{
                  left: '0',
                  right: '0',
                  zIndex: 1060
                }}
              >
                <div className="bg-white border border-light rounded shadow-lg overflow-hidden">
                  <div className="p-3 bg-light border-bottom">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '32px', height: '32px' }}>
                        <span className="text-white fw-bold small">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-semibold text-dark">{user?.firstName} {user?.lastName}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>
                          {user?.email}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="mb-2">
                      <div className="px-3 py-1">
                        <small className="text-muted">Role</small>
                        <div>
                          <span className={`badge ${user?.userRole === 'admin' ? 'bg-warning text-dark' : 'bg-info'} rounded-pill`}>
                            {user?.userRole}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className="flex-grow-1 d-flex flex-column"
        style={{
          marginLeft: (() => {
            if (isMobile || isTablet) return '0';
            return sidebarCollapsed ? '60px' : '250px';
          })(),
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
        }}
      >
        {/* Top Navigation Bar - Fixed */}
        <nav 
          className="navbar navbar-expand-lg navbar-light bg-white border-bottom position-fixed"
          style={{
            top: 0,
            right: 0,
            left: (() => {
              if (isMobile || isTablet) return '0';
              return sidebarCollapsed ? '60px' : '250px';
            })(),
            zIndex: 1020,
            transition: 'left 0.3s ease',
            padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
          }}
        >
          <button
            className={`btn btn-outline-secondary ${isMobile ? 'btn-sm' : ''}`}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <i className="bi bi-list"></i>
          </button>
          
          <div className="ms-auto d-flex align-items-center">
            {!isMobile && (
              <span className="text-muted me-2">Welcome back,</span>
            )}
            <span className={`fw-bold text-primary ${isMobile ? 'small' : ''}`}>
              {isMobile ? `${user?.firstName}` : `${user?.firstName}!`}
            </span>
          </div>
        </nav>

        {/* Page Content */}
        <main 
          className={`flex-grow-1 bg-light ${isMobile ? 'p-2' : isTablet ? 'p-3' : 'p-4'}`}
          style={{
            marginTop: isMobile ? '60px' : '70px', // Account for fixed header height
            minHeight: 'calc(100vh - 70px)',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};