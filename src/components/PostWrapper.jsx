// src/components/PostWrapper.jsx
import React from "react";
import "../styles/editorial-grid.css";

/**
 * PostWrapper
 * - Aplica atmosfera visual, tipografia premium e microinterações
 * - Determina paleta e animações por tipo de conteúdo (categoria/template/tipo)
 *
 * Props:
 * - tipo: string opcional (devocional, pregacao, estudo, oracao, longo)
 * - titulo: string opcional para cabeçalho
 * - subtitulo: string opcional
 * - versiculo: string opcional (linha espiritual)
 * - referencia: string opcional (referência bíblica)
 * - children: conteúdo do post (template específico)
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
      className={`min-h-screen px-6 md:px-12 py-14 relative overflow-hidden text-[#E8E8E8] ${tema.bg}`}
      style={tema.bgStyle}
    >
      {/* luz difusa / atmosfera */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={tema.atmosfera}
      />

      {/* container */}
      <article
        className={`max-w-5xl mx-auto relative z-10 rounded-2xl border ${tema.cardBorder} ${tema.cardBg} shadow-2xl backdrop-blur-md transition-smooth`}
        style={tema.cardStyle}
      >
        {/* cabeçalho */}
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

        {/* corpo do conteúdo */}
        {/* corpo do conteúdo */}
         <div
  className={`px-6 md:px-10 pb-10 ${tema.body}`}
  style={{ ...tema.bodyStyle, outline: "3px solid magenta" }}
>
  {children}
</div>

        <div className={`px-6 md:px-10 pb-10 ${tema.body}`} style={tema.bodyStyle}>
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
      h1Style: {
        ...cardCommon.h1Style,
        textShadow: "0 0 12px rgba(212,175,55,0.5)",
      },
      bodyStyle: {
        ...cardCommon.bodyStyle,
        textIndent: "1.3rem",
        opacity: 0.94,
      },
    },
    pregacao: {
      bg: "gradient-dark",
      bgStyle: {},
      atmosfera: {
        background:
          "radial-gradient(40% 40% at 50% 0%, rgba(212,175,55,0.18), transparent), radial-gradient(30% 30% at 90% 80%, rgba(212,175,55,0.10), transparent)",
      },
      ...cardCommon,
      h1Style: {
        ...cardCommon.h1Style,
        textShadow: "0 0 20px rgba(212,175,55,0.7)",
        letterSpacing: "0.02em",
      },
      bodyStyle: {
        ...cardCommon.bodyStyle,
        fontSize: "1.06rem",
        opacity: 0.96,
      },
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
      h1Style: {
        textShadow: "0 0 10px rgba(212,175,55,0.45)",
      },
      bodyStyle: {
        ...cardCommon.bodyStyle,
        opacity: 0.92,
      },
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
      h1Style: {
        textShadow: "0 0 14px rgba(212,175,55,0.55)",
        letterSpacing: "0.02em",
      },
      bodyStyle: {
        ...cardCommon.bodyStyle,
        textIndent: "1.5rem",
        fontSize: "1.10rem",
        opacity: 0.95,
      },
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
      h1Style: { textShadow: "0 0 10px rgba(212,175,55,0.45)" },
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
      h1Style: { textShadow: "0 0 10px rgba(212,175,55,0.45)" },
    },
  };

  return temas[tipo] || temas.generico;
}
