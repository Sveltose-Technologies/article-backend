// // import React from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import { ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // // Layout
// // import AdminLayout from "./components/layout/AdminLayout";

// // // Pages
// // import Login from "./pages/Login";
// // import Dashboard from "./pages/Dashboard";
// // import UserList from "./pages/UserList";
// // import Categories from "./pages/Categories";
// // import ArticlePost from "./pages/ArticlePost";
// // import Comments from "./pages/Comments";
// // import Media from "./pages/Media";
// // import Settings from "./pages/Settings";
// // import Profile from "./pages/Profile";

// // function App() {
// //   return (
// //     <>
// //       <ToastContainer autoClose={2000} theme="colored" />
// //       <Routes>
// //         {/* लॉगिन पेज बिना लेआउट के */}
// //         <Route path="/login" element={<Login />} />

// //         {/* एडमिन के सभी पेज AdminLayout के अंदर */}
// //         <Route path="/admin" element={<AdminLayout />}>
// //           <Route path="dashboard" element={<Dashboard />} />
// //           <Route path="users" element={<UserList />} />
// //           <Route path="categories" element={<Categories />} />
// //           <Route path="articles" element={<ArticlePost />} />
// //           <Route path="comments" element={<Comments />} />
// //           <Route path="media" element={<Media />} />
// //           <Route path="settings" element={<Settings />} />

// //           {/* With this (Remove the leading slash) */}
// //           <Route path="profile" element={<Profile />} />
// //         </Route>

// //         {/* डिफ़ॉल्ट रूप से लॉगिन पर भेजें */}
// //         <Route path="/" element={<Navigate to="/login" />} />
// //         <Route path="*" element={<Navigate to="/login" />} />
// //       </Routes>
// //     </>
// //   );
// // }

// // export default App;

// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Layout
// import AdminLayout from "./components/layout/AdminLayout";

// // Pages
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import UserList from "./pages/UserList";
// import Categories from "./pages/Categories";
// import ArticlePost from "./pages/ArticlePost";
// import Comments from "./pages/Comments";
// import Media from "./pages/Media";
// import Settings from "./pages/Settings";
// import Profile from "./pages/Profile";
// import SubCategories from "./pages/subcategories";

// function App() {
//   return (
//     <>
//       <ToastContainer autoClose={2000} theme="colored" />
//       <Routes>
//         {/* Auth Route */}
//         <Route path="/login" element={<Login />} />

//         {/* Protected Admin Routes */}
//         <Route path="/admin" element={<AdminLayout />}>
//           {/* Default child for /admin */}
//           <Route index element={<Navigate to="dashboard" />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="users" element={<UserList />} />
//           <Route path="categories" element={<Categories />} />
//           <Route path="articles" element={<ArticlePost />} />
//           <Route path="comments" element={<Comments />} />
//           <Route path="media" element={<Media />} />
//           <Route path="settings" element={<Settings />} />
//           <Route path="profile" element={<Profile />} />

//           <Route path="/admin/subcategories" element={<SubCategories/>} />
//         </Route>

//         {/* Global Redirects */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MediaProvider } from "./context/MediaContext";
// Layout
import AdminLayout from "./components/layout/AdminLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import Categories from "./pages/Categories";
import ArticlePost from "./pages/ArticlePost";
import Comments from "./pages/Comments";
import Media from "./pages/Media";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SubCategories from "./pages/subcategories";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <MediaProvider>
      <ToastContainer autoClose={2000} theme="colored" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="categories" element={<Categories />} />
          <Route path="articles" element={<ArticlePost />} />
          <Route path="comments" element={<Comments />} />
          <Route path="media" element={<Media />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subcategories" element={<SubCategories />} />
          <Route path="transaction" element={<Transaction />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </MediaProvider>
  );
}

export default App;