import React, { useEffect, useState } from "react";
import { getUsers } from "../api/apiService";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  return (
    <div>
      <h2>Active Users</h2>
      
      {/* <ul>
        {users.map((u) => (
          <li key={u.id}>{u.firstName}</li>
        ))}
      </ul> */}

      <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">FIRST NAME</th>
               <th scope="col">LAST NAME</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
               <td>{item.lastName}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default UsersPage;
