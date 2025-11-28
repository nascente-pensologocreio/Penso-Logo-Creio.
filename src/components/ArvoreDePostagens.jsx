// src/components/ArvoreDePostagens.jsx
import React, { useEffect, useState } from "react";

async function getPostsPorCalendario() {
  const arquivos = import.meta.glob("../content/**/*.js");
  const modulos = await Promise.all(
    Object.entries(arquivos).map(async ([, carregar]) => {
      const modulo = await carregar();
      return modulo.default || modulo;
    })
  );

  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ];

  const agrupado = {};

  modulos.forEach((post) => {
    if (!post || !post.data || !post.titulo) return;
    const dataObj = new Date(post.data);
    if (Number.isNaN(dataObj.getTime())) return;

    const ano = dataObj.getFullYear();
    const mes = meses[dataObj.getMonth()];
    const dia = dataObj.getDate();
    const diaFormatado = `${dia} de ${mes}`;

    if (!agrupado[ano]) agrupado[ano] = {};
    if (!agrupado[ano][mes]) agrupado[ano][mes] = {};
    if (!agrupado[ano][mes][diaFormatado]) agrupado[ano][mes][diaFormatado] = [];

    agrupado[ano][mes][diaFormatado].push(post);
  });

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

  return ordenado;
}

function ArvoreDePostagens() {
  const [posts, setPosts] = useState({});
  const [anoAberto, setAnoAberto] = useState(null);
  const [mesAberto, setMesAberto] = useState({});
  const [diaAberto, setDiaAberto] = useState({});

  useEffect(() => {
    const carregar = async () => {
      const dados = await getPostsPorCalendario();
      setPosts(dados);
    };
    carregar();
  }, []);

  const toggleAno = (ano) => setAnoAberto(anoAberto === ano ? null : ano);
  const toggleMes = (ano, mes) =>
    setMesAberto((prev) => ({ ...prev, [ano]: prev[ano] === mes ? null : mes }));
  const toggleDia = (ano, mes, dia) =>
    setDiaAberto((prev) => ({
      ...prev,
      [`${ano}-${mes}`]: prev[`${ano}-${mes}`] === dia ? null : dia,
    }));

  return (
    <section
      className="relative z-30 container mx-auto px-6 mt-48 mb-48 text-white"
      style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.6px" }}
    >
      <div
        className="w-full h-[1px] mb-12"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.8), transparent)",
          boxShadow: "0 0 15px rgba(212,175,55,0.5)",
        }}
      />

      <h2
        className="text-5xl md:text-6xl text-center font-bold mb-16 animate-fadeIn"
        style={{
          color: "#D4AF37",
          textShadow:
            "0 0 25px rgba(212,175,55,0.9), 0 0 10px rgba(255,255,255,0.3)",
        }}
      >
        Calendário de Postagens
      </h2>

      <div
        className="rounded-3xl border border-[#D4AF37]/50 bg-gradient-to-b from-black/80 via-[#0a0a0a]/90 to-black/80 shadow-2xl backdrop-blur-md p-8"
        style={{
          boxShadow:
            "0 0 25px rgba(212,175,55,0.25), inset 0 0 10px rgba(212,175,55,0.12)",
        }}
      >
        {Object.keys(posts).length === 0 ? (
          <p className="text-center text-gray-400 animate-pulse">
            Carregando postagens...
          </p>
        ) : (
          <div className="space-y-8 max-w-5xl mx-auto">
            {Object.entries(posts).map(([ano, meses]) => (
              <div
                key={ano}
                className="rounded-xl border border-[#D4AF37]/60 bg-gradient-to-r from-black via-[#101010] to-black overflow-hidden transition-all duration-500"
              >
                <button
                  onClick={() => toggleAno(ano)}
                  className="w-full px-6 py-5 flex justify-between items-center categoria-button"
                >
                  <span
                    className="capitalize font-bold tracking-wide text-categoria-titulo"
                    style={{ fontSize: "1.25rem" }}
                  >
                    {ano}
                  </span>
                  <span
                    className="text-[#D4AF37] text-2xl transition-transform duration-300"
                    style={{
                      transform:
                        anoAberto === ano ? "rotate(180deg)" : "rotate(0)",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {anoAberto === ano && (
                  <div className="px-6 pb-6 space-y-6 animate-fadeIn">
                    {Object.entries(meses).map(([mes, dias]) => (
                      <div key={mes}>
                        <button
                          onClick={() => toggleMes(ano, mes)}
                          className="w-full text-left py-3 pl-4 flex justify-between items-center categoria-button"
                        >
                          <span
                            className="capitalize font-semibold text-categoria-titulo"
                            style={{ fontSize: "1.1rem" }}
                          >
                            {mes}
                          </span>
                          <span
                            className="text-[#D4AF37] text-lg transition-transform duration-300"
                            style={{
                              transform:
                                mesAberto[ano] === mes
                                  ? "rotate(180deg)"
                                  : "rotate(0)",
                            }}
                          >
                            ▼
                          </span>
                        </button>

                        {mesAberto[ano] === mes && (
                          <div className="pl-8 pt-2 pb-4">
                            {Object.entries(dias).map(([dia, lista]) => {
                              const chave = `${ano}-${mes}`;
                              return (
                                <div key={dia} className="mb-4">
                                  <button
                                    onClick={() => toggleDia(ano, mes, dia)}
                                    className="w-full text-left py-2 pl-2 flex justify-between items-center categoria-button"
                                  >
                                    <span
                                      className="font-medium text-categoria-titulo"
                                      style={{ fontSize: "1rem" }}
                                    >
                                      {dia}
                                    </span>
                                    <span
                                      className="text-[#D4AF37] text-base transition-transform duration-300"
                                      style={{
                                        transform:
                                          diaAberto[chave] === dia
                                            ? "rotate(180deg)"
                                            : "rotate(0)",
                                      }}
                                    >
                                      ▼
                                    </span>
                                  </button>

                                  {diaAberto[chave] === dia && (
                                    <ul className="mt-2 pl-6 border-l-2 border-[#D4AF37]/50 space-y-2">
                                      {lista.map((post) => (
                                        <li key={post.id} className="list-disc">
                                          <a
                                            href={`#post-${post.id}`}
                                            className="text-lg block hover:translate-x-2 transition-transform duration-300 link-post"
                                          >
                                            <span className="font-semibold text-[#D4AF37]">
                                              {post.categoria
                                                ? `${post.categoria} – `
                                                : ""}
                                            </span>
                                            {post.titulo}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className="w-full h-[120px] mt-12"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.8), transparent)",
          boxShadow: "0 0 15px rgba(212,175,55,0.45)",
        }}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }

        .categoria-button {
          background-color: rgba(0, 0, 0, 0.85);
          transition: background-color 0.25s ease;
        }
        .categoria-button:hover {
          background-color: rgba(212,175,55,0.08);
        }

        .text-categoria-titulo {
          color: #FFFFFF;
          text-shadow: 0 0 8px rgba(255,255,255,0.8), 0 0 18px rgba(212,175,55,0.45);
          transition: all 0.25s ease;
        }
        .categoria-button:hover .text-categoria-titulo {
          color: #D4AF37;
          text-shadow: 0 0 12px #D4AF37, 0 0 30px rgba(212,175,55,0.8);
        }

        .link-post {
          color: #EDEDED;
          text-shadow: 0 0 6px rgba(255,255,255,0.08), 0 0 3px rgba(212,175,55,0.18);
        }
        .link-post:hover {
          color: #D4AF37;
          text-shadow: 0 0 10px #D4AF37, 0 0 6px rgba(255,255,255,0.2);
        }
      `}</style>
    </section>
  );
}

export default ArvoreDePostagens;
