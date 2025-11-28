// src/pages/HomeView/MensagemPastoral.jsx
import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import rawFile from "../../content/home/mensagem-pastoral.md?raw";

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

export default function MensagemPastoral() {
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
    const html = md.render(parsed.content);
    const front = parsed.data;

    setPost({
      titulo: front.titulo || "Mensagem Pastoral",
      data: front.data || "",
      readTime: front.readTime || "",
      tag: front.tag || "",
      imagemHero: front.imageUrl || null,
      conteudoFinal: html,
    });
  }, []);

  const { titulo, data, readTime, tag, imagemHero, conteudoFinal } = post;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#010b0a", color: "#ededed" }}>
      <style>{`
        .post-box {
          background-image: url('/Fundo-PostHome.jpeg');
          background-size: cover;
          padding: 2.5rem;
          border: 1px solid rgba(212,175,55,0.45);
          border-radius: 1rem;
        }
      `}</style>

      {imagemHero && (
        <section style={{ width: "100%", height: "55vh", overflow: "hidden" }}>
          <img src={imagemHero} alt={titulo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </section>
      )}

      <section style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center", padding: "3rem 2rem" }}>
        <h1 style={{ fontSize: "1.9rem", marginTop: "3rem", marginBottom: "4rem" }}>{titulo}</h1>
        <p>{data} • {readTime}</p>
        {tag && <span style={{ border: "1px solid rgba(212,175,55,0.45)", padding: "0.3rem 1rem" }}>{tag}</span>}
      </section>

      <article style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>
        <div className="post-box" dangerouslySetInnerHTML={{ __html: conteudoFinal }} />
      </article>
    </main>
  );
}
