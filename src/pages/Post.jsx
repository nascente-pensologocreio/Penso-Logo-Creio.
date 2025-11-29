// src/pages/Post.jsx
// Página que exibe posts da HOME e posts vindos do Firebase
// Versão universal — motor PLC v5 LTS

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/post-page.css";

import { parseFrontmatter, markdownToHtml } from "../utils/markdownProcessor.js";

// Firebase LAZY
import { getFirebaseDB } from "../firebase/config";

// Loader-local LAZY
async function carregarLoaderLocal() {
  const { loadSinglePost } = await import("../utils/loadSinglePost.js");
  return loadSinglePost;
}

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      // 1) LOCAL (HOME)
      const loadSinglePost = await carregarLoaderLocal();
      const local = await loadSinglePost(slug);

      if (local) {
        if (ativo)
          setPost({
            ...local,
            fullContent: local.fullContent, // já vem convertido
          });
        return;
      }

      // 2) FIREBASE
      try {
        const db = await getFirebaseDB();
        const { doc, getDoc } = await import("firebase/firestore");

        const ref = doc(db, "publicacoes", slug);
        const snap = await getDoc(ref);

        if (snap.exists() && ativo) {
          const data = snap.data();

          // unificação — processar markdown também para Firestore
          const fullHtml =
            data.texto && typeof data.texto === "string"
              ? markdownToHtml(data.texto)
              : "";

          setPost({
            ...data,
            titulo: data.titulo || "(sem título)",
            fullContent: fullHtml,
            imageUrl: data.imageUrl || null,
          });

          return;
        }
      } catch (err) {
        console.error("Erro Firebase:", err);
      }

      if (ativo) setPost(null);
    }

    carregar();
    return () => (ativo = false);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 text-xl italic">
        Postagem não encontrada.
      </div>
    );
  }

  const imagemHero = post.imageUrl || post.imagem || null;
  const conteudoFinal = post.fullContent || "";

  return (
    <main
      className="post-page-main"
      style={{ minHeight: "100vh", backgroundColor: "#010b0a", color: "#EDEDED" }}
    >
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "60vh",
          maxHeight: "520px",
          minHeight: "420px",
          overflow: "hidden",
        }}
      >
        {imagemHero && (
          <>
            <img
              src={imagemHero}
              alt={post.titulo}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.55) 100%)",
              }}
            />
          </>
        )}
      </section>

      <section
        style={{
          width: "100%",
          maxWidth: "880px",
          margin: "0 auto",
          padding: "3rem 2rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 600,
            color: "#F5E3A1",
          }}
        >
          {post.titulo}
        </h1>

        <p style={{ color: "#A8A8A8", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
          {(post.data || "")} • {(post.readTime || "")}
        </p>

        {Array.isArray(post.tags) &&
          post.tags.length > 0 &&
          post.tags.map((t, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                padding: "0.35rem 1rem",
                border: "1px solid rgba(212,175,55,0.4)",
                borderRadius: "9999px",
                fontSize: "0.65rem",
                color: "#D4AF37",
                margin: "0 4px",
              }}
            >
              {t}
            </span>
          ))}
      </section>

      <article
        style={{
          width: "100%",
          maxWidth: "880px",
          margin: "0 auto",
          padding: "2.5rem 2rem 4.5rem",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.32)",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            borderRadius: "0.875rem",
            padding: "clamp(2rem, 5vw, 3rem)",
          }}
        >
          <div
            style={{
              color: "#E2E2E2",
              fontSize: "1.08rem",
              lineHeight: 1.8,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: conteudoFinal }}
          />
        </div>
      </article>
    </main>
  );
}
