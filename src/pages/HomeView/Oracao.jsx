// src/pages/HomeView/Oracao.jsx
import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import rawFile from "../../content/home/oracao.md?raw";

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return { data: {}, content: raw };
  const end = raw.indexOf("\n---");
  if (end === -1) return { data: {}, content: raw };

  const fmRaw = raw.slice(3, end).trim();
  const body = raw.slice(end + 4);

  const data = {};
  fmRaw.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  });

  return { data, content: body };
}

export default function Oracao() {
  const [post, setPost] = useState({
    titulo: "",
    data: "",
    readTime: "",
    tag: "",
    imagemHero: null,
    conteudoFinal: "",
  });

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 50);

    const md = new MarkdownIt({ html: true, breaks: true });
    const parsed = parseFrontmatter(rawFile);
    const front = parsed.data;
    const html = md.render(parsed.content);

    setPost({
      titulo: front.titulo || "Oração",
      data: front.data || "",
      readTime: front.readTime || "",
      tag: front.tag || "",
      imagemHero: front.imageUrl || front.imagem || null,
      conteudoFinal: html,
    });
  }, []);

  const { titulo, data, readTime, tag, imagemHero, conteudoFinal } = post;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#010b0a", color: "#ededed" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500&display=swap');

        /* Caixa do texto */
        .post-box {
          background-image: url('/Fundo-PostHome.jpeg');
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(212,175,55,0.45);
          border-radius: 1rem;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 18px rgba(212,175,55,0.35),
                      inset 0 0 12px rgba(212,175,55,0.25);
          animation: fadeInUp 1.2s ease;
        }

        .post-box::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(2px);
          z-index: 0;
        }
        .post-box * { position: relative; z-index: 1; }

        /* Títulos internos */
        .post-box h1,
        .post-box h2,
        .post-box h3,
        .post-box h4,
        .post-box h5,
        .post-box h6 {
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }
      `}</style>

      {/* ========== HERO COMO BANNER (SEM CORTES) ========== */}
      {imagemHero && (
        <section
          style={{
            width: "100%",
            height: "55vh",
            backgroundColor: "#000",
            backgroundImage: `url(${imagemHero})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain", // mostra 100% da imagem sem cortar
          }}
          aria-label={titulo}
        />
      )}
      {/* ================================================ */}

      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "3rem 2rem 4rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", marginTop: "4rem", marginBottom: "2.5rem" }}>
          {titulo}
        </h1>

        <p style={{ marginBottom: "2.2rem" }}>
          {data} • {readTime}
        </p>

        {tag && (
          <span
            style={{
              padding: "0.35rem 1rem",
              border: "1px solid rgba(212,175,55,0.45)",
              borderRadius: "9999px",
              fontSize: "0.7rem",
            }}
          >
            {tag}
          </span>
        )}
      </section>

      <article
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <div className="post-box" dangerouslySetInnerHTML={{ __html: conteudoFinal }} />
      </article>
    </main>
  );
}
