import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayout = () => {
  return (
    <div className="admin-wrapper">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="p-4">
          <Outlet />{" "}
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
