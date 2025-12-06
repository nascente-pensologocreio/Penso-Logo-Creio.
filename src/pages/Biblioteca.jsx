// src/pages/Biblioteca.jsx
import React, { useEffect, useState, useCallback } from "react";

// Firestore dinâmico + DB dinâmico
import { getFirebaseDB } from "../firebase/config";

import PostGrid from "../components/PostGrid.jsx";

import { parseFrontmatter, markdownToHtml } from "../utils/markdownProcessor.js"; // <-- ÚNICA ADIÇÃO

export default function Biblioteca() {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    setCarregando(true);

    try {
      // Firebase LAZY
      const db = await getFirebaseDB();
      const { collection, getDocs } = await import("firebase/firestore");

      const ref = collection(db, "publicacoes");
      const snap = await getDocs(ref);

      const lista = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setPosts(lista);
    } catch (err) {
      console.error("Erro ao carregar biblioteca:", err);
    }

    setCarregando(false);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return (
    <main className="min-h-screen px-6 py-20 text-[#EDEDED]">
      <h1 className="text-4xl font-bold text-center mb-12">
        Biblioteca de Conteúdos
      </h1>

      {carregando && (
        <p className="text-center text-gray-400 italic">Carregando...</p>
      )}

      {!carregando && posts.length === 0 && (
        <p className="text-center text-gray-500">Nenhum conteúdo encontrado.</p>
      )}

      {!carregando && posts.length > 0 && (
        <PostGrid posts={posts} />
      )}
    </main>
  );
}
