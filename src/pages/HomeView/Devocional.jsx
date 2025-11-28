// src/pages/HomeView/Devocional.jsx
import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import rawFile from "../../content/home/devocional.md?raw";

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

export default function Devocional() {
  const [post, setPost] = useState({
    titulo: "",
    data: "",
    readTime: "",
    tag: "",
    imagemHero: null,
    conteudoFinal: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 80);

    const md = new MarkdownIt({ html: true, breaks: true });
    const parsed = parseFrontmatter(rawFile);
    const front = parsed.data;
    const html = md.render(parsed.content);

    setPost({
      titulo: front.titulo || "Devocional",
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

        .post-box {
          background-image: url('/Fundo-PostHome.jpeg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: 1px solid rgba(212,175,55,0.45);
          border-radius: 1rem;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 18px rgba(212,175,55,0.35), inset 0 0 12px rgba(212,175,55,0.25);
        }

        .post-box h1 { margin-top: 4rem; margin-bottom: 2rem; font-size: 2rem; color: #F5E3A1; }
        .post-box h2 { margin-top: 3rem; margin-bottom: 1.6rem; font-size: 1.65rem; color: #E5D08A; }
        .post-box h3 { margin-top: 2.5rem; margin-bottom: 1.4rem; font-size: 1.45rem; color: #DCC677; }
        .post-box h4 { margin-top: 2rem; margin-bottom: 1.2rem; font-size: 1.25rem; color: #C9B45D; }
        .post-box h5 { margin-top: 1.8rem; margin-bottom: 1rem; font-size: 1.15rem; color: #B89D4A; }
        .post-box h6 { margin-top: 1.6rem; margin-bottom: 0.8rem; font-size: 1rem; color: #A68939; }

        .post-box p { margin: 1.2rem 0; }

      `}</style>

      {imagemHero && (
        <section style={{ width: "100%", height: "55vh", overflow: "hidden" }}>
          <img
            src={imagemHero}
            alt={titulo}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.85)",
            }}
          />
        </section>
      )}

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem 4rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.9rem", marginTop: "3rem", marginBottom: "4rem" }}>{titulo}</h1>
        <p style={{ marginBottom: "2rem" }}>{data} • {readTime}</p>

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

      <article style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>
        <div className="post-box" dangerouslySetInnerHTML={{ __html: conteudoFinal }} />
      </article>
    </main>
  );
}
