import { useCallback, useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  projects,
  otherProjects,
  type CompactProject,
  type Project,
} from '../data/content';
import OracFlowDiagram from './OracFlowDiagram';
import NfsBeforeAfterDiagram from './NfsBeforeAfterDiagram';
import CaseStudyDrawer from './CaseStudyDrawer';

const FEATURED_IDS = ['orac', 'nfs'];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function LazyLoopVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* Autoplay bloqueado pelo navegador */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={videoRef}
      className="media-frame media-frame--video"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      controls={reduced}
      preload="none"
      width={1280}
      height={612}
      aria-label={`Gravação do fluxo: ${title}`}
    />
  );
}

function FeaturedMedia({ project }: { project: Project }) {
  if (project.video) {
    return (
      <div className="featured__media-stack">
        <div className="video-showcase">
          <div className="video-showcase__bar">
            <span className="dot dot--accent" aria-hidden="true" />
            <span className="video-showcase__label">
              Execução do Fluxo · Power Automate
            </span>
          </div>
          <LazyLoopVideo
            src={project.video.src}
            poster={project.video.poster}
            title={project.titulo}
          />
        </div>
        {project.tipoVisual === 'nfs-before-after' && <NfsBeforeAfterDiagram />}
      </div>
    );
  }
  if (project.tipoVisual === 'orac-flow') return <OracFlowDiagram />;
  if (project.tipoVisual === 'nfs-before-after') return <NfsBeforeAfterDiagram />;
  return null;
}

function FeaturedProject({
  project,
  index,
  reverse,
  onOpen,
}: {
  project: Project;
  index: number;
  reverse: boolean;
  onOpen: (p: Project) => void;
}) {
  return (
    <article className={`featured card${reverse ? ' featured--reverse' : ''}`}>
      <div className="featured__media">
        <FeaturedMedia project={project} />
      </div>

      <div className="featured__body">
        <div className="featured__kicker">
          <span className="featured__index">0{index + 1}</span>
          <div className="pill-row">
            <span className="pill pill--accent">
              <span className="dot" aria-hidden="true" />
              {project.status}
            </span>
            {project.iniciativa && <span className="pill">{project.iniciativa}</span>}
          </div>
        </div>

        <h3 className="featured__title">{project.titulo}</h3>

        <dl className="featured__facts">
          <div className="featured__fact-card">
            <dt>Problema</dt>
            <dd>{project.problema}</dd>
          </div>
          <div className="featured__fact-card">
            <dt>Solução</dt>
            <dd>{project.solucao}</dd>
          </div>
        </dl>

        {project.resultados && project.resultados.length > 0 && (
          <div className="result-box">
            <span className="eyebrow">Resultado</span>
            <ul className="results">
              {project.resultados.map((r) => (
                <li key={r.texto} className="results__item">
                  <span>{r.texto}</span>
                  {r.rotulo && <span className="pill pill--accent pill--sm">{r.rotulo}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="tags" aria-label="Stack">
          {project.stack.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>

        <div className="featured__actions">
          <button type="button" className="btn btn--primary" onClick={() => onOpen(project)}>
            <span>Ver case study</span>
            <svg
              className="btn__arrow"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

function CardCover({
  src,
  alt,
  label,
  interactive,
}: {
  src?: string;
  alt?: string;
  label: string;
  interactive?: boolean;
}) {
  return (
    <div className={`pcard__cover${!src ? ' pcard__cover--placeholder' : ''}`} aria-hidden={!src}>
      {src ? (
        <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" width={1024} height={576} />
      ) : (
        <div className="pcard__placeholder-inner">
          <span className="pcard__placeholder-badge">Arquitetura & Fluxo</span>
          <strong className="pcard__placeholder-title">{label}</strong>
        </div>
      )}
      {interactive && (
        <span className="pcard__hover-pill" aria-hidden="true">
          Abrir case study ↗
        </span>
      )}
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const cover = project.galeria[0];
  const short = project.titulo.split(' — ')[0];
  return (
    <li className="pcard card card--interactive">
      <CardCover src={cover?.src} alt={cover?.legenda} label={short} interactive />
      <div className="pcard__body">
        <span className="pill pill--accent pill--sm pcard__status">{project.status}</span>
        <h4 className="pcard__title">{project.titulo}</h4>
        <p className="pcard__text">{project.problema}</p>
        <ul className="tags tags--single-line" aria-label="Principais tecnologias">
          {project.stack.slice(0, 3).map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="pcard__action stretched-link"
          onClick={() => onOpen(project)}
          aria-label={`Ver case study: ${project.titulo}`}
        >
          <span>Ver case study</span>
          <span className="pcard__action-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </li>
  );
}

function CompactCard({ item }: { item: CompactProject }) {
  const short = item.titulo.split(' — ')[0];
  return (
    <li className="pcard pcard--static card">
      <CardCover label={short} />
      <div className="pcard__body">
        <span className="pill pill--sm pcard__status">{item.status}</span>
        <h4 className="pcard__title">{item.titulo}</h4>
        <p className="pcard__text">{item.descricao}</p>
        <ul className="tags tags--single-line" aria-label="Principais tecnologias">
          {item.stack.slice(0, 3).map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
        <span className="pcard__static-note">Projeto concluído · ciclo encerrado</span>
      </div>
    </li>
  );
}

export default function Projects() {
  const ref = useScrollAnimation();
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is Project => Boolean(p)
  );
  const rest = projects.filter((p) => !FEATURED_IDS.includes(p.id));

  return (
    <section id="projetos" className="section section-ambient">
      <div className="container">
        <div ref={ref} className="fade-in">
          <header className="section-head">
            <span className="section-badge">Projetos principais</span>
            <h2 className="section-title">
              Agentes de IA & <mark>Automações</mark>
            </h2>
            <p className="section-lead">
              Case studies completos com problema, arquitetura, falhas reais corrigidas,
              validação humana e resultados classificados por origem.
            </p>
          </header>

          <div className="featured-list">
            {featured.map((p, i) => (
              <FeaturedProject
                key={p.id}
                project={p}
                index={i}
                reverse={i % 2 === 1}
                onOpen={setActive}
              />
            ))}
          </div>

          <div className="subhead-row">
            <h3 className="subhead">Mais projetos & entregas</h3>
            <span className="subhead-hint">Clique em um projeto ativo para ler o case study completo</span>
          </div>
          <ul className="project-grid">
            {rest.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setActive} />
            ))}
            {otherProjects.map((item) => (
              <CompactCard key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>

      <CaseStudyDrawer project={active} onClose={close} />
    </section>
  );
}
