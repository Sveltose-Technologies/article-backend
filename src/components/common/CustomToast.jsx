import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const CustomToast = ({ show, message, variant, onClose }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={onClose} show={show} delay={3000} autohide bg={variant}>
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className={variant === "dark" ? "text-white" : ""}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;
