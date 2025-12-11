// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Lazy loading das páginas principais (code splitting)
const Home = lazy(() => import("./pages/Home.jsx"));
const CaminhoDasEscrituras = lazy(() =>
  import("./pages/CaminhoDasEscrituras.jsx")
);
const TemasDaVida = lazy(() => import("./pages/TemasDaVida.jsx"));
const ConteudoDoDia = lazy(() => import("./pages/ConteudoDoDia.jsx"));
const Artigo = lazy(() => import("./pages/Artigo.jsx"));
const EditorialSwap = lazy(() => import("./pages/EditorialSwap.jsx"));

// Fallback simples enquanto os chunks das páginas carregam
function PageFallback() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#010b0a",
        color: "#D4AF37",
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.3rem",
        textAlign: "center",
        padding: "0 1.5rem",
      }}
    >
      Carregando página...
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#010b0a] text-white">
        <Navbar />

        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/caminho-das-escrituras/:livroId?/:capitulo?"
              element={<CaminhoDasEscrituras />}
            />
            <Route path="/temas-da-vida/:tag?" element={<TemasDaVida />} />
            <Route path="/conteudo-do-dia" element={<ConteudoDoDia />} />
            <Route path="/artigo/:slug" element={<Artigo />} />
            <Route path="/editorial" element={<EditorialSwap />} />
            {/* rota catch-all opcional */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
}
