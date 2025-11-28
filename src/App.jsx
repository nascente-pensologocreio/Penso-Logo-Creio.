// src/App.jsx — Versão final corrigida (apenas rotas básicas + NavBar)

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Calendario from "./pages/Calendario.jsx";
import Oracoes from "./pages/Oracoes.jsx"; // mantém o arquivo físico Oracoes.jsx

export default function App() {
  return (
    <Router>
      {/* NAVBAR GLOBAL */}
      <nav className="w-full z-50">
        <NavBar />
      </nav>

      {/* ROTAS */}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Oração (rota pública aponta para /oracoes) */}
        <Route path="/oracoes" element={<Oracoes />} />

        {/* Calendário */}
        <Route path="/calendario" element={<Calendario />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="text-center text-white py-20 text-3xl">
              404 — Página não encontrada.
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
