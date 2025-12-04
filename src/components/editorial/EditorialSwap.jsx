// src/components/editorial/EditorialSwap.jsx
import React, { useState } from "react";
import "./editorial-swap.css";

export default function EditorialSwap(props) {
  const { principal, alternativo, devocional, oracao } = props;

  // PLACEHOLDER SE O ARQUIVO ESTIVER VAZIO
  const vazio = {
    titulo: "Conteúdo ainda não disponível",
    resumo: "",
    imageUrl: null,
    content:
      "<p style='color:#ccc; font-size:1rem;'>Este conteúdo ainda não foi preenchido.</p>",
    component: null,
  };

  // Detecta modo de uso:
  const modoComponent =
    principal && alternativo && (principal.component || alternativo.component);

  // Dados normalizados para cada modo
  const dev = devocional || principal || vazio;
  const ora = oracao || alternativo || vazio;

  const [ativo, setAtivo] = useState("primeiro");

  const trocar = () =>
    setAtivo((a) => (a === "primeiro" ? "segundo" : "primeiro"));

  const ativoConteudo = ativo === "primeiro" ? dev : ora;
  const cardConteudo = ativo === "primeiro" ? ora : dev;

  return (
    <div className="editorialSwapGrid">
      <div className="editorialPrincipal fadeIn">
        <h2 className="editorialTitulo">
          {ativoConteudo.titulo || vazio.titulo}
        </h2>

        {modoComponent && ativoConteudo.component ? (
          // MODO HOMILIA / ESTUDOS → renderiza componente React
          <div className="editorialConteudo">{ativoConteudo.component}</div>
        ) : (
          // MODO DEVOCIONAL → renderiza HTML
          <div
            className="editorialConteudo"
            dangerouslySetInnerHTML={{
              __html: ativoConteudo.content || vazio.content,
            }}
          />
        )}
      </div>

      <div className="editorialCard" onClick={trocar}>
        <h3>{cardConteudo.titulo || vazio.titulo}</h3>

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
