// src/pages/DevocionalDiaria.jsx
import React, { useEffect, useState } from "react";
import EditorialLayout from "../layouts/EditorialLayout.jsx";
import { loadDevocionaisHome } from "../utils/loadDevocionaisHome.js";
import DevocionalTemplate from "../templates/DevocionalTemplate.jsx";

import "../styles/editorial-grid.css";
import "../styles/editorial-devocional-diaria.css";

export default function DevocionalDiaria() {
  const [posts, setPosts] = useState([]);
  const [estado, setEstado] = useState("carregando"); // carregando | ok | vazio | erro
  const [selecionadoSlug, setSelecionadoSlug] = useState(null);

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      try {
        setEstado("carregando");

        // Traz TODOS os conteúdos da home (devocional, mensagem-pastoral, oracao)
        const todos = await loadDevocionaisHome();

        if (cancelado) return;

        // Mantém apenas os 3 tipos que devem compor o arquivo
        const validos = (todos || []).filter((post) =>
          ["devocional", "mensagem-pastoral", "oracao"].includes(
            (post.tipo || "").toLowerCase()
          )
        );

        if (!validos || validos.length === 0) {
          setPosts([]);
          setEstado("vazio");
          return;
        }

        setPosts(validos);
        setSelecionadoSlug(validos[0].slug);
        setEstado("ok");
      } catch (err) {
        console.error("Erro ao carregar histórico de devocionais da Home:", err);
        if (!cancelado) {
          setPosts([]);
          setEstado("erro");
        }
      }
    }

    carregar();

    return () => {
      cancelado = true;
    };
  }, []);

  const selecionado = posts.find((p) => p.slug === selecionadoSlug) || null;

  return (
    <EditorialLayout titulo="Devocional Diária">
      <div className="devocional-diaria-grid">
        {/* COLUNA ESQUERDA: LISTA DE DEVOCIONAIS */}
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

          {estado === "ok" && (
            <ul className="devocional-diaria-lista-itens">
              {posts.map((post) => (
                <li key={post.slug}>
                  <button
                    type="button"
                    className={
                      "devocional-diaria-item" +
                      (post.slug === selecionadoSlug
                        ? " devocional-diaria-item--ativo"
                        : "")
                    }
                    onClick={() => setSelecionadoSlug(post.slug)}
                  >
                    <span className="devocional-diaria-item-titulo">
                      {post.titulo || "Devocional sem título"}
                    </span>
                    {post.data && (
                      <span className="devocional-diaria-item-data">
                        {post.data.toLocaleDateString("pt-BR")}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* COLUNA CENTRAL: LEITURA DO DEVOCIONAL */}
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
