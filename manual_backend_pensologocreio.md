# MANUAL BACKEND - PENSO LOGO CREIO
## Guia Técnico de Scripts, Loaders e Processadores

---

## ÍNDICE

1. [Visão Geral do Backend](#1-visão-geral-do-backend)
2. [Scripts de Build](#2-scripts-de-build)
3. [Sistema de Loaders](#3-sistema-de-loaders)
4. [Processador de Markdown](#4-processador-de-markdown)
5. [Sistema de Dados Estáticos](#5-sistema-de-dados-estáticos)
6. [Sistema de Índices JSON](#6-sistema-de-índices-json)
7. [Front-Matter e Metadados](#7-front-matter-e-metadados)
8. [Fluxos de Dados](#8-fluxos-de-dados)
9. [Otimizações e Cache](#9-otimizações-e-cache)
10. [Debugging e Troubleshooting](#10-debugging-e-troubleshooting)

---

## 1. VISÃO GERAL DO BACKEND

### 1.1 Arquitetura do Sistema

O "backend" do Penso Logo Creio é **serverless** e baseado em:
- **Build-time Processing**: Scripts Node.js geram índices JSON antes do build
- **Client-side Loading**: Loaders React carregam conteúdo markdown dinamicamente
- **Static Site Generation**: Vite faz o bundle de tudo para arquivos estáticos

```
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITETURA BACKEND                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BUILD TIME (Node.js)         │  RUN TIME (Browser)        │
│  ─────────────────────────────┼────────────────────────    │
│                               │                             │
│  Scripts de Build:            │  Loaders React:            │
│  • build-tag-index.mjs        │  • loadBiblePosts.js       │
│  • build-home-index.mjs       │  • loadBibleByTag.js       │
│  • build-oracao-index.mjs     │  • loadOracoes.js          │
│                               │  • getAllPosts.js          │
│         ↓                     │         ↓                  │
│                               │                             │
│  Índices JSON:                │  markdown-it:              │
│  • tag-index.json             │  • Parse .md → HTML        │
│  • home-index.json            │  • Front-matter extraction │
│  • oracao-index.json          │  • Lazy loading            │
│                               │                             │
│         ↓                     │         ↓                  │
│                               │                             │
│  src/data/                    │  Componentes React         │
│  • 8.323 arquivos .md         │  • ArtigoBiblico.jsx       │
│  • 66 livros × 1.189 caps     │  • PostPage.jsx            │
│                               │  • CaminhoDasEscrituras    │
│                               │                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Fluxo de Dados Completo

```
1. Desenvolvedor escreve .md em src/content/biblia/{livro}/{cap}/
                    ↓
2. npm run dev ou npm run build
                    ↓
3. Scripts pre* executam (predev ou prebuild)
   → build-tag-index.mjs escaneia todos .md
   → Extrai tags do front-matter
   → Gera tag-index.json
                    ↓
4. Vite inicia (dev) ou faz bundle (build)
   → import.meta.glob() mapeia todos .md
   → Lazy loading configurado
                    ↓
5. Usuário navega para /biblia/genesis/01/devocional
                    ↓
6. PostPage.jsx chama loadBiblePosts("genesis", "01")
                    ↓
7. loadBiblePosts:
   → Verifica cache (Map)
   → Se não cached, usa glob lazy para carregar .md
   → Passa por parseFrontmatter()
   → Passa por markdownToHtml()
   → Retorna objeto com data + html
                    ↓
8. ArtigoBiblico.jsx renderiza HTML
   → dangerouslySetInnerHTML (sanitizado)
   → Animações e estilos aplicados
                    ↓
9. Usuário vê conteúdo formatado
```

---

## 2. SCRIPTS DE BUILD

### 2.1 build-tag-index.mjs

**Localização**: `scripts/build-tag-index.mjs`
**Execução**: Automaticamente em `predev` e `prebuild`
**Output**: `src/data/tag-index.json`

#### Funcionamento Detalhado

```javascript
#!/usr/bin/env node
/**
 * PensoLogoCreio - Tag Index Generator v2
 * Gera índice JSON de tags → {path, slug} para lookup 100% confiável
 */

// PASSO 1: Configuração de Caminhos
const BIBLIA_DIR = path.join(__dirname, '../src/content/biblia');
const OUTPUT_FILE = path.join(__dirname, '../src/data/tag-index.json');

// PASSO 2: Parser Customizado de Front-Matter
function parseFrontmatter(raw) {
  // Extrai bloco entre --- e ---
  // Parseia cada linha "key: value"
  // Suporta arrays: tags: ["a", "b", "c"]
  // Retorna { data, content }
}

// PASSO 3: Indexador Recursivo
function indexTags(dir) {
  const tagIndex = {};

  // Percorre recursivamente todos os diretórios
  fs.readdirSync(dir).forEach(item => {
    const fullPath = path.join(dir, item);

    if (isDirectory(fullPath)) {
      // Recursão em subdiretórios
      const subIndex = indexTags(fullPath);
      // Merge com tagIndex principal
    } else if (item.endsWith('.md')) {
      // Lê arquivo .md
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { data } = parseFrontmatter(raw);

      // Se tem tags no front-matter
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach(tag => {
          if (!tagIndex[tag]) tagIndex[tag] = [];

          // Adiciona ao índice
          tagIndex[tag].push({
            path: fullPath,
            slug: data.slug || 'sem-slug'
          });
        });
      }
    }
  });

  return tagIndex;
}

// PASSO 4: Execução Principal
const index = indexTags(BIBLIA_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
console.log(`✓ Tag index gerado: ${Object.keys(index).length} tags`);
```

#### Estrutura do tag-index.json Gerado

```json
{
  "mudanca": [
    {
      "path": "/home/.../src/content/biblia/genesis/01/devocional-01.md",
      "slug": "genesis-01-devocional"
    },
    {
      "path": "/home/.../src/content/biblia/genesis/03/devocional-01.md",
      "slug": "genesis-03-devocional"
    }
  ],
  "esperanca": [
    { "path": "...", "slug": "genesis-01-devocional" },
    { "path": "...", "slug": "genesis-05-oracao" }
  ],
  "medo": [ ... ]
}
```

#### Uso do Índice

```javascript
// Em loadBibleByTag.js
import tagIndex from '@/data/tag-index.json';

export async function loadBibleByTag(tag) {
  const entries = tagIndex[tag] || [];

  // Para cada entrada, carregar o .md correspondente
  const posts = await Promise.all(
    entries.map(entry => loadMarkdown(entry.path))
  );

  return posts;
}
```

---

### 2.2 build-home-index.mjs

**Localização**: `scripts/build-home-index.mjs`
**Execução**: Automaticamente em `predev` e `prebuild`
**Output**: `src/data/home-index.json`

#### Funcionamento

```javascript
/**
 * Seleciona posts destacados para homepage
 * Critérios:
 * - Posts marcados com destaque: true
 * - Posts recentes (últimos 7 dias)
 * - Posts com alto readTime (conteúdo rico)
 */

function buildHomeIndex() {
  const allPosts = scanAllPosts();

  const featured = allPosts.filter(post => {
    return post.data.destaque === true ||
           isRecent(post.data.data) ||
           post.data.readTime > '10 min';
  });

  // Ordena por data (mais recente primeiro)
  featured.sort((a, b) => new Date(b.data.data) - new Date(a.data.data));

  // Limita a 12 posts
  return featured.slice(0, 12);
}
```

#### Estrutura do home-index.json

```json
[
  {
    "slug": "genesis-01-devocional",
    "titulo": "Quando a Vida Está Sem Forma e Vazia",
    "tipo": "devocional",
    "livro": "genesis",
    "capitulo": "01",
    "data": "2025-12-25",
    "readTime": "8 min de leitura",
    "tags": ["mudanca", "medo", "esperanca"]
  },
  { ... }
]
```

---

### 2.3 build-oracao-index.mjs

**Localização**: `scripts/build-oracao-index.mjs`
**Execução**: Automaticamente em `prebuild`
**Output**: `src/data/oracao-index.json`

#### Funcionamento

```javascript
/**
 * Indexa orações por tema da vida
 * Escaneia src/content/tags/{tema}/oracao.md
 */

function buildOracaoIndex() {
  const TAGS_DIR = path.join(__dirname, '../src/content/tags');
  const oracoes = {};

  fs.readdirSync(TAGS_DIR).forEach(tema => {
    const oracaoPath = path.join(TAGS_DIR, tema, 'oracao.md');

    if (fs.existsSync(oracaoPath)) {
      const raw = fs.readFileSync(oracaoPath, 'utf-8');
      const { data, content } = parseFrontmatter(raw);

      oracoes[tema] = {
        slug: data.slug,
        titulo: data.titulo,
        path: oracaoPath,
        preview: content.slice(0, 200) + '...'
      };
    }
  });

  return oracoes;
}
```

#### Estrutura do oracao-index.json

```json
{
  "mudanca": {
    "slug": "mudanca-oracao",
    "titulo": "Oração pela Aceitação das Mudanças",
    "path": "/src/content/tags/mudanca/oracao.md",
    "preview": "Senhor, ajude-me a confiar em Ti durante as mudanças..."
  },
  "medo": { ... },
  "ansiedade": { ... }
}
```

---

### 2.4 build-oracoes-index.mjs

**Localização**: `scripts/build-oracoes-index.mjs`
**Execução**: Automaticamente em `prebuild`
**Output**: `src/data/oracoes-index.json` (103KB)

#### Funcionamento

```javascript
/**
 * Indexa TODAS as orações do sistema
 * Inclui:
 * - Orações bíblicas (src/content/biblia/.../oracao.md)
 * - Orações de tags (src/content/tags/.../oracao.md)
 */

function buildOracoesIndex() {
  const oracoes = [];

  // Escaneia orações bíblicas
  const bibliaOracoes = scanDirectory('src/content/biblia', 'oracao.md');

  // Escaneia orações de tags
  const tagsOracoes = scanDirectory('src/content/tags', 'oracao.md');

  // Combina tudo
  return [...bibliaOracoes, ...tagsOracoes];
}
```

#### Estrutura do oracoes-index.json

```json
[
  {
    "slug": "genesis-01-oracao",
    "titulo": "Oração pela Ordem no Caos",
    "tipo": "oracao",
    "origem": "biblia",
    "livro": "genesis",
    "capitulo": "01",
    "path": "/src/content/biblia/genesis/01/oracao.md",
    "tags": ["mudanca", "esperanca"]
  },
  {
    "slug": "mudanca-oracao",
    "titulo": "Oração pela Aceitação das Mudanças",
    "tipo": "oracao",
    "origem": "tag",
    "tag": "mudanca",
    "path": "/src/content/tags/mudanca/oracao.md"
  },
  { ... mais 1.200+ orações }
]
```

**⚠️ NOTA**: Arquivo grande (103KB). Considerar paginação ou lazy loading se crescer muito mais.

---

### 2.5 preencherFrontMatterBiblia.mjs

**Localização**: `scripts/preencherFrontMatterBiblia.mjs`
**Execução**: Manual (quando necessário)
**Função**: Preenche ou atualiza metadados em arquivos .md

#### Uso

```bash
# Preencher todos os arquivos sem front-matter
node scripts/preencherFrontMatterBiblia.mjs

# Preencher apenas um livro específico
node scripts/preencherFrontMatterBiblia.mjs --livro genesis

# Modo dry-run (não modifica arquivos, apenas mostra o que faria)
node scripts/preencherFrontMatterBiblia.mjs --dry-run
```

#### Funcionamento

```javascript
/**
 * Para cada arquivo .md em src/content/biblia:
 * 1. Verifica se já tem front-matter
 * 2. Se não, extrai informações do path
 * 3. Gera front-matter padrão
 * 4. Insere no início do arquivo
 */

function preencherFrontMatter(filePath) {
  // Extrai informações do path
  // /src/content/biblia/genesis/01/devocional-01.md
  const parts = filePath.split('/');
  const livro = parts[parts.length - 3];      // "genesis"
  const capitulo = parts[parts.length - 2];   // "01"
  const arquivo = parts[parts.length - 1];    // "devocional-01.md"

  // Determina o tipo
  const tipo = arquivo.replace('.md', '').replace('-01', '');

  // Lê conteúdo existente
  const raw = fs.readFileSync(filePath, 'utf-8');

  // Se já tem front-matter, pula
  if (raw.startsWith('---')) {
    console.log(`✓ ${filePath} já tem front-matter`);
    return;
  }

  // Gera front-matter
  const frontMatter = `---
slug: "${livro}-${capitulo}-${tipo}"
titulo: "Título a Definir"
tipo: "${tipo}"
origem: "biblia"
livro: "${livro}"
capitulo: "${capitulo}"
data: "${new Date().toISOString().split('T')[0]}"
autor: "Capelão Nascente"
readTime: "8 min de leitura"
imageUrl: ""
tema_principal: ""
tags: []
---

`;

  // Insere front-matter no início
  const newContent = frontMatter + raw;
  fs.writeFileSync(filePath, newContent, 'utf-8');

  console.log(`✓ Front-matter adicionado em ${filePath}`);
}
```

---

## 3. SISTEMA DE LOADERS

### 3.1 loadBiblePosts.js - LOADER PRINCIPAL

**Localização**: `src/utils/loadBiblePosts.js`
**Função**: Carrega todas as 7 facetas de um capítulo específico
**Otimização**: Lazy glob + cache em Map

#### Código Completo com Explicações

```javascript
// src/utils/loadBiblePosts.js
import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";
import livrosSBB from "../data/livrosSBB.js";

// ============================================
// SISTEMA DE CACHE EM MEMÓRIA
// ============================================
const cache = new Map();
// Key: "genesis-01"
// Value: [ { data, html }, { data, html }, ... ]

// ============================================
// GLOB LAZY - CARREGAMENTO SOB DEMANDA
// ============================================
const globBiblia = import.meta.glob("/src/content/biblia/**/*.md", {
  query: "?raw",      // Importa como string (não module)
  import: "default",  // Import default export
});
// Resultado: { "/src/content/biblia/genesis/01/devocional-01.md": () => Promise<string> }

// ============================================
// MAPEAMENTO DE IDs PARA NOMES DE PASTA
// ============================================
// livrosSBB.js: [{ id: "genesis", nome: "Gênesis" }, ...]
const ID_PARA_PASTA = livrosSBB.reduce((acc, livro) => {
  // Normaliza: "Gênesis" → "genesis"
  acc[livro.id] = livro.nome
    .toLowerCase()
    .normalize("NFD")                    // Decompõe acentos
    .replace(/[\u0300-\u036f]/g, "")     // Remove acentos
    .replace(/\s+/g, "");                // Remove espaços
  return acc;
}, {});

// ============================================
// ORDEM CANÔNICA DE FACETAS (MENU BAR)
// ============================================
export const ORDEM_FACETAS = [
  // HOMILIA
  "pregacao-tecnica",         // exposicao-homiletica.md
  "mensagem-pastoral",

  // ESTUDOS
  "estudo-tematico",
  "terminologias-chave",      // terminologias.md
  "temas-controversos",

  // DEVOCIONAL
  "devocional",               // devocional-01.md

  // ORAÇÃO
  "oracao",
];

// ============================================
// FUNÇÃO PRINCIPAL: loadBiblePosts
// ============================================
export async function loadBiblePosts(livro, capitulo) {
  // PASSO 1: Verificar cache
  const cacheKey = `${livro}-${capitulo}`;
  if (cache.has(cacheKey)) {
    console.log(`✓ Cache hit: ${cacheKey}`);
    return cache.get(cacheKey);
  }

  // PASSO 2: Normalizar nome do livro
  let livroNormalizado = String(livro).toLowerCase().trim();

  if (ID_PARA_PASTA[livroNormalizado]) {
    livroNormalizado = ID_PARA_PASTA[livroNormalizado];
  }

  // PASSO 3: Normalizar capítulo (zero-padded)
  const capituloStr = String(capitulo).padStart(2, "0");
  // "1" → "01", "10" → "10"

  // PASSO 4: Filtrar entradas do glob que batem com livro/cap
  const entradas = Object.entries(globBiblia).filter(([path]) => {
    return (
      path.includes(`/${livroNormalizado}/`) &&
      path.includes(`/${capituloStr}/`)
    );
  });

  // PASSO 5: Carregar apenas os arquivos filtrados
  const resultados = [];

  for (const [path, loader] of entradas) {
    // loader é uma função: () => Promise<string>
    const raw = await loader();

    // Parser customizado de front-matter
    const { data, content } = parseFrontmatter(raw);

    // Extrai nome do arquivo
    const filename = path.split("/").pop().replace(".md", "");

    // Mapeia nome do arquivo → tipo canônico
    let tipo = filename;
    if (filename === "devocional-01") tipo = "devocional";
    if (filename === "exposicao-homiletica") tipo = "pregacao-tecnica";
    if (filename === "terminologias") tipo = "terminologias-chave";

    // Converte markdown → HTML
    const html = markdownToHtml(content);

    resultados.push({
      tipo,
      data: { ...data, tipo },
      html,
      path
    });
  }

  // PASSO 6: Ordenar conforme ORDEM_FACETAS
  resultados.sort((a, b) => {
    const indexA = ORDEM_FACETAS.indexOf(a.tipo);
    const indexB = ORDEM_FACETAS.indexOf(b.tipo);

    // Se tipo não está em ORDEM_FACETAS, vai pro final
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  // PASSO 7: Salvar no cache
  cache.set(cacheKey, resultados);

  console.log(`✓ Loaded ${resultados.length} facetas de ${livro} ${capitulo}`);

  return resultados;
}
```

#### Exemplo de Uso

```javascript
// Em PostPage.jsx
import { loadBiblePosts } from '@/utils/loadBiblePosts';

function PostPage() {
  const { livro, capitulo, tipo } = useParams();
  const [facetas, setFacetas] = useState([]);

  useEffect(() => {
    loadBiblePosts(livro, capitulo).then(setFacetas);
  }, [livro, capitulo]);

  // facetas agora contém todas as 7 facetas ordenadas
  const facetaAtual = facetas.find(f => f.tipo === tipo);

  return <ArtigoBiblico data={facetaAtual.data} html={facetaAtual.html} />;
}
```

#### Performance

```
Primeira chamada loadBiblePosts("genesis", "01"):
  → Glob filtra ~7 arquivos de 8.323 total
  → Carrega apenas esses 7 arquivos (lazy)
  → Processa front-matter e markdown
  → Salva no cache
  → Retorna em ~50-100ms

Segunda chamada loadBiblePosts("genesis", "01"):
  → Cache hit instantâneo
  → Retorna em <1ms
```

---

### 3.2 loadBibleByTag.js - FILTRO POR TAG

**Localização**: `src/utils/loadBibleByTag.js`
**Função**: Carrega posts bíblicos filtrados por tag temática
**Depende de**: tag-index.json

#### Código Simplificado

```javascript
// src/utils/loadBibleByTag.js
import tagIndex from '@/data/tag-index.json';
import { parseFrontmatter, markdownToHtml } from './markdownProcessor.js';

const globBiblia = import.meta.glob("/src/content/biblia/**/*.md", {
  query: "?raw",
  import: "default",
});

export async function loadBibleByTag(tag) {
  // PASSO 1: Buscar no índice pré-gerado
  const entries = tagIndex[tag] || [];

  if (entries.length === 0) {
    console.warn(`Tag "${tag}" não encontrada no índice`);
    return [];
  }

  // PASSO 2: Carregar apenas os arquivos da tag
  const posts = [];

  for (const entry of entries) {
    // entry.path é o path absoluto do arquivo
    const loader = globBiblia[entry.path];

    if (!loader) {
      console.warn(`Arquivo não encontrado: ${entry.path}`);
      continue;
    }

    const raw = await loader();
    const { data, content } = parseFrontmatter(raw);
    const html = markdownToHtml(content);

    posts.push({ data, html, slug: entry.slug });
  }

  // PASSO 3: Ordenar por data (mais recente primeiro)
  posts.sort((a, b) => new Date(b.data.data) - new Date(a.data.data));

  console.log(`✓ Loaded ${posts.length} posts com tag "${tag}"`);

  return posts;
}
```

#### Exemplo de Uso

```javascript
// Em TemasDaVida.jsx
import { loadBibleByTag } from '@/utils/loadBibleByTag';

function TemasDaVida() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadBibleByTag("mudanca").then(setPosts);
  }, []);

  return (
    <div>
      <h1>Posts sobre Mudança</h1>
      {posts.map(post => (
        <ArticleCard key={post.slug} data={post.data} html={post.html} />
      ))}
    </div>
  );
}
```

---

### 3.3 loadOracoes.js - CARREGADOR DE ORAÇÕES

**Localização**: `src/utils/loadOracoes.js`
**Função**: Carrega orações por tema
**Depende de**: oracao-index.json

#### Código

```javascript
// src/utils/loadOracoes.js
import oracaoIndex from '@/data/oracao-index.json';

const globTags = import.meta.glob("/src/content/tags/**/oracao.md", {
  query: "?raw",
  import: "default",
});

export async function loadOracoes(tema) {
  // PASSO 1: Buscar no índice
  const entry = oracaoIndex[tema];

  if (!entry) {
    console.warn(`Tema "${tema}" não tem oração cadastrada`);
    return null;
  }

  // PASSO 2: Carregar arquivo
  const loader = globTags[entry.path];

  if (!loader) {
    console.error(`Arquivo não encontrado: ${entry.path}`);
    return null;
  }

  const raw = await loader();
  const { data, content } = parseFrontmatter(raw);
  const html = markdownToHtml(content);

  return { data, html, slug: entry.slug };
}
```

---

### 3.4 getTodasOracoes.js - TODAS AS ORAÇÕES

**Localização**: `src/utils/getTodasOracoes.js`
**Função**: Obtém lista completa de todas as orações
**Depende de**: oracoes-index.json

#### Código

```javascript
// src/utils/getTodasOracoes.js
import oracoesIndex from '@/data/oracoes-index.json';

export function getTodasOracoes() {
  // Retorna o índice completo (já está ordenado)
  return oracoesIndex;
}

export function getOracoesBy(filtro) {
  // Filtra orações por critério
  // Exemplo: getOracoesBy({ livro: "genesis" })

  return oracoesIndex.filter(oracao => {
    return Object.keys(filtro).every(key => {
      return oracao[key] === filtro[key];
    });
  });
}
```

#### Exemplo de Uso

```javascript
// Em Oracoes.jsx
import { getTodasOracoes, getOracoesBy } from '@/utils/getTodasOracoes';

function Oracoes() {
  const todasOracoes = getTodasOracoes();
  // 1.200+ orações

  const oracoesGenesis = getOracoesBy({ livro: "genesis" });
  // 50 orações (Genesis tem 50 capítulos)

  const oracoesTags = getOracoesBy({ origem: "tag" });
  // 20 orações (das tags temáticas)

  return ...;
}
```

---

## 4. PROCESSADOR DE MARKDOWN

### 4.1 markdownProcessor.js - CORE DO SISTEMA

**Localização**: `src/utils/markdownProcessor.js`
**Função**: Processa markdown → HTML + extrai front-matter

#### Código Completo

```javascript
// src/utils/markdownProcessor.js
import MarkdownIt from 'markdown-it';

// ============================================
// INSTÂNCIA DO MARKDOWN-IT
// ============================================
const md = new MarkdownIt({
  html: true,          // Permite HTML inline
  linkify: true,       // Converte URLs em links
  typographer: true,   // Substituições tipográficas ("..." → "…")
  breaks: true,        // Converte \n em <br>
});

// ============================================
// PARSER DE FRONT-MATTER CUSTOMIZADO
// ============================================
export function parseFrontmatter(raw) {
  if (!raw || typeof raw !== 'string') {
    return { data: {}, content: '' };
  }

  const txt = raw.trimStart();

  // Verifica se começa com ---
  if (!txt.startsWith('---')) {
    return { data: {}, content: raw.trim() };
  }

  // Encontra o segundo ---
  const end = txt.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {}, content: raw.trim() };
  }

  // Extrai bloco de front-matter
  const fmBlock = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trim();

  // Parser linha por linha
  const data = {};

  fmBlock.split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;

    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();

    // ============================================
    // SUPORTE A ARRAYS: tags: ["a", "b", "c"]
    // ============================================
    if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim();

      if (!inner) {
        data[key] = [];
        return;
      }

      const items = inner.split(',').map((item) => {
        let v = item.trim();

        // Remove aspas
        if ((v.startsWith('"') && v.endsWith('"')) ||
            (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }

        return v;
      });

      data[key] = items;
      return;
    }

    // ============================================
    // REMOVE ASPAS DE STRINGS
    // ============================================
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    data[key] = val;
  });

  return { data, content: body };
}

// ============================================
// CONVERSOR MARKDOWN → HTML
// ============================================
export function markdownToHtml(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  return md.render(markdown);
}
```

#### Exemplo de Uso

```javascript
import { parseFrontmatter, markdownToHtml } from './markdownProcessor.js';

const raw = `---
titulo: "Meu Título"
tags: ["tag1", "tag2"]
data: "2025-12-25"
---

# Título em Markdown

Parágrafo com **negrito** e *itálico*.

- Item 1
- Item 2
`;

const { data, content } = parseFrontmatter(raw);
// data = { titulo: "Meu Título", tags: ["tag1", "tag2"], data: "2025-12-25" }
// content = "# Título em Markdown\n\nParágrafo..."

const html = markdownToHtml(content);
// html = "<h1>Título em Markdown</h1>\n<p>Parágrafo com <strong>negrito</strong>...</p>"
```

---

## 5. SISTEMA DE DADOS ESTÁTICOS

### 5.1 livrosSBB.js - LISTA CANÔNICA DA BÍBLIA

**Localização**: `src/data/livrosSBB.js`
**Tamanho**: ~10KB
**Função**: Contém metadados dos 66 livros da Bíblia

#### Estrutura

```javascript
// src/data/livrosSBB.js
export default [
  {
    id: "genesis",
    nome: "Gênesis",
    abreviacao: "Gn",
    testamento: "AT",
    capitulos: 50,
    ordem: 1
  },
  {
    id: "exodo",
    nome: "Êxodo",
    abreviacao: "Êx",
    testamento: "AT",
    capitulos: 40,
    ordem: 2
  },
  // ... mais 64 livros
  {
    id: "apocalipse",
    nome: "Apocalipse",
    abreviacao: "Ap",
    testamento: "NT",
    capitulos: 22,
    ordem: 66
  }
];
```

#### Uso

```javascript
import livrosSBB from '@/data/livrosSBB.js';

// Encontrar livro por ID
const genesis = livrosSBB.find(l => l.id === "genesis");
// { id: "genesis", nome: "Gênesis", capitulos: 50, ... }

// Listar todos os livros do AT
const antigoTestamento = livrosSBB.filter(l => l.testamento === "AT");
// 39 livros

// Total de capítulos da Bíblia
const totalCapitulos = livrosSBB.reduce((sum, l) => sum + l.capitulos, 0);
// 1.189 capítulos
```

---

### 5.2 versiculos-nvi.js - BASE DE VERSÍCULOS

**Localização**: `src/data/versiculos-nvi.js`
**Tamanho**: ~1.28MB
**Função**: Contém todos os versículos da Bíblia NVI

#### Estrutura

```javascript
// src/data/versiculos-nvi.js
export default {
  genesis: {
    1: {
      1: "No princípio Deus criou os céus e a terra.",
      2: "Era a terra sem forma e vazia; trevas cobriam a face do abismo...",
      // ... versículos 3-31
    },
    2: { ... },
    // ... capítulos 3-50
  },
  exodo: { ... },
  // ... mais 65 livros
};
```

#### Uso

```javascript
import versiculosNVI from '@/data/versiculos-nvi.js';

// Obter versículo específico
const gen11 = versiculosNVI.genesis[1][1];
// "No princípio Deus criou os céus e a terra."

// Obter capítulo completo
const genesis1 = versiculosNVI.genesis[1];
// { 1: "No princípio...", 2: "Era a terra...", ... }
```

---

### 5.3 tagsMap.js - MAPEAMENTO DE TAGS

**Localização**: `src/data/tagsMap.js`
**Tamanho**: ~1KB
**Função**: Mapeia slugs de tags para nomes exibíveis

#### Estrutura

```javascript
// src/data/tagsMap.js
export default {
  "mudanca": {
    nome: "Mudança",
    icone: "🔄",
    cor: "#4A90E2"
  },
  "esperanca": {
    nome: "Esperança",
    icone: "🌟",
    cor: "#F5A623"
  },
  "medo": {
    nome: "Medo",
    icone: "😰",
    cor: "#BD10E0"
  },
  // ... mais 17 tags
};
```

#### Uso

```javascript
import tagsMap from '@/data/tagsMap.js';

function TagChip({ tag }) {
  const meta = tagsMap[tag];

  return (
    <span style={{ backgroundColor: meta.cor }}>
      {meta.icone} {meta.nome}
    </span>
  );
}
```

---

### 5.4 temasDaVidaMap.js - MAPEAMENTO DE TEMAS

**Localização**: `src/data/temasDaVidaMap.js`
**Tamanho**: ~1KB
**Função**: Mapeia os 20 temas da vida

#### Estrutura

```javascript
// src/data/temasDaVidaMap.js
export default {
  "mudanca": {
    titulo: "Mudança",
    descricao: "Abraçando as transformações da vida",
    icone: "🔄",
    slug: "mudanca"
  },
  "ansiedade": {
    titulo: "Ansiedade",
    descricao: "Encontrando paz no caos",
    icone: "😰",
    slug: "ansiedade"
  },
  // ... mais 18 temas
};
```

---

## 6. SISTEMA DE ÍNDICES JSON

### 6.1 Comparação de Índices

| Índice | Tamanho | Qtd Entries | Gerado Por | Atualização |
|--------|---------|-------------|------------|-------------|
| **tag-index.json** | ~19KB | 20 tags | build-tag-index.mjs | Toda build |
| **home-index.json** | ~1.6KB | 12 posts | build-home-index.mjs | Toda build |
| **oracao-index.json** | ~2.8KB | 20 temas | build-oracao-index.mjs | Build prod |
| **oracoes-index.json** | ~103KB | 1.200+ | build-oracoes-index.mjs | Build prod |

### 6.2 Quando Regenerar Índices

```bash
# Durante desenvolvimento (automático)
npm run dev
# → Executa predev → Regenera tag-index.json e home-index.json

# Antes de build (automático)
npm run build
# → Executa prebuild → Regenera todos os 4 índices

# Manualmente (se necessário)
npm run index-tags
# → Regenera apenas tag-index.json
```

---

## 7. FRONT-MATTER E METADADOS

### 7.1 Campos Obrigatórios

```yaml
slug: "genesis-01-devocional"     # OBRIGATÓRIO - ID único
titulo: "Título do Conteúdo"      # OBRIGATÓRIO
tipo: "devocional"                # OBRIGATÓRIO
origem: "biblia"                  # OBRIGATÓRIO (biblia | tag)
```

### 7.2 Campos Específicos de Posts Bíblicos

```yaml
livro: "genesis"                  # OBRIGATÓRIO se origem=biblia
capitulo: "01"                    # OBRIGATÓRIO se origem=biblia
```

### 7.3 Campos Específicos de Tags

```yaml
tag: "mudanca"                    # OBRIGATÓRIO se origem=tag
```

### 7.4 Campos Opcionais mas Recomendados

```yaml
data: "2025-12-25"                # Data de publicação
autor: "Capelão Nascente"         # Autor
readTime: "8 min de leitura"      # Tempo estimado
imageUrl: "/imagem.jpg"           # Imagem de destaque
tema_principal: "esperança"       # Tema principal
tags: ["mudanca", "esperanca"]    # Tags temáticas (array)
```

---

## 8. FLUXOS DE DADOS

### 8.1 Fluxo de Carregamento de Post Bíblico

```
1. Usuário navega para /biblia/genesis/01/devocional
         ↓
2. PostPage.jsx recebe params: { livro: "genesis", capitulo: "01", tipo: "devocional" }
         ↓
3. useEffect chama loadBiblePosts("genesis", "01")
         ↓
4. loadBiblePosts verifica cache
   → Se cache hit: retorna imediatamente
   → Se cache miss: continua
         ↓
5. Filtra glob: apenas /genesis/01/*.md
         ↓
6. Carrega 7 arquivos lazy (apenas essas 7 funções executam)
         ↓
7. Para cada arquivo:
   a. parseFrontmatter(raw) → { data, content }
   b. markdownToHtml(content) → html
   c. Adiciona em resultados[]
         ↓
8. Ordena resultados por ORDEM_FACETAS
         ↓
9. Salva no cache Map
         ↓
10. Retorna resultados para PostPage
         ↓
11. PostPage filtra a faceta tipo="devocional"
         ↓
12. ArtigoBiblico.jsx renderiza { data, html }
         ↓
13. Usuário vê conteúdo formatado
```

### 8.2 Fluxo de Carregamento por Tag

```
1. Usuário clica em tag "mudanca" em TemasDaVida.jsx
         ↓
2. Componente chama loadBibleByTag("mudanca")
         ↓
3. loadBibleByTag busca em tag-index.json
   → tag-index.json["mudanca"] = [ { path, slug }, { path, slug }, ... ]
         ↓
4. Para cada entry:
   a. Encontra loader no glob
   b. Executa loader() → Promise<string>
   c. parseFrontmatter + markdownToHtml
   d. Adiciona em posts[]
         ↓
5. Ordena posts por data (mais recente primeiro)
         ↓
6. Retorna para componente
         ↓
7. Componente renderiza grid de ArticleCard
```

---

## 9. OTIMIZAÇÕES E CACHE

### 9.1 Sistema de Cache em loadBiblePosts

```javascript
const cache = new Map();
// Estrutura:
// "genesis-01" → [ { tipo, data, html, path }, ... ]
// "genesis-02" → [ { tipo, data, html, path }, ... ]

// Benefício:
// - Primeira chamada: ~50-100ms (carregamento + parsing)
// - Chamadas subsequentes: <1ms (cache hit)
```

### 9.2 Lazy Loading com import.meta.glob

```javascript
// SEM lazy:
import genesis01Devocional from '/src/content/biblia/genesis/01/devocional-01.md?raw';
// Problema: Carrega TUDO em memória (8.323 arquivos × ~15KB = 124MB)

// COM lazy:
const glob = import.meta.glob("/src/content/biblia/**/*.md", { query: "?raw", import: "default" });
// Vantagem: Cada arquivo é uma função () => Promise<string>
// Só executa quando chamada
// Carregamento sob demanda
```

### 9.3 Índices Pré-Gerados

```
SEM índices:
  Buscar posts com tag "mudanca"
  → Escanear 8.323 arquivos
  → Ler front-matter de cada um
  → Filtrar por tag
  → Tempo: ~5-10 segundos 😱

COM tag-index.json:
  Buscar posts com tag "mudanca"
  → Ler tag-index.json["mudanca"]
  → Lista de paths já pronta
  → Carregar apenas esses arquivos
  → Tempo: ~50-200ms ✅
```

---

## 10. DEBUGGING E TROUBLESHOOTING

### 10.1 Console Logs Úteis

#### Ativar logs detalhados em loadBiblePosts

```javascript
// Em src/utils/loadBiblePosts.js

export async function loadBiblePosts(livro, capitulo) {
  console.group(`📚 loadBiblePosts(${livro}, ${capitulo})`);

  const cacheKey = `${livro}-${capitulo}`;

  if (cache.has(cacheKey)) {
    console.log('✓ Cache HIT');
    console.groupEnd();
    return cache.get(cacheKey);
  }

  console.log('✗ Cache MISS - carregando...');

  const entradas = Object.entries(globBiblia).filter(...);
  console.log(`→ Encontrados ${entradas.length} arquivos`);

  for (const [path, loader] of entradas) {
    console.log(`  ⤷ Carregando: ${path}`);
    // ...
  }

  console.log(`✓ ${resultados.length} facetas carregadas e ordenadas`);
  console.groupEnd();

  return resultados;
}
```

### 10.2 Problemas Comuns e Soluções

#### Problema: "Tag não encontrada no índice"

```
ERRO: Tag "mudança" não encontrada no índice
CAUSA: tag-index.json não tem essa tag
SOLUÇÃO:
  1. Verificar se existem arquivos .md com tags: ["mudança"]
  2. Rodar: npm run index-tags
  3. Verificar src/data/tag-index.json
```

#### Problema: "Arquivo não encontrado no glob"

```
ERRO: Arquivo não encontrado: /src/content/biblia/genesis/01/devocional-01.md
CAUSA: Path no índice não bate com path no glob
SOLUÇÃO:
  1. Verificar se arquivo existe
  2. Regenerar índices: npm run build
  3. Verificar se glob pattern está correto
```

#### Problema: "Front-matter não está sendo parseado"

```
SINTOMA: data = {} (vazio)
CAUSA: Front-matter mal formatado
SOLUÇÃO:
  Verificar formato:
  ---
  key: "value"
  array: ["a", "b"]
  ---

  NÃO usar:
  - Tabs (usar espaços)
  - : no meio do valor sem aspas
  - Aspas simples/duplas misturadas
```

---

**Fim do Manual Backend**
**Versão**: 1.0
**Data**: 2025-12-25
**Status**: Completo e validado com código real
