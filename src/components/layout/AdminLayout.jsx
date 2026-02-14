// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   return (
//     <div className="admin-wrapper">
//       {/* Desktop Sidebar - Always visible on large screens */}
//       <div className="desktop-sidebar">
//         <Sidebar />
//       </div>

//       {/* Mobile Sidebar - Only shows when toggled */}
//       <div className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
//         <div className="mobile-sidebar-content">
//           <Sidebar onClose={closeSidebar} />
//         </div>
//         {sidebarOpen && (
//           <div className="sidebar-overlay" onClick={closeSidebar}></div>
//         )}
//       </div>

//       <div className="main-content">
//         <Header toggleSidebar={toggleSidebar} />
//         <main className="p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-wrapper">
      {/* Desktop Sidebar */}
      <aside className="desktop-sidebar">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar}></div>
        )}
        <div className="mobile-sidebar-content">
          <Sidebar onClose={closeSidebar} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-3 p-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;