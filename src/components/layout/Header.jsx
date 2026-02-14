// // import React from "react";
// // import {
// //   Navbar,
// //   Container,
// //   Nav,
// //   Form,
// //   FormControl,
// //   Button,
// //   Dropdown,
// // } from "react-bootstrap";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { adminLogout } from "../../Services/adminService";

// // const Header = ({ toggleSidebar }) => {
// //   const navigate = useNavigate();

// //   const handleLogout = async () => {
// //     try {
// //       await adminLogout();
// //       toast.success("Logged out successfully");
// //       navigate("/login");
// //     } catch (error) {
// //       toast.error("Logout process failed");
// //       navigate("/login");
// //     }
// //   };

// //   return (
// //     <Navbar bg="white" expand="lg" className="shadow-sm px-3 py-2 sticky-top">
// //       <Container fluid>
// //         <Button
// //           variant="link"
// //           className="d-lg-none text-dark me-2 p-0"
// //           onClick={toggleSidebar}>
// //           <span className="navbar-toggler-icon"></span>
// //         </Button>
// //         <Navbar.Brand className="fw-bold">Dashboard</Navbar.Brand>
// //         <Nav className="ms-auto align-items-center">
// //           <Dropdown align="end">
// //             <Dropdown.Toggle
// //               variant="link"
// //               className="text-decoration-none p-0">
// //               <div
// //                 className="bg-black text-white rounded-circle d-flex align-items-center justify-content-center me-2"
// //                 style={{ width: "35px", height: "35px" }}>
// //                 AD
// //               </div>
// //             </Dropdown.Toggle>
// //             <Dropdown.Menu className="shadow border-0 mt-2">
// //               <Dropdown.Item onClick={handleLogout} className="text-danger">
// //                 Edit Profile
// //               </Dropdown.Item>
// //               <Dropdown.Item onClick={handleLogout} className="text-danger">
// //                 Logout
// //               </Dropdown.Item>
// //             </Dropdown.Menu>
// //           </Dropdown>
// //         </Nav>
// //       </Container>
// //     </Navbar>
// //   );
// // };

// // export default Header;

// import React from "react";
// import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { adminLogout } from "../../Services/adminService";

// const Header = ({ toggleSidebar }) => {
//   const navigate = useNavigate();

//   // LocalStorage se admin ka naam nikalne ke liye (Initials dikhane ke liye)
//   const adminUser = JSON.parse(localStorage.getItem("adminUser"));
//   const adminInitials = adminUser?.name
//     ? adminUser.name.substring(0, 2).toUpperCase()
//     : "AD";

//   const handleLogout = async () => {
//     try {
//       await adminLogout();
//       toast.success("Logged out successfully");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Logout process failed");
//       navigate("/login");
//     }
//   };
// // Profile.jsx logic updates

//   return (
//     <Navbar bg="white" expand="lg" className="shadow-sm px-3 py-2 sticky-top">
//       <Container fluid>
//         <Button
//           variant="link"
//           className="d-lg-none text-dark me-2 p-0"
//           onClick={toggleSidebar}>
//           <span className="navbar-toggler-icon"></span>
//         </Button>
//         <Navbar.Brand className="fw-bold">Dashboard</Navbar.Brand>
//         <Nav className="ms-auto align-items-center">
//           <Dropdown align="end">
//             <Dropdown.Toggle
//               variant="link"
//               className="text-decoration-none p-0 d-flex align-items-center">
//               <div
//                 className="bg-black text-white rounded-circle d-flex align-items-center justify-content-center me-2"
//                 style={{
//                   width: "35px",
//                   height: "35px",
//                   fontSize: "14px",
//                   fontWeight: "bold",
//                 }}>
//                 {adminInitials}
//               </div>
//               <span className="d-none d-md-inline text-dark me-1 small">
//                 {adminUser?.name || "Admin"}
//               </span>
//             </Dropdown.Toggle>

//             <Dropdown.Menu className="shadow border-0 mt-2">
//               {/* Navigate to Profile Page */}
//               <Dropdown.Item onClick={() => navigate("/admin/profile")}>
//                 Edit Profile
//               </Dropdown.Item>

//               <Dropdown.Divider />

//               <Dropdown.Item onClick={handleLogout} className="text-danger">
//                 Logout
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

import React from "react";
import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogout } from "../../Services/adminService";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // LocalStorage se admin ka naam nikalne ke liye (Initials dikhane ke liye)
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  const adminInitials = adminUser?.name
    ? adminUser.name.substring(0, 2).toUpperCase()
    : "AD";

  const handleLogout = async () => {
    try {
      await adminLogout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout process failed");
      navigate("/login");
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm px-3 py-2 sticky-top">
      <Container fluid>
        {/* Mobile Toggle Button - Hidden on large screens */}
        <Button
          variant="link"
          className="d-lg-none text-dark me-2 p-0"
          onClick={toggleSidebar}>
          <span className="navbar-toggler-icon"></span>
        </Button>

        {/* Dashboard Text - Different for mobile and desktop */}
        <Navbar.Brand className="fw-bold d-none d-md-block">
          Dashboard
        </Navbar.Brand>
        <Navbar.Brand className="fw-bold d-md-none d-block">
          Dashboard
        </Navbar.Brand>

        {/* User Profile Section */}
        <Nav className="ms-auto align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              className="text-decoration-none p-0 d-flex align-items-center border-0">
              {/* User Initials Circle */}
              <div
                className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{
                  width: "40px",
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}>
                {adminInitials}
              </div>

              {/* User Name - Hidden on small screens */}
              <span className="d-none d-md-inline text-dark fw-medium">
                {adminUser?.name || "Admin"}
              </span>

              {/* Dropdown icon for mobile */}
              <i className="bi bi-chevron-down d-md-none ms-1"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow border-0 mt-2">
              {/* Profile Link */}
              <Dropdown.Item
                onClick={() => navigate("/admin/profile")}
                className="d-flex align-items-center">
                <i className="bi bi-person me-2"></i>
                Edit Profile
              </Dropdown.Item>

              <Dropdown.Divider />

              {/* Logout Link */}
              <Dropdown.Item
                onClick={handleLogout}
                className="text-danger d-flex align-items-center">
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;