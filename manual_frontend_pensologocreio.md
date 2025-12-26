# MANUAL FRONTEND - PENSO LOGO CREIO
## Guia Técnico de Componentes React, Páginas e UI/UX

---

## ÍNDICE

1. [Visão Geral do Frontend](#1-visão-geral-do-frontend)
2. [Estrutura de Componentes](#2-estrutura-de-componentes)
3. [Sistema de Roteamento](#3-sistema-de-roteamento)
4. [Páginas Principais](#4-páginas-principais)
5. [Design System](#5-design-system)
6. [Animações e Efeitos](#6-animações-e-efeitos)
7. [Lazy Loading e Code Splitting](#7-lazy-loading-e-code-splitting)
8. [Responsividade](#8-responsividade)
9. [Padrões de Código](#9-padrões-de-código)
10. [Guia de Criação de Componentes](#10-guia-de-criação-de-componentes)

---

## 1. VISÃO GERAL DO FRONTEND

### 1.1 Stack Tecnológico

```
┌────────────────────────────────────────────────────┐
│              STACK FRONTEND                        │
├────────────────────────────────────────────────────┤
│                                                    │
│  Framework:          React 19.2.1                  │
│  Router:             React Router DOM 7.9.5        │
│  Build Tool:         Vite 5.0.0                    │
│  Styling:            Tailwind CSS 4.1.16           │
│  Icons:              React Icons 5.5.0             │
│  Markdown:           markdown-it 14.1.0            │
│                                                    │
│  Tipografia:                                       │
│   - Playfair Display (Títulos)                    │
│   - Inter (Corpo)                                  │
│   - Mile Heights (Logo)                            │
│                                                    │
│  Cores Principais:                                 │
│   - Dourado: #D4AF37                               │
│   - Fundo: #0a0a0a → #1a1a1a                       │
│   - Texto: #ffffff, #F5E3A1                        │
│                                                    │
└────────────────────────────────────────────────────┘
```

### 1.2 Arquitetura de Componentes

```
src/
├── App.jsx (Root)
│   ├── Router (BrowserRouter)
│   ├── NavBar (Navegação global)
│   ├── Routes
│   │   ├── Home
│   │   ├── CaminhoDasEscrituras
│   │   ├── TemasDaVida
│   │   ├── DevocionalDiaria
│   │   ├── Oracoes
│   │   └── ...
│   └── Footer (Rodapé global)
│
├── components/ (23 componentes)
│   ├── Navegação
│   │   ├── NavBar.jsx
│   │   ├── AccordionLivros.jsx
│   │   └── IndiceBiblico.jsx
│   │
│   ├── Conteúdo
│   │   ├── ArtigoBiblico.jsx
│   │   ├── ArticleCard.jsx
│   │   ├── PostGrid.jsx
│   │   └── PostWrapper.jsx
│   │
│   ├── Homepage
│   │   ├── ReflexaoDiaria.jsx
│   │   ├── ConteudoDoDia.jsx
│   │   ├── OracaoDoDia.jsx
│   │   └── CarrosselTags.jsx
│   │
│   └── Layout
│       ├── Footer.jsx
│       ├── TemplateLateral.jsx
│       └── PageTransition.jsx
│
└── pages/ (16 páginas)
    ├── Home.jsx
    ├── CaminhoDasEscrituras.jsx
    ├── TemasDaVida.jsx
    └── ...
```

---

## 2. ESTRUTURA DE COMPONENTES

### 2.1 COMPONENTES DE NAVEGAÇÃO

#### 2.1.1 NavBar.jsx - Navegação Principal

**Localização**: `src/components/NavBar.jsx`
**Uso**: Barra de navegação global do site
**Props**: Nenhuma (usa useLocation internamente)

##### Estrutura

```javascript
import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Início" },
  { to: "/caminho-das-escrituras", label: "Homilia" },
  { to: "/escadaria-do-conhecimento", label: "Estudos" },
  { to: "/devocional-diaria", label: "Devocional Diária" },
  { to: "/temas-da-vida", label: "Temas da Vida" },
  { to: "/oracoes", label: "Oração" },
  { to: "/contato", label: "Contato" },
  { to: "/calendario", label: "🕰️ Calendário" },
];

export default function NavBar() {
  const location = useLocation();
  const activeRoot = getActiveRoot(location.pathname, location.state);

  return (
    <ul className="flex flex-wrap justify-center items-center gap-12 px-6 py-4">
      {links.map(({ to, label }) => {
        const active = activeRoot === to || (to !== "/" && path.startsWith(to));

        return (
          <li key={to}>
            <Link to={to} className={`nav-link ${active ? "active" : ""}`}>
              <span className="nav-label">{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
```

##### Funcionalidade Especial: getActiveRoot

```javascript
/**
 * Normaliza a rota atual para determinar qual item do menu marcar como ativo
 *
 * Exemplos:
 * - /artigo/genesis-01-devocional (com state.from='temas-da-vida')
 *   → Retorna "/temas-da-vida"
 *
 * - /biblia/genesis/01/devocional
 *   → Retorna "/oracoes"
 *
 * - /caminho-das-escrituras/lucas/5
 *   → Retorna "/caminho-das-escrituras"
 */
function getActiveRoot(pathname, locationState) {
  if (!pathname || pathname === "/") return "/";

  // Posts premium da home: /artigo/:slug
  // Detecta origem pelo location.state
  if (pathname.startsWith("/artigo/")) {
    if (locationState?.from === 'temas-da-vida') {
      return "/temas-da-vida";
    }
    return "/";  // Default: Home
  }

  // Orações bíblicas: /biblia/:livro/:slug → Oração
  if (pathname.startsWith("/biblia/")) {
    return "/oracoes";
  }

  // Demais rotas: usa o primeiro segmento como base
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";

  return `/${parts[0]}`;
}
```

##### Estilos CSS (NavBar.css)

```css
/* Efeito "palavra-lâmpada" */
.nav-link {
  position: relative;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.4px;
  transition: all 0.3s ease;
}

.nav-link:hover .nav-label,
.nav-link.active .nav-label {
  color: #D4AF37;
  text-shadow:
    0 0 20px rgba(212, 175, 55, 0.8),
    0 0 10px rgba(212, 175, 55, 0.5);
}

/* Underline animado */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #D4AF37, #F5E3A1);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}
```

---

#### 2.1.2 AccordionLivros.jsx - Accordion de Livros Bíblicos

**Localização**: `src/components/AccordionLivros.jsx`
**Uso**: Navegação expansível por livros e capítulos
**Props**:
- `livros` (array) - Lista de livros bíblicos
- `onSelect` (function) - Callback ao selecionar capítulo

##### Estrutura Exemplo

```javascript
export default function AccordionLivros({ livros, onSelect }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="accordion-livros">
      {livros.map(livro => (
        <div key={livro.id} className="accordion-item">
          <button
            onClick={() => setExpanded(expanded === livro.id ? null : livro.id)}
            className="accordion-header"
          >
            {livro.nome} ({livro.capitulos} capítulos)
          </button>

          {expanded === livro.id && (
            <div className="accordion-body">
              {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map(cap => (
                <button
                  key={cap}
                  onClick={() => onSelect(livro.id, cap)}
                  className="capitulo-btn"
                >
                  Capítulo {cap}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

### 2.2 COMPONENTES DE CONTEÚDO

#### 2.2.1 ArtigoBiblico.jsx - Renderizador de Artigos

**Localização**: `src/components/ArtigoBiblico.jsx`
**Uso**: Renderiza conteúdo markdown de artigos bíblicos
**Props**:
- `tipo` (string) - Tipo do artigo (devocional, estudo-tematico, etc)
- `titulo` (string) - Título do artigo
- `imagemHero` (string) - URL da imagem hero (opcional)
- `conteudoHtml` (string) - HTML do conteúdo processado

##### Código Completo

```javascript
export default function ArtigoBiblico({
  tipo,
  titulo,
  imagemHero,
  conteudoHtml,
}) {
  const tipoLabel = tipo || "conteúdo";

  return (
    <>
      {/* HERO OPCIONAL */}
      {imagemHero && (
        <div style={{ width: "100%", marginBottom: "1.5rem", textAlign: "center" }}>
          <img
            src={imagemHero}
            alt={titulo}
            style={{ maxWidth: "100%", maxHeight: "380px", objectFit: "contain" }}
          />
        </div>
      )}

      {/* CABEÇALHO */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 1.5rem", textAlign: "center" }}>
        <p style={{ color: "#D4AF37", fontSize: "0.95rem", opacity: 0.85 }}>
          Artigo • {tipoLabel}
        </p>

        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "2.1rem",
            fontWeight: 300,
            color: "#F5E3A1",
          }}
        >
          {titulo}
        </h1>
      </div>

      {/* TEMPLATE DE PAPEL PADRONIZADO */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundImage: "url('/assets/template-read-card-home.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0.875rem",
          border: "1px solid rgba(212, 175, 55, 0.18)",
          padding: "clamp(2rem, 8vw, 3rem)",
        }}
      >
        {/* ESTILOS INLINE PARA HEADINGS DO MARKDOWN */}
        <style>{`
          .artigo-biblico-headings h2,
          .artigo-biblico-headings h3 {
            color: #0A0A0A !important;
            font-family: Georgia, 'Times New Roman', serif !important;
            font-weight: 400 !important;
            margin-top: 1.35rem;
            margin-bottom: 0.55rem;
          }

          .artigo-biblico-headings h2 { font-size: 1.38rem; }
          .artigo-biblico-headings h3 { font-size: 1.1rem; }

          .artigo-biblico-headings p {
            color: #1a1a1a;
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 1.05rem;
            line-height: 1.75;
            margin-bottom: 1rem;
          }

          .artigo-biblico-headings ul,
          .artigo-biblico-headings ol {
            color: #1a1a1a;
            margin-left: 1.5rem;
            margin-bottom: 1rem;
          }

          .artigo-biblico-headings li {
            margin-bottom: 0.4rem;
            line-height: 1.65;
          }

          .artigo-biblico-headings strong { font-weight: 600; }
          .artigo-biblico-headings em { font-style: italic; }
        `}</style>

        {/* RENDERIZAÇÃO DO HTML */}
        <div
          className="artigo-biblico-headings"
          dangerouslySetInnerHTML={{ __html: conteudoHtml }}
        />
      </div>
    </>
  );
}
```

##### Uso em PostPage.jsx

```javascript
import { loadBiblePosts } from '@/utils/loadBiblePosts';
import ArtigoBiblico from '@/components/ArtigoBiblico';

function PostPage() {
  const { livro, capitulo, tipo } = useParams();
  const [facetas, setFacetas] = useState([]);

  useEffect(() => {
    loadBiblePosts(livro, capitulo).then(setFacetas);
  }, [livro, capitulo]);

  const facetaAtual = facetas.find(f => f.tipo === tipo);

  if (!facetaAtual) return <div>Carregando...</div>;

  return (
    <ArtigoBiblico
      tipo={facetaAtual.data.tipo}
      titulo={facetaAtual.data.titulo}
      imagemHero={facetaAtual.data.imageUrl}
      conteudoHtml={facetaAtual.html}
    />
  );
}
```

---

#### 2.2.2 ArticleCard.jsx - Card de Artigo

**Localização**: `src/components/ArticleCard.jsx`
**Uso**: Card com spotlight effect para listagem de artigos
**Props**:
- `post` (object) - Objeto do post com { titulo, data, tag, description, excerpt, imageUrl, slug }
- `isMain` (boolean) - Se é o card principal (maior)
- `delay` (number) - Delay da animação de entrada (em segundos)

##### Funcionalidades Principais

1. **Spotlight Effect**: Mouse tracking que cria efeito de holofote
2. **Dois Modos**: Main (grande) e Secondary (pequeno)
3. **Animações de Entrada**: slideInUp com delay configurável
4. **Hover Effects**: Transformações e sombras

##### Código Simplificado

```javascript
export const ArticleCard = ({ post, isMain = false, delay = 0 }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // SPOTLIGHT EFFECT - Mouse Tracking
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`article-card ${isMain ? 'article-card--main' : 'article-card--secondary'}`}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
        animationDelay: `${delay}s`,
      }}
    >
      {/* IMAGEM DE DESTAQUE */}
      {post.imageUrl && (
        <div className="article-card__image">
          <img src={post.imageUrl} alt={post.titulo} />
        </div>
      )}

      {/* METADADOS */}
      <div className="article-card__meta">
        <span className="article-card__date">{post.data}</span>
        <span className="article-card__tag">{post.tag}</span>
        <span className="article-card__read-time">{post.readTime}</span>
      </div>

      {/* CONTEÚDO */}
      <div className="article-card__content">
        <h2 className="article-card__title">{post.titulo}</h2>
        <p className="article-card__description">{post.description}</p>
        <p className="article-card__excerpt">{post.excerpt}</p>
      </div>

      {/* BOTÃO */}
      <Link to={`/post/${post.slug}`} className="article-card__button">
        Ler Mais →
      </Link>
    </article>
  );
};
```

##### Estilos CSS (Spotlight Effect)

```css
.article-card {
  position: relative;
  background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: slideInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* SPOTLIGHT EFFECT */
.article-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(212, 175, 55, 0.15),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 12px;
  pointer-events: none;
}

.article-card:hover::before {
  opacity: 1;
}

.article-card:hover {
  transform: translateY(-8px);
  border-color: rgba(212, 175, 55, 0.5);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 60px rgba(212, 175, 55, 0.2);
}

/* MODO MAIN (CARD PRINCIPAL) */
.article-card--main {
  grid-column: span 2;
  min-height: 500px;
}

.article-card--main .article-card__title {
  font-size: 2.5rem;
}

/* MODO SECONDARY (CARDS MENORES) */
.article-card--secondary {
  min-height: 350px;
}

.article-card--secondary .article-card__title {
  font-size: 1.5rem;
}

/* ANIMAÇÃO DE ENTRADA */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### 2.3 COMPONENTES DE HOMEPAGE

#### 2.3.1 ReflexaoDiaria.jsx - Cards de Reflexão

**Localização**: `src/components/ReflexaoDiaria.jsx`
**Uso**: Seção de "Versículo do Dia" e "Pensamento do Dia"
**Props**: Nenhuma (conteúdo hardcoded)

##### Estrutura

```javascript
export default function ReflexaoDiaria() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const cards = [
    {
      tipo: "VERSÍCULO DO DIA",
      titulo: "Mateus 22:37",
      conteudo: "Amarás o Senhor teu Deus de todo o teu coração, e de toda a tua alma, e de todo o teu pensamento.",
    },
    {
      tipo: "PENSAMENTO DO DIA",
      autor: "Rábia de Basra",
      conteudo: "Ó Deus! Se eu Te adoro por medo do Inferno, queima-me no Inferno; e se Te adoro com esperança do Paraíso, exclui-me dele. Mas se Te adoro apenas por Ti, então não me negues a Tua beleza eterna.",
    },
  ];

  return (
    <section className="reflexao-diaria">
      <h2 className="reflexao-diaria__title">Reflexão Diária</h2>

      <div className="reflexao-diaria__grid">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="reflexao-card"
            onMouseMove={(e) => handleMouseMove(e, idx)}
            style={{
              '--mouse-x': `${mousePos.x}px`,
              '--mouse-y': `${mousePos.y}px`,
            }}
          >
            <span className="reflexao-card__tipo">{card.tipo}</span>

            {card.titulo && (
              <h3 className="reflexao-card__titulo">{card.titulo}</h3>
            )}

            <p className="reflexao-card__conteudo">{card.conteudo}</p>

            {card.autor && (
              <p className="reflexao-card__autor">— {card.autor}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

#### 2.3.2 ConteudoDoDia.jsx - Conteúdo em Destaque

**Localização**: `src/components/ConteudoDoDia.jsx`
**Uso**: Exibe conteúdo destacado do dia
**Props**: Nenhuma (carrega dinamicamente)

---

#### 2.3.3 CarrosselTags.jsx - Carrossel de Tags Temáticas

**Localização**: `src/components/CarrosselTags.jsx`
**Uso**: Carrossel horizontal das 20 tags temáticas
**Props**: Nenhuma

##### Estrutura

```javascript
import tagsMap from '@/data/tagsMap.js';

export default function CarrosselTags() {
  const tags = Object.keys(tagsMap);

  return (
    <div className="carrossel-tags">
      <div className="carrossel-tags__track">
        {tags.map(tag => {
          const meta = tagsMap[tag];

          return (
            <Link
              key={tag}
              to={`/temas-da-vida/${tag}`}
              className="tag-chip"
              style={{ backgroundColor: meta.cor }}
            >
              <span className="tag-chip__icon">{meta.icone}</span>
              <span className="tag-chip__nome">{meta.nome}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

---

## 3. SISTEMA DE ROTEAMENTO

### 3.1 App.jsx - Configuração de Rotas

**Localização**: `src/App.jsx`

#### Código Completo

```javascript
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Lazy loading das páginas (code splitting)
const Home = lazy(() => import("./pages/Home.jsx"));
const CaminhoDasEscrituras = lazy(() => import("./pages/CaminhoDasEscrituras.jsx"));
const TemasDaVida = lazy(() => import("./pages/TemasDaVida.jsx"));
const DevocionalDiaria = lazy(() => import("./pages/DevocionalDiaria.jsx"));
const Oracoes = lazy(() => import("./pages/Oracoes.jsx"));
const Contato = lazy(() => import("./pages/Contato.jsx"));
const PostPage = lazy(() => import("./pages/PostPage.jsx"));

// Fallback enquanto páginas carregam
function PageFallback() {
  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#010b0a",
      color: "#D4AF37",
      fontSize: "1.3rem",
    }}>
      Carregando página...
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#010b0a] text-white">
        <Navbar />

        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/caminho-das-escrituras/:livroId?/:capitulo?" element={<CaminhoDasEscrituras />} />
            <Route path="/temas-da-vida/:tag?" element={<TemasDaVida />} />
            <Route path="/devocional-diaria" element={<DevocionalDiaria />} />
            <Route path="/oracoes" element={<Oracoes />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/biblia/:livro/:capitulo/:tipo" element={<PostPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
}
```

### 3.2 Tabela de Rotas

| Rota | Componente | Descrição | Parâmetros |
|------|-----------|-----------|------------|
| `/` | Home.jsx | Homepage com hero, reflexão e posts | - |
| `/caminho-das-escrituras` | CaminhoDasEscrituras.jsx | Navegação por livros bíblicos | `:livroId?`, `:capitulo?` |
| `/caminho-das-escrituras/genesis` | CaminhoDasEscrituras.jsx | Livro específico | `livroId=genesis` |
| `/caminho-das-escrituras/genesis/01` | CaminhoDasEscrituras.jsx | Capítulo específico | `livroId=genesis`, `capitulo=01` |
| `/temas-da-vida` | TemasDaVida.jsx | Lista de temas temáticos | `:tag?` |
| `/temas-da-vida/mudanca` | TemasDaVida.jsx | Posts de uma tag específica | `tag=mudanca` |
| `/devocional-diaria` | DevocionalDiaria.jsx | Devocional do dia | - |
| `/oracoes` | Oracoes.jsx | Biblioteca de orações | - |
| `/contato` | Contato.jsx | Formulário de contato | - |
| `/biblia/:livro/:capitulo/:tipo` | PostPage.jsx | Post bíblico específico | `livro`, `capitulo`, `tipo` |
| `*` | Home.jsx | Catch-all 404 → Home | - |

### 3.3 Exemplos de Rotas Dinâmicas

```
/biblia/genesis/01/devocional
  → PostPage.jsx com { livro: "genesis", capitulo: "01", tipo: "devocional" }

/biblia/genesis/01/estudo-tematico
  → PostPage.jsx com { livro: "genesis", capitulo: "01", tipo: "estudo-tematico" }

/temas-da-vida/mudanca
  → TemasDaVida.jsx com { tag: "mudanca" }

/caminho-das-escrituras/lucas/5
  → CaminhoDasEscrituras.jsx com { livroId: "lucas", capitulo: "5" }
```

---

## 4. PÁGINAS PRINCIPAIS

### 4.1 Home.jsx - Homepage

**Localização**: `src/pages/Home.jsx`

#### Estrutura da Página

```javascript
export default function Home() {
  const fundoHero = "/assets/Mockup da Homepage.webp";
  const [postsHome, setPostsHome] = useState([]);

  useEffect(() => {
    async function load() {
      const posts = await getHomePosts();
      setPostsHome(posts);
    }
    load();
  }, []);

  // ORDENAÇÃO: devocional → mensagem-pastoral → oracao
  const ordemDesejada = ["devocional", "mensagem-pastoral", "oracao"];
  const postsOrdenados = postsHome.sort((a, b) =>
    ordemDesejada.indexOf(a.tipo) - ordemDesejada.indexOf(b.tipo)
  );

  const mainPost = postsOrdenados[0] || null;
  const secondaryPosts = postsOrdenados.slice(1);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative min-h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `url("${fundoHero}")`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/50 z-10"></div>

        <div className="relative z-30">
          <h1 className="text-7xl font-['Playfair_Display'] animate-glow">
            Bem-vindo ao Penso Logo Creio
          </h1>
          <p className="text-2xl font-['Inter']">
            Um espaço para reflexão sobre fé, vida e teologia.
          </p>
        </div>
      </section>

      {/* REFLEXÃO DIÁRIA */}
      <div className="my-16">
        <ReflexaoDiaria />
      </div>

      {/* POSTS EM DESTAQUE */}
      <main className="container mx-auto px-4 my-24">
        <h2 className="text-4xl font-['Playfair_Display'] text-center mb-12">
          Conteúdo em Destaque
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* POST PRINCIPAL */}
          {mainPost && (
            <ArticleCard post={mainPost} isMain={true} delay={0} />
          )}

          {/* POSTS SECUNDÁRIOS */}
          {secondaryPosts.map((post, idx) => (
            <ArticleCard key={post.slug} post={post} isMain={false} delay={0.2 * (idx + 1)} />
          ))}
        </div>
      </main>
    </>
  );
}
```

---

### 4.2 CaminhoDasEscrituras.jsx - Navegação Bíblica

**Localização**: `src/pages/CaminhoDasEscrituras.jsx`

#### Funcionalidade

1. **Modo Inicial**: Lista todos os 66 livros bíblicos
2. **Modo Livro**: Ao selecionar um livro, mostra os capítulos
3. **Modo Capítulo**: Ao selecionar um capítulo, mostra as 7 facetas

#### Estrutura

```javascript
import livrosSBB from '@/data/livrosSBB.js';
import { loadBiblePosts } from '@/utils/loadBiblePosts.js';

export default function CaminhoDasEscrituras() {
  const { livroId, capitulo } = useParams();
  const [facetas, setFacetas] = useState([]);

  useEffect(() => {
    if (livroId && capitulo) {
      loadBiblePosts(livroId, capitulo).then(setFacetas);
    }
  }, [livroId, capitulo]);

  // MODO INICIAL: Lista de livros
  if (!livroId) {
    return <ListaLivros livros={livrosSBB} />;
  }

  // MODO LIVRO: Lista de capítulos
  if (livroId && !capitulo) {
    const livro = livrosSBB.find(l => l.id === livroId);
    return <ListaCapitulos livro={livro} />;
  }

  // MODO CAPÍTULO: Facetas
  return (
    <div>
      <h1>Livro: {livroId}, Capítulo: {capitulo}</h1>

      <div className="facetas-menu">
        {facetas.map(faceta => (
          <Link
            key={faceta.tipo}
            to={`/biblia/${livroId}/${capitulo}/${faceta.tipo}`}
            className="faceta-btn"
          >
            {faceta.tipo}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

---

### 4.3 TemasDaVida.jsx - Temas Temáticos

**Localização**: `src/pages/TemasDaVida.jsx`

#### Funcionalidade

1. **Modo Inicial**: Lista das 20 tags temáticas
2. **Modo Tag**: Ao selecionar uma tag, mostra posts relacionados

#### Estrutura

```javascript
import { loadBibleByTag } from '@/utils/loadBibleByTag.js';
import tagsMap from '@/data/tagsMap.js';

export default function TemasDaVida() {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (tag) {
      loadBibleByTag(tag).then(setPosts);
    }
  }, [tag]);

  // MODO INICIAL: Lista de tags
  if (!tag) {
    return (
      <div className="temas-grid">
        {Object.keys(tagsMap).map(tagKey => {
          const meta = tagsMap[tagKey];

          return (
            <Link key={tagKey} to={`/temas-da-vida/${tagKey}`} className="tema-card">
              <span className="tema-card__icon">{meta.icone}</span>
              <h3 className="tema-card__nome">{meta.nome}</h3>
              <p className="tema-card__descricao">{meta.descricao}</p>
            </Link>
          );
        })}
      </div>
    );
  }

  // MODO TAG: Posts relacionados
  const meta = tagsMap[tag];

  return (
    <div>
      <header className="tema-header">
        <span className="tema-header__icon">{meta.icone}</span>
        <h1 className="tema-header__nome">{meta.nome}</h1>
        <p className="tema-header__descricao">{meta.descricao}</p>
      </header>

      <div className="posts-grid">
        {posts.map(post => (
          <ArticleCard key={post.slug} post={post.data} />
        ))}
      </div>
    </div>
  );
}
```

---

## 5. DESIGN SYSTEM

### 5.1 Paleta de Cores

```css
/* === CORES PRINCIPAIS === */
--dourado-principal: #D4AF37;
--dourado-claro: #F5E3A1;

/* === FUNDOS === */
--fundo-escuro-1: #0a0a0a;
--fundo-escuro-2: #1a1a1a;
--fundo-escuro-3: #2a2a2a;

/* === TEXTOS === */
--texto-primario: #ffffff;
--texto-secundario: #F5E3A1;
--texto-terciario: #D4AF37;

/* === BORDAS === */
--borda-sutil: rgba(212, 175, 55, 0.2);
--borda-media: rgba(212, 175, 55, 0.4);
--borda-forte: rgba(212, 175, 55, 0.8);

/* === GRADIENTES === */
--gradiente-fundo: linear-gradient(135deg, #1a1a1a, #0a0a0a);
--gradiente-dourado: linear-gradient(90deg, #D4AF37, #F5E3A1);
```

### 5.2 Tipografia

```css
/* === FONTS === */
--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-logo: 'Mile Heights', serif;

/* === TAMANHOS === */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
--text-7xl: 4.5rem;    /* 72px */

/* === PESOS === */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 5.3 Espaçamentos

```css
/* === SPACING (baseado em múltiplos de 4px) === */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

---

## 6. ANIMAÇÕES E EFEITOS

### 6.1 Animação "Glow" (Brilho Pulsante)

```css
@keyframes glow {
  0%, 100% {
    text-shadow:
      0 0 25px rgba(212, 175, 55, 0.8),
      0 0 10px rgba(255, 255, 255, 0.4);
  }
  50% {
    text-shadow:
      0 0 40px rgba(212, 175, 55, 1),
      0 0 20px rgba(255, 255, 255, 0.6);
  }
}

.animate-glow {
  animation: glow 3s ease-in-out infinite;
}
```

### 6.2 Animação "Slide In Up"

```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-up {
  animation: slideInUp 0.6s ease-out forwards;
}
```

### 6.3 Animação "Float" (Flutuação)

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

---

## 7. LAZY LOADING E CODE SPLITTING

### 7.1 Lazy Loading de Páginas

```javascript
// Em App.jsx
import { Suspense, lazy } from 'react';

// Lazy imports
const Home = lazy(() => import('./pages/Home.jsx'));
const CaminhoDasEscrituras = lazy(() => import('./pages/CaminhoDasEscrituras.jsx'));

// Uso com Suspense
<Suspense fallback={<PageFallback />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/caminho-das-escrituras" element={<CaminhoDasEscrituras />} />
  </Routes>
</Suspense>
```

### 7.2 Benefícios do Code Splitting

```
SEM code splitting:
  → Bundle único: ~2.5MB
  → Tempo de carregamento inicial: ~5s

COM code splitting (Vite + lazy):
  → main.js: ~150KB
  → home.chunk.js: ~80KB
  → caminho-escrituras.chunk.js: ~120KB
  → Tempo de carregamento inicial: ~1.5s
  → Páginas carregam sob demanda: +0.5s cada
```

---

## 8. RESPONSIVIDADE

### 8.1 Breakpoints Tailwind

```css
/* Mobile First */
/* default: 0-639px (mobile) */

@media (min-width: 640px) {  /* sm */
  /* tablets pequenos */
}

@media (min-width: 768px) {  /* md */
  /* tablets */
}

@media (min-width: 1024px) { /* lg */
  /* laptops */
}

@media (min-width: 1280px) { /* xl */
  /* desktops */
}

@media (min-width: 1536px) { /* 2xl */
  /* telas grandes */
}
```

### 8.2 Exemplo de Componente Responsivo

```javascript
<div className="
  grid
  grid-cols-1          /* mobile: 1 coluna */
  sm:grid-cols-2       /* tablet: 2 colunas */
  lg:grid-cols-3       /* desktop: 3 colunas */
  gap-4                /* mobile: gap 1rem */
  lg:gap-8             /* desktop: gap 2rem */
  px-4                 /* mobile: padding 1rem */
  lg:px-16             /* desktop: padding 4rem */
">
  {/* conteúdo */}
</div>
```

---

## 9. PADRÕES DE CÓDIGO

### 9.1 Estrutura de Componente React

```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OutroComponente from './OutroComponente.jsx';

// 2. Componente
export default function MeuComponente({ prop1, prop2 }) {
  // 3. Hooks (sempre no topo, mesma ordem)
  const params = useParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState(null);

  // 4. Effects
  useEffect(() => {
    // lógica de efeito
  }, [dependencias]);

  // 5. Funções auxiliares
  const handleClick = () => {
    // lógica
  };

  // 6. Early returns (se aplicável)
  if (!estado) return <Loading />;

  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### 9.2 Nomenclatura

```javascript
// COMPONENTES: PascalCase
function ArticleCard() {}

// FUNÇÕES: camelCase
function loadBiblePosts() {}

// CONSTANTES: UPPER_SNAKE_CASE (opcional)
const API_URL = 'https://...';

// VARIÁVEIS: camelCase
const userName = 'João';

// CSS Classes: kebab-case
<div className="article-card__title"></div>

// Arquivos: PascalCase para componentes, camelCase para utils
ArticleCard.jsx
loadBiblePosts.js
```

---

## 10. GUIA DE CRIAÇÃO DE COMPONENTES

### 10.1 Checklist para Novo Componente

```
□ Criar arquivo em src/components/ com nome PascalCase.jsx
□ Definir props claramente (TypeScript ou JSDoc)
□ Implementar lógica de estado (se necessário)
□ Adicionar estilos (inline, CSS module ou Tailwind)
□ Adicionar animações (se aplicável)
□ Tornar responsivo (mobile first)
□ Testar em diferentes breakpoints
□ Documentar uso em comentário no topo
□ Exportar default ou named export
```

### 10.2 Template de Componente

```javascript
/**
 * MeuComponente
 *
 * @description Breve descrição do que o componente faz
 *
 * @param {object} props
 * @param {string} props.titulo - Título a exibir
 * @param {function} props.onClick - Callback ao clicar
 * @param {boolean} [props.active=false] - Se está ativo (opcional)
 *
 * @example
 * <MeuComponente
 *   titulo="Hello"
 *   onClick={() => console.log('clicked')}
 *   active={true}
 * />
 */
export default function MeuComponente({ titulo, onClick, active = false }) {
  // Lógica do componente

  return (
    <div className={`meu-componente ${active ? 'meu-componente--active' : ''}`}>
      <h2>{titulo}</h2>
      <button onClick={onClick}>Clique</button>
    </div>
  );
}
```

---

**Fim do Manual Frontend**
**Versão**: 1.0
**Data**: 2025-12-25
**Status**: Completo e validado com código real
