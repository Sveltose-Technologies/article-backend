// import React, { useState, useEffect } from "react";
// import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { adminLogin } from "../Services/adminService";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Component mount check - CRITICAL for debugging
//   useEffect(() => {
//     try {
//       console.log("=== LOGIN COMPONENT MOUNTED ===");
//       console.log("Component is rendering successfully");
//     } catch (e) {
//       alert("Error in useEffect: " + e.message);
//     }
//     return () => {
//       try {
//         console.log("=== LOGIN COMPONENT UNMOUNTED ===");
//       } catch (e) {
//         alert("Error in cleanup: " + e.message);
//       }
//     };
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       console.log("=== LOGIN CLICKED ===");
//       console.log("Email:", email);

//       if (!email || !password) {
//         console.error("Missing email or password");
//         toast.error("Please enter email and password");
//         return;
//       }

//       setLoading(true);
//       console.log("Sending login request...");

//       const response = await adminLogin({
//         email: email.trim(),
//         password: password.trim(),
//       });
//       console.log("Response received:", response);

//       if (response && response.status === true) {
//         console.log("✅ LOGIN SUCCESS");
//         toast.success(response.message || "Login Successful");
//         navigate("/admin/dashboard");
//       } else {
//         console.error("Login failed");
//         toast.error(response?.message || "Login Failed");
//       }
//     } catch (error) {
//       console.error("❌ LOGIN ERROR");
//       console.error("Error full object:", error);
//       console.error("Error.code:", error.code);
//       console.error("Error.message:", error.message);
//       console.error("Error.response:", error.response);
//       console.error("Error.request:", error.request);

//       let errorMsg = "An error occurred";

//       // Check if it's a network error (no response from server)
//       if (!error.response && error.request) {
//         // Request was made but no response - Network/CORS/Server down
//         errorMsg =
//           "❌ Network Error: Could not reach server \n\n" +
//           "This could be:\n" +
//           "• Server is offline\n" +
//           "• Network connection problem\n" +
//           "• CORS blocking the request\n\n" +
//           "Trying to reach: https://lawnode.rxchartsquare.com/admin/login";
//       } else if (error.code === "ECONNABORTED") {
//         errorMsg = "⏱️ Request Timeout: Server took too long to respond";
//       } else if (error.response?.status === 401) {
//         errorMsg = "🔐 Unauthorized: Invalid email or password";
//       } else if (error.response?.status === 404) {
//         errorMsg = "🚫 Not Found: Server endpoint doesn't exist";
//       } else if (error.response?.status === 500) {
//         errorMsg =
//           "💥 Server Error: " +
//           (error.response?.data?.message || "Internal server error");
//       } else if (error.response?.data?.message) {
//         errorMsg = "⚠️ " + error.response.data.message;
//       } else if (error.message) {
//         errorMsg = "❌ " + error.message;
//       }

//       console.error("Final error message:", errorMsg);
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="bg-white d-flex align-items-center"
//       style={{ minHeight: "100vh" }}>
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={5} lg={4}>
//             <Card className="border-0 shadow-lg p-4">
//               <div className="text-center mb-4">
//                 <h2 className="mb-1">
//                   Article<span className="text-warning">Flow</span>
//                 </h2>
//                 <p className="text-muted small">
//                   Sign in to start your session
//                 </p>
//               </div>
//               <Form onSubmit={handleLogin}>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     value={email}
//                     required
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-bold">Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter password"
//                     value={password}
//                     required
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Button
//                   variant="dark"
//                   type="submit"
//                   className="w-100 py-2 fw-bold"
//                   disabled={loading}>
//                   {loading ? "Logging in..." : "LOG IN"}
//                 </Button>
//               </Form>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  adminLogin,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../Services/adminService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Forgot Password States ---
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await adminLogin({ email, password });
      if (response?.status) {
        toast.success("Login Successful");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Forgot Password Logic ---
  // --- Update Send OTP Logic ---
  const handleSendOtp = async () => {
    const cleanEmail = forgotEmail.trim(); // Remove spaces
    if (!cleanEmail) return toast.warning("Please enter email");

    try {
      setLoading(true);
      const res = await forgotPassword(cleanEmail);
      if (res.status) {
        toast.success("OTP sent to your email");
        setStep(2);
      }
    } catch (err) {
      // Show the specific error from server (e.g., "User not found")
      const serverMsg = err.response?.data?.message || "Failed to send OTP";
      toast.error(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  // --- Update Verify OTP Logic ---
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await verifyOtp(forgotEmail.trim(), otp.trim());

      // Yahan check karein: Agar res.status true hai YA res khud exist karta hai (kyunki 200 status code aa chuka hai)
      if (res) {
        toast.success("OTP Verified Successfully");
        setStep(3); // Yeh step change karega password reset par
      }
    } catch (err) {
      console.error("OTP Error:", err.response?.data);
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };
const handleResetSubmit = async () => {
  if (newPassword !== confirmPassword)
    return toast.error("Passwords do not match");

  try {
    setLoading(true);
    // API Expects: email, newPassword, confirmPassword
    const res = await resetPassword({
      email: forgotEmail.trim(), // Humne step 1 mein jo save kiya tha
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });

    if (res) {
      toast.success("Password Reset Successful! Please login.");
      setShowForgotModal(false); // Modal close
      setStep(1); // Reset step for next time
      // Clear fields
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Reset failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      className="bg-light d-flex align-items-center"
      style={{ minHeight: "100vh" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={5} lg={4}>
            <Card className="border-0 shadow-lg p-4">
              <div className="text-center mb-4">
                <h2>
                  Article<span className="text-warning">Flow</span>
                </h2>
                <p className="text-muted small">Login Admin Panel</p>
              </div>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="text-end mb-3">
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none small text-primary"
                    onClick={() => setShowForgotModal(true)}>
                    Forgot Password?
                  </Button>
                </div>

                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 fw-bold"
                  disabled={loading}>
                  {loading ? "Please wait..." : "LOG IN"}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Forgot Password Modal */}
      <Modal
        show={showForgotModal}
        onHide={() => setShowForgotModal(false)}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <div>
              <Form.Label>Enter your registered email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <Button
                className="mt-3 w-100"
                variant="dark"
                onClick={handleSendOtp}
                disabled={loading}>
                Send OTP
              </Button>
            </div>
          )}
          {step === 2 && (
            <div>
              <Form.Label>Enter OTP sent to {forgotEmail}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                className="mt-3 w-100"
                variant="dark"
                onClick={handleVerifyOtp}
                disabled={loading}>
                Verify OTP
              </Button>
            </div>
          )}
          {step === 3 && (
            <div>
              <Form.Group className="mb-2">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                className="w-100"
                variant="dark"
                onClick={handleResetSubmit}
                disabled={loading}>
                Reset Password
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};;

export default Login;