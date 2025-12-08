// src/pages/DevocionalDiaria.jsx
import React, { useEffect, useMemo, useState } from "react";
import EditorialLayout from "../layouts/EditorialLayout.jsx";
import { loadDevocionaisHome } from "../utils/loadDevocionaisHome.js";
import CalendarioMensal from "../components/CalendarioMensal.jsx";

import "../styles/editorial-grid.css";
import "../styles/editorial-devocional-diaria.css";

function formatKey(date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function DevocionalDiaria() {
  const [blocos, setBlocos] = useState([]); // [{ chave, data, itens: Post[] }]
  const [estado, setEstado] = useState("carregando"); // carregando | ok | vazio | erro
  const [diaSelecionadoKey, setDiaSelecionadoKey] = useState(null);
  const [slugSelecionado, setSlugSelecionado] = useState(null);

  const labelPorPosicao = ["DEVOCIONAL", "MENSAGEM PASTORAL", "ORAÇÃO"];

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      try {
        setEstado("carregando");

        const todos = await loadDevocionaisHome();
        if (cancelado) return;

        const filtrados = (todos || []).filter((post) =>
          ["devocional", "mensagem-pastoral", "oracao"].includes(
            (post.tipo || "").toLowerCase()
          )
        );

        if (!filtrados.length) {
          setBlocos([]);
          setEstado("vazio");
          return;
        }

        const mapa = new Map();

        for (const post of filtrados) {
          const data = post.data instanceof Date ? post.data : null;
          if (!data) continue;

          const chave = formatKey(data);

          if (!mapa.has(chave)) {
            mapa.set(chave, {
              chave,
              data,
              itens: [],
            });
          }

          mapa.get(chave).itens.push(post);
        }

        let blocosArray = Array.from(mapa.values());
        blocosArray.sort((a, b) => b.data - a.data);

        if (!blocosArray.length) {
          setBlocos([]);
          setEstado("vazio");
          return;
        }

        setBlocos(blocosArray);
        setDiaSelecionadoKey(blocosArray[0].chave);

        const primeiroPost = blocosArray[0].itens[0];
        setSlugSelecionado(primeiroPost?.slug || null);

        setEstado("ok");
      } catch (err) {
        console.error("Erro ao carregar histórico de devocionais da Home:", err);
        if (!cancelado) {
          setBlocos([]);
          setEstado("erro");
        }
      }
    }

    carregar();

    return () => {
      cancelado = true;
    };
  }, []);

  const blocoSelecionado = useMemo(
    () => blocos.find((b) => b.chave === diaSelecionadoKey) || null,
    [blocos, diaSelecionadoKey]
  );

  const postsDoDia = blocoSelecionado?.itens || [];

  useEffect(() => {
    if (!postsDoDia.length) {
      setSlugSelecionado(null);
      return;
    }
    const existe = postsDoDia.some((p) => p.slug === slugSelecionado);
    if (!existe) {
      setSlugSelecionado(postsDoDia[0].slug);
    }
  }, [postsDoDia, slugSelecionado]);

  const selecionado =
    postsDoDia.find((p) => p.slug === slugSelecionado) || null;

  const diasComConteudo = useMemo(
    () => blocos.map((b) => b.chave),
    [blocos]
  );

  const imagemHero =
    selecionado?.imageUrl || selecionado?.imagem || null;
  const conteudoFinal = selecionado?.html || "";

  return (
    <EditorialLayout titulo="Devocional Diária">
      <div className="devocional-diaria-calendario-wrapper" style={{ marginBottom: "2rem" }}>
        <CalendarioMensal
          diasComConteudo={diasComConteudo}
          onSelectDia={(data, chave) => {
            setDiaSelecionadoKey(chave);
          }}
        />
      </div>

      <div className="devocional-diaria-grid">
        <aside className="devocional-diaria-lista">
          <h2 className="devocional-diaria-lista-titulo">
            Arquivo de Devocionais
          </h2>

          {estado === "carregando" && (
            <div className="devocional-diaria-feedback">
              Carregando devocionais...
            </div>
          )}

          {estado === "erro" && (
            <div className="devocional-diaria-feedback erro">
              Ocorreu um erro ao carregar os devocionais.
            </div>
          )}

          {estado === "vazio" && (
            <div className="devocional-diaria-feedback vazio">
              Ainda não há devocionais arquivados.
            </div>
          )}

          {estado === "ok" && !postsDoDia.length && (
            <div className="devocional-diaria-feedback vazio">
              Não há devocionais para a data selecionada.
            </div>
          )}

          {estado === "ok" && postsDoDia.length > 0 && (
            <ul className="devocional-diaria-lista-itens">
              {postsDoDia.map((post, index) => (
                <li key={post.slug}>
                  <button
                    type="button"
                    className={
                      "devocional-diaria-item" +
                      (post.slug === slugSelecionado
                        ? " devocional-diaria-item--ativo"
                        : "")
                    }
                    onClick={() => setSlugSelecionado(post.slug)}
                  >
                    <span className="devocional-diaria-item-tipo">
                      {labelPorPosicao[index] || "CONTEÚDO"}
                    </span>

                    <span className="devocional-diaria-item-conteudo">
                      <span className="devocional-diaria-item-titulo">
                        {post.titulo || "Devocional sem título"}
                      </span>
                      {post.data && (
                        <span className="devocional-diaria-item-data">
                          {post.data.toLocaleDateString("pt-BR")}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <main className="devocional-diaria-leitura">
          {estado === "carregando" && (
            <div className="devocional-diaria-feedback">
              Carregando devocional selecionado...
            </div>
          )}

          {estado === "erro" && (
            <div className="devocional-diaria-feedback erro">
              Não foi possível exibir o devocional selecionado.
            </div>
          )}

          {estado === "vazio" && (
            <div className="devocional-diaria-feedback vazio">
              Quando você começar a arquivar devocionais na Home,
              eles aparecerão aqui.
            </div>
          )}

          {estado === "ok" && !selecionado && (
            <div className="devocional-diaria-feedback vazio">
              Selecione um conteúdo no painel à esquerda.
            </div>
          )}

          {estado === "ok" && selecionado && (
            <article className="devocional-diaria-card fadeIn">
              {/* HERO + TÍTULO – imagem grande */}
              <section
                style={{
                  position: "relative",
                  width: "100%",
                  height: "80vh",
                  minHeight: "600px",
                  overflow: "hidden",
                  backgroundColor: "#000",
                }}
              >
                {imagemHero && (
                  <>
                    <img
                      src={imagemHero}
                      alt={selecionado.titulo}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </>
                )}

                <div
                  style={{
                    position: "absolute",
                    bottom: "1.5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    maxWidth: "1180px",
                    padding: "0 1rem",
                    textAlign: "center",
                  }}
                >
                  <h1
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "2.50rem",
                      fontWeight: 300,
                      color: "#F5E3A1",
                    }}
                  >
                    {selecionado.titulo}
                  </h1>
                </div>
              </section>

              {/* CORPO DO TEXTO – papel largo */}
              <article
                style={{
                  width: "100%",
                  maxWidth: "1280px",
                  margin: "0 auto",
                  padding: "2.5rem 0.5rem 4.5rem",
                }}
              >
                <div
                  style={{
                    backgroundImage:
                      "url('/src/assets/template-read-card-home.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    border: "1px solid rgba(212, 175, 55, 0.18)",
                    borderRadius: "0.875rem",
                    padding: "clamp(2rem, 5vw, 3rem)",
                  }}
                >
                  {/* VÉU DE LEITURA */}
                  <div
                    style={{
                      backgroundColor: "rgba(49, 47, 47, 0)", 
                      padding: "1rem 0rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <style>
                      {`
                        .devocional-diaria-headings h2,
                        .devocional-diaria-headings h3 {
                          color: #0A0A0A !important;
                          font-family: Georgia, 'Times New Roman', serif !important, bold;
                          font-weight: 300 !important;
                          letter-spacing: 0.2px;
                          margin-top: 0.50rem;
                          margin-bottom: 1.50rem;
                          text-shadow: 0 0 1px rgba(255, 255, 255, 0);
                        }

                        .devocional-diaria-headings h2 {
                          font-size: 1.38rem;
                        }

                        .devocional-diaria-headings h3 {
                          font-size: 1.22rem;
                        }
                      `}
                    </style>

                    <div
                      className="devocional-diaria-headings"
                      style={{
                        color: "#0a0a0aff",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontWeight: 300,
                        fontSize: "0.980rem",
                        lineHeight: 0.8,
                        letterSpacing: "0.03px",
                        wordSpacing: "0.5px",
                        textShadow:
                          "0 0 1px rgba(255, 255, 255, 0)",
                        textAlign: "justify",
                      }}
                      dangerouslySetInnerHTML={{ __html: conteudoFinal }}
                    />
                  </div>
                </div>
              </article>
            </article>
          )}
        </main>
      </div>
    </EditorialLayout>
  );
}