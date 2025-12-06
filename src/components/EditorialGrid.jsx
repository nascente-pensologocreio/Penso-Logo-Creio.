// src/components/EditorialGrid.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - post: { data: {...}, contentHtml: "<p>...</p>" }
 * - relatedPosts: [{ data: {...}, excerpt, slug }]
 */
export default function EditorialGrid({ post, relatedPosts = [] }) {
  const contentRef = useRef(null);
  const [toc, setToc] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterTag, setFilterTag] = useState(null);

  useEffect(() => {
    // Gera TOC a partir dos headings do conteúdo (h2/h3)
    const el = contentRef.current;
    if (!el) return;
    const headings = Array.from(el.querySelectorAll("h2, h3"));
    const items = headings.map((h, i) => {
      const id = h.id || `heading-${i}`;
      if (!h.id) h.id = id;
      return { id, text: h.innerText, level: h.tagName.toLowerCase() };
    });
    setToc(items);
  }, [post]);

  const tags = (post?.data?.tags || []).slice(0, 12);

  return (
    <div className="editorial-container">
      <div className="editorial-grid">
        {/* SIDEBAR */}
        <aside className={`editorial-sidebar ${sidebarOpen ? "open" : ""}`} aria-label="Navegação do artigo">
          <div className="sidebar-inner">
            <div className="sidebar-top">
              <button
                className="sidebar-toggle md:hidden"
                onClick={() => setSidebarOpen((s) => !s)}
                aria-expanded={sidebarOpen}
                aria-controls="sidebar-content"
              >
                {sidebarOpen ? "Fechar" : "Menu"}
              </button>

              <div className="sidebar-section">
                <h3 className="sidebar-title">Sumário</h3>
                {toc.length === 0 ? (
                  <p className="sidebar-empty">Sem sumário</p>
                ) : (
                  <nav id="sidebar-content" className="toc-list" aria-label="Sumário do artigo">
                    {toc.map((t) => (
                      <a key={t.id} href={`#${t.id}`} className={`toc-link toc-${t.level}`}>
                        {t.text}
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Tags</h3>
              <div className="tags-list">
                {tags.length === 0 ? (
                  <p className="sidebar-empty">Sem tags</p>
                ) : (
                  tags.map((tg) => (
                    <button
                      key={tg}
                      className={`tag-badge ${filterTag === tg ? "active" : ""}`}
                      onClick={() => setFilterTag(filterTag === tg ? null : tg)}
                    >
                      #{tg}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Navegar por capítulo</h3>
              <div className="chapter-links">
                <a className="chapter-link" href={`/caminho-das-escrituras/${post?.data?.livro || ""}`}>
                  Ver todos os capítulos de {post?.data?.livro || "—"}
                </a>
              </div>
            </div>

            <div className="sidebar-section sidebar-related">
              <h3 className="sidebar-title">Leituras relacionadas</h3>
              {relatedPosts.slice(0, 6).map((r) => (
                <a key={r.data.slug} href={`/post/${r.data.slug}`} className="related-card">
                  <div className="related-meta">
                    <div className="related-title">{r.data.titulo}</div>
                    <div className="related-sub">{r.data.tipo} • {r.data.data}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <article className="editorial-content" itemScope itemType="http://schema.org/Article">
          <header className="post-header animate-fade-in-up">
            <h1 className="post-title">{post?.data?.titulo}</h1>
            <div className="post-meta">
              <span className="meta-author">{post?.data?.autor}</span>
              <span className="meta-sep">•</span>
              <time className="meta-date">{post?.data?.data}</time>
              <span className="meta-sep">•</span>
              <span className="meta-ref">{post?.data?.livro} {post?.data?.capitulo}</span>
            </div>
          </header>

          <div className="editorial-article" ref={contentRef} dangerouslySetInnerHTML={{ __html: post?.contentHtml || "" }} />

          <footer className="post-footer">
            <div className="post-actions">
              <a className="action-btn" href="#share">Compartilhar</a>
              <a className="action-btn" href="#save">Salvar</a>
            </div>

            <div className="related-grid">
              <h3 className="related-heading">Mais deste capítulo</h3>
              <div className="related-grid-inner">
                {relatedPosts
                  .filter((r) => !filterTag || (r.data.tags || []).includes(filterTag))
                  .slice(0, 8)
                  .map((r) => (
                    <a key={r.data.slug} href={`/post/${r.data.slug}`} className="post-card">
                      <div className="post-card-body">
                        <div className="post-card-title">{r.data.titulo}</div>
                        <div className="post-card-meta">{r.data.tipo} • {r.data.data}</div>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </footer>
        </article>
      </div>

      {/* Mobile overlay close */}
      <style jsx>{`
        /* small inline styles for the toggle button only */
      `}</style>
    </div>
  );
}
