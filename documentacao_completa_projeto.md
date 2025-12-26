# DOCUMENTAÇÃO COMPLETA DO PROJETO - PENSO LOGO CREIO

## RESUMO EXECUTIVO

- **Nome do Projeto**: Penso Logo Creio - Plataforma de Estudos Bíblicos
- **Versão Atual**: v10.1 (package.json: 1.0.0)
- **Status**: Produção - Branch: dev-genesis-11
- **Total de Arquivos Markdown**: 8.323 (conteúdo bíblico completo)
- **Total de Arquivos JavaScript/JSX**: 74 arquivos (51 JSX + 23 JS)
- **Linhas de Código (Components/Pages/Utils)**: ~6.282 linhas
- **Tamanho do Projeto**: 231MB (src/) + 188MB (public/) + 36KB (scripts/)

---

## HISTÓRICO DE VERSÕES E ROADMAP

### Versão 10.1 (17/12/2025 09h00)
- Publicação Gênesis capítulos 05-06
- Refinamentos capítulos 01-04
- Otimização de performance nos loaders
- Atualização dos índices de tags e orações

### Versão 10.0 (16/12/2025 21h15)
- Marco Histórico: Publicação Gênesis capítulos 01-04 completos
- Implementação de todas as 7 facetas por capítulo
- Sistema de carregamento lazy para otimização

### Versão 9.6 (15/12/2025)
- Novo sistema de calendário
- Atualização Gênesis 01
- Refatoração do sistema de tags

### Refatoração e Otimização (Dezembro 2025)
- **Genesis 07-10**: Otimização de conteúdo e limpeza de tags
- **Genesis 01-02**: Expansão e refinamento
- **Genesis 01-10**: Refatoração completa e expansão
- **Genesis 04-05-07**: Criação de índices e otimização
- **Genesis 06**: Refatoração e limpeza
- **Genesis 01-05**: Refatoração e limpeza completa

---

## 1. ARQUITETURA DO PROJETO

### 1.1 Estrutura de Diretórios Principal

```
PensoLogoCreio/
├── public/                          (188MB - Assets estáticos)
│   └── assets/                      (Imagens, ícones, fontes)
├── scripts/                         (36KB - Scripts de build)
│   ├── build-tag-index.mjs          (Gera índice de tags)
│   ├── build-home-index.mjs         (Gera índice da homepage)
│   ├── build-oracao-index.mjs       (Gera índice de orações)
│   ├── build-oracoes-index.mjs      (Gera índice de orações v2)
│   └── preencherFrontMatterBiblia.mjs (Preenche metadados dos .md)
├── src/                             (231MB - Código-fonte)
│   ├── components/                  (23 componentes React)
│   ├── pages/                       (16 páginas + 1 subdiretório)
│   ├── content/                     (Conteúdo em Markdown)
│   │   ├── biblia/                  (66 livros × capítulos × 7 facetas)
│   │   └── tags/                    (20 temas da vida)
│   ├── data/                        (Índices JSON + dados estáticos)
│   ├── utils/                       (12 utilitários de carregamento)
│   ├── hooks/                       (Custom hooks React)
│   ├── layouts/                     (Layouts de página)
│   ├── modules/                     (Módulos compartilhados)
│   ├── templates/                   (Templates de conteúdo)
│   ├── styles/                      (CSS global e animations)
│   ├── assets/                      (Assets do código-fonte)
│   ├── schema/                      (Schemas de validação)
│   └── firebase/                    (Configuração Firebase)
├── package.json                     (Dependências e scripts)
├── vite.config.js                   (Configuração Vite)
├── tailwind.config.js               (Configuração Tailwind CSS)
└── README.md                        (Documentação básica)
```

### 1.2 Estrutura de Conteúdo Bíblico

```
src/content/biblia/
├── genesis/ (50 capítulos)
│   ├── 01/
│   │   ├── devocional-01.md              (Devocional diário)
│   │   ├── estudo-tematico.md            (Estudo temático aprofundado)
│   │   ├── exposicao-homiletica.md       (Pregação técnica/homilética)
│   │   ├── mensagem-pastoral.md          (Mensagem pastoral aplicada)
│   │   ├── oracao.md                     (Oração direcionada)
│   │   ├── temas-controversos.md         (Temas polêmicos e apologética)
│   │   └── terminologias.md              (Terminologias chave)
│   ├── 02/ ... 50/
├── exodo/ (40 capítulos)
├── levitico/ (27 capítulos)
├── numeros/ (36 capítulos)
├── deuteronomio/ (34 capítulos)
├── ... (até Apocalipse 22)
└── apocalipse/ (22 capítulos)

Total: 66 livros × 1.189 capítulos × 7 facetas = 8.323 arquivos .md
```

### 1.3 Estrutura de Tags Temáticas

```
src/content/tags/
├── amor/                    (devocional.md + oracao.md)
├── ansiedade/               (devocional.md + oracao.md)
├── batalha/                 (devocional.md + oracao.md)
├── depressao/               (devocional.md + oracao.md)
├── desemprego/              (devocional.md + oracao.md)
├── dividas/                 (devocional.md + oracao.md)
├── doenca-morte/            (devocional.md + oracao.md)
├── duvida/                  (devocional.md + oracao.md)
├── esperanca/               (devocional.md + oracao.md)
├── frustracao/              (devocional.md + oracao.md)
├── futuro/                  (devocional.md + oracao.md)
├── insonia/                 (devocional.md + oracao.md)
├── luto/                    (devocional.md + oracao.md)
├── medo/                    (devocional.md + oracao.md)
├── mudanca/                 (devocional.md + oracao.md)
├── perdao/                  (devocional.md + oracao.md)
├── separacao/               (devocional.md + oracao.md)
├── solidao/                 (devocional.md + oracao.md)
├── sonho/                   (devocional.md + oracao.md)
└── vicio/                   (devocional.md + oracao.md)

Total: 20 temas × 2 conteúdos = 40 arquivos .md
```

---

## 2. TECNOLOGIAS E STACK

### 2.1 Frontend Framework
- **React** 19.2.1 (última versão estável)
- **React DOM** 19.2.1
- **React Router DOM** 7.9.5 (roteamento completo implementado)
- **React Icons** 5.5.0

### 2.2 Build Tool e Bundler
- **Vite** 5.0.0 (build tool ultra-rápido)
- **@vitejs/plugin-react** 5.0.4

### 2.3 Styling
- **Tailwind CSS** 4.1.16 (última versão)
- **@tailwindcss/postcss** 4.1.16
- **PostCSS** 8.5.6
- **Autoprefixer** 10.4.21

### 2.4 Markdown Processing
- **gray-matter** 4.0.3 (parsing de front-matter)
- **gray-matter-browser** 4.0.4 (versão browser)
- **markdown-it** 14.1.0 (conversão MD → HTML)

### 2.5 Code Quality
- **ESLint** 9.36.0 (linting)
- **Prettier** 3.1.0 (formatação de código)
- **Vitest** 0.34.6 (framework de testes)

### 2.6 Tipografia e Design
- **Playfair Display** (Google Fonts) - Títulos e elementos serif
- **Inter** (Google Fonts) - Corpo do texto
- **Mile Heights** (Custom Font) - Logo e elementos especiais

### 2.7 Cores do Design System
- **Dourado Principal**: #D4AF37
- **Cinza Secundário**: #718096
- **Background**: Gradientes escuros (#0a0a0a → #1a1a1a)
- **Bordas**: rgba(212, 175, 55, 0.2)

---

## 3. COMPONENTES REACT (23 COMPONENTES)

### 3.1 Componentes de Navegação
| Componente | Arquivo | Descrição | Status |
|-----------|---------|-----------|--------|
| **NavBar** | NavBar.jsx + NavBar.css | Barra de navegação principal com efeitos "palavra-lâmpada" | ✓ Ativo |
| **AccordionLivros** | AccordionLivros.jsx | Accordion expansível para navegação por livros bíblicos | ✓ Ativo |
| **IndiceBiblico** | IndiceBiblico.jsx | Índice completo da Bíblia com busca e filtros | ✓ Ativo |

### 3.2 Componentes de Conteúdo
| Componente | Arquivo | Descrição | Status |
|-----------|---------|-----------|--------|
| **ArticleCard** | ArticleCard.jsx | Card de artigo com spotlight effect e animações | ✓ Ativo |
| **ArtigoBiblico** | ArtigoBiblico.jsx | Renderização de artigos bíblicos com markdown | ✓ Ativo |
| **PostGrid** | PostGrid.jsx | Grid responsivo de posts | ✓ Ativo |
| **PostWrapper** | PostWrapper.jsx | Wrapper com contexto para posts | ✓ Ativo |

### 3.3 Componentes de Homepage
| Componente | Arquivo | Descrição | Status |
|-----------|---------|-----------|--------|
| **ReflexaoDiaria** | ReflexaoDiaria.jsx | Cards de versículo e pensamento do dia | ✓ Ativo |
| **ConteudoDoDia** | ConteudoDoDia.jsx | Seção de conteúdo destacado diário | ✓ Ativo |
| **OracaoDoDia** | OracaoDoDia.jsx | Oração do dia com efeitos visuais | ✓ Ativo |
| **VersiculoDestaque** | VersiculoDestaque.jsx | Card de versículo em destaque | ✓ Ativo |
| **CarrosselTags** | CarrosselTags.jsx | Carrossel de tags temáticas | ✓ Ativo |

### 3.4 Componentes Especializados
| Componente | Arquivo | Descrição | Status |
|-----------|---------|-----------|--------|
| **CalendarioMensal** | CalendarioMensal.jsx | Calendário de leituras mensais | ✓ Ativo |
| **CaixinhaOracoes** | CaixinhaOracoes.jsx | Caixa de orações por tema | ✓ Ativo |
| **TemasLoader** | TemasLoader.jsx | Carregador dinâmico de temas da vida | ✓ Ativo |
| **ArvoreDePostagens** | ArvoreDePostagens.jsx | Árvore expansível de posts categorizados | ✓ Ativo |

### 3.5 Componentes de Layout
| Componente | Arquivo | Descrição | Status |
|-----------|---------|-----------|--------|
| **Footer** | Footer.jsx | Rodapé com links e informações | ✓ Ativo |
| **TemplateLateral** | TemplateLateral.jsx | Template com barra lateral | ✓ Ativo |
| **PageTransition** | PageTransition.jsx | Wrapper de transição entre páginas | ✓ Ativo |
| **ScrollToTop** | ScrollToTop.jsx | Componente para scroll automático ao topo | ✓ Ativo |

### 3.6 Componentes Editoriais
| Componente | Diretório | Descrição | Status |
|-----------|-----------|-----------|--------|
| **Editorial** | components/editorial/ | Componentes editoriais especializados | ✓ Ativo |
| **EditorialGrid** | EditorialGrid.jsx | Grid de conteúdo editorial | ✓ Ativo |

### 3.7 Arquivos de Backup Identificados
⚠️ **ArvoreDePostagens.jsx.backup** - Pode ser removido após confirmação

---

## 4. PÁGINAS (16 PÁGINAS + 1 SUBDIRETÓRIO)

### 4.1 Páginas Principais
| Página | Arquivo | Rota | Descrição |
|--------|---------|------|-----------|
| **Home** | Home.jsx | / | Homepage com cards, reflexão diária e destaques |
| **CaminhoDasEscrituras** | CaminhoDasEscrituras.jsx | /caminho-das-escrituras | Navegação por livros e capítulos bíblicos |
| **EscadariaDoConhecimento** | EscadariaDoConhecimento.jsx | /escadaria-do-conhecimento | Estudos teológicos organizados |
| **TemasDaVida** | TemasDaVida.jsx | /temas-da-vida | 20 temas existenciais com devocionais e orações |
| **DevocionalDiaria** | DevocionalDiaria.jsx | /devocional-diaria | Devocional diário com reflexões |
| **Oracoes** | Oracoes.jsx | /oracoes | Biblioteca de orações organizadas |
| **Calendario** | Calendario.jsx | /calendario | Calendário de leituras (versão legada) |
| **CalendarioNovo** | CalendarioNovo.jsx | /calendario-novo | Calendário de leituras (nova versão) |
| **Biblioteca** | Biblioteca.jsx | /biblioteca | Acervo completo de conteúdos |

### 4.2 Páginas de Post e Template
| Página | Arquivo | Rota | Descrição |
|--------|---------|------|-----------|
| **Post** | Post.jsx | /post/:slug | Página individual de post (genérica) |
| **PostPage** | PostPage.jsx | /biblia/:livro/:capitulo/:tipo | Página de post bíblico específico |
| **TemplateSeccao** | TemplateSeccao.jsx | - | Template genérico para seções |

### 4.3 Páginas Administrativas e Utilitárias
| Página | Arquivo | Rota | Descrição |
|--------|---------|------|-----------|
| **AdminPublish** | AdminPublish.jsx | /admin/publish | Painel administrativo de publicação |
| **Contato** | Contato.jsx | /contato | Formulário de contato |
| **PaginaNaoEncontrada** | PaginaNaoEncontrada.jsx | /404 | Página de erro 404 |

### 4.4 Subdiretório Especial
| Subdiretório | Descrição |
|-------------|-----------|
| **HomeView/** | Componentes modulares da homepage (divisão da Home.jsx) |

### 4.5 Arquivos de Backup Identificados
⚠️ **DevocionalDiaria.jsx.backup** - Pode ser removido após confirmação

---

## 5. UTILITÁRIOS (12 ARQUIVOS)

### 5.1 Loaders de Conteúdo Bíblico
| Arquivo | Descrição | Método |
|---------|-----------|--------|
| **loadBiblePosts.js** | Carrega todas as 7 facetas de um capítulo específico | Lazy glob com cache |
| **loadBibleByTag.js** | Carrega posts bíblicos filtrados por tag temática | Glob + filtro por tag |
| **loadSinglePost.js** | Carrega um único post por slug ou path | Direct import |

### 5.2 Loaders de Índices e Orações
| Arquivo | Descrição | Método |
|---------|-----------|--------|
| **loadHomePosts.js** | Carrega posts destacados para homepage | Lê home-index.json |
| **loadDevocionaisHome.js** | Carrega devocionais em destaque para home | Filtro específico |
| **loadOracoes.js** | Carrega orações por tema | Lê oracao-index.json |
| **getTodasOracoes.js** | Obtém todas as orações do sistema | Lê oracoes-index.json |

### 5.3 Loaders de Posts Genéricos
| Arquivo | Descrição | Método |
|---------|-----------|--------|
| **getAllPosts.js** | Carrega todos os posts do sistema | Glob recursivo |

### 5.4 Processadores e Mapeadores
| Arquivo | Descrição | Método |
|---------|-----------|--------|
| **markdownProcessor.js** | Processa markdown → HTML + front-matter | markdown-it + parser custom |
| **mapearLivros.js** | Mapeia IDs de livros para nomes de pastas | Baseado em livrosSBB.js |

### 5.5 Arquivos de Backup Identificados
⚠️ **loadBibleByTag.js.backup** - Pode ser removido
⚠️ **loadBibleByTag.js.broken** - Pode ser removido

---

## 6. SCRIPTS DE BUILD (5 SCRIPTS)

### 6.1 Scripts de Geração de Índices

#### build-tag-index.mjs
**Função**: Gera índice JSON mapeando tags → arquivos markdown
**Output**: `src/data/tag-index.json`
**Execução**: Automaticamente em `predev` e `prebuild`
**Tecnologia**: Node.js + ES Modules + Custom Front-matter Parser

**Funcionamento**:
```javascript
// Varre recursivamente src/content/biblia/**/*.md
// Extrai tags do front-matter
// Gera estrutura:
{
  "mudanca": [
    { "path": "/src/content/biblia/genesis/01/devocional-01.md", "slug": "genesis-01-devocional" }
  ],
  "esperanca": [ ... ]
}
```

#### build-home-index.mjs
**Função**: Gera índice de posts destacados para homepage
**Output**: `src/data/home-index.json`
**Execução**: Automaticamente em `predev` e `prebuild`

#### build-oracao-index.mjs
**Função**: Gera índice de orações organizadas por tema
**Output**: `src/data/oracao-index.json`
**Execução**: Automaticamente em `prebuild`

#### build-oracoes-index.mjs
**Função**: Gera índice completo de todas as orações do sistema
**Output**: `src/data/oracoes-index.json`
**Execução**: Automaticamente em `prebuild`

**Nota**: Parece haver duplicação com `build-oracao-index.mjs`. Recomenda-se auditoria para consolidar.

### 6.2 Scripts de Manutenção

#### preencherFrontMatterBiblia.mjs
**Função**: Preenche ou atualiza metadados (front-matter) em arquivos markdown da bíblia
**Uso**: Manual (quando necessário adicionar/atualizar campos)
**Tecnologia**: Node.js + fs + Custom Parser

**Campos Preenchidos**:
```yaml
---
slug: "genesis-01-devocional"
titulo: "Título do Conteúdo"
tipo: "devocional"
origem: "biblia"
livro: "genesis"
capitulo: "01"
data: "2025-12-25"
autor: "Capelão Nascente"
readTime: "8 min de leitura"
imageUrl: ""
tema_principal: "luz, ordem e repouso"
tags: ["mudanca", "medo", "esperanca"]
---
```

---

## 7. DADOS ESTÁTICOS E ÍNDICES

### 7.1 Arquivos de Dados em src/data/

| Arquivo | Tipo | Tamanho | Descrição |
|---------|------|---------|-----------|
| **livrosSBB.js** | JavaScript | ~10KB | Lista canônica dos 66 livros da Bíblia com metadados |
| **versiculos-nvi.js** | JavaScript | ~1.28MB | Base completa de versículos da NVI |
| **tagsMap.js** | JavaScript | ~1KB | Mapeamento de slugs de tags |
| **temasDaVidaMap.js** | JavaScript | ~1KB | Mapeamento dos 20 temas da vida |

### 7.2 Índices JSON Gerados Automaticamente

| Arquivo | Tipo | Tamanho | Gerado Por | Descrição |
|---------|------|---------|------------|-----------|
| **tag-index.json** | JSON | ~19KB | build-tag-index.mjs | Índice tags → posts bíblicos |
| **home-index.json** | JSON | ~1.6KB | build-home-index.mjs | Posts destacados homepage |
| **oracao-index.json** | JSON | ~2.8KB | build-oracao-index.mjs | Orações organizadas por tema |
| **oracoes-index.json** | JSON | ~103KB | build-oracoes-index.mjs | Todas as orações do sistema |

---

## 8. FRONT-MATTER PADRÃO

### 8.1 Front-Matter de Post Bíblico
```yaml
---
slug: "genesis-01-devocional"              # Identificador único
titulo: "Quando a Vida Está Sem Forma e Vazia"  # Título do conteúdo
tipo: "devocional"                         # Tipo: devocional | estudo-tematico | mensagem-pastoral | oracao | etc
origem: "biblia"                           # Origem: biblia | tag
livro: "genesis"                           # Nome do livro (lowercase, sem acentos)
capitulo: "01"                             # Número do capítulo (zero-padded)
data: "2025-12-25"                         # Data de publicação/atualização
autor: "Capelão Nascente"                  # Autor do conteúdo
readTime: "8 min de leitura"               # Tempo estimado de leitura
imageUrl: ""                               # URL da imagem de destaque (opcional)
tema_principal: "luz, ordem e repouso"     # Tema principal do conteúdo
tags: ["mudanca", "medo", "esperanca"]     # Array de tags temáticas
---
```

### 8.2 Front-Matter de Tag Temática
```yaml
---
slug: "mudanca-devocional"                 # Identificador único
titulo: "Abraçando as Mudanças da Vida"   # Título do conteúdo
tipo: "devocional"                         # Tipo: devocional | oracao
origem: "tag"                              # Sempre "tag" para conteúdos de tags
tag: "mudanca"                             # Tag principal
data: "2025-11-27"                         # Data de criação
autor: "Equipe PLC"                        # Autor
readTime: "5 min de leitura"               # Tempo de leitura
imageUrl: ""                               # Imagem (opcional)
tema_principal: "transformação e adaptação" # Tema
tags: ["mudanca", "esperanca"]             # Tags relacionadas
---
```

---

## 9. ORDEM CANÔNICA DE FACETAS (MENU BAR)

Conforme definido em `loadBiblePosts.js`, a ordem de exibição das facetas segue:

```javascript
export const ORDEM_FACETAS = [
  // === HOMILIA ===
  "pregacao-tecnica",         // ou "exposicao-homiletica"
  "mensagem-pastoral",

  // === ESTUDOS ===
  "estudo-tematico",
  "terminologias-chave",      // ou "terminologias"
  "temas-controversos",

  // === DEVOCIONAL DIÁRIA ===
  "devocional",

  // === ORAÇÃO ===
  "oracao",
];
```

**Mapeamento de Arquivos**:
- `exposicao-homiletica.md` → "pregacao-tecnica"
- `terminologias.md` → "terminologias-chave"
- `devocional-01.md` → "devocional"

---

## 10. SISTEMA DE ROTEAMENTO

### 10.1 Rotas Principais
```javascript
/                                    → Home.jsx
/caminho-das-escrituras              → CaminhoDasEscrituras.jsx
/escadaria-do-conhecimento           → EscadariaDoConhecimento.jsx
/temas-da-vida                       → TemasDaVida.jsx
/devocional-diaria                   → DevocionalDiaria.jsx
/oracoes                             → Oracoes.jsx
/calendario                          → Calendario.jsx
/calendario-novo                     → CalendarioNovo.jsx
/biblioteca                          → Biblioteca.jsx
/contato                             → Contato.jsx
```

### 10.2 Rotas Dinâmicas
```javascript
/post/:slug                          → Post.jsx (posts genéricos)
/biblia/:livro/:capitulo/:tipo       → PostPage.jsx (posts bíblicos)
/admin/publish                       → AdminPublish.jsx (admin)
/*                                   → PaginaNaoEncontrada.jsx (404)
```

### 10.3 Exemplos de Rotas Dinâmicas
```
/biblia/genesis/01/devocional        → Devocional de Gênesis 1
/biblia/genesis/01/estudo-tematico   → Estudo Temático de Gênesis 1
/biblia/genesis/01/oracao            → Oração de Gênesis 1
/post/mudanca-devocional             → Devocional do tema Mudança
```

---

## 11. SCRIPTS NPM DISPONÍVEIS

### 11.1 Scripts de Desenvolvimento
```bash
npm run dev                # Inicia servidor de desenvolvimento Vite
                           # Executa predev primeiro (gera índices)
                           # Porta: 5173 (default Vite)
                           # Hot Module Replacement ativo
```

### 11.2 Scripts de Build
```bash
npm run build              # Build de produção
                           # Executa prebuild primeiro:
                           #   - build-tag-index.mjs
                           #   - build-home-index.mjs
                           #   - build-oracao-index.mjs
                           # Output: dist/

npm run preview            # Preview da build de produção
                           # Serve o conteúdo de dist/
```

### 11.3 Scripts de Qualidade de Código
```bash
npm run lint               # ESLint em src/ (--ext js,jsx)
                           # max-warnings 0 (nenhum warning permitido)

npm run format             # Prettier em src/**/*.{js,jsx,css}
                           # Formata código automaticamente
```

### 11.4 Scripts de Manutenção
```bash
npm run clean              # Remove node_modules e package-lock.json
                           # Reinstala dependências (npm install)

npm run test               # Executa testes com Vitest
                           # (Nenhum teste implementado atualmente)
```

### 11.5 Scripts de Índices (Manuais)
```bash
npm run index-tags         # Gera tag-index.json manualmente
                           # Útil para debug ou regeneração
```

---

## 12. CONFIGURAÇÕES DO PROJETO

### 12.1 vite.config.js
```javascript
// Principais Configurações:
- Plugin React habilitado (@vitejs/plugin-react)
- Alias '@' → src/ (permite imports como @/components/...)
- Server:
  - Porta: 5173
  - Auto-open browser: true
  - Host: true (permite acesso externo)
- Build:
  - Minify: true
  - Sourcemap: true
  - ManualChunks: react-vendor separado (otimização)
```

### 12.2 tailwind.config.js
```javascript
// Principais Configurações:
- Content paths: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"]
- Cores customizadas:
  - primary: #1a365d (azul escuro)
  - secondary: #718096 (cinza)
  - dourado: #D4AF37 (ouro)
- Font family:
  - sans: Inter (Google Fonts)
  - serif: Playfair Display (Google Fonts)
- Animações customizadas (fadeGlow, float, spin-slow)
```

### 12.3 package.json
```json
{
  "name": "PensoLogoCreio",
  "version": "1.0.0",
  "type": "module",
  "private": true
}
```

**Nota**: Versão em package.json é 1.0.0, mas projeto está em v10.1 baseado nos commits Git.

---

## 13. ESTATÍSTICAS DO PROJETO

### 13.1 Métricas de Código

| Métrica | Valor |
|---------|-------|
| Total de Arquivos Markdown | 8.323 |
| Total de Arquivos JSX | 51 |
| Total de Arquivos JS | 23 |
| Total de Linhas de Código (Components/Pages/Utils) | ~6.282 |
| Livros Bíblicos | 66 |
| Capítulos Totais da Bíblia | ~1.189 |
| Facetas por Capítulo | 7 |
| Tags Temáticas | 20 |
| Componentes React | 23 |
| Páginas | 16 + 1 subdiretório |
| Utilitários | 12 |
| Scripts de Build | 5 |

### 13.2 Métricas de Tamanho

| Diretório | Tamanho |
|-----------|---------|
| src/ | 231 MB |
| public/ | 188 MB |
| scripts/ | 36 KB |
| **Total do Projeto** | **~420 MB** |

### 13.3 Distribuição de Conteúdo

| Tipo de Conteúdo | Quantidade |
|------------------|------------|
| Devocionais Bíblicos | ~1.189 arquivos |
| Estudos Temáticos | ~1.189 arquivos |
| Exposições Homiléticas | ~1.189 arquivos |
| Mensagens Pastorais | ~1.189 arquivos |
| Orações Bíblicas | ~1.189 arquivos |
| Temas Controversos | ~1.189 arquivos |
| Terminologias | ~1.189 arquivos |
| Devocionais de Tags | 20 arquivos |
| Orações de Tags | 20 arquivos |
| **Total de Arquivos .md** | **8.363** |

---

## 14. DEPENDÊNCIAS DO PROJETO

### 14.1 Dependências de Produção (6)
```json
{
  "@dataconnect/generated": "file:src/dataconnect-generated",
  "gray-matter": "^4.0.3",
  "gray-matter-browser": "^4.0.4",
  "markdown-it": "^14.1.0",
  "react": "^19.2.1",
  "react-dom": "^19.2.1",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.9.5"
}
```

### 14.2 DevDependencies (15)
```json
{
  "@eslint/js": "^9.36.0",
  "@tailwindcss/postcss": "^4.1.16",
  "@types/react": "^19.1.16",
  "@types/react-dom": "^19.1.9",
  "@vitejs/plugin-react": "^5.0.4",
  "autoprefixer": "^10.4.21",
  "connect-history-api-fallback": "^2.0.0",
  "eslint": "^9.36.0",
  "eslint-config-prettier": "^9.0.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.22",
  "globals": "^16.4.0",
  "postcss": "^8.5.6",
  "prettier": "^3.1.0",
  "tailwindcss": "^4.1.16",
  "vite": "^5.0.0",
  "vitest": "^0.34.6"
}
```

---

## 15. FLUXO DE DESENVOLVIMENTO

### 15.1 Workflow de Desenvolvimento
```
1. npm run dev
   ↓
2. Scripts predev executam automaticamente:
   - build-tag-index.mjs → tag-index.json
   - build-home-index.mjs → home-index.json
   ↓
3. Vite inicia servidor dev (porta 5173)
   ↓
4. HMR (Hot Module Replacement) ativo
   ↓
5. Modificações em .jsx/.md recarregam automaticamente
```

### 15.2 Workflow de Build
```
1. npm run build
   ↓
2. Scripts prebuild executam automaticamente:
   - build-tag-index.mjs → tag-index.json
   - build-home-index.mjs → home-index.json
   - build-oracao-index.mjs → oracao-index.json
   ↓
3. Vite realiza build de produção:
   - Minificação de código
   - Tree-shaking
   - Code splitting (react-vendor)
   - Geração de sourcemaps
   ↓
4. Output gerado em dist/
   ↓
5. npm run preview (opcional)
   - Serve conteúdo de dist/ para validação
```

### 15.3 Workflow de Adição de Conteúdo Bíblico
```
1. Criar estrutura: src/content/biblia/{livro}/{capitulo}/
   ↓
2. Criar 7 arquivos .md:
   - devocional-01.md
   - estudo-tematico.md
   - exposicao-homiletica.md
   - mensagem-pastoral.md
   - oracao.md
   - temas-controversos.md
   - terminologias.md
   ↓
3. (Opcional) Executar preencherFrontMatterBiblia.mjs
   - Preenche metadados automaticamente
   ↓
4. npm run dev ou npm run build
   - Índices são regenerados automaticamente
   - Novo conteúdo fica disponível imediatamente
```

---

## 16. OTIMIZAÇÕES IMPLEMENTADAS

### 16.1 Performance de Carregamento
- **Lazy Loading**: Todos os loaders usam `import.meta.glob()` com lazy import
- **Caching**: Sistema de cache em `loadBiblePosts.js` para evitar recarregamentos
- **Code Splitting**: React vendor separado em chunk próprio
- **Tree Shaking**: Vite remove código não utilizado automaticamente

### 16.2 Otimizações de Build
- **Minificação**: JavaScript e CSS minificados em produção
- **Sourcemaps**: Gerados para debugging (podem ser desabilitados em produção final)
- **Asset Optimization**: Imagens e assets otimizados pelo Vite

### 16.3 Otimizações de Índices
- **Índices Pré-Gerados**: tag-index.json, home-index.json, etc gerados em build time
- **Busca O(1)**: Lookups em índices JSON são instantâneos
- **Front-Matter Parsing**: Parser customizado mais rápido que gray-matter completo

---

## 17. PROBLEMAS CONHECIDOS E PONTOS DE ATENÇÃO

### 17.1 Arquivos de Backup
⚠️ Existem arquivos `.backup` e `.broken` que devem ser revisados:
- `ArvoreDePostagens.jsx.backup`
- `DevocionalDiaria.jsx.backup`
- `loadBibleByTag.js.backup`
- `loadBibleByTag.js.broken`

**Ação Recomendada**: Verificar se ainda são necessários e remover se não.

### 17.2 Scripts Duplicados
⚠️ Possível duplicação entre:
- `build-oracao-index.mjs`
- `build-oracoes-index.mjs`

**Ação Recomendada**: Auditar e consolidar se forem redundantes.

### 17.3 Versão do Package.json
⚠️ package.json mostra version: "1.0.0", mas projeto está em v10.1 por commits Git.

**Ação Recomendada**: Atualizar package.json para refletir versão real ou estabelecer convenção clara.

### 17.4 Vitest Desatualizado
⚠️ Vitest está na versão 0.34.6 (muito antiga, atual é 1.x+).

**Ação Recomendada**: Atualizar para ^1.0.0+ ou superior.

---

## 18. ROADMAP FUTURO (SUGESTÕES)

### 18.1 Curto Prazo
- [ ] Publicar Genesis capítulos 11-50 (39 capítulos restantes)
- [ ] Atualizar package.json para v10.2 ou v11.0
- [ ] Remover arquivos de backup após validação
- [ ] Consolidar scripts de índice de orações

### 18.2 Médio Prazo
- [ ] Publicar Êxodo completo (40 capítulos × 7 facetas)
- [ ] Implementar sistema de busca full-text
- [ ] Adicionar mais tags temáticas (de 20 para 40)
- [ ] Implementar testes com Vitest atualizado

### 18.3 Longo Prazo
- [ ] Completar toda a Bíblia (1.189 capítulos × 7 facetas)
- [ ] Implementar sistema de comentários
- [ ] Adicionar áudio-narração dos devocionais
- [ ] Criar aplicativo mobile (React Native)
- [ ] Integração com Firebase para autenticação e favoritos

---

## 19. GUIA DE MANUTENÇÃO

### 19.1 Como Adicionar um Novo Livro Bíblico
```bash
# 1. Criar estrutura de pastas
mkdir -p src/content/biblia/{livro}/{01..XX}

# 2. Para cada capítulo, criar 7 arquivos:
touch src/content/biblia/{livro}/01/{devocional-01.md,estudo-tematico.md,exposicao-homiletica.md,mensagem-pastoral.md,oracao.md,temas-controversos.md,terminologias.md}

# 3. Preencher front-matter
node scripts/preencherFrontMatterBiblia.mjs

# 4. Escrever conteúdo markdown

# 5. Build regenera índices automaticamente
npm run dev
```

### 19.2 Como Adicionar uma Nova Tag Temática
```bash
# 1. Criar pasta da tag
mkdir src/content/tags/{nova-tag}

# 2. Criar 2 arquivos obrigatórios
touch src/content/tags/{nova-tag}/{devocional.md,oracao.md}

# 3. Preencher front-matter manualmente

# 4. Adicionar em src/data/temasDaVidaMap.js

# 5. Regenerar índices
npm run build
```

### 19.3 Como Atualizar Dependências
```bash
# Verificar dependências desatualizadas
npm outdated

# Atualizar todas (com cuidado)
npm update

# Atualizar específica
npm install react@latest react-dom@latest

# Testar após atualização
npm run dev
npm run build
npm run lint
```

---

## 20. CONTATOS E RECURSOS

### 20.1 Equipe
- **Autor Principal**: Capelão Nascente
- **Equipe de Conteúdo**: Equipe PLC

### 20.2 Recursos Externos
- **Vite**: https://vitejs.dev/
- **React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Markdown-it**: https://markdown-it.github.io/

---

**Documentação Gerada em**: 2025-12-25
**Versão da Documentação**: 1.0
**Status**: COMPLETA E ATUALIZADA COM A REALIDADE DO CÓDIGO
**Última Refatoração**: Genesis 01-10 (Dezembro 2025)
