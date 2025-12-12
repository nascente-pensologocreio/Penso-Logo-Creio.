// src/components/ArtigoBiblico.jsx
import React from "react";

export default function ArtigoBiblico({
  tipo,
  titulo,
  imagemHero,
  conteudoHtml,
}) {
  const tipoLabel = tipo || "conteúdo";

  return (
    <>
      {/* HERO OPCIONAL DENTRO DO PRÓPRIO CARD EXTERNO */}
      {imagemHero && (
        <div
          style={{
            width: "100%",
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={imagemHero}
            alt={titulo}
            style={{
              maxWidth: "100%",
              maxHeight: "380px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      )}

      {/* CABEÇALHO INLINE (USA O CARD EXTERNO) */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#D4AF37",
            fontSize: "0.95rem",
            opacity: 0.85,
            marginBottom: "0.35rem",
            letterSpacing: "0.6px",
          }}
        >
          Artigo • {tipoLabel}
        </p>

        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "2.1rem",
            fontWeight: 300,
            color: "#F5E3A1",
          }}
        >
          {titulo}
        </h1>
      </div>

      {/* TEMPLATE DE PAPEL PADRONIZADO (HOMILIA / ESTUDOS) */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundImage:
            "url('/assets/template-read-card-home.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "0.875rem",
          border: "1px solid rgba(212, 175, 55, 0.18)",
          padding: "clamp(2rem, 8vw, 3rem)",
        }}
      >
        <style>
          {`
            .artigo-biblico-headings h2,
            .artigo-biblico-headings h3 {
              color: #0A0A0A !important;
              font-family: Georgia, 'Times New Roman', serif !important;
              font-weight: 400 !important;
              letter-spacing: 0.2px;
              margin-top: 1.35rem;
              margin-bottom: 0.55rem;
              text-shadow: 0 0 1px rgba(255, 255, 255, 0);
            }

            .artigo-biblico-headings h2 {
              font-size: 1.38rem;
            }

            .artigo-biblico-headings h3 {
              font-size: 1.22rem;
            }
          `}
        </style>

        <div
          className="artigo-biblico-headings"
          style={{
            color: "#0a0a0aff",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 300,
            fontSize: "1.00rem",
            lineHeight: 1.6,
            letterSpacing: "0.03px",
            wordSpacing: "0.5px",
            textShadow: "0 0 1px rgba(255, 255, 255, 0)",
            textAlign: "justify",
          }}
          dangerouslySetInnerHTML={{ __html: conteudoHtml || "" }}
        />
      </div>
    </>
  );
}
