import React from "react";
import UsersList from "../components/UsersList/UsersList";

const UsersPage: React.FC = () => {
  return (
    <div>
      <UsersList />
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

export default UsersPage;
