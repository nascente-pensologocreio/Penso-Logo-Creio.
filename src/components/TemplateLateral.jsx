import React from "react";

export default function TemplateLateral({ titulo, subtitulo, imagem, children }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-black text-[#E8E8E8] leading-relaxed pt-32">
      {/* TÍTULO E SUBTÍTULO */}
      <header className="px-8 md:px-12 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] mb-2">
          {titulo}
        </h1>
        {subtitulo && (
          <p className="italic text-lg text-[#cfcfcf]">{subtitulo}</p>
        )}
      </header>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 px-6 md:px-12 py-8">
        {/* COLUNA ESQUERDA — TEXTO */}
        <article className="flex-1 space-y-8 max-w-[780px]">
          {children}
        </article>

        {/* COLUNA DIREITA — IMAGEM / COMPLEMENTOS */}
        <aside className="w-full md:w-[40%] flex justify-center items-start md:mt-4 relative">
          <div className="relative w-full md:w-[420px] rounded-2xl overflow-hidden shadow-[0_0_18px_rgba(212,175,55,0.3)] border border-[#D4AF37]/30">
            <img
              src={imagem}
              alt={`Imagem ilustrativa de ${titulo}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
          </div>
        </aside>
      </main>

      {/* RESPIRO */}
      <div className="h-32 md:h-40"></div>
    </div>
  );
}
