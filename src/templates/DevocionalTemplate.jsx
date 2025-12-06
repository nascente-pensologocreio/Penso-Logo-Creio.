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

      {/* Conteúdo principal */}
      <section className="text-lg leading-relaxed prose prose-invert max-w-none">
        {temHtml ? (
          <div
            dangerouslySetInnerHTML={{ __html: conteudo }}
          />
        ) : temTexto ? (
          <p className="whitespace-pre-line">{texto}</p>
        ) : (
          <p>Conteúdo não disponível.</p>
        )}
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
