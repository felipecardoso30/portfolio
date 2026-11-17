import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { about, LOCATION } from '../data/content';

export default function About() {
  const ref = useScrollAnimation();

  return (
    <section
      id="sobre"
      className="section-ambient"
      style={{ padding: '96px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          {/* Section badge */}
          <div className="section-badge">
            <span>Sobre mim</span>
          </div>

          {/* Section title */}
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '28px',
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            Um pouco sobre <mark>minha trajetória</mark>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              alignItems: 'start',
            }}
          >
            {/* Bio Card */}
            <div
              className="card"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Perfil & Atuação
              </h3>

              <p
                style={{
                  color: '#CBD5E1',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {about.resumo}
              </p>

              {/* Location Badge */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid #21262D',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#CBD5E1',
                  fontSize: '0.94rem',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#EA1D2C',
                    boxShadow: '0 0 6px #EA1D2C',
                    flexShrink: 0,
                  }}
                />
                <span>Baseado em <strong>{LOCATION}</strong> • Disponível para atuações presenciais, híbridas ou remotas.</span>
              </div>
            </div>

            {/* Education & Languages Card */}
            <div
              className="card"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '16px',
                  }}
                >
                  Formação Acadêmica
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {about.education.map((edu, idx) => (
                    <div
                      key={idx}
                      style={{
                        paddingBottom: idx === 0 ? '16px' : 0,
                        borderBottom: idx === 0 ? '1px solid #21262D' : 'none',
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>
                        {edu.degree}
                      </div>
                      <div style={{ color: '#EA1D2C', fontSize: '0.88rem', fontWeight: 600, marginBottom: '4px' }}>
                        {edu.institution} • <span style={{ color: '#8B949E', fontWeight: 400 }}>{edu.period}</span>
                      </div>
                      <p style={{ color: '#8B949E', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Idiomas */}
              <div style={{ borderTop: '1px solid #21262D', paddingTop: '20px' }}>
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '12px',
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
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #21262D',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.94rem' }}>{lang.name}</span>
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
