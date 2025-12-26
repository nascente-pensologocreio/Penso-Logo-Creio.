// src/components/AccordionLivros.jsx
import React, { useState } from "react";
import { nomeExibicaoLivro } from "@utils/mapearLivros.js";

/**
 * Accordion que agrupa posts por livro bíblico
 * @param {Array} livrosAgrupados - [{livro, posts: [...]}]
 * @param {Function} onSelectPost - (post) => void
 * @param {string} slugAtivo - Slug do post ativo
 */
export default function AccordionLivros({ livrosAgrupados, onSelectPost, slugAtivo }) {
  const [livrosExpandidos, setLivrosExpandidos] = useState(new Set([livrosAgrupados[0]?.livro]));

  const toggleLivro = (livro) => {
    const novoSet = new Set(livrosExpandidos);
    if (novoSet.has(livro)) {
      novoSet.delete(livro);
    } else {
      novoSet.add(livro);
    }
    setLivrosExpandidos(novoSet);
  };

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      {livrosAgrupados.map(({ livro, posts }) => {
        const expandido = livrosExpandidos.has(livro);
        const nomeExibicao = nomeExibicaoLivro(livro);

        return (
          <div
            key={livro}
            style={{
              marginBottom: "1rem",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "8px",
              overflow: "hidden",
              background: "rgba(8, 26, 23, 0.5)",
            }}
          >
            {/* HEADER DO LIVRO */}
            <button
              type="button"
              onClick={() => toggleLivro(livro)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 1.25rem",
                background: expandido
                  ? "linear-gradient(90deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))"
                  : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "#D4AF37",
                  fontWeight: expandido ? "600" : "500",
                }}
              >
                📖 {nomeExibicao} ({posts.length})
              </span>
              <span
                style={{
                  fontSize: "1.2rem",
                  color: "#D4AF37",
                  transform: expandido ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                ▼
              </span>
            </button>

            {/* LISTA DE CAPÍTULOS */}
            {expandido && (
              <div style={{ padding: "0.5rem" }}>
                {posts.map((post) => {
                  const ativo = post.slug === slugAtivo;
                  const labelCapitulo = `${post.livro} ${parseInt(post.capitulo || "0", 10)}`;

                  return (
                    <button
                      key={post.slug}
                      type="button"
                      onClick={() => onSelectPost(post)}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.75rem 1rem",
                        marginBottom: "0.5rem",
                        borderRadius: "999px",
                        border: ativo
                          ? "1px solid rgba(212, 175, 55, 0.9)"
                          : "1px solid rgba(212, 175, 55, 0.2)",
                        background: ativo
                          ? "linear-gradient(90deg, #d4af37, #f6e27a)"
                          : "rgba(8, 26, 23, 0.6)",
                        color: ativo ? "#1A202C" : "#EDEDED",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <span>{labelCapitulo}</span>
                      <span style={{ fontSize: "0.85rem", opacity: ativo ? 0.85 : 0.75 }}>
                        {post.titulo || "(sem título)"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
