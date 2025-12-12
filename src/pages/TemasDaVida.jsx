// src/pages/TemasDaVida.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CarrosselTags from "@components/CarrosselTags.jsx";
import AccordionLivros from "@components/AccordionLivros.jsx";
import { loadBibleByTag } from "@utils/loadBibleByTag.js";
import { extrairLivroDoPath, testamentoDoLivro } from "@utils/mapearLivros.js";

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
  const [testamentoSelecionado, setTestamentoSelecionado] = useState("todos"); // "todos", "AT", "NT"

  useEffect(() => {
    if (!tag) return;

    async function carregar() {
      setLoading(true);

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

  const handleSelectPost = (post) => {
    navigate(`/artigo/${post.slug}`, { state: { from: 'temas-da-vida' } });
  };

  // Agrupar posts por livro
  const livrosAgrupados = useMemo(() => {
    const lista = Array.isArray(posts[tipoSelecionado]) ? posts[tipoSelecionado] : [];
    
    // Filtrar por testamento
    const listaFiltrada = lista.filter(post => {
      if (testamentoSelecionado === "todos") return true;
      const livroSlug = (post.livro || "").toLowerCase();
      const testamento = testamentoDoLivro(livroSlug);
      return testamento === testamentoSelecionado;
    });

    // Agrupar por livro
    const grupos = {};
    for (const post of listaFiltrada) {
      const livro = (post.livro || "").toLowerCase();
      if (!grupos[livro]) {
        grupos[livro] = [];
      }
      grupos[livro].push(post);
    }

    // Ordenar capítulos dentro de cada livro
    for (const livro in grupos) {
      grupos[livro].sort((a, b) => {
        return parseInt(a.capitulo || 0) - parseInt(b.capitulo || 0);
      });
    }

    // Converter para array e ordenar livros alfabeticamente
    const resultado = Object.entries(grupos)
      .map(([livro, posts]) => ({ livro, posts }))
      .sort((a, b) => a.livro.localeCompare(b.livro));

    return resultado;
  }, [posts, tipoSelecionado, testamentoSelecionado]);

  // Verificar se tem conteúdo no tipo atual (antes do filtro de testamento)
  const temConteudo = posts[tipoSelecionado]?.length > 0;

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

          {/* VAZIO TOTAL (sem nenhum post do tipo) */}
          {!loading && !temConteudo && (
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

          {/* NÍVEL 2: FILTRO DE TESTAMENTO + ACCORDION */}
          {!loading && temConteudo && (
            <>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  color: "#D4AF37",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                {tipoSelecionado === "devocional"
                  ? "Escolha o capítulo para ler o devocional"
                  : "Escolha o capítulo para ler a oração"}
              </h2>

              {/* FILTRO DE TESTAMENTO */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <button
                  onClick={() => setTestamentoSelecionado("todos")}
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "0.95rem",
                    color: testamentoSelecionado === "todos" ? "#1A202C" : "#D4AF37",
                    background: testamentoSelecionado === "todos"
                      ? "linear-gradient(90deg, #d4af37, #f6e27a)"
                      : "transparent",
                    border: "1px solid rgba(212, 175, 55, 0.5)",
                    borderRadius: "999px",
                    padding: "0.5rem 1.5rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Todos
                </button>

                <button
                  onClick={() => setTestamentoSelecionado("AT")}
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "0.95rem",
                    color: testamentoSelecionado === "AT" ? "#1A202C" : "#D4AF37",
                    background: testamentoSelecionado === "AT"
                      ? "linear-gradient(90deg, #d4af37, #f6e27a)"
                      : "transparent",
                    border: "1px solid rgba(212, 175, 55, 0.5)",
                    borderRadius: "999px",
                    padding: "0.5rem 1.5rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Antigo Testamento
                </button>

                <button
                  onClick={() => setTestamentoSelecionado("NT")}
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "0.95rem",
                    color: testamentoSelecionado === "NT" ? "#1A202C" : "#D4AF37",
                    background: testamentoSelecionado === "NT"
                      ? "linear-gradient(90deg, #d4af37, #f6e27a)"
                      : "transparent",
                    border: "1px solid rgba(212, 175, 55, 0.5)",
                    borderRadius: "999px",
                    padding: "0.5rem 1.5rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Novo Testamento
                </button>
              </div>

              {/* VAZIO APÓS FILTRO DE TESTAMENTO */}
              {livrosAgrupados.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#718096",
                    padding: "2rem",
                    fontSize: "1rem",
                  }}
                >
                  Ainda não há {tipoSelecionado}s marcados com esta tag no{" "}
                  {testamentoSelecionado === "AT" ? "Antigo" : "Novo"} Testamento.
                </div>
              )}

              {/* ACCORDION DE LIVROS */}
              {livrosAgrupados.length > 0 && (
                <AccordionLivros
                  livrosAgrupados={livrosAgrupados}
                  onSelectPost={handleSelectPost}
                  slugAtivo={null}
                />
              )}
            </>
          )}
        </section>
      )}
    </main>
  );
}