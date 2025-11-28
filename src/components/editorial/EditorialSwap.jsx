// src/components/editorial/EditorialSwap.jsx
import React, { useState } from "react";
import "./editorial-swap.css";

export default function EditorialSwap({ devocional, oracao }) {
  // PLACEHOLDER SE O ARQUIVO ESTIVER VAZIO
  const vazio = {
    titulo: "Conteúdo ainda não disponível",
    content:
      "<p style='color:#ccc; font-size:1rem;'>Este conteúdo ainda não foi preenchido.</p>",
    imageUrl: null,
    resumo: "",
  };

  // GARANTE QUE NUNCA RETORNA NULL
  const dev = devocional || vazio;
  const ora = oracao || vazio;

  const [ativo, setAtivo] = useState("devocional");

  const trocar = () =>
    setAtivo((a) => (a === "devocional" ? "oracao" : "devocional"));

  const ativoConteudo = ativo === "devocional" ? dev : ora;
  const cardConteudo = ativo === "devocional" ? ora : dev;

  return (
    <div className="editorialSwapGrid">
      <div className="editorialPrincipal fadeIn">
        <h2 className="editorialTitulo">{ativoConteudo.titulo}</h2>

        <div
          className="editorialConteudo"
          dangerouslySetInnerHTML={{ __html: ativoConteudo.content }}
        />
      </div>

      <div className="editorialCard" onClick={trocar}>
        <h3>{cardConteudo.titulo}</h3>

        {cardConteudo.imageUrl && (
          <img
            src={cardConteudo.imageUrl}
            alt="preview"
            className="editorialCardImg"
          />
        )}

        {cardConteudo.resumo && (
          <p className="editorialCardResumo">{cardConteudo.resumo}</p>
        )}

        <span className="editorialCardHint">(clique para alternar)</span>
      </div>
    </div>
  );
}
