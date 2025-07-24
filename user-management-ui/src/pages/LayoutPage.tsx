import React from "react";
import Sidebar from "../components/layout/Sidebar";
import UsersPage from "./UsersPage";
const LayoutPage: React.FC = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <UsersPage></UsersPage>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutPage;
