import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useResumePdf } from '../hooks/useResumePdf';
import { hero, NOME, type HeroMetric } from '../data/content';

function useCountUp(target: number, decimals = 0, durationMs = 850) {
  const [value, setValue] = useState<number>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? target
      : 0
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, decimals, durationMs]);

  return value;
}

function MetricCard({ item }: { item: HeroMetric }) {
  const animated = useCountUp(item.numericTarget, item.decimals ?? 0);
  const formatted =
    (item.prefix ?? '') +
    (item.decimals
      ? animated.toFixed(item.decimals).replace('.', ',')
      : Math.round(animated).toString()) +
    (item.suffix ?? '');

  return (
    <div className="metric-card">
      <div className="metric-card__top">
        <span aria-label={item.valueText} className="metric-card__value">
          <span aria-hidden="true">{formatted}</span>
        </span>
        <span className="pill pill--sm">{item.classification}</span>
      </div>
      <span className="metric-card__label">{item.label}</span>
    </div>
  );
}

export default function Hero() {
  const ref = useScrollAnimation();
  const { available: hasResumePdf, href: resumeHref } = useResumePdf();

  return (
    <section id="inicio" className="hero-section section-ambient">
      <div className="container">
        <div ref={ref} className="fade-in hero-grid">
          <div className="hero-content">
            <div className="section-badge hero-step" style={{ ['--step' as string]: 0 }}>
              <span className="dot" aria-hidden="true" />
              <span>{hero.badge}</span>
            </div>

            <p className="hero-author hero-step" style={{ ['--step' as string]: 1 }}>
              {NOME}
            </p>

            <h1 className="hero-title hero-step" style={{ ['--step' as string]: 2 }}>
              Construo <mark className="hero-highlight">agentes de IA</mark> que tiram trabalho manual do time.
            </h1>

            <p className="hero-support hero-step" style={{ ['--step' as string]: 3 }}>
              {hero.support}
            </p>

            <div className="btn-row hero-step" style={{ ['--step' as string]: 4 }}>
              <a href="#projetos" className="btn btn--primary">
                <span>Ver projetos</span>
                <svg
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
              </a>

              {hasResumePdf && (
                <a href={resumeHref} download className="btn btn--resume">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Baixar currículo</span>
                  <span className="btn__badge">PDF</span>
                </a>
              )}

              <a href="#contato" className="btn btn--ghost">
                Contato
              </a>
            </div>
          </div>

          <div className="hero-aside hero-step" style={{ ['--step' as string]: 5 }}>
            <div className="metric-grid">
              {hero.metrics.map((item) => (
                <MetricCard key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
