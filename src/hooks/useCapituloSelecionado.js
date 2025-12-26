// src/hooks/useCapituloSelecionado.js
import { useState } from "react";

export default function useCapituloSelecionado() {
  const [livro, setLivro] = useState(null);
  const [capitulo, setCapitulo] = useState(null);

  function selecionar(liv, cap) {
    setLivro(liv);
    setCapitulo(cap);
  }

  function limpar() {
    setLivro(null);
    setCapitulo(null);
  }

  return {
    livro,
    capitulo,
    selecionarCapitulo: selecionar,
    limparSelecao: limpar
  };
}
