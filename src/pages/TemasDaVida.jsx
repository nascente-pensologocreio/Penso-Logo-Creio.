// src/pages/TemasDaVida.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CarrosselTags from "@components/CarrosselTags.jsx";
import { loadBibleByTag } from "@utils/loadBibleByTag.js";

import "@components/editorial/editorial-swap.css";

// LISTA FIXA DE TAGS (20)
const TAGS = [
  "amor",
  "ansiedade",
  "batalha",
  "depressao",
  "desemprego",
  "dividas",
  "doenca-morte",
  "duvida",
  "esperanca",
  "frustracao",
  "futuro",
  "insonia",
  "luto",
  "medo",
  "mudanca",
  "perdao",
  "separacao",
  "solidao",
  "sonho",
  "vicio",
];

export default function TemasDaVida() {
  const { tag } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState({ devocional: [], oracao: [] });
  const [loading, setLoading] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState("devocional");
  const [capituloSelecionadoKey, setCapituloSelecionadoKey] = useState(null);

  useEffect(() => {
    if (!tag) return;

    async function carregar() {
      setLoading(true);
      setCapituloSelecionadoKey(null);

      try {
        const resultado = await loadBibleByTag(tag);

        const devocionais = Array.isArray(resultado?.devocional)
          ? resultado.devocional
          : [];
        const oracoes = Array.isArray(resultado?.oracao)
          ? resultado.oracao
          : [];

        setPosts({ devocional: devocionais, oracao: oracoes });
      } catch (err) {
        console.error("❌ Erro ao carregar posts por tag:", err);
        setPosts({ devocional: [], oracao: [] });
      } finally {
        setLoading(false);
      }
    }

    carregar();
    window.scrollTo(0, 0);
  }, [tag]);

  const handleSelectTag = (t) => {
    navigate(`/temas-da-vida/${t}`);
  };

  // Agrupamento por capítulo (um post por tipo+capítulo)
  const agrupadoPorCapitulo = useMemo(() => {
    const resultado = { devocional: {}, oracao: {} };

    const processar = (tipo) => {
      const lista = Array.isArray(posts[tipo]) ? posts[tipo] : [];
      for (const post of lista) {
        const livro = (post.livro || "").toLowerCase();
        const cap = String(post.capitulo || "").padStart(2, "0");
        const chave = `${livro}-${cap}`; // ex: "romanos-01"
        if (!resultado[tipo][chave]) {
          resultado[tipo][chave] = post;
        }
      }
    };

    processar("devocional");
    processar("oracao");
    return resultado;
  }, [posts]);

  // capítulos disponíveis para o tipo atual
  const capitulosDoTipo = useMemo(() => {
    const mapa = agrupadoPorCapitulo[tipoSelecionado] || {};
    const entradas = Object.entries(mapa);
    entradas.sort((a, b) => a[0].localeCompare(b[0]));
    return entradas; // [ [chave, post], ... ]
  }, [agrupadoPorCapitulo, tipoSelecionado]);

  // garantir capítulo selecionado
  useEffect(() => {
    if (!capitulosDoTipo.length) {
      setCapituloSelecionadoKey(null);
      return;
    }
    const existe = capitulosDoTipo.some(
      ([chave]) => chave === capituloSelecionadoKey
    );
    if (!existe) {
      setCapituloSelecionadoKey(capitulosDoTipo[0][0]);
    }
  }, [capitulosDoTipo, capituloSelecionadoKey]);

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#010b0a",
        paddingBottom: "4rem",
      }}
    >
      {/* CARROSSEL */}
      <CarrosselTags tags={TAGS} onSelectTag={handleSelectTag} />

      {/* RESPIRO */}
      <div style={{ height: "3rem" }} />

      {/* MODO 1: Sem tag - apenas mensagem */}
      {!tag && (
        <div
          style={{
            textAlign: "center",
            paddingTop: "4rem",
            color: "#D4AF37",
            fontSize: "1.2rem",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Selecione uma tag acima para começar
        </div>
      )}

      {/* MODO 2: Com tag - mostrar conteúdo */}
      {tag && (
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.5rem",
              color: "#D4AF37",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "#EDEDED",
              fontSize: "1.1rem",
              marginBottom: "3rem",
            }}
          >
            Conteúdos bíblicos sobre este tema
          </p>

          {/* NÍVEL 1: DEVOCIONAL | ORAÇÃO */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <button
              onClick={() => setTipoSelecionado("devocional")}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                color: tipoSelecionado === "devocional" ? "#D4AF37" : "#718096",
                background: "none",
                border: "none",
                borderBottom:
                  tipoSelecionado === "devocional"
                    ? "2px solid #D4AF37"
                    : "2px solid transparent",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Devocional
            </button>

            <button
              onClick={() => setTipoSelecionado("oracao")}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                color: tipoSelecionado === "oracao" ? "#D4AF37" : "#718096",
                background: "none",
                border: "none",
                borderBottom:
                  tipoSelecionado === "oracao"
                    ? "2px solid #D4AF37"
                    : "2px solid transparent",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Oração
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <div
              style={{
                textAlign: "center",
                color: "#EDEDED",
                padding: "3rem",
              }}
            >
              Carregando conteúdos...
            </div>
          )}

          {/* VAZIO GERAL */}
          {!loading && capitulosDoTipo.length === 0 && (
            <div
              style={{
                textAlign: "center",
                color: "#718096",
                padding: "3rem",
                fontSize: "1.1rem",
              }}
            >
              Ainda não há {tipoSelecionado}s marcados com esta tag.
            </div>
          )}

          {/* NÍVEL 2: LISTA DE CAPÍTULOS */}
          {!loading && capitulosDoTipo.length > 0 && (
            <div
              style={{
                maxWidth: "640px",
                margin: "0 auto",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  color: "#D4AF37",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                {tipoSelecionado === "devocional"
                  ? "Escolha o capítulo para ler o devocional"
                  : "Escolha o capítulo para ler a oração"}
              </h2>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {capitulosDoTipo.map(([chave, post]) => {
                  const labelCapitulo = `${post.livro} ${parseInt(
                    post.capitulo || "0",
                    10
                  )}`;
                  const ativo = chave === capituloSelecionadoKey;

                  return (
                    <li key={chave} style={{ marginBottom: "0.75rem" }}>
                      <button
                        type="button"
                        onClick={() => navigate(`/artigo/${post.slug}`)}
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.9rem 1.25rem",
                          borderRadius: "999px",
                          border: ativo
                            ? "1px solid rgba(212, 175, 55, 0.9)"
                            : "1px solid rgba(212, 175, 55, 0.4)",
                          background: ativo
                            ? "linear-gradient(90deg, #d4af37, #f6e27a)"
                            : "rgba(8, 26, 23, 0.9)",
                          color: ativo ? "#1A202C" : "#EDEDED",
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          fontSize: "0.95rem",
                          cursor: "pointer",
                          boxShadow: ativo
                            ? "0 0 18px rgba(212, 175, 55, 0.8)"
                            : "0 0 0 rgba(0, 0, 0, 0)",
                          transition: "all 0.25s ease",
                        }}
                      >
                        <span>{labelCapitulo}</span>
                        <span
                          style={{
                            fontSize: "0.85rem",
                            opacity: ativo ? 0.85 : 0.75,
                          }}
                        >
                          {post.titulo || "(sem título)"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
