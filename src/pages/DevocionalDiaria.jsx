// src/pages/DevocionalDiaria.jsx
import React, { useEffect, useMemo, useState } from "react";
import { loadDevocionaisHome } from "../utils/loadDevocionaisHome.js";
import CalendarioMensal from "../components/CalendarioMensal.jsx";
import templateReadCard from "../assets/template-read-card-home.webp";

function formatKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function DevocionalDiaria() {
  const [blocos, setBlocos] = useState([]);
  const [estado, setEstado] = useState("carregando");
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
            mapa.set(chave, { chave, data, itens: [] });
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
        setSlugSelecionado(blocosArray[0].itens[0]?.slug || null);
        setEstado("ok");
      } catch (err) {
        console.error("Erro ao carregar devocionais:", err);
        if (!cancelado) {
          setBlocos([]);
          setEstado("erro");
        }
      }
    }

    carregar();
    return () => { cancelado = true; };
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

  const selecionado = postsDoDia.find((p) => p.slug === slugSelecionado) || null;
  const diasComConteudo = useMemo(() => blocos.map((b) => b.chave), [blocos]);
  const imagemHero = selecionado?.imageUrl || selecionado?.imagem || null;
  const conteudoFinal = selecionado?.html || "";

  return (
    <div style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "2rem",
      color: "#e8e8e8",
      fontFamily: "Georgia, serif"
    }}>
      <h1 style={{
        textAlign: "center",
        fontSize: "2.5rem",
        fontWeight: "bold",
        marginBottom: "2.5rem",
        color: "#D4AF37"
      }}>
        Devocional Diária
      </h1>

      <div style={{ marginBottom: "2rem" }}>
        <CalendarioMensal
          diasComConteudo={diasComConteudo}
          onSelectDia={(data, chave) => setDiaSelecionadoKey(chave)}
        />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: "3rem",
        alignItems: "flex-start"
      }}>
        <aside style={{
          background: "radial-gradient(circle at top left, #272012 0%, #050c0a 65%)",
          borderRadius: "24px",
          padding: "1.75rem 0",
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.85)",
          border: "1px solid rgba(212, 175, 55, 0.45)"
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#f4e6b3",
            margin: "0 0 1rem 0"
          }}>
            Arquivo de Devocionais
          </h2>

          {estado === "carregando" && <div style={{ padding: "1rem", color: "#e5ddc0" }}>Carregando...</div>}
          {estado === "erro" && <div style={{ padding: "1rem", color: "#fecaca" }}>Erro ao carregar.</div>}
          {estado === "vazio" && <div style={{ padding: "1rem", color: "#e5ddc0", opacity: 0.85 }}>Ainda não há devocionais arquivados.</div>}
          {estado === "ok" && !postsDoDia.length && <div style={{ padding: "1rem", color: "#e5ddc0", opacity: 0.85 }}>Não há devocionais para a data selecionada.</div>}

          {estado === "ok" && postsDoDia.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {postsDoDia.map((post, index) => (
                <li key={post.slug}>
                  <button
                    onClick={() => setSlugSelecionado(post.slug)}
                    style={{
                      width: "100%",
                      borderRadius: "16px",
                      padding: "0.7rem 0.9rem",
                      border: post.slug === slugSelecionado 
                        ? "1px solid rgba(212, 175, 55, 0.9)" 
                        : "1px solid rgba(212, 175, 55, 0.25)",
                      background: post.slug === slugSelecionado
                        ? "radial-gradient(circle at top, #3b2c10 0%, #0b0904 70%)"
                        : "radial-gradient(circle at top left, #15110a 0%, #050806 70%)",
                      color: "#e7dec5",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      cursor: "pointer",
                      boxShadow: post.slug === slugSelecionado ? "0 0 22px rgba(212, 175, 55, 0.55)" : "none"
                    }}
                  >
                    <span style={{
                      minWidth: "110px",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "999px",
                      fontSize: "0.64rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.09em",
                      textAlign: "center",
                      color: post.slug === slugSelecionado ? "#051f20" : "#daf1de",
                      background: post.slug === slugSelecionado 
                        ? "linear-gradient(135deg, #daf1de, #8eb69b)"
                        : "rgba(11, 43, 38, 0.96)"
                    }}>
                      {labelPorPosicao[index] || "CONTEÚDO"}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <span style={{ fontSize: "0.8rem", lineHeight: 1.3, color: "#f1e6c2" }}>
                        {post.titulo || "Devocional sem título"}
                      </span>
                      {post.data && (
                        <span style={{ marginTop: "0.1rem", fontSize: "0.7rem", color: "#b89c5b" }}>
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

        <main>
          {estado === "carregando" && <div style={{ padding: "2rem", color: "#e5ddc0" }}>Carregando devocional...</div>}
          {estado === "erro" && <div style={{ padding: "2rem", color: "#fecaca" }}>Não foi possível exibir o devocional.</div>}
          {estado === "vazio" && <div style={{ padding: "2rem", color: "#e5ddc0", opacity: 0.85 }}>Quando você arquivar devocionais, eles aparecerão aqui.</div>}
          {estado === "ok" && !selecionado && <div style={{ padding: "2rem", color: "#e5ddc0", opacity: 0.85 }}>Selecione um conteúdo à esquerda.</div>}

          {estado === "ok" && selecionado && (
            <article style={{ borderRadius: "34px", overflow: "hidden", boxShadow: "0 0 40px rgba(0, 0, 0, 0.623)" }}>
              <section style={{
                position: "relative",
                width: "100%",
                height: "80vh",
                minHeight: "600px",
                overflow: "hidden",
                backgroundColor: "#000"
              }}>
                {imagemHero && (
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
                      objectFit: "contain"
                    }}
                  />
                )}
                <div style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100%",
                  maxWidth: "1280px",
                  padding: "0 1rem",
                  textAlign: "center"
                }}>
                  <h1 style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "2.50rem",
                    fontWeight: 300,
                    color: "#F5E3A1"
                  }}>
                    {selecionado.titulo}
                  </h1>
                </div>
              </section>

              <article style={{
                width: "100%",
                maxWidth: "1180px",
                margin: "0 auto",
                padding: "2.5rem 0.5rem 4.5rem"
              }}>
                <div style={{
                  backgroundImage: `url(${templateReadCard})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  border: "1px solid rgba(212, 175, 55, 0.18)",
                  borderRadius: "0.875rem",
                  padding: "clamp(2rem, 5vw, 3rem)"
                }}>
                  <style>
                    {`
                      .devocional-content h2,
                      .devocional-content h3 {
                        color: #0A0A0A !important;
                        font-family: Georgia, 'Times New Roman', serif !important;
                        font-weight: 300 !important;
                        letter-spacing: 0.2px;
                        margin-top: 0.50rem;
                        margin-bottom: 1.50rem;
                      }
                      .devocional-content h2 { font-size: 1.38rem; }
                      .devocional-content h3 { font-size: 1.22rem; }
                    `}
                  </style>
                  <div
                    className="devocional-content"
                    style={{
                      color: "#0a0a0aff",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontWeight: 300,
                      fontSize: "0.980rem",
                      lineHeight: 1.8,
                      letterSpacing: "0.03px",
                      wordSpacing: "0.5px",
                      textAlign: "justify"
                    }}
                    dangerouslySetInnerHTML={{ __html: conteudoFinal }}
                  />
                </div>
              </article>
            </article>
          )}
        </main>
      </div>
    </div>
  );
}