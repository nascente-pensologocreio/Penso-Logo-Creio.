// src/pages/DevocionalDiaria.jsx
import React, { useEffect, useMemo, useState } from "react";
import EditorialLayout from "../layouts/EditorialLayout.jsx";
import { loadDevocionaisHome } from "../utils/loadDevocionaisHome.js";
import DevocionalTemplate from "../templates/DevocionalTemplate.jsx";
import CalendarioMensal from "../components/CalendarioMensal.jsx";

import "../styles/editorial-grid.css";
import "../styles/editorial-devocional-diaria.css";

function formatKey(date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function DevocionalDiaria() {
  const [blocos, setBlocos] = useState([]); // [{ chave, data, itens: Post[] }]
  const [estado, setEstado] = useState("carregando"); // carregando | ok | vazio | erro
  const [diaSelecionadoKey, setDiaSelecionadoKey] = useState(null);
  const [slugSelecionado, setSlugSelecionado] = useState(null);

  // Legenda fixa pela posição dos cards do dia
  const labelPorPosicao = ["DEVOCIONAL", "MENSAGEM PASTORAL", "ORAÇÃO"];

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      try {
        setEstado("carregando");

        // Traz TODOS os conteúdos da home (devocional, mensagem-pastoral, oracao)
        const todos = await loadDevocionaisHome();

        if (cancelado) return;

        const filtrados = (todos || []).filter((post) =>
          ["devocional", "mensagem-pastoral", "oracao"].includes(
            (post.tipo || "").toLowerCase()
          )
        );

        if (!filtrados.length) {
          setBlocos([]);
          setEstado("vazio");
          return;
        }

        // Agrupa por data (YYYY-MM-DD)
        const mapa = new Map();

        for (const post of filtrados) {
          const data = post.data instanceof Date ? post.data : null;
          if (!data) continue; // ignora posts sem data válida

          const chave = formatKey(data);

          if (!mapa.has(chave)) {
            mapa.set(chave, {
              chave,
              data,
              itens: [],
            });
          }

          mapa.get(chave).itens.push(post);
        }

        let blocosArray = Array.from(mapa.values());

        // Ordena do mais recente para o mais antigo
        blocosArray.sort((a, b) => b.data - a.data);

        if (!blocosArray.length) {
          setBlocos([]);
          setEstado("vazio");
          return;
        }

        setBlocos(blocosArray);
        setDiaSelecionadoKey(blocosArray[0].chave);

        // post inicial selecionado = primeiro do dia mais recente
        const primeiroPost = blocosArray[0].itens[0];
        setSlugSelecionado(primeiroPost?.slug || null);

        setEstado("ok");
      } catch (err) {
        console.error("Erro ao carregar histórico de devocionais da Home:", err);
        if (!cancelado) {
          setBlocos([]);
          setEstado("erro");
        }
      }
    }

    carregar();

    return () => {
      cancelado = true;
    };
  }, []);

  const blocoSelecionado = useMemo(
    () => blocos.find((b) => b.chave === diaSelecionadoKey) || null,
    [blocos, diaSelecionadoKey]
  );

  const postsDoDia = blocoSelecionado?.itens || [];

  // Garante que sempre haja um slug selecionado válido para o dia atual
  useEffect(() => {
    if (!postsDoDia.length) {
      setSlugSelecionado(null);
      return;
    }
    const existe = postsDoDia.some((p) => p.slug === slugSelecionado);
    if (!existe) {
      setSlugSelecionado(postsDoDia[0].slug);
    }
  }, [postsDoDia, slugSelecionado]);

  const selecionado =
    postsDoDia.find((p) => p.slug === slugSelecionado) || null;

  const diasComConteudo = useMemo(
    () => blocos.map((b) => b.chave),
    [blocos]
  );

  return (
    <EditorialLayout titulo="Devocional Diária">
      {/* Calendário mensal acima do grid */}
      <div className="flex justify-center mb-6">
        <CalendarioMensal
          diasComConteudo={diasComConteudo}
          onSelectDia={(data, chave) => {
            setDiaSelecionadoKey(chave);
          }}
        />
      </div>

      <div className="devocional-diaria-grid">
        {/* COLUNA ESQUERDA: LISTA DE DEVOCIONAIS DO DIA */}
        <aside className="devocional-diaria-lista">
          <h2 className="devocional-diaria-lista-titulo">
            Arquivo de Devocionais
          </h2>

          {estado === "carregando" && (
            <div className="devocional-diaria-feedback">
              Carregando devocionais...
            </div>
          )}

          {estado === "erro" && (
            <div className="devocional-diaria-feedback erro">
              Ocorreu um erro ao carregar os devocionais.
            </div>
          )}

          {estado === "vazio" && (
            <div className="devocional-diaria-feedback vazio">
              Ainda não há devocionais arquivados.
            </div>
          )}

          {estado === "ok" && !postsDoDia.length && (
            <div className="devocional-diaria-feedback vazio">
              Não há devocionais para a data selecionada.
            </div>
          )}

          {estado === "ok" && postsDoDia.length > 0 && (
            <ul className="devocional-diaria-lista-itens">
              {postsDoDia.map((post, index) => (
                <li key={post.slug}>
                  <button
                    type="button"
                    className={
                      "devocional-diaria-item" +
                      (post.slug === slugSelecionado
                        ? " devocional-diaria-item--ativo"
                        : "")
                    }
                    onClick={() => setSlugSelecionado(post.slug)}
                  >
                    {/* “Coluna” informativa do tipo (fixa por posição) */}
                    <span className="devocional-diaria-item-tipo">
                      {labelPorPosicao[index] || "CONTEÚDO"}
                    </span>

                    {/* Conteúdo do card: título + data */}
                    <span className="devocional-diaria-item-conteudo">
                      <span className="devocional-diaria-item-titulo">
                        {post.titulo || "Devocional sem título"}
                      </span>
                      {post.data && (
                        <span className="devocional-diaria-item-data">
                          {post.data.toLocaleDateString("pt-BR")}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* COLUNA CENTRAL: LEITURA DO DEVOCIONAL/MENSAGEM/ORAÇÃO */}
        <main className="devocional-diaria-leitura">
          {estado === "carregando" && (
            <div className="devocional-diaria-feedback">
              Carregando devocional selecionado...
            </div>
          )}

          {estado === "erro" && (
            <div className="devocional-diaria-feedback erro">
              Não foi possível exibir o devocional selecionado.
            </div>
          )}

          {estado === "vazio" && (
            <div className="devocional-diaria-feedback vazio">
              Quando você começar a arquivar devocionais na Home, eles aparecerão aqui.
            </div>
          )}

          {estado === "ok" && !selecionado && (
            <div className="devocional-diaria-feedback vazio">
              Selecione um conteúdo no painel à esquerda.
            </div>
          )}

          {estado === "ok" && selecionado && (
            <div className="devocional-diaria-card fadeIn">
              <DevocionalTemplate
                titulo={selecionado.titulo}
                subtitulo={selecionado.subtitulo}
                versiculo={selecionado.referencia}
                conteudo={selecionado.html}
                autor={selecionado.autor}
                data={selecionado.dataOriginal || selecionado.data}
                imageUrl={selecionado.imageUrl}
              />
            </div>
          )}
        </main>
      </div>
    </EditorialLayout>
  );
}
