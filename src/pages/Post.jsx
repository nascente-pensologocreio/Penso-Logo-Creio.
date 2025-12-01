// src/pages/Post.jsx
// Página que exibe posts da HOME e posts vindos do Firebase
// Versão universal — motor PLC v5 LTS refinado + véu de leitura

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
      const loadSinglePost = await carregarLoaderLocal();
      const local = await loadSinglePost(slug);

      if (local) {
        if (ativo)
          setPost({
            ...local,
            fullContent: local.fullContent,
          });
        return;
      }

      try {
        const db = await getFirebaseDB();
        const { doc, getDoc } = await import("firebase/firestore");

        const ref = doc(db, "publicacoes", slug);
        const snap = await getDoc(ref);

        if (snap.exists() && ativo) {
          const data = snap.data();

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
      style={{
        minHeight: "100vh",
        backgroundColor: "rgba(255,255,255,0.18)",  // NÃO ALTERADO (seu ajuste)
        color: "#EDEDED",
      }}
    >
      {/* === HERO + TÍTULO === */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "40vh",
          minHeight: "300px",
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
                filter: "brightness(0.78)",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 100%)",
              }}
            />
          </>
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
          <p
            style={{
              color: "#D4AF37",
              fontSize: "1.0rem",
              opacity: 0.85,
              marginBottom: "0.3rem",
              letterSpacing: "0.6px",
            }}
          >
            Artigo • {post.tipo || "conteúdo"}
          </p>

          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "2.50rem",
              fontWeight: 300,
              color: "#F5E3A1",
              textShadow: "0 0 12px rgba(0,0,0,0.5)",
            }}
          >
            {post.titulo}
          </h1>
        </div>
      </section>

      {/* === CORPO DO POST === */}
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
            backgroundImage: "url('/src/assets/template-read-card-home.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            borderRadius: "0.875rem",
            padding: "clamp(2rem, 5vw, 3rem)",
          }}
        >
          {/* === VÉU DE LEITURA === */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.32)", 
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          >
            {/* ====== ESTILO EXCLUSIVO PARA TÍTULOS & SUBTÍTULOS ====== */}
            <style>
              {`
                .post-headings h2,
                .post-headings h3 {
                  color: #0A0A0A !important;          /* ESCURECIDO */
                  font-family: Georgia, 'Times New Roman', serif !important, bold;
                  font-weight: 400 !important;
                  letter-spacing: 0.2px;
                  margin-top: 1.35rem;
                  margin-bottom: 0.55rem;
                  text-shadow: 0 0 1px rgba(255, 255, 255, 0.03);  /* SUTIL */
                }

                .post-headings h2 {
                  font-size: 1.38rem;
                }

                .post-headings h3 {
                  font-size: 1.22rem;
                }
              `}
            </style>

            {/* ====== TEXTO CORRIDO + HEADINGS DENTRO DA CLASSE ====== */}
            <div
              className="post-content post-headings"
              style={{
                color: "#111111",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 300,
                fontSize: "1.10rem",
                lineHeight: 1.28,
                letterSpacing: "0.03px",
                wordSpacing: "0.6px",
                textShadow: "0 0 1px rgba(255, 255, 255, 0)",
                textAlign: "justify",
              }}
              dangerouslySetInnerHTML={{ __html: conteudoFinal }}
            />
          </div>
        </div>
      </article>
    </main>
  );
}
