import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { about, LOCATION } from '../data/content';

export default function About() {
  const ref = useScrollAnimation();

  return (
    <section
      id="sobre"
      className="section-ambient"
      style={{ padding: '80px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          <div className="section-badge">
            <span>Formação e sobre</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '28px',
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            Formação & <mark>Idiomas</mark>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            {/* Resumo */}
            <div
              className="card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              <h3
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Sobre mim
              </h3>

              <p
                style={{
                  color: '#CBD5E1',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {about.resumo}
              </p>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid #21262D',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#CBD5E1',
                  fontSize: '0.92rem',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#EA1D2C',
                    flexShrink: 0,
                  }}
                />
                <span>{LOCATION}</span>
              </div>
            </div>

            {/* Formação e Idiomas */}
            <div
              className="card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '14px',
                  }}
                >
                  Formação Acadêmica
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {about.education.map((edu, idx) => (
                    <div
                      key={idx}
                      style={{
                        paddingBottom: idx === 0 ? '14px' : 0,
                        borderBottom: idx === 0 ? '1px solid #21262D' : 'none',
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.98rem', marginBottom: '2px' }}>
                        {edu.degree}
                      </div>
                      <div style={{ color: '#EA1D2C', fontSize: '0.88rem', fontWeight: 600 }}>
                        {edu.institution} · <span style={{ color: '#8B949E', fontWeight: 400 }}>{edu.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #21262D', paddingTop: '18px' }}>
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '10px',
                  }}
                >
                  Idiomas
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {about.languages.map((lang, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '9px 14px',
                        borderRadius: '8px',
                        border: '1px solid #21262D',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.92rem' }}>
                        {lang.name}
                      </span>
                      <span
                        className="status-pill"
                        style={{
                          background: 'rgba(234, 29, 44, 0.1)',
                          color: '#EA1D2C',
                          border: '1px solid rgba(234, 29, 44, 0.3)',
                        }}
                      >
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
