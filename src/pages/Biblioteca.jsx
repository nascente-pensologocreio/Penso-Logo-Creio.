// src/pages/Biblioteca.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

import PostGrid from "../components/PostGrid.jsx";
import PostWrapper from "../components/PostWrapper.jsx";

export default function Biblioteca() {
  const [posts, setPosts] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const [visiveis, setVisiveis] = useState(9); // quantidade inicial
  const loaderRef = useRef(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const snapshot = await getDocs(collection(db, "publicacoes"));
        const lista = snapshot.docs.map((doc) => ({
          slug: doc.id,
          ...doc.data(),
        }));
        setPosts(lista);
      } catch (err) {
        console.error("Erro ao carregar posts:", err);
      }
    };
    carregar();
  }, []);

  // Aplica filtro por tipo
  let postsFiltrados =
    filtro === "todos" ? posts : posts.filter((p) => p.tipo === filtro);

  // Aplica busca por título/subtítulo
  if (busca.trim() !== "") {
    const termo = busca.toLowerCase();
    postsFiltrados = postsFiltrados.filter(
      (p) =>
        (p.titulo && p.titulo.toLowerCase().includes(termo)) ||
        (p.subtitulo && p.subtitulo.toLowerCase().includes(termo))
    );
  }

  // Posts visíveis (scroll infinito)
  const postsVisiveis = postsFiltrados.slice(0, visiveis);

  // Observer para scroll infinito
  const carregarMais = useCallback(
    (entries) => {
      const alvo = entries[0];
      if (alvo.isIntersecting) {
        setVisiveis((prev) => prev + 6); // carrega mais 6 posts
      }
    },
    [setVisiveis]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(carregarMais, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [carregarMais]);

  return (
    <PostWrapper
      tipo="longo"
      titulo="Biblioteca Editorial"
      subtitulo="Explore todas as postagens do Penso Logo Creio"
    >
      {/* Barra de filtros */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {["todos", "devocional", "oracao", "pregacao", "estudo"].map((tipo) => (
          <button
            key={tipo}
            onClick={() => {
              setFiltro(tipo);
              setVisiveis(9); // resetar scroll infinito ao trocar filtro
            }}
            className={`px-4 py-2 rounded-md border border-[#D4AF37]/40 transition-smooth hover-lift ${
              filtro === tipo
                ? "bg-[#D4AF37] text-black font-semibold"
                : "bg-black/40 text-[#EDEDED]"
            }`}
          >
            {iconeTipo(tipo)} {tipo === "todos" ? "Todos" : tipo}
          </button>
        ))}
      </div>

      {/* Campo de busca */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="🔍 Buscar por título ou subtítulo..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setVisiveis(9); // resetar scroll infinito ao buscar
          }}
          className="w-full max-w-md px-4 py-2 rounded-md border border-[#D4AF37]/40 bg-black/40 text-[#EDEDED] placeholder-gray-400 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/50 transition-smooth"
        />
      </div>

      {/* Grid de postagens */}
      <PostGrid posts={postsVisiveis} />

      {/* Loader para scroll infinito */}
      {visiveis < postsFiltrados.length && (
        <div
          ref={loaderRef}
          className="flex justify-center py-6 text-[#D4AF37] animate-pulse-glow"
        >
          Carregando mais postagens...
        </div>
      )}
    </PostWrapper>
  );
}

/* Helpers */
function iconeTipo(tipo) {
  const map = {
    todos: "✨",
    devocional: "📖",
    oracao: "🙏",
    pregacao: "🎙",
    estudo: "📚",
  };
  return map[tipo] || "✍️";
}
