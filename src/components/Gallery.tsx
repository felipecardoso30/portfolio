import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { galleryItems, galleryFilters, type GalleryItem } from '../data/content';
import OracFlowDiagram from './OracFlowDiagram';
import NfsBeforeAfterDiagram from './NfsBeforeAfterDiagram';

export default function Gallery() {
  const ref = useScrollAnimation();
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems =
    selectedFilter === 'Todos'
      ? galleryItems
      : galleryItems.filter((item) => item.categoria === selectedFilter);

  const activeItem: GalleryItem | null =
    activeIndex !== null && filteredItems[activeIndex]
      ? filteredItems[activeIndex]
      : null;

  useEffect(() => {
    if (activeIndex === null) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight' && filteredItems.length > 1) {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % filteredItems.length
        );
      } else if (e.key === 'ArrowLeft' && filteredItems.length > 1) {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev === null
            ? 0
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [activeIndex, filteredItems.length]);

  const countForFilter = (filtro: string) =>
    filtro === 'Todos'
      ? galleryItems.length
      : galleryItems.filter((i) => i.categoria === filtro).length;

  return (
    <section id="evidencias" className="section section-ambient">
      <div className="container">
        <div ref={ref} className="fade-in">
          <header className="section-head">
            <span className="section-badge">Evidências & Telas</span>
            <h2 className="section-title">
              Galeria de <mark>Fluxos & Capturas</mark>
            </h2>
            <p className="section-lead">
              Proporções originais preservadas sem cortes. Selecione um filtro ou clique
              em qualquer captura para inspecionar os detalhes e navegar entre as telas.
            </p>
          </header>

          <div
            className="gallery-filters"
            role="tablist"
            aria-label="Filtro de evidências por projeto"
          >
            {galleryFilters.map((filtro) => {
              const isActive = selectedFilter === filtro;
              return (
                <button
                  type="button"
                  key={filtro}
                  onClick={() => {
                    setSelectedFilter(filtro);
                    setActiveIndex(null);
                  }}
                  role="tab"
                  aria-selected={isActive}
                  className={`gallery-filter-btn${isActive ? ' is-active' : ''}`}
                >
                  <span>{filtro}</span>
                  <span className="gallery-filter-btn__count">
                    {countForFilter(filtro)}
                  </span>
                </button>
              );
            })}
          </div>

          <ul className="gallery-grid">
            {filteredItems.map((item, idx) => (
              <li key={item.id} className="gallery-card card card--interactive">
                <div className="gallery-card__stage">
                  {item.kind === 'orac-diagram' ? (
                    <div className="gallery-card__diagram-preview">
                      <span className="eyebrow">Diagrama Interativo</span>
                      <strong className="gallery-card__diagram-title">
                        Pipeline ORAC (5 etapas)
                      </strong>
                      <span className="gallery-card__diagram-sub">
                        Teams → Copilot Studio → Fabric SQL → Gate Humano → ServiceNow
                      </span>
                    </div>
                  ) : item.kind === 'nfs-diagram' ? (
                    <div className="gallery-card__diagram-preview">
                      <span className="eyebrow">Comparativo de Tempo</span>
                      <strong className="gallery-card__diagram-title">
                        ~8 min → ~15 s (-97%)
                      </strong>
                      <span className="gallery-card__diagram-sub">
                        Power Automate + AI Builder (OCR) + SharePoint DLP
                      </span>
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.titulo}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      className="gallery-card__img"
                    />
                  )}
                  <span className="pcard__hover-pill" aria-hidden="true">
                    Inspecionar ⤢
                  </span>
                </div>

                <div className="gallery-card__body">
                  <div className="gallery-card__meta">
                    <span className="eyebrow">{item.projetoNome}</span>
                    <span className="gallery-card__index">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="gallery-card__title">{item.titulo}</h3>
                  <p className="gallery-card__caption">{item.legenda}</p>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="pcard__action stretched-link"
                    aria-label={`Inspecionar evidência: ${item.titulo}`}
                  >
                    <span>Inspecionar detalhes</span>
                    <span className="pcard__action-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {activeItem &&
        activeIndex !== null &&
        createPortal(
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Inspeção de evidência: ${activeItem.titulo}`}
          >
            <div
              className="lightbox__backdrop"
              onClick={() => setActiveIndex(null)}
              aria-hidden="true"
            />
            <div className="lightbox__panel card">
              <header className="lightbox__header">
                <div className="stack-xs">
                  <div className="pill-row">
                    <span className="pill pill--accent pill--sm">
                      {activeItem.projetoNome}
                    </span>
                    <span className="viewer-counter">
                      {activeIndex + 1} de {filteredItems.length}
                    </span>
                  </div>
                  <h3 className="lightbox__title">{activeItem.titulo}</h3>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  className="icon-btn"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Fechar inspeção (Esc)"
                >
                  ✕
                </button>
              </header>

              <div className="lightbox__stage">
                {activeItem.kind === 'orac-diagram' ? (
                  <OracFlowDiagram />
                ) : activeItem.kind === 'nfs-diagram' ? (
                  <NfsBeforeAfterDiagram />
                ) : (
                  <img
                    key={activeItem.src}
                    src={activeItem.src}
                    alt={activeItem.legenda}
                    width={activeItem.width}
                    height={activeItem.height}
                    decoding="async"
                    className="lightbox__img"
                  />
                )}
              </div>

              <footer className="lightbox__footer">
                <div className="viewer-stage__bar">
                  <p className="lightbox__caption">{activeItem.legenda}</p>
                  {filteredItems.length > 1 && (
                    <div className="viewer-stage__nav">
                      <button
                        type="button"
                        className="viewer-nav-btn"
                        onClick={() =>
                          setActiveIndex(
                            (activeIndex - 1 + filteredItems.length) %
                              filteredItems.length
                          )
                        }
                        aria-label="Evidência anterior (seta esquerda)"
                      >
                        ← Anterior
                      </button>
                      <button
                        type="button"
                        className="viewer-nav-btn"
                        onClick={() =>
                          setActiveIndex((activeIndex + 1) % filteredItems.length)
                        }
                        aria-label="Próxima evidência (seta direita)"
                      >
                        Próxima →
                      </button>
                    </div>
                  )}
                </div>

                {filteredItems.length > 1 && (
                  <div
                    className="viewer-thumbs"
                    role="tablist"
                    aria-label="Navegação rápida entre evidências"
                  >
                    {filteredItems.map((item, idx) => {
                      const isSelected = idx === activeIndex;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          role="tab"
                          aria-selected={isSelected}
                          aria-label={`Ir para item ${idx + 1}: ${item.titulo}`}
                          onClick={() => setActiveIndex(idx)}
                          className={`viewer-thumb${isSelected ? ' is-active' : ''}`}
                        >
                          {item.src ? (
                            <img
                              src={item.src}
                              alt=""
                              width={item.width}
                              height={item.height}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <span className="viewer-thumb__diagram-label">
                              {item.projetoNome}
                            </span>
                          )}
                          <span className="viewer-thumb__index">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </footer>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
