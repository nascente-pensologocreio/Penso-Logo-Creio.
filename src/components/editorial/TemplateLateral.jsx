// src/components/editorial/TemplateLateral.jsx
import React from "react";

export default function TemplateLateral({ titulo, subtitulo, imagem, children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr minmax(280px, 380px)",
        gap: "2rem",
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* COLUNA PRINCIPAL — CONTEÚDO */}
      <div style={{ width: "100%" }}>
        <h1
          style={{
            color: "#D4AF37",
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          {titulo}
        </h1>

        {subtitulo && (
          <p
            style={{
              color: "#bbb",
              fontSize: "1rem",
              marginTop: "-0.5rem",
              marginBottom: "2rem",
            }}
          >
            {subtitulo}
          </p>
        )}

        {children}
      </div>

      {/* COLUNA LATERAL — CARD */}
      <aside
        style={{
          width: "100%",
          background: "rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(212,175,55,0.2)",
          borderRadius: "12px",
          padding: "1.75rem",
          height: "fit-content",
        }}
      >
        {imagem && (
          <img
            src={imagem}
            alt={titulo}
            style={{
              width: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
        )}

        <h3
          style={{
            color: "#D4AF37",
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.25rem",
            marginBottom: "1rem",
          }}
        >
          Conteúdos Relacionados
        </h3>

        <p style={{ color: "#ccc", lineHeight: 1.6 }}>
          Aqui você pode incluir recomendações, notas adicionais,
          links úteis ou qualquer conteúdo complementar.
        </p>
      </aside>
    </div>
  );
}
