import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container h-100 shadow">
      <div className="p-4 border-bottom border-secondary mb-3 text-white text-center">
        <h4 className="mb-0">
          Article<span style={{ color: "var(--accent)" }}>Flow</span>
        </h4>
      </div>

      <div className="d-flex flex-column px-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link-custom active" : "nav-link-custom"
          }>
          <i className="bi bi-speedometer2 me-2"></i> Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "nav-link-custom active" : "nav-link-custom"
          }>
          <i className="bi bi-people me-2"></i> User List
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            isActive ? "nav-link-custom active" : "nav-link-custom"
          }>
          <i className="bi bi-tags me-2"></i> Categories
        </NavLink>
        <NavLink
          to="/admin/subcategories"
          className={({ isActive }) =>
            isActive ? "nav-link-custom active" : "nav-link-custom"
          }>
          <i className="bi bi-tags me-2"></i> SubCategories
        </NavLink>

        <NavLink
          to="/admin/articles"
          className={({ isActive }) =>
            isActive ? "nav-link-custom active" : "nav-link-custom"
          }>
          <i className="bi bi-file-earmark-post me-2"></i> Article Post
        </NavLink>

        <NavLink
          to="/admin/comments"
          className={({ isActive }) =>
            isActive ? "nav-link-custom active" : "nav-link-custom"
          }>
          <i className="bi bi-chat-left-text me-2"></i> Comments
        </NavLink>

        <NavLink
          to="/admin/media"
          className={({ isActive }) =>
            isActive ? "nav-link-custom active" : "nav-link-custom"
          }>
          <i className="bi bi-images me-2"></i> Media
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive ? "nav-link-custom active" : "nav-link-custom"
          }>
          <i className="bi bi-gear me-2"></i> Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
