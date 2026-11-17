import { useCallback, useState } from 'react';
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

function FeaturedMedia({ project }: { project: Project }) {
  if (project.video) {
    const reduced = prefersReducedMotion();
    return (
      <video
        className="media-frame media-frame--video"
        src={project.video.src}
        poster={project.video.poster}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        controls={reduced}
        preload={reduced ? 'none' : 'metadata'}
        width={1280}
        height={612}
        aria-label={`Gravação do fluxo: ${project.titulo}`}
      />
    );
  }
  if (project.tipoVisual === 'orac-flow') return <OracFlowDiagram />;
  if (project.tipoVisual === 'nfs-before-after') return <NfsBeforeAfterDiagram />;
  return null;
}

function FeaturedProject({
  project,
  reverse,
  onOpen,
}: {
  project: Project;
  reverse: boolean;
  onOpen: (p: Project) => void;
}) {
  return (
    <article className={`featured${reverse ? ' featured--reverse' : ''}`}>
      <div className="featured__media">
        <FeaturedMedia project={project} />
      </div>

      <div className="featured__body">
        <div className="pill-row">
          <span className="pill pill--accent">
            <span className="dot" aria-hidden="true" />
            {project.status}
          </span>
          {project.iniciativa && <span className="pill">{project.iniciativa}</span>}
        </div>

        <h3 className="featured__title">{project.titulo}</h3>

        <dl className="featured__facts">
          <div>
            <dt>Problema</dt>
            <dd>{project.problema}</dd>
          </div>
          <div>
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

        <div>
          <button type="button" className="btn btn--primary" onClick={() => onOpen(project)}>
            Ver case study
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

function CardCover({ src, alt, label }: { src?: string; alt?: string; label: string }) {
  if (src) {
    return (
      <div className="pcard__cover">
        <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" width={1024} height={576} />
      </div>
    );
  }
  return (
    <div className="pcard__cover pcard__cover--placeholder" aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const cover = project.galeria[0];
  const short = project.titulo.split(' — ')[0];
  return (
    <li className="pcard card card--interactive">
      <CardCover src={cover?.src} alt={cover?.legenda} label={short} />
      <div className="pcard__body">
        <h4 className="pcard__title">{project.titulo}</h4>
        <span className="pill pill--accent pill--sm pcard__status">{project.status}</span>
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
          Ver case study →
        </button>
      </div>
    </li>
  );
}

function CompactCard({ item }: { item: CompactProject }) {
  const short = item.titulo.split(' — ')[0];
  return (
    <li className="pcard card">
      <CardCover label={short} />
      <div className="pcard__body">
        <h4 className="pcard__title">{item.titulo}</h4>
        <span className="pill pill--sm pcard__status">{item.status}</span>
        <p className="pcard__text">{item.descricao}</p>
        <ul className="tags tags--single-line" aria-label="Principais tecnologias">
          {item.stack.slice(0, 3).map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
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
              <FeaturedProject key={p.id} project={p} reverse={i % 2 === 1} onOpen={setActive} />
            ))}
          </div>

          <h3 className="subhead">Mais projetos</h3>
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
