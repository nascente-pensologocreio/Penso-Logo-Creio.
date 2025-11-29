// src/components/PostWrapper.jsx
import React from "react";
import "../styles/editorial-grid.css";

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
      className={`min-h-screen px-6 md:px-12 py-14 relative overflow-hidden text-[#E8E8E8] ${tema.bg}`}
      style={tema.bgStyle}
    >
      {/* atmosfera */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={tema.atmosfera}
      />

      <article
        className={`max-w-5xl mx-auto relative z-10 rounded-2xl border ${tema.cardBorder} ${tema.cardBg} shadow-2xl backdrop-blur-md transition-smooth`}
        style={tema.cardStyle}
      >
        {(titulo || subtitulo || versiculo) && (
          <header className="text-center px-6 md:px-10 pt-10 pb-6 animate-fade-in-down">
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

        {/* CORPO */}
        <div
          className={`px-6 md:px-10 pb-10 ${tema.body}`}
          style={tema.bodyStyle}
        >
          {children}
        </div>
      </article>
    </section>
  );
}

/* Helpers (inalterados) */

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
  const baseGold = "#D4AF37";
  const glassBorder = "border-[#D4AF37]/30";

  const cardCommon = {
    cardBorder: glassBorder,
    cardBg: "bg-gradient-to-b from-black/80 via-[#0a0a0a]/90 to-black/85",
    cardStyle: {
      boxShadow:
        "0 0 25px rgba(212,175,55,0.18), inset 0 0 10px rgba(212,175,55,0.08)",
    },
    h1: "text-gradient-animated",
    h1Style: {
      textShadow:
        "0 0 16px rgba(212,175,55,0.6), 0 0 6px rgba(255,255,255,0.25)",
    },
    h2: "text-[#cfcfcf]",
    h2Style: { opacity: 0.95 },
    versiculo: "text-[#EDEDED]",
    versiculoStyle: {
      textShadow: "0 0 8px rgba(212,175,55,0.35)",
    },
    body: "text-justify leading-relaxed",
    bodyStyle: { fontFamily: "'Inter', sans-serif" },
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
      bodyStyle: {
        ...cardCommon.bodyStyle,
        textIndent: "1.3rem",
        opacity: 0.94,
      },
    },

    pregacao: {
      bg: "gradient-dark",
      atmosfera: {
        background:
          "radial-gradient(40% 40% at 50% 0%, rgba(212,175,55,0.18), transparent), radial-gradient(30% 30% at 90% 80%, rgba(212,175,55,0.10), transparent)",
      },
      ...cardCommon,
    },

    estudo: { ...cardCommon, bg: "gradient-dark", atmosfera: {} },

    oracao: { ...cardCommon, bg: "gradient-dark", atmosfera: {} },

    longo: { ...cardCommon, bg: "gradient-dark", atmosfera: {} },

    generico: { ...cardCommon, bg: "gradient-dark", atmosfera: {} },
  };

  return temas[tipo] || temas.generico;
}
