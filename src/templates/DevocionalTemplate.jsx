// src/templates/DevocionalTemplate.jsx
import React from "react";

export default function DevocionalTemplate({
  titulo = "Sem título",
  subtitulo,
  versiculo,
  conteudo,      // HTML vindo dos loaders (preferencial)
  texto = "",    // fallback em texto puro, se não houver HTML
  autor,
  data,
  imageUrl,
}) {
  const temHtml = typeof conteudo === "string" && conteudo.trim().length > 0;
  const temTexto = typeof texto === "string" && texto.trim().length > 0;

  return (
    <article className="space-y-8 animate-fade-in-up">
      {/* Cabeçalho */}
      <header className="space-y-3">
        {imageUrl && (
          <div className="overflow-hidden rounded-lg mb-4">
            <img
              src={imageUrl}
              alt={titulo}
              className="w-full max-h-[360px] object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-playfair text-[#D4AF37]">
          {titulo}
        </h1>

        {subtitulo && (
          <p className="text-lg text-gray-300">
            {subtitulo}
          </p>
        )}

        {versiculo && (
          <blockquote className="border-l-4 border-[#D4AF37] pl-4 italic text-gray-200">
            {versiculo}
          </blockquote>
        )}

        {data && (
          <p className="text-sm text-gray-400">
            {data instanceof Date
              ? data.toLocaleDateString("pt-BR")
              : data}
          </p>
        )}
      </header>

      {/* FOLHA EXCLUSIVA PARA DEVOCIONAL DIÁRIA */}
      <section className="flex justify-center">
        <div
          style={{
            maxWidth: "1100px",
            width: "100%",
            backgroundImage:
              "url('/assets/template-read-card-home.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "0.875rem",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            padding: "clamp(2rem, 4vw, 3rem)",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "#0a0a0a",
            textAlign: "justify",
          }}
        >
          {temHtml ? (
            <div
              style={{ 
                maxWidth: "none",
                width: "100%",
                margin: "0 auto"
              }}
              dangerouslySetInnerHTML={{ __html: conteudo }}
            />
          ) : temTexto ? (
            <p style={{ whiteSpace: "pre-line" }}>{texto}</p>
          ) : (
            <p>Conteúdo não disponível.</p>
          )}
        </div>
      </section>

      {/* Autor */}
      {autor && (
        <footer className="text-right text-[#D4AF37] italic text-base animate-fade-in-right delay-400">
          — {autor}
        </footer>
      )}
    </article>
  );
}