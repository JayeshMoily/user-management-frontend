import React, { useState } from "react";
import "./style/Sidebar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Sidebar: React.FC = () => {
  const [toggled, setToggled] = useState(false);
  const auth = useAuth();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setToggled(!toggled);
  };

  const handleLogout = () => {
    console.log("auth", auth);
    auth.logout();
  };

  return (
    <div id="wrapper" className={toggled ? "toggled" : ""}>
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <h2>Dashboard</h2>
        </div>
        <ul className="sidebar-nav list-unstyled">
          <li className="nav-item">
            <Link className="nav-link " to="/chatPage">
              <i className="fa-solid fa-comment me-3"></i>Group Chat
            </Link>
          </li>
          <li>
            <Link className="nav-link " to="/dashboard/userlist">
              <i className="fa-solid fa-users me-3"></i>Member List
            </Link>
          </li>
          <li>
            <Link className="nav-link " to="/chatPage">
              <i className="fa-solid fa-file me-3"></i>Document
            </Link>
          </li>
          <li>
            {/* <Link className="nav-link " to="/" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket me-3"></i>Logout</Link> */}
            <button className="btn btn-danger" onClick={handleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket me-3"></i>
              Logout
            </button>
          </li>
        </ul>
      </aside>
      <div className="container-fluid">
        <button
          className="btn btn-link text-dark fs-4"
          id="sidebar-toggle"
          onClick={handleToggle}
        >
          <i className="fa fa-bars"></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
