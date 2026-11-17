import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { howIBuild } from '../data/content';

export default function HowIBuild() {
  const ref = useScrollAnimation();

  return (
    <section
      id="como-construo"
      className="section-ambient"
      style={{ padding: '80px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          <div className="section-badge">
            <span>Método de engenharia</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            Como eu <mark>construo</mark>
          </h2>

          <div
            className="card"
            style={{
              padding: '32px',
              borderLeft: '4px solid #EA1D2C',
              marginBottom: '24px',
            }}
          >
            <p
              style={{
                color: '#F0F6FC',
                fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                lineHeight: 1.75,
                margin: 0,
                fontWeight: 500,
              }}
            >
              “{howIBuild.statement}”
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {howIBuild.pillars.map((pillar, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
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
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      margin: 0,
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#EA1D2C',
                    }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <p
                  style={{
                    color: '#CBD5E1',
                    fontSize: '0.94rem',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
