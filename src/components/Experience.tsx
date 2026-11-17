import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { experiences } from '../data/content';

export default function Experience() {
  const ref = useScrollAnimation();

  return (
    <section
      id="experiencia"
      className="section-ambient"
      style={{ padding: '80px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          <div className="section-badge">
            <span>Experiência profissional</span>
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
            Experiência <mark>em TI</mark>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="card"
                style={{
                  padding: '26px 28px',
                  borderLeft: '4px solid #EA1D2C',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '10px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        margin: '0 0 4px 0',
                      }}
                    >
                      {exp.company} — {exp.role}
                    </h3>
                    {exp.department && (
                      <div style={{ color: '#EA1D2C', fontWeight: 600, fontSize: '0.92rem' }}>
                        {exp.department}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {exp.id === 'hydro' && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: '#EA1D2C',
                          background: 'rgba(234, 29, 44, 0.12)',
                          border: '1px solid rgba(234, 29, 44, 0.35)',
                          padding: '3px 9px',
                          borderRadius: '9999px',
                          textTransform: 'uppercase',
                        }}
                      >
                        Medido no ServiceNow
                      </span>
                    )}
                    <span
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid #21262D',
                        borderRadius: '9999px',
                        padding: '4px 12px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#CBD5E1',
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    color: '#CBD5E1',
                    fontSize: '0.96rem',
                    lineHeight: 1.68,
                    margin: 0,
                  }}
                >
                  {exp.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
