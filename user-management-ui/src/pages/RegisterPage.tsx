import React, { useState } from "react";
import Register from "../components/Register/Register";

const RegisterPage: React.FC = () => {

  return (
    <div>
      <Register></Register>
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

export default RegisterPage;
