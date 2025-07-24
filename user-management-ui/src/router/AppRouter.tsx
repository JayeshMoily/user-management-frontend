import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ChatPage from "../components/ChatPage/ChatPage";
import ProtectedRoute from "../auth/ProtectedRoute";
import RegisterPage from "../pages/RegisterPage";
import LayoutPage from "../pages/LayoutPage";
import UsersPage from "../pages/UsersPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <LayoutPage />
          </ProtectedRoute>
        }
      >
        {" "}
        <Route path="/dashboard/userlist" element={<UsersPage />} />
      </Route>
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
