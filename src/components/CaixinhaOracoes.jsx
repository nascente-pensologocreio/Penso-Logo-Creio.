// src/components/CaixinhaOracoes.jsx
import React, { useState } from "react";
import oracoesIndex from "@data/oracoes-index.json";
import { nomeExibicaoLivro } from "@utils/mapearLivros.js";

export default function CaixinhaOracoes() {
  const [oracao, setOracao] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animando, setAnimando] = useState(false);

  const sortearOracao = async () => {
    setLoading(true);
    setAnimando(true);

    // Sortear índice aleatório
    const randomIndex = Math.floor(Math.random() * oracoesIndex.length);
    const escolhida = oracoesIndex[randomIndex];

    // Simular delay de animação
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Carregar APENAS a oração sorteada
      const { loadSinglePost } = await import("@utils/loadSinglePost.js");
      const oracaoCompleta = await loadSinglePost(escolhida.slug);

      setOracao({
        ...oracaoCompleta,
        livroExibicao: nomeExibicaoLivro(escolhida.livro),
        capitulo: parseInt(escolhida.capitulo, 10),
      });
    } catch (err) {
      console.error("Erro ao carregar oração:", err);
      setOracao(null);
    } finally {
      setLoading(false);
      setTimeout(() => setAnimando(false), 400);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "4rem auto",
        padding: "0 2rem",
      }}
    >
      {/* ESTADO INICIAL - SEM ORAÇÃO */}
      {!oracao && (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "radial-gradient(circle at top, #1a1410 0%, #050806 70%)",
            borderRadius: "24px",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            boxShadow: "0 0 40px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📿</div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem",
              color: "#D4AF37",
              marginBottom: "2rem",
            }}
          >
            Caixinha de Orações
          </h2>

          <button
            type="button"
            onClick={sortearOracao}
            disabled={loading}
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.1rem",
              padding: "1rem 2.5rem",
              background: loading
                ? "rgba(212, 175, 55, 0.3)"
                : "linear-gradient(135deg, #d4af37, #f6e27a)",
              color: loading ? "#888" : "#1A202C",
              border: "none",
              borderRadius: "999px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: loading
                ? "none"
                : "0 4px 20px rgba(212, 175, 55, 0.4)",
            }}
          >
            {loading ? "Buscando..." : "✨ Receber uma Oração"}
          </button>
        </div>
      )}

      {/* ESTADO COM ORAÇÃO */}
      {oracao && (
        <div
          style={{
            opacity: animando ? 0 : 1,
            transform: animando ? "translateY(20px)" : "translateY(0)",
            transition: "all 0.6s ease-out",
          }}
        >
          <div
            style={{
              background: "radial-gradient(circle at top, #1a1410 0%, #050806 70%)",
              borderRadius: "24px",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              padding: "3rem 2.5rem",
              boxShadow: "0 0 40px rgba(212, 175, 55, 0.3)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "0.9rem",
                  color: "#D4AF37",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                {oracao.livroExibicao} {oracao.capitulo}
              </span>
            </div>

            <div
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#F5E3A1",
                textAlign: "justify",
              }}
              dangerouslySetInnerHTML={{ __html: oracao.fullContent }}
            />

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <button
                type="button"
                onClick={sortearOracao}
                disabled={loading}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1rem",
                  padding: "0.8rem 2rem",
                  background: "transparent",
                  color: "#D4AF37",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  borderRadius: "999px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                ✨ Nova Oração
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
