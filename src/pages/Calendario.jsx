// src/pages/Calendario.jsx
// Calendário 100% conectado ao Firestore
// Totalmente compatível com a estrutura PensoLogoCreio

import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Calendario() {
  const [mapa, setMapa] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const snap = await getDocs(collection(db, "publicacoes"));

        const agrupado = {};

        snap.forEach((docSnap) => {
          const pub = docSnap.data();
          if (!pub.data) return;

          const iso = pub.data.trim(); // yyyy-mm-dd
          const [ano, mes, dia] = iso.split("-");

          if (!agrupado[ano]) agrupado[ano] = {};
          if (!agrupado[ano][mes]) agrupado[ano][mes] = {};
          if (!agrupado[ano][mes][dia]) agrupado[ano][mes][dia] = [];

          agrupado[ano][mes][dia].push(pub);
        });

        setMapa(agrupado);
      } catch (err) {
        console.error("ERRO NO CALENDÁRIO:", err);
        setMapa({});
      }
    }

    carregar();
  }, []);

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  if (!mapa)
    return (
      <section className="min-h-screen flex items-center justify-center text-gray-400 text-xl">
        Carregando calendário...
      </section>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#000] text-[#EDEDED] px-8 py-20 font-['Playfair_Display']">
      <h1 className="text-center text-4xl md:text-5xl text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.5)] mb-16">
        Calendário de Postagens
      </h1>

      {Object.keys(mapa).length === 0 ? (
        <p className="text-center text-gray-400 italic">
          Nenhuma publicação encontrada no Firebase.
        </p>
      ) : (
        Object.keys(mapa)
          .sort()
          .reverse()
          .map((ano) => (
            <div key={ano} className="mb-12 border-t border-[#D4AF37]/30 pt-6">
              <h2 className="text-3xl text-[#D4AF37] mb-4">{ano}</h2>

              {Object.keys(mapa[ano])
                .sort()
                .map((mes) => (
                  <div key={mes} className="ml-6 mb-6">
                    <details className="group">
                      <summary className="cursor-pointer text-2xl text-[#EDEDED] hover:text-[#D4AF37] mb-2 transition-all">
                        {meses[parseInt(mes) - 1]}
                      </summary>

                      <div className="ml-6 mt-4 space-y-4 border-l border-[#D4AF37]/20 pl-6">
                        {Object.keys(mapa[ano][mes])
                          .sort((a, b) => b - a)
                          .map((dia) => (
                            <details key={dia} className="group">
                              <summary className="cursor-pointer text-lg text-gray-300 hover:text-[#D4AF37] transition-all">
                                {parseInt(dia)} de {meses[parseInt(mes) - 1].toLowerCase()}
                              </summary>

                              <ul className="mt-3 ml-4 space-y-2 text-base">
                                {mapa[ano][mes][dia].map((pub, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <span className="text-[#D4AF37]/80">
                                      {iconForType(pub.tipo)}
                                    </span>

                                    <span className="text-[#EDEDED] hover:text-[#D4AF37] transition-all">
                                      {pub.titulo || "(sem título)"}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ))}
                      </div>
                    </details>
                  </div>
                ))}
            </div>
          ))
      )}
    </section>
  );
}


// ------------------------------------------------------------
// Ícones editoriais — atualizado para TODOS os 7 tipos bíblicos
// e os 3 tipos da Home
// ------------------------------------------------------------
function iconForType(tipo) {
  const map = {
    // HOME
    devocional: "📖",
    "mensagem-pastoral": "🕊️",
    oracao: "🙏",

    // BÍBLIA — 7 TIPOS
    "devocional-01": "📖",
    "estudo-tematico": "📚",
    "exposicao-homiletica": "🎙",
    "mensagem-pastoral": "🕊️",
    "temas-controversos": "⚖️",
    "terminologias-chave": "🔑",

    // fallback
    default: "✍️",
  };

  return map[tipo] || map.default;
}
