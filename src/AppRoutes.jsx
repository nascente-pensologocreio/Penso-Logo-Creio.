// src/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Layout principal
import LayoutPrincipal from "./layouts/LayoutPrincipal.jsx";

// Páginas principais
import Home from "./pages/Home.jsx";
import CaminhoDasEscrituras from "./pages/CaminhoDasEscrituras.jsx";
import EscadariaDoConhecimento from "./pages/EscadariaDoConhecimento.jsx";
import DevocionalDiaria from "./pages/DevocionalDiaria.jsx";
import TemasDaVida from "./pages/TemasDaVida.jsx";
import Contato from "./pages/Contato.jsx";

// Post premium da Home
import Post from "./pages/Post.jsx";

// Postagens vindas do Firebase
import PostPage from "./pages/PostPage.jsx";

// Orações
import Oracoes from "./pages/Oracoes.jsx";

// Biblioteca editorial
import Biblioteca from "./pages/Biblioteca.jsx";

// Calendário
import ArvoreDePostagens from "./components/ArvoreDePostagens.jsx";

// Painel administrativo
import AdminPublish from "./pages/AdminPublish.jsx";

// 404
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada.jsx";

// ==============================
// NOVAS PÁGINAS DA HOME VIEW
// ==============================
import Devocional from "./pages/HomeView/Devocional.jsx";
import MensagemPastoral from "./pages/HomeView/MensagemPastoral.jsx";
import Oracao from "./pages/HomeView/Oracao.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* TODAS AS ROTAS QUE USAM O LAYOUT */}
      <Route element={<LayoutPrincipal />}>
        <Route index element={<Home />} />

        <Route
          path="caminho-das-escrituras"
          element={<CaminhoDasEscrituras />}
        />
        <Route
          path="escadaria-do-conhecimento"
          element={<EscadariaDoConhecimento />}
        />
        <Route path="devocional-diaria" element={<DevocionalDiaria />} />
        <Route path="temas-da-vida" element={<TemasDaVida />} />
        <Route path="contato" element={<Contato />} />

        {/* HOME → artigo premium */}
        <Route path="artigo/:slug" element={<Post />} />

        {/* Firebase → Biblioteca */}
        <Route path="post/:slug" element={<PostPage />} />

        {/* Orações */}
        <Route path="oracoes" element={<Oracoes />} />

        {/* Biblioteca */}
        <Route path="biblioteca" element={<Biblioteca />} />

        {/* Calendário */}
        <Route path="calendario" element={<ArvoreDePostagens />} />

        {/* PAINEL ADMINISTRATIVO */}
        <Route path="admin/publish" element={<AdminPublish />} />

        {/* ==============================
            ROTAS DAS PÁGINAS HOME VIEW
        ============================== */}
        <Route path="devocional" element={<Devocional />} />
        <Route
          path="mensagem-pastoral"
          element={<MensagemPastoral />}
        />
        <Route path="oracao" element={<Oracao />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<PaginaNaoEncontrada mensagem="Página não encontrada." />}
      />
    </Routes>
  );
}
