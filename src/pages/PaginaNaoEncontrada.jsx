// src/pages/PaginaNaoEncontrada.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PaginaNaoEncontrada({ mensagem = "Página não encontrada." }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-gradient-to-b from-black via-[#0c0c0c] to-black"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <h1 className="text-5xl font-bold mb-4" style={{ color: "#D4AF37" }}>
        404
      </h1>
      <p className="text-xl mb-8 text-gray-300">{mensagem}</p>
      <Link
        to="/"
        className="px-6 py-3 border border-[#D4AF37] rounded-xl text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
      >
        Voltar à página inicial
      </Link>
    </div>
  );
}
