import "./index.css";
import React from "react";
//import { createRoot } from 'react-dom/client';
import App from "./App";
import Modal from "react-modal";
import ReactDOM from "react-dom/client";
import { UserProvider } from "UserContext.js";

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);