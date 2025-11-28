// src/components/IndiceBiblico.jsx
import React, { useState } from "react";
import livrosSBB from "../data/livrosSBB.js";
import "../styles/indice-biblico.css";

export default function IndiceBiblico({ onSelecionarCapitulo }) {
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  // Agrupar por Testamento > Grupo
  const gruposPorTestamento = livrosSBB.reduce((acc, livro) => {
    if (!acc[livro.testamento]) acc[livro.testamento] = {};
    if (!acc[livro.testamento][livro.grupo]) acc[livro.testamento][livro.grupo] = [];
    acc[livro.testamento][livro.grupo].push(livro);
    return acc;
  }, {});

  return (
    <div className="indice-container animate-fade-in-up">

      {/* Antigo Testamento */}
      <section className="testamento-bloco">
        <h2 className="testamento-titulo">Antigo Testamento</h2>

        {Object.entries(gruposPorTestamento["AT"]).map(([grupo, livros]) => (
          <div key={grupo} className="grupo-bloco">
            <h3 className="grupo-titulo">{grupo}</h3>

            <div className="livros-grid">
              {livros.map((livro) => (
                <button
                  key={livro.id}
                  className={`livro-card ${livroSelecionado === livro.id ? "ativo" : ""}`}
                  onClick={() => setLivroSelecionado(livro.id)}
                >
                  {livro.nome}
                </button>
              ))}
            </div>

            {/* Capítulos do livro selecionado */}
            {livroSelecionado &&
              livros.find((l) => l.id === livroSelecionado) && (
                <div className="capitulos-grid">
                  {[...Array(
                    livros.find((l) => l.id === livroSelecionado).capitulos
                  ).keys()].map((i) => (
                    <button
                      key={i + 1}
                      className="capitulo-card"
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
      </section>

      {/* Novo Testamento */}
      <section className="testamento-bloco">
        <h2 className="testamento-titulo">Novo Testamento</h2>

        {Object.entries(gruposPorTestamento["NT"]).map(([grupo, livros]) => (
          <div key={grupo} className="grupo-bloco">
            <h3 className="grupo-titulo">{grupo}</h3>

            <div className="livros-grid">
              {livros.map((livro) => (
                <button
                  key={livro.id}
                  className={`livro-card ${livroSelecionado === livro.id ? "ativo" : ""}`}
                  onClick={() => setLivroSelecionado(livro.id)}
                >
                  {livro.nome}
                </button>
              ))}
            </div>

            {/* Capítulos */}
            {livroSelecionado &&
              livros.find((l) => l.id === livroSelecionado) && (
                <div className="capitulos-grid">
                  {[...Array(
                    livros.find((l) => l.id === livroSelecionado).capitulos
                  ).keys()].map((i) => (
                    <button
                      key={i + 1}
                      className="capitulo-card"
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
      </section>
    </div>
  );
}
