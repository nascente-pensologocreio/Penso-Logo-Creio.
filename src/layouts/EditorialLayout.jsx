// src/layouts/EditorialLayout.jsx
import React from "react";
import "../styles/editorial-grid.css";

export default function EditorialLayout({ titulo, indice, children }) {
  const gridClass = indice ? "editorial-grid-no-left" : "editorial-grid-full";

  return (
    <div className="editorial-grid-container animate-fade-in-up text-[#e8e8e8] font-serif">
      {/* TÍTULO */}
      <h1 className="text-center text-4xl font-bold mb-10 text-[#D4AF37] text-glow">
        {titulo}
      </h1>

      {/* GRID PRINCIPAL */}
      <div className={gridClass}>
        {/* COLUNA PRINCIPAL — CONTEÚDO */}
        <main className="editorial-main">
          <div className="editorial-main-wrapper">{children}</div>
        </main>

        {/* COLUNA DIREITA — ÍNDICE BÍBLICO (SE HOUVER) */}
        {indice && <aside className="editorial-sidebar-right">{indice}</aside>}
      </div>
    </div>
  );
}