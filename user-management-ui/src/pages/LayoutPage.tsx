import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const LayoutPage: React.FC = () => {

  return (
    <>
     <div className="container-fluid">

        <div className="row">
        <div className="col-3">
        <Sidebar />
     </div>
     <div className="col-9">

     </div>
        </div>
     </div>
    </>
  );
};

export default LayoutPage;
