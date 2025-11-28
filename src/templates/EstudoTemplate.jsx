// src/templates/EstudoTemplate.jsx
import React from "react";

/**
 * EstudoTemplate
 * Foco: conteúdo analítico e organizado em seções.
 *
 * Props:
 * - titulo?: string
 * - subtitulo?: string
 * - secoes?: Array<{ titulo?: string, conteudo?: string, itens?: string[] }>
 *   - Observação: cada seção pode ter:
 *     - titulo: título da seção
 *     - conteudo: texto em parágrafos (aceita quebra de linha via \n)
 *     - itens: lista opcional (bullets) para pontos-chave
 */
export default function EstudoTemplate({
  titulo = "Sem título",
  subtitulo,
  secoes = [],
}) {
  const hasSecoes =
    Array.isArray(secoes) && secoes.filter(Boolean).length > 0;

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Subtítulo analítico (opcional) */}
      {subtitulo && (
        <p className="text-base md:text-lg italic text-[#cfcfcf] animate-fade-in-down">
          {subtitulo}
        </p>
      )}

      {/* Seções do estudo */}
      {hasSecoes ? (
        secoes.map((sec, idx) => {
          if (!sec) return null;

          const { titulo: tSec, conteudo, itens } = sec;

          return (
            <section key={idx} className="space-y-4">
              {tSec && (
                <h3 className="text-xl md:text-2xl font-semibold text-[#D4AF37] animate-fade-in-left">
                  {tSec}
                </h3>
              )}

              {conteudo && (
                <p className="whitespace-pre-line leading-relaxed text-[#EDEDED]">
                  {conteudo}
                </p>
              )}

              {Array.isArray(itens) && itens.length > 0 && (
                <ul className="list-disc ml-6 space-y-2 animate-fade-in-up">
                  {itens.map((li, i) => (
                    <li key={i} className="text-[#EDEDED] leading-relaxed">
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })
      ) : (
        <p className="text-[#EDEDED] italic">
          Nenhuma seção disponível para este estudo.
        </p>
      )}
    </div>
  );
}
