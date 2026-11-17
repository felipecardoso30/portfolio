import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { hero, WHATSAPP_LINK } from '../data/content';
import WhatsAppMockup from './WhatsAppMockup';

export default function Hero() {
  const ref = useScrollAnimation();

  return (
    <section
      id="inicio"
      className="section-ambient"
      style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '110px',
        paddingBottom: '70px',
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
          {/* Left Column: Intro & Highlights */}
          <div>
            {/* Top Badge */}
            <div className="section-badge">
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#EA1D2C',
                  boxShadow: '0 0 8px #EA1D2C',
                  display: 'inline-block',
                }}
              />
              <span>{hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
              }}
            >
              Felipe Cardoso <br />
              <mark>das Neves</mark>
            </h1>

            {/* Role / Subtitle */}
            <p
              style={{
                fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
                fontWeight: 600,
                color: '#EA1D2C',
                marginBottom: '18px',
                letterSpacing: '-0.01em',
              }}
            >
              {hero.role}
            </p>

            {/* Description */}
            <p
              style={{
                fontSize: '1.08rem',
                color: '#CBD5E1',
                lineHeight: 1.75,
                maxWidth: '560px',
                marginBottom: '32px',
              }}
            >
              {hero.description}
            </p>

            {/* Highlights pills (reais do currículo) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '36px',
              }}
            >
              {hero.highlights.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: '#0E1217',
                    border: '1px solid #21262D',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: '#EA1D2C',
                      lineHeight: 1,
                    }}
                  >
                    {item.value}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.3 }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
              }}
            >
              <a href="#projetos" className="btn-primary">
                Ver Projetos
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <a href="#experiencia" className="btn-secondary">
                Experiência
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Live Agent Simulation Mockup */}
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
