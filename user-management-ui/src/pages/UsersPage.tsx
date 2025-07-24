import React, { useEffect, useState } from "react";
import { getUsers } from "../api/apiService";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  return (
    <div>
      <h2>Active Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
