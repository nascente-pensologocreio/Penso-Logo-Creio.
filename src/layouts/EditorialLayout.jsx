// src/layouts/EditorialLayout.jsx
import React from "react";

export default function EditorialLayout({ titulo, children }) {
  return (
    <div className="editorial-grid-container animate-fade-in-up text-[#e8e8e8] font-serif">
      
      {/* Título */}
      <h1 className="text-center text-4xl font-bold mb-10 text-[#D4AF37] text-glow">
        {titulo}
      </h1>

      {/* GRID 2 COLUNAS */}
      <div className="editorial-grid-2cols">

        {/* COLUNA ESQUERDA */}
        <aside className="editorial-sidebar-left">

          {/* Reflexão */}
          <div className="editorial-box">
            <h3 className="editorial-box-title">Reflexão</h3>
            <p className="editorial-box-text">
              "A Palavra ilumina o caminho de quem caminha com o coração desperto."
            </p>
          </div>

          {/* Versículo do dia */}
          <div className="editorial-box mt-6">
            <h3 className="editorial-box-title">Versículo do Dia</h3>
            <p className="italic opacity-90 leading-relaxed">
              “Lâmpada para os meus pés é a Tua Palavra,<br />
              e luz para o meu caminho.”<br />
              — Salmo 119:105
            </p>
          </div>

        </aside>

        {/* COLUNA PRINCIPAL — CONTEÚDO */}
        <main className="editorial-main">
          <div className="editorial-main-wrapper">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
