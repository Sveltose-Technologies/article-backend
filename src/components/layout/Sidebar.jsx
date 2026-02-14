// // import React from "react";
// // import { NavLink } from "react-router-dom";

// // const Sidebar = () => {
// //   return (
// //     <div className="sidebar-container h-100 shadow">
// //       <div className="p-4 border-bottom border-secondary mb-3 text-white text-center">
// //         <h4 className="mb-0">
// //           Article<span style={{ color: "var(--accent)" }}>Flow</span>
// //         </h4>
// //       </div>

// //       <div className="d-flex flex-column px-2">
// //         <NavLink
// //           to="/admin/dashboard"
// //           className={({ isActive }) =>
// //             isActive ? "nav-link-custom active" : "nav-link-custom"
// //           }>
// //           <i className="bi bi-speedometer2 me-2"></i> Dashboard
// //         </NavLink>

// //         <NavLink
// //           to="/admin/users"
// //           className={({ isActive }) =>
// //             isActive ? "nav-link-custom active" : "nav-link-custom"
// //           }>
// //           <i className="bi bi-people me-2"></i> User List
// //         </NavLink>

// //         <NavLink
// //           to="/admin/categories"
// //           className={({ isActive }) =>
// //             isActive ? "nav-link-custom active" : "nav-link-custom"
// //           }>
// //           <i className="bi bi-tags me-2"></i> Categories
// //         </NavLink>
// //         <NavLink
// //           to="/admin/subcategories"
// //           className={({ isActive }) =>
// //             isActive ? "nav-link-custom active" : "nav-link-custom"
// //           }>
// //           <i className="bi bi-tags me-2"></i> SubCategories
// //         </NavLink>

// //         <NavLink
// //           to="/admin/articles"
// //           className={({ isActive }) =>
// //             isActive ? "nav-link-custom active" : "nav-link-custom"
// //           }>
// //           <i className="bi bi-file-earmark-post me-2"></i> Article Post
// //         </NavLink>

// //         <NavLink
// //           to="/admin/comments"
// //           className={({ isActive }) =>
// //             isActive ? "nav-link-custom active" : "nav-link-custom"
// //           }>
// //           <i className="bi bi-chat-left-text me-2"></i> Comments
// //         </NavLink>

// //         <NavLink
// //           to="/admin/media"
// //           className={({ isActive }) =>
// //             isActive ? "nav-link-custom active" : "nav-link-custom"
// //           }>
// //           <i className="bi bi-images me-2"></i> Media
// //         </NavLink>

// //         <NavLink
// //           to="/admin/settings"
// //           className={({ isActive }) =>
// //             isActive ? "nav-link-custom active" : "nav-link-custom"
// //           }>
// //           <i className="bi bi-gear me-2"></i> Settings
// //         </NavLink>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import logo from "../../assets/logo.png";
// const Sidebar = ({ onClose }) => {
//   return (
//     <div className="sidebar-container h-100 shadow">
//       {/* Mobile Header - Only for mobile screens */}
//       <div className="d-lg-none d-flex align-items-center justify-content-between p-2 border-bottom">
//         {/* Left side: ArticleF brand */}
//         <img
//           src={logo}
//           alt="Article Logo"
//           style={{ height: "40px", width: "auto" }}
//         />

//         {/* Right side: Close button (only for mobile) */}
//         {onClose && (
//           <button
//             className="btn btn-link text-white p-0"
//             onClick={onClose}
//             aria-label="Close sidebar"
//             style={{ fontSize: "24px" }}>
//             ×
//           </button>
//         )}
//       </div>

//       {/* Desktop Header - Shows only on desktop */}
//       <div className="d-none d-lg-block  border-bottom border-secondary p-4 text-white text-center">
//         {/* Left side: ArticleF brand */}
//         <img
//           src={logo}
//           alt="Article Logo"
//           style={{ height: "60px", width: "auto" }}
//         />
//       </div>

//       {/* Menu Items */}
//       <div className="d-flex flex-column px-2 pt-3">
//         <NavLink
//           to="/admin/dashboard"
//           className={({ isActive }) =>
//             `nav-link-custom d-flex align-items-center py-3 px-3 mb-1 rounded ${isActive ? "active" : ""}`
//           }
//           onClick={onClose} // Close sidebar on mobile when clicked
//         >
//           <i className="bi bi-speedometer2 me-3"></i>
//           <span>Dashboard</span>
//         </NavLink>

//         <NavLink
//           to="/admin/users"
//           className={({ isActive }) =>
//             `nav-link-custom d-flex align-items-center py-3 px-3 mb-1 rounded ${isActive ? "active" : ""}`
//           }
//           onClick={onClose}>
//           <i className="bi bi-people me-3"></i>
//           <span>User List</span>
//         </NavLink>

//         <NavLink
//           to="/admin/categories"
//           className={({ isActive }) =>
//             `nav-link-custom d-flex align-items-center py-3 px-3 mb-1 rounded ${isActive ? "active" : ""}`
//           }
//           onClick={onClose}>
//           <i className="bi bi-tags me-3"></i>
//           <span>Categories</span>
//         </NavLink>

//         <NavLink
//           to="/admin/subcategories"
//           className={({ isActive }) =>
//             `nav-link-custom d-flex align-items-center py-3 px-3 mb-1 rounded ${isActive ? "active" : ""}`
//           }
//           onClick={onClose}>
//           <i className="bi bi-tags me-3"></i>
//           <span>SubCategories</span>
//         </NavLink>

//         <NavLink
//           to="/admin/articles"
//           className={({ isActive }) =>
//             `nav-link-custom d-flex align-items-center py-3 px-3 mb-1 rounded ${isActive ? "active" : ""}`
//           }
//           onClick={onClose}>
//           <i className="bi bi-file-earmark-post me-3"></i>
//           <span>Article Post</span>
//         </NavLink>

//         <NavLink
//           to="/admin/comments"
//           className={({ isActive }) =>
//             `nav-link-custom d-flex align-items-center py-3 px-3 mb-1 rounded ${isActive ? "active" : ""}`
//           }
//           onClick={onClose}>
//           <i className="bi bi-chat-left-text me-3"></i>
//           <span>Comments</span>
//         </NavLink>

//         <NavLink
//           to="/admin/media"
//           className={({ isActive }) =>
//             `nav-link-custom d-flex align-items-center py-3 px-3 mb-1 rounded ${isActive ? "active" : ""}`
//           }
//           onClick={onClose}>
//           <i className="bi bi-images me-3"></i>
//           <span>Media</span>
//         </NavLink>

//         <NavLink
//           to="/admin/settings"
//           className={({ isActive }) =>
//             `nav-link-custom d-flex align-items-center py-3 px-3 mb-1 rounded ${isActive ? "active" : ""}`
//           }
//           onClick={onClose}>
//           <i className="bi bi-gear me-3"></i>
//           <span>Settings</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = ({ onClose }) => {
  return (
    <div className="sidebar-container shadow">
      {/* Mobile Header */}
      <div className="d-lg-none d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
        <img src={logo} alt="Logo" style={{ height: "35px" }} />
        <button
          className="btn btn-link text-white p-0"
          onClick={onClose}
          style={{ fontSize: "28px", lineHeight: 1 }}>
          &times;
        </button>
      </div>

      {/* Desktop Header */}
      <div className="d-none d-lg-block p-4 text-center border-bottom border-secondary">
        <img src={logo} alt="Logo" style={{ height: "50px", width: "auto" }} />
      </div>

      {/* Menu Items Area */}
      <div className="sidebar-menu-wrapper">
        <SidebarItem
          to="/admin/dashboard"
          icon="bi-speedometer2"
          label="Dashboard"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/users"
          icon="bi-people"
          label="User List"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/categories"
          icon="bi-tags"
          label="Categories"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/subcategories"
          icon="bi-grid-3x3-gap"
          label="SubCategories"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/articles"
          icon="bi-file-earmark-post"
          label="Article Post"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/comments"
          icon="bi-chat-left-text"
          label="Comments"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/media"
          icon="bi-images"
          label="Media"
          onClick={onClose}
        />
        <SidebarItem
          to="/admin/settings"
          icon="bi-gear"
          label="Settings"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

// Reusable Sub-component for Menu Items
const SidebarItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `nav-link-custom ${isActive ? "active" : ""}`}
    onClick={onClick}>
    <i className={`bi ${icon} me-3`}></i>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;