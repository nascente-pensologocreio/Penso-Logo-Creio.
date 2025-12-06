// src/components/PostGrid.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * PostGrid
 * - Recebe uma lista de postagens e exibe em grid responsivo
 * - Cada card tem atmosfera premium, hover e animações escalonadas
 *
 * Props:
 * - posts: Array<{ slug, titulo, subtitulo?, tipo?, data? }>
 */
export default function PostGrid({ posts = [] }) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-400 italic">
        Nenhuma postagem disponível.
      </p>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <Link
          key={post.slug || i}
          to={`/post/${post.slug}`}
          className={`group relative rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-b from-black/70 via-[#0a0a0a]/80 to-black/90 shadow-lg hover-lift transition-smooth animate-fade-in-up ${delayClass(i)}`}
        >
          {/* Atmosfera */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-smooth gradient-gold" />

          {/* Conteúdo do card */}
          <div className="relative z-10 p-6 flex flex-col h-full">
            <h3 className="text-xl font-['Playfair_Display'] text-[#D4AF37] mb-2 group-hover:text-glow transition-smooth">
              {post.titulo}
            </h3>

            {post.subtitulo && (
              <p className="text-sm italic text-gray-300 mb-4">
                {post.subtitulo}
              </p>
            )}

            {post.tipo && (
              <span className="text-xs uppercase tracking-wide text-[#cfcfcf] mb-2">
                {iconeTipo(post.tipo)} {post.tipo}
              </span>
            )}

            {post.data && (
              <span className="text-xs text-gray-400 mt-auto">
                {formatarData(post.data)}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

/* Helpers */

function iconeTipo(tipo) {
  const map = {
    devocional: "📖",
    oracao: "🙏",
    pregacao: "🎙",
    homilia_informal: "🕯",
    homilia_tecnica: "🎙",
    estudo: "📚",
    ponto_controverso: "⚖️",
    terminologia_chave: "🔑",
  };
  return map[tipo] || "✍️";
}

function formatarData(dataStr) {
  try {
    const d = new Date(dataStr);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dataStr;
  }
}

/* Função para aplicar delays escalonados */
function delayClass(index) {
  const delays = ["delay-0", "delay-100", "delay-200", "delay-300", "delay-400", "delay-500"];
  return delays[index % delays.length];
}
