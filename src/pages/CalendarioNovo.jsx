// src/pages/CalendarioNovo.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeIndex from "../data/home-index.json";

export default function CalendarioNovo() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState({});
  const [anoAberto, setAnoAberto] = useState(null);
  const [mesAberto, setMesAberto] = useState({});

  useEffect(() => {
    // Carregar apenas posts da HOME com data válida
    const meses = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
    ];

    const agrupado = {};

    // Processar todos os tipos (devocional, mensagem-pastoral, oracao)
    homeIndex.forEach((post) => {
      if (!post.data || !post.titulo) return;

      const dataObj = new Date(post.data);
      if (isNaN(dataObj.getTime())) return;

      const ano = dataObj.getFullYear();
      const mes = meses[dataObj.getMonth()];
      const dia = dataObj.getDate();
      const diaFormatado = `${dia} de ${mes}`;

      if (!agrupado[ano]) agrupado[ano] = {};
      if (!agrupado[ano][mes]) agrupado[ano][mes] = {};
      if (!agrupado[ano][mes][diaFormatado]) agrupado[ano][mes][diaFormatado] = [];

      agrupado[ano][mes][diaFormatado].push(post);
    });

    // Ordenar
    const ordenado = Object.keys(agrupado)
      .sort((a, b) => b - a)
      .reduce((acc, ano) => {
        const mesesObj = agrupado[ano];
        const mesesOrdenados = Object.keys(mesesObj).sort(
          (a, b) => meses.indexOf(b) - meses.indexOf(a)
        );

        acc[ano] = mesesOrdenados.reduce((mesAcc, mes) => {
          const diasObj = mesesObj[mes];
          const diasOrdenados = Object.keys(diasObj)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .reduce((diaAcc, dia) => {
              diaAcc[dia] = diasObj[dia].sort(
                (p1, p2) => new Date(p2.data) - new Date(p1.data)
              );
              return diaAcc;
            }, {});
          mesAcc[mes] = diasOrdenados;
          return mesAcc;
        }, {});
        return acc;
      }, {});

    setPosts(ordenado);
  }, []);

  const toggleAno = (ano) => setAnoAberto(anoAberto === ano ? null : ano);
  const toggleMes = (ano, mes) =>
    setMesAberto((prev) => ({ ...prev, [ano]: prev[ano] === mes ? null : mes }));

  return (
    <section className="relative z-30 container mx-auto px-6 mt-48 mb-48 text-white">
      <h2 className="text-6xl text-center font-bold mb-16" style={{ color: "#D4AF37" }}>
        Calendário de Postagens
      </h2>

      <div className="space-y-6 max-w-4xl mx-auto">
        {Object.keys(posts).length === 0 ? (
          <p className="text-center text-gray-400">Carregando...</p>
        ) : (
          Object.entries(posts).map(([ano, meses]) => (
            <div key={ano} className="border border-[#D4AF37]/40 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAno(ano)}
                className="w-full px-6 py-4 bg-black/60 hover:bg-[#D4AF37]/10 transition-all flex justify-between items-center"
              >
                <span className="text-2xl font-bold text-[#D4AF37]">{ano}</span>
                <span className="text-[#D4AF37]">{anoAberto === ano ? "▼" : "▶"}</span>
              </button>

              {anoAberto === ano && (
                <div className="p-4 bg-black/40 space-y-4">
                  {Object.entries(meses).map(([mes, dias]) => (
                    <div key={mes}>
                      <button
                        onClick={() => toggleMes(ano, mes)}
                        className="w-full text-left px-4 py-2 hover:bg-[#D4AF37]/10 transition-all flex justify-between"
                      >
                        <span className="text-lg capitalize text-white">{mes}</span>
                        <span className="text-[#D4AF37]">{mesAberto[ano] === mes ? "▼" : "▶"}</span>
                      </button>

                      {mesAberto[ano] === mes && (
                        <div className="pl-8 pt-2 space-y-3">
                          {Object.entries(dias).map(([dia, lista]) => (
                            <div key={dia}>
                              <p className="text-[#D4AF37] font-semibold mb-2">{dia}</p>
                              <ul className="space-y-2 pl-4">
                                {lista.map((post, idx) => (
                                  <li key={idx} className="list-disc text-white/90">
                                    <button
                                      onClick={() => navigate(`/artigo/${post.slug}`, { state: { from: 'calendario' } })}
                                      className="hover:text-[#D4AF37] transition-colors"
                                    >
                                      <span className="font-semibold">{post.tipo} – </span>
                                      {post.titulo}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
