import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../data/content';
import NfsBeforeAfterDiagram from './NfsBeforeAfterDiagram';

interface CaseStudyDrawerProps {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, video[controls], [tabindex]:not([tabindex="-1"])';

export default function CaseStudyDrawer({ project, onClose }: CaseStudyDrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [selection, setSelection] = useState<{ projectId: string; index: number }>({
    projectId: '',
    index: 0,
  });

  const activeIndex =
    project && selection.projectId === project.id ? selection.index : 0;

  const setActiveIndex = useCallback(
    (next: number | ((prev: number) => number)) => {
      if (!project) return;
      setSelection((prev) => {
        const current = prev.projectId === project.id ? prev.index : 0;
        const resolved = typeof next === 'function' ? next(current) : next;
        return { projectId: project.id, index: resolved };
      });
    },
    [project]
  );

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (project.galeria.length > 1 && e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % project.galeria.length);
        return;
      }
      if (project.galeria.length > 1 && e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveIndex(
          (prev) => (prev - 1 + project.galeria.length) % project.galeria.length
        );
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus();
    };
  }, [project, onClose, setActiveIndex]);

  if (!project) return null;

  const titleId = `case-${project.id}-title`;
  const totalImages = project.galeria.length;
  const currentImg =
    totalImages > 0
      ? project.galeria[Math.min(activeIndex, totalImages - 1)]
      : null;

  return createPortal(
    <div className="drawer" role="presentation">
      <div className="drawer__backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="drawer__header">
          <div className="stack-xs">
            <span className="pill pill--accent">
              <span className="dot" aria-hidden="true" />
              {project.status}
            </span>
            <h2 id={titleId} className="drawer__title">
              {project.titulo}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Fechar case study (Esc)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="drawer__body">
          <section className="case-block" aria-label="Resumo">
            <dl className="summary">
              {project.iniciativa && (
                <div className="summary__row">
                  <dt>Papel</dt>
                  <dd>{project.iniciativa}</dd>
                </div>
              )}
              <div className="summary__row">
                <dt>Stack</dt>
                <dd>
                  <ul className="tags" aria-label="Stack">
                    {project.stack.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="summary__row">
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
            </dl>
          </section>

          <section className="case-block">
            <h3 className="case-block__title">Problema</h3>
            <p className="text-body">{project.problema}</p>
          </section>

          <section className="case-block">
            <h3 className="case-block__title">Solução</h3>
            <p className="text-body">{project.solucao}</p>
          </section>

          {project.decisoes && project.decisoes.length > 0 && (
            <section className="case-block">
              <h3 className="case-block__title">Decisões de arquitetura</h3>
              <ul className="arrow-list">
                {project.decisoes.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </section>
          )}

          {project.falhaCorrecao && (
            <section className="case-block case-block--highlight">
              <h3 className="case-block__title">Falha e correção</h3>
              <dl className="failure">
                <div>
                  <dt>O que aconteceu</dt>
                  <dd>{project.falhaCorrecao.oQueAconteceu}</dd>
                </div>
                <div>
                  <dt>Causa</dt>
                  <dd>{project.falhaCorrecao.causa}</dd>
                </div>
                <div>
                  <dt>Correção</dt>
                  <dd>{project.falhaCorrecao.correcao}</dd>
                </div>
                <div>
                  <dt>Efeito</dt>
                  <dd>{project.falhaCorrecao.efeito}</dd>
                </div>
              </dl>
            </section>
          )}

          {project.resultados && project.resultados.length > 0 && (
            <section className="case-block">
              <h3 className="case-block__title">Resultado</h3>
              <ul className="results">
                {project.resultados.map((r) => (
                  <li key={r.texto} className="results__item">
                    <span>{r.texto}</span>
                    {r.rotulo && <span className="pill pill--accent pill--sm">{r.rotulo}</span>}
                  </li>
                ))}
              </ul>
              {project.tipoVisual === 'nfs-before-after' && (
                <div className="case-block__media">
                  <NfsBeforeAfterDiagram />
                </div>
              )}
            </section>
          )}

          {project.limitacoes && (
            <section className="case-block">
              <h3 className="case-block__title">Limitações e próximos passos</h3>
              <p className="text-body">{project.limitacoes}</p>
            </section>
          )}

          {currentImg && (
            <section className="case-block">
              <div className="viewer-head">
                <h3 className="case-block__title">Galeria de prints</h3>
                <span className="viewer-counter">
                  {activeIndex + 1} de {totalImages}
                </span>
              </div>

              <div className="viewer-stage">
                <div className="viewer-stage__frame">
                  <img
                    key={currentImg.src}
                    src={currentImg.src}
                    alt={currentImg.legenda}
                    width={currentImg.width}
                    height={currentImg.height}
                    decoding="async"
                    className="viewer-stage__img"
                  />
                </div>

                <div className="viewer-stage__bar">
                  <p className="viewer-stage__caption">{currentImg.legenda}</p>
                  {totalImages > 1 && (
                    <div className="viewer-stage__nav">
                      <button
                        type="button"
                        className="viewer-nav-btn"
                        onClick={() =>
                          setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages)
                        }
                        aria-label="Captura anterior"
                      >
                        ← Anterior
                      </button>
                      <button
                        type="button"
                        className="viewer-nav-btn"
                        onClick={() =>
                          setActiveIndex((prev) => (prev + 1) % totalImages)
                        }
                        aria-label="Próxima captura"
                      >
                        Próxima →
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {totalImages > 1 && (
                <div className="viewer-thumbs" role="tablist" aria-label="Miniaturas das capturas">
                  {project.galeria.map((img, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <button
                        type="button"
                        key={img.src}
                        role="tab"
                        aria-selected={isSelected}
                        aria-label={`Ver captura ${idx + 1}: ${img.legenda}`}
                        onClick={() => setActiveIndex(idx)}
                        className={`viewer-thumb${isSelected ? ' is-active' : ''}`}
                      >
                        <img
                          src={img.src}
                          alt=""
                          width={img.width}
                          height={img.height}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="viewer-thumb__index">0{idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
