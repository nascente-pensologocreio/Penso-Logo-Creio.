// src/components/PostWrapper.jsx
import React from "react";
import "../styles/editorial-grid.css";
import paperBg from "../assets/template-read-card-home.jpeg";

/**
 * PostWrapper
 * - Atmosfera visual + card de leitura em "papel" claro
 */
export default function PostWrapper({
  tipo,
  titulo,
  subtitulo,
  versiculo,
  referencia,
  children,
}) {
  const t = normalizarTipo(tipo);
  const tema = temaPorTipo(t);

  return (
    <section
      className={`px-6 md:px-12 py-14 relative overflow-hidden text-[#E8E8E8] ${tema.bg}`}
      style={tema.bgStyle}
    >
      {/* luz difusa / atmosfera do fundo da página */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={tema.atmosfera}
      />

      {/* cabeçalho acima do card de leitura */}
      {(titulo || subtitulo || versiculo) && (
        <header className="max-w-5xl mx-auto text-center px-6 md:px-10 pt-4 pb-8 relative z-10 animate-fade-in-down">
          {titulo && (
            <h1
              className={`font-['Playfair_Display'] text-3xl md:text-5xl mb-2 ${tema.h1}`}
              style={tema.h1Style}
            >
              {titulo}
            </h1>
          )}

          {subtitulo && (
            <h2
              className={`text-lg md:text-xl italic ${tema.h2}`}
              style={tema.h2Style}
            >
              {subtitulo}
            </h2>
          )}

          {versiculo && (
            <p
              className={`mt-4 text-base md:text-lg ${tema.versiculo}`}
              style={tema.versiculoStyle}
            >
              “{versiculo}”
              {referencia && (
                <>
                  <br />
                  <span className="text-sm italic opacity-75">
                    ({referencia})
                  </span>
                </>
              )}
            </p>
          )}

          <div
            className="h-[2px] w-24 mx-auto mt-4"
            style={{ background: "rgba(212,175,55,0.6)" }}
          />
        </header>
      )}

      {/* CARD DE LEITURA EM PAPEL CLARO */}
      <article
        className="w-full max-w-5xl mx-auto relative z-10 shadow-2xl rounded-[18px] overflow-hidden border border-black/15"
        style={{
          backgroundImage: `url(${paperBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* véu suave: preserva textura, só reduz contraste */}
        <div className="absolute inset-0 bg-[#F5F0E5]/12" />

        <div
          className="relative px-8 md:px-12 py-10 text-justify"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "#111111",
            textRendering: "optimizeLegibility",
          }}
        >
          {children}
        </div>
      </article>
    </section>
  );
}

/* Helpers */

function normalizarTipo(raw) {
  if (!raw) return "generico";
  const t = String(raw).toLowerCase();
  if (t.includes("devoc")) return "devocional";
  if (t.includes("preg") || t.includes("homil")) return "pregacao";
  if (t.includes("estud") || t.includes("escadaria")) return "estudo";
  if (t.includes("oraç") || t.includes("orac")) return "oracao";
  if (t.includes("longo")) return "longo";
  return t;
}

function temaPorTipo(tipo) {
  const cardCommon = {
    h1: "text-gradient-animated",
    h1Style: {
      textShadow:
        "0 0 16px rgba(212,175,55,0.6), 0 0 6px rgba(255,255,255,0.25)",
    },
    h2: "text-[#f0e6c0]",
    h2Style: { opacity: 0.95 },
    versiculo: "text-[#F7F3E8]",
    versiculoStyle: {
      textShadow: "0 0 8px rgba(212,175,55,0.35)",
    },
  };

  const temas = {
    devocional: {
      bg: "gradient-olive",
      bgStyle: {},
      atmosfera: {
        background:
          "radial-gradient(60% 60% at 50% 10%, rgba(212,175,55,0.10), transparent), radial-gradient(40% 40% at 10% 80%, rgba(60, 90, 70, 0.25), transparent)",
      },
      ...cardCommon,
    },
    pregacao: {
      bg: "gradient-dark",
      bgStyle: {},
      atmosfera: {
        background:
          "radial-gradient(40% 40% at 50% 0%, rgba(212,175,55,0.18), transparent), radial-gradient(30% 30% at 90% 80%, rgba(212,175,55,0.10), transparent)",
      },
      ...cardCommon,
    },
    estudo: {
      bg: "gradient-dark",
      bgStyle: {},
      atmosfera: {
        background:
          "radial-gradient(30% 30% at 15% 10%, rgba(180,180,180,0.15), transparent), radial-gradient(25% 25% at 85% 80%, rgba(212,175,55,0.08), transparent)",
      },
      ...cardCommon,
      h1: "text-[#D4AF37]",
    },
    oracao: {
      bg: "gradient-dark",
      bgStyle: {},
      atmosfera: {
        background:
          "radial-gradient(50% 50% at 50% 15%, rgba(212,175,55,0.25), transparent), radial-gradient(35% 35% at 85% 85%, rgba(212,175,55,0.12), transparent)",
      },
      ...cardCommon,
      h1: "text-[#D4AF37]",
    },
    longo: {
      bg: "gradient-dark",
      bgStyle: {},
      atmosfera: {
        background:
          "radial-gradient(45% 45% at 30% 10%, rgba(212,175,55,0.12), transparent)",
      },
      ...cardCommon,
      h1: "text-[#D4AF37]",
    },
    generico: {
      bg: "gradient-dark",
      bgStyle: {},
      atmosfera: {
        background:
          "radial-gradient(45% 45% at 70% 20%, rgba(212,175,55,0.12), transparent)",
      },
      ...cardCommon,
      h1: "text-[#D4AF37]",
    },
  };

  return temas[tipo] || temas.generico;
}
