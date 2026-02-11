// import React from "react";
// import ReactDOM from "react-dom/client"; // Yeh line missing hogi
// import App from "./App.jsx";
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter } from "react-router-dom"; // Clean URL ke liye BrowserRouter hi rakhein

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// BrowserRouter ko hata kar HashRouter import karein
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter ki jagah HashRouter use karein */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);