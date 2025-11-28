// src/components/editorial/EditorialSwapTriple.jsx
import React, { useState } from "react";
import ConteudoDoDia from "../ConteudoDoDia.jsx";

export default function EditorialSwapTriple({
  principal,
  lateral1,
  lateral2,
  livro,
  capitulo
}) {
  // Estado do card selecionado
  const [selecionado, setSelecionado] = useState(null);

  // Resolve o tipo correto a partir do card selecionado
  const resolverTipo = () => {
    if (!selecionado) return null;

    switch (selecionado) {
      case "principal":
        return principal.tipo;
      case "lateral1":
        return lateral1.tipo;
      case "lateral2":
        return lateral2.tipo;
      default:
        return null;
    }
  };

  const tipoSelecionado = resolverTipo();

  return (
    <div className="w-full flex flex-col md:flex-row gap-10 mt-16">

      {/* COLUNA FINAL: 3 CARDS */}
      <aside className="md:w-1/4 flex flex-col gap-6">
        {/* CARD 1 */}
        <button
          className={`editorial-card ${selecionado === "principal" ? "card-ativo" : ""}`}
          onClick={() => setSelecionado("principal")}
        >
          <h3 className="editorial-card-title">{principal.titulo}</h3>
        </button>

        {/* CARD 2 */}
        <button
          className={`editorial-card ${selecionado === "lateral1" ? "card-ativo" : ""}`}
          onClick={() => setSelecionado("lateral1")}
        >
          <h3 className="editorial-card-title">{lateral1.titulo}</h3>
        </button>

        {/* CARD 3 */}
        <button
          className={`editorial-card ${selecionado === "lateral2" ? "card-ativo" : ""}`}
          onClick={() => setSelecionado("lateral2")}
        >
          <h3 className="editorial-card-title">{lateral2.titulo}</h3>
        </button>
      </aside>

      {/* ÁREA CENTRAL */}
      <main className="md:w-3/4 editorial-main-area">

        {/* Nada selecionado ainda → mostra apenas o capítulo */}
        {!tipoSelecionado && (
          <div className="text-center opacity-70 py-20 font-serif">
            <h2 className="text-3xl text-[#D4AF37] mb-4">
              {livro && capitulo
                ? `${livro.toUpperCase()} — Capítulo ${capitulo}`
                : "Selecione um estudo ao lado"}
            </h2>

            <p className="text-lg text-gray-300">
              Clique em um dos estudos para abrir o conteúdo correspondente.
            </p>
          </div>
        )}

        {/* Selecionado → mostra conteúdo */}
        {tipoSelecionado && (
          <ConteudoDoDia
            tipo={tipoSelecionado}
            titulo={tipoSelecionado}
            livro={livro}
            capitulo={capitulo}
          />
        )}
      </main>

    </div>
  );
}
