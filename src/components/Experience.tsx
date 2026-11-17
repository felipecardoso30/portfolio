import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { experiences } from '../data/content';

export default function Experience() {
  const ref = useScrollAnimation();

  return (
    <section
      id="experiencia"
      className="section-ambient"
      style={{ padding: '96px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          {/* Badge */}
          <div className="section-badge">
            <span>Minha trajetória profissional</span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            Experiência corporativa & <mark>atuação prática</mark>
          </h2>

          <p
            style={{
              color: '#8B949E',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '750px',
              marginBottom: '48px',
            }}
          >
            Histórico profissional em operações de TI corporativas, atendimento e resolução de chamados no ServiceNow,
            gestão de dispositivos com Microsoft Intune, suporte a redes locais e manutenção de infraestrutura.
          </p>

          {/* Experience Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="card"
                style={{
                  padding: '32px',
                  borderLeft: '4px solid #EA1D2C',
                }}
              >
                {/* Header Row: Company, Role, Period */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginBottom: '4px',
                        lineHeight: 1.3,
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div style={{ color: '#EA1D2C', fontWeight: 600, fontSize: '1rem' }}>
                      {exp.company}
                      {exp.department && (
                        <span style={{ color: '#8B949E', fontWeight: 400, fontSize: '0.9rem' }}>
                          {' '}• {exp.department}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '4px',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(234, 29, 44, 0.1)',
                        color: '#EA1D2C',
                        border: '1px solid rgba(234, 29, 44, 0.3)',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      {exp.period}
                    </span>
                    <span style={{ color: '#8B949E', fontSize: '0.8rem' }}>{exp.location}</span>
                  </div>
                </div>

                {/* Bullets List */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {exp.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        color: '#CBD5E1',
                        fontSize: '0.96rem',
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: '#EA1D2C', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {exp.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
