import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import oracaoPaginaImg from "../assets/oracao-pagina.webp";
import { versiculosNVI } from "../data/versiculos-nvi.js";
import oracoesIndex from "../data/oracao-index.json";

export default function Oracoes() {
  const navigate = useNavigate();
  const [oracoes, setOracoes] = useState([]);
  const [oracao, setOracao] = useState(null);
  const [versiculo, setVersiculo] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setOracoes(oracoesIndex);
    if (oracoesIndex.length > 0) {
      sortearOracao(oracoesIndex);
    }
    setCarregando(false);
  }, []);

  const sortearOracao = (listaOracoes = oracoes) => {
    if (listaOracoes.length === 0) return;

    setCarregando(true);

    setTimeout(() => {
      const oracaoAleatoria = listaOracoes[Math.floor(Math.random() * listaOracoes.length)];

      // Buscar versículo compatível com tags da oração
      const versiculosCompativeis = versiculosNVI.filter(v =>
        v.tags.some(tag => oracaoAleatoria.tags.includes(tag))
      );

      const versiculoAleatorio = versiculosCompativeis.length > 0
        ? versiculosCompativeis[Math.floor(Math.random() * versiculosCompativeis.length)]
        : versiculosNVI[Math.floor(Math.random() * versiculosNVI.length)];

      setOracao(oracaoAleatoria);
      setVersiculo(versiculoAleatorio);
      setCarregando(false);
    }, 300);
  };

  const abrirOracao = () => {
    if (oracao?.caminho) {
      navigate(oracao.caminho);
    }
  };

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
        Oração
      </h1>

      {/* VERSÍCULO */}
      {versiculo && (
        <div style={{
          maxWidth: "900px",
          margin: "0 auto 3rem auto",
          background: "radial-gradient(circle at top left, #272012 0%, #050c0a 65%)",
          border: "1px solid rgba(212, 175, 55, 0.45)",
          borderRadius: "24px",
          padding: "2rem 2.5rem",
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.85)",
          textAlign: "center"
        }}>
          <p style={{
            fontSize: "1.15rem",
            fontStyle: "italic",
            color: "#f4e6b3",
            lineHeight: 1.7,
            marginBottom: "1rem"
          }}>
            "{versiculo.texto}"
          </p>
          <p style={{
            fontSize: "0.95rem",
            color: "#D4AF37",
            fontWeight: "bold",
            letterSpacing: "0.05em"
          }}>
            — {versiculo.referencia}
          </p>
        </div>
      )}

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        gap: "3rem",
        alignItems: "start"
      }}>
        {/* IMAGEM */}
        <div style={{
          background: "radial-gradient(circle at top left, #272012 0%, #050c0a 65%)",
          border: "1px solid rgba(212, 175, 55, 0.45)",
          borderRadius: "24px",
          padding: "1.5rem",
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.85)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <img 
            src={oracaoPaginaImg} 
            alt="Oração"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)"
            }}
          />
        </div>

        {/* CONTEÚDO */}
        <div style={{
          background: "radial-gradient(circle at top left, #272012 0%, #050c0a 65%)",
          border: "1px solid rgba(212, 175, 55, 0.45)",
          borderRadius: "24px",
          padding: "2.5rem",
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.85)"
        }}>
          {carregando ? (
            <p style={{ color: "#f4e6b3", textAlign: "center" }}>Carregando oração...</p>
          ) : oracoes.length === 0 ? (
            <p style={{ color: "#f4e6b3", textAlign: "center" }}>Nenhuma oração disponível ainda.</p>
          ) : oracao ? (
            <>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                color: "#D4AF37",
                marginBottom: "1.5rem",
                textAlign: "center"
              }}>
                {oracao.titulo}
              </h2>
              
              <div style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "#e7dec5",
                textAlign: "center",
                marginBottom: "2.5rem",
                fontStyle: "italic",
                opacity: 0.9
              }}>
                {oracao.livro.charAt(0).toUpperCase() + oracao.livro.slice(1)} {oracao.capitulo}
              </div>

              <div style={{ 
                display: "flex", 
                gap: "1.5rem", 
                justifyContent: "center",
                flexWrap: "wrap"
              }}>
                <button
                  onClick={abrirOracao}
                  style={{
                    background: "linear-gradient(135deg, #2d2410 0%, #0f0d06 100%)",
                    border: "1px solid rgba(212, 175, 55, 0.6)",
                    borderRadius: "12px",
                    padding: "0.9rem 2rem",
                    color: "#f4e6b3",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                    transition: "all 0.3s ease"
                  }}
                >
                  🙏 ORAR
                </button>

                <button
                  onClick={() => sortearOracao()}
                  disabled={carregando}
                  style={{
                    background: "linear-gradient(135deg, #2d2410 0%, #0f0d06 100%)",
                    border: "1px solid rgba(212, 175, 55, 0.6)",
                    borderRadius: "12px",
                    padding: "0.9rem 2rem",
                    color: "#f4e6b3",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: carregando ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                    transition: "all 0.3s ease",
                    opacity: carregando ? 0.6 : 1
                  }}
                >
                  ✨ GERAR NOVA ORAÇÃO
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
