import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/apiService";
import { useAuth } from "../auth/AuthContext";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
      auth.login(res.data.token); // Store token and mark as logged in
      navigate("/users");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
     <Login />
      {/* <h2>Login</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button> */}
    </div>
  );
};

export default LoginPage;
