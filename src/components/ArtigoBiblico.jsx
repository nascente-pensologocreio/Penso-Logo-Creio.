// src/components/ArtigoBiblico.jsx
import React from "react";
import "../styles/post-page.css";

export default function ArtigoBiblico({ tipo, titulo, imagemHero, conteudoHtml }) {
  const conteudoFinal = conteudoHtml || "";

  return (
    <main
      className="post-page-main"
      style={{
        minHeight: "100vh",
        backgroundColor: "rgba(15, 39, 34, 0.77)",
        color: "#EDEDED",
      }}
    >
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "55vh",
          minHeight: "420px",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {imagemHero && (
          <img
            src={imagemHero}
            alt={titulo}
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
        )}

        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "880px",
            padding: "0 1rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "2.5rem",
              fontWeight: 300,
              color: "#F5E3A1",
            }}
          >
            {titulo}
          </h1>
        </div>
      </section>

      <section className="post-page-content">
        <article
          className="post-page-article"
          dangerouslySetInnerHTML={{ __html: conteudoFinal }}
        />
      </section>
    </main>
  );
}
