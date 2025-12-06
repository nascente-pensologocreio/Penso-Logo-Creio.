// src/main.jsx — versão atualizada e estável

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import "./index.css";
import "./styles/animations.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter centraliza todo o roteamento do site */}
    <BrowserRouter basename="/">
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
