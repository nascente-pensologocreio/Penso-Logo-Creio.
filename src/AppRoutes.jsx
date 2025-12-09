// src/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Layout principal
const LayoutPrincipal = lazy(() => import("./layouts/LayoutPrincipal.jsx"));

// Páginas principais
const Home = lazy(() => import("./pages/Home.jsx"));
const CaminhoDasEscrituras = lazy(() =>
  import("./pages/CaminhoDasEscrituras.jsx")
);
const EscadariaDoConhecimento = lazy(() =>
  import("./pages/EscadariaDoConhecimento.jsx")
);
const DevocionalDiaria = lazy(() =>
  import("./pages/DevocionalDiaria.jsx")
);
const TemasDaVida = lazy(() => import("./pages/TemasDaVida.jsx"));
const Contato = lazy(() => import("./pages/Contato.jsx"));

// Post premium da Home
const Post = lazy(() => import("./pages/Post.jsx"));

// Postagens vindas do Firebase
const PostPage = lazy(() => import("./pages/PostPage.jsx"));

// Orações
const Oracoes = lazy(() => import("./pages/Oracoes.jsx"));

// Biblioteca editorial
const Biblioteca = lazy(() => import("./pages/Biblioteca.jsx"));

// Calendário
const ArvoreDePostagens = lazy(() =>
  import("./components/ArvoreDePostagens.jsx")
);

// Painel administrativo
const AdminPublish = lazy(() => import("./pages/AdminPublish.jsx"));

// 404
const PaginaNaoEncontrada = lazy(() =>
  import("./pages/PaginaNaoEncontrada.jsx")
);

// ==============================
// NOVAS PÁGINAS DA HOME VIEW
// ==============================
const Devocional = lazy(() => import("./pages/HomeView/Devocional.jsx"));
const MensagemPastoral = lazy(() =>
  import("./pages/HomeView/MensagemPastoral.jsx")
);
const Oracao = lazy(() => import("./pages/HomeView/Oracao.jsx"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
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
          
          {/* TEMAS DA VIDA - DUAS ROTAS */}
          <Route path="temas-da-vida" element={<TemasDaVida />} />
          <Route path="temas-da-vida/:tag" element={<TemasDaVida />} />
          
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
    </Suspense>
  );
}