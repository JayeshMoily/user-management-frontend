import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../common/layouts/ProtectedRoute';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { Layout } from '../pages/Layout';
import { GroupChat } from '../features/chat/pages/GroupChat';
import { MemberList } from '../features/users/pages/MemberList';
import { ManageMembers } from '../features/users/pages/ManageMembers';
import { AllMembersRecord } from '../features/users/pages/AllMembersRecord';
import { ROUTES, USER_ROLES } from '../utils/constants';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Redirect root to group chat */}
          <Route index element={<Navigate to={ROUTES.GROUP_CHAT} replace />} />
          
          {/* Main App Routes */}
          <Route path={ROUTES.GROUP_CHAT} element={<GroupChat />} />
          <Route path={ROUTES.MEMBER_LIST} element={<MemberList />} />
          <Route path={ROUTES.MANAGE_MEMBERS} element={<ManageMembers />} />
          
          {/* Admin Only Routes */}
          <Route
            path={ROUTES.ALL_MEMBERS}
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADMIN as 'admin'}>
                <AllMembersRecord />
              </ProtectedRoute>
            }
          />
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
};