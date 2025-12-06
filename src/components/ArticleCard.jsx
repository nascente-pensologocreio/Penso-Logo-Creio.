// src/components/ArticleCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export const ArticleCard = ({ post, delay = 0.1 }) => {
  if (!post || typeof post !== "object") return null;

  // ======== DADOS =========
  const titulo = post.titulo || "(sem título)";
  const slug = post.slug || "";
  const data = post.data || "";
  const readTime = post.readTime || "";
  const imagem = post.imagem || post.imageUrl || null;
  const conteudo = post.conteudo || post.content || "";

  // ======== EXCERPT ========
  const gerarExcerpt = (texto) => {
    if (!texto) return "";
    const limpo = texto.replace(/[#>*_`~\-]/g, "").trim();
    return limpo.substring(0, 200) + "...";
  };

  const excerptFinal = gerarExcerpt(conteudo);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <style>{`
        .article-card {
          width: 100%;
          max-width: 900px;
          margin: 0 auto 3rem;
          border-radius: 1rem !important;
          backdrop-filter: blur(20px);
          background: rgba(0, 0, 0, 0.28);
          border: 1px solid rgba(212,175,55,0.28);
          animation: slideInUp 0.8s ease-out both;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: all 0.35s ease-out;
        }

        .article-card:hover {
          box-shadow: 0 0 22px rgba(212,175,55,0.35);
          transform: translateY(-3px);
        }

        .article-card img {
          width: 100%;
          display: block;
          object-fit: cover;
        }

        /* ===== TAMANHO PADRÃO PARA TODOS OS CARDS ===== */
        .image-top {
          height: 420px;
        }

        .article-content {
          padding: 2.2rem;
        }

        .article-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          color: #D4AF37;
          margin-bottom: 1rem;
        }

        .article-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          color: #aaa;
          margin-bottom: 1rem;
        }

        .article-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #e5e5e5;
          text-align: justify;
        }

        .article-footer {
          margin-top: 1.4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(212,175,55,0.25);
          padding-top: 1rem;
        }

        .article-button {
          font-size: 0.85rem;
          padding: 0.55rem 1.4rem;
          border-radius: 0.45rem;
          background: transparent;
          color: #D4AF37;
          border: 1px solid rgba(212,175,55,0.5);
          transition: all 0.3s ease;
        }

        .article-button:hover {
          background: rgba(212,175,55,0.15);
          border-color: rgba(212,175,55,0.9);
          color: #fff;
        }
      `}</style>

      <article
        className="article-card"
        style={{ animationDelay: `${delay}s` }}
        onMouseMove={handleMouseMove}
      >
        {imagem && (
          <img
            src={imagem}
            alt={titulo}
            className="image-top"
          />
        )}

        <div className="article-content">
          <h2 className="article-title">{titulo}</h2>

          <div className="article-meta">
            <span>{data}</span>
            <span style={{ color: "#D4AF37" }}>{readTime}</span>
          </div>

          <p className="article-text">{excerptFinal}</p>

          <div className="article-footer">
            <Link
              to={`/artigo/${slug}`}
              className="article-button"
              style={{ textDecoration: "none" }}
            >
              Ler Mais
            </Link>

            <span style={{ fontSize: "0.8rem", color: "#D4AF37" }}>
              {readTime}
            </span>
          </div>
        </div>
      </article>
    </>
  );
};
