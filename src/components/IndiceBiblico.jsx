// src/components/IndiceBiblico.jsx
import React, { useState } from "react";
import livrosSBB from "../data/livrosSBB.js";
import "../styles/indice-biblico.css";

export default function IndiceBiblico({ onSelecionarCapitulo }) {
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  const gruposPorTestamento = livrosSBB.reduce((acc, livro) => {
    if (!acc[livro.testamento]) acc[livro.testamento] = {};
    if (!acc[livro.testamento][livro.grupo]) acc[livro.testamento][livro.grupo] = [];
    acc[livro.testamento][livro.grupo].push(livro);
    return acc;
  }, {});

  const handleLivroClick = (livroId) => {
    setLivroSelecionado((atual) => (atual === livroId ? null : livroId));
  };

  return (
    <div className="indice-container compacto animate-fade-in-up">
      {["AT", "NT"].map((testamento) => (
        <section key={testamento} className="testamento-bloco-inline">
          <h2 className="testamento-titulo-inline">
            {testamento === "AT" ? "Antigo Testamento" : "Novo Testamento"}
          </h2>

          <div className="grupos-linha">
            {Object.entries(gruposPorTestamento[testamento]).map(([grupo, livros]) => (
              <div key={grupo} className="grupo-inline">
                <span className="grupo-label">{grupo}:</span>

                <div className="livros-linha">
                  {livros.map((livro) => (
                    <button
                      key={livro.id}
                      className={`livro-pill ${
                        livroSelecionado === livro.id ? "ativo" : ""
                      }`}
                      onClick={() => handleLivroClick(livro.id)}
                    >
                      {livro.nome}
                    </button>
                  ))}
                </div>

                {livroSelecionado &&
                  livros.find((l) => l.id === livroSelecionado) && (
                    <div className="capitulos-linha">
                      {[...Array(
                        livros.find((l) => l.id === livroSelecionado).capitulos
                      ).keys()].map((i) => (
                        <button
                          key={i + 1}
                          className="capitulo-pill"
                          onClick={() =>
                            onSelecionarCapitulo(livroSelecionado, i + 1)
                          }
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
