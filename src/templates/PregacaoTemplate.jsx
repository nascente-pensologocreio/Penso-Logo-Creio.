// src/templates/PregacaoTemplate.jsx
import React from "react";

export default function PregacaoTemplate({
  titulo = "Sem título",
  referencia = "",
  introducao,
  pontos = [],
  conclusao,
}) {
  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Introdução */}
      {introducao && (
        <div>
          <h2 className="text-2xl text-[#D4AF37] mb-2">Introdução</h2>
          <p className="whitespace-pre-line leading-relaxed">{introducao}</p>
        </div>
      )}

      {/* Pontos principais */}
      {pontos &&
        Array.isArray(pontos) &&
        pontos.map(
          (p, i) =>
            p && (
              <div key={i} className="animate-fade-in-left delay-200">
                <h3 className="text-xl text-[#c9b86a] mb-2 font-semibold">
                  {i + 1}. {p.titulo || "Sem título"}
                </h3>
                <p className="whitespace-pre-line leading-relaxed">
                  {p.texto || ""}
                </p>
              </div>
            )
        )}

      {/* Conclusão */}
      {conclusao && (
        <div className="animate-fade-in-right delay-400">
          <h2 className="text-2xl text-[#D4AF37] mt-6 mb-2">Conclusão</h2>
          <p className="whitespace-pre-line leading-relaxed">{conclusao}</p>
        </div>
      )}
    </div>
  );
}
