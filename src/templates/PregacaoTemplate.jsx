// src/templates/PregacaoTemplate.jsx
import React from "react";

export default function PregacaoTemplate({
  titulo = "Sem título",
  referencia = "",
  introducao = "",
  pontos = [],
  conclusao = "",
  autor = "",
}) {
  const temIntroducao = Boolean(introducao && introducao.trim());
  const temPontosValidos =
    Array.isArray(pontos) && pontos.some((p) => p && (p.titulo || p.texto));
  const temConclusao = Boolean(conclusao && conclusao.trim());
  const temReferencia = Boolean(referencia && referencia.trim());

  return (
    <div className="pregacao-container max-w-3xl mx-auto px-6 py-8 space-y-10">
      {/* Título e referência */}
      <header className="mb-4">
        <h1 className="text-4xl font-playfair mb-2 text-[#D4AF37]">
          {titulo}
        </h1>

        {temReferencia && (
          <p className="text-lg text-gray-400">
            <strong>Referência: </strong>
            {referencia}
          </p>
        )}
      </header>

      {/* Introdução */}
      {temIntroducao && (
        <section className="mb-8 animate-fade-in-up">
          <h2 className="text-2xl font-playfair mb-4 text-[#D4AF37]">
            Introdução
          </h2>
          <div className="prose prose-invert max-w-none whitespace-pre-line leading-relaxed">
            {introducao}
          </div>
        </section>
      )}

      {/* Desenvolvimento – pontos principais */}
      {temPontosValidos && (
        <section className="mb-8">
          <h2 className="text-2xl font-playfair mb-6 text-[#D4AF37]">
            Desenvolvimento
          </h2>

          {pontos.map(
            (ponto, idx) =>
              ponto &&
              (ponto.titulo || ponto.texto) && (
                <article
                  key={idx}
                  className="mb-6 pl-6 border-l-4 border-[#70af1e] animate-fade-in-left"
                  style={{ animationDelay: `${0.1 * idx}s` }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-[#70af1e]">
                    {idx + 1}. {ponto.titulo || "Sem título"}
                  </h3>

                  <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-line leading-relaxed">
                    {ponto.texto || ""}
                  </div>
                </article>
              )
          )}
        </section>
      )}

      {/* Conclusão */}
      {temConclusao && (
        <section
          className="mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-playfair mb-4 text-[#D4AF37]">
            Conclusão
          </h2>

          <div className="prose prose-invert max-w-none whitespace-pre-line leading-relaxed">
            {conclusao}
          </div>
        </section>
      )}

      {/* Rodapé com autor */}
      {(autor || temReferencia) && (
        <footer className="mt-12 border-t border-[#D4AF37] pt-6 text-right">
          {autor && (
            <p className="italic text-gray-400">
              {autor}
            </p>
          )}
          {temReferencia && (
            <p className="text-sm text-gray-500 mt-1">{referencia}</p>
          )}
        </footer>
      )}
    </div>
  );
}
