import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useResumePdf } from '../hooks/useResumePdf';
import { hero, NOME, type HeroMetric } from '../data/content';
import WhatsAppMockup from './WhatsAppMockup';

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
    <div
      style={{
        background: '#0E1217',
        border: '1px solid #21262D',
        borderRadius: '12px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        minWidth: '165px',
        flex: '1 1 165px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        <span
          aria-label={item.valueText}
          style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#EA1D2C',
            lineHeight: 1,
          }}
        >
          <span aria-hidden="true">{formatted}</span>
        </span>
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            color: '#CBD5E1',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid #30363D',
            padding: '2px 8px',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}
        >
          {item.classification}
        </span>
      </div>
      <span style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: 1.35 }}>
        {item.label}
      </span>
    </div>
  );
}

export default function Hero() {
  const ref = useScrollAnimation();
  const { available: hasResumePdf, href: resumeHref } = useResumePdf();

  return (
    <section
      id="inicio"
      className="section-ambient"
      style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '108px',
        paddingBottom: '68px',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
        }}
      >
        <div
          ref={ref}
          className="fade-in"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Coluna Principal */}
          <div>
            <div className="section-badge hero-step" style={{ ['--step' as string]: 0 }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#EA1D2C',
                  display: 'inline-block',
                }}
              />
              <span>{hero.badge}</span>
            </div>

            <p
              className="hero-step"
              style={{
                ['--step' as string]: 1,
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#CBD5E1',
                margin: '0 0 8px 0',
                letterSpacing: '0.01em',
              }}
            >
              {NOME}
            </p>

            <h1
              className="hero-step"
              style={{
                ['--step' as string]: 2,
                fontSize: 'clamp(2rem, 4.4vw, 3.35rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '18px',
              }}
            >
              Construo <mark>agentes de IA</mark> que tiram trabalho manual do time.
            </h1>

            <p
              className="hero-step"
              style={{
                ['--step' as string]: 3,
                fontSize: '1.06rem',
                color: '#CBD5E1',
                lineHeight: 1.72,
                maxWidth: '580px',
                marginBottom: '28px',
              }}
            >
              {hero.support}
            </p>

            {/* 3 Provas com rótulo Medido */}
            <div
              className="hero-step"
              style={{
                ['--step' as string]: 4,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '32px',
              }}
            >
              {hero.metrics.map((item, i) => (
                <MetricCard key={i} item={item} />
              ))}
            </div>

            {/* Botões */}
            <div
              className="hero-step"
              style={{
                ['--step' as string]: 5,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <a href="#projetos" className="btn-primary">
                Ver projetos
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
                <a
                  href={resumeHref}
                  download
                  className="btn-secondary"
                >
                  Baixar currículo (PDF)
                </a>
              )}

              <a href="#contato" className="btn-secondary">
                Contato
              </a>
            </div>
          </div>

          {/* Coluna Lateral: Simulação do ORAC */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WhatsAppMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
