// src/templates/DevocionalTemplate.jsx
import React from "react";

export default function DevocionalTemplate({
  titulo = "Sem título",
  subtitulo,
  versiculo,
  texto = "",
  autor,
}) {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Texto principal */}
      <section className="text-lg whitespace-pre-line leading-relaxed">
        {texto || "Conteúdo não disponível"}
      </section>

      {/* Autor */}
      {autor && (
        <footer className="text-right text-[#D4AF37] italic text-base animate-fade-in-right delay-400">
          — {autor}
        </footer>
      )}
    </div>
  );
}
