import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { skillCategories } from '../data/content';

export default function Skills() {
  const ref = useScrollAnimation();

  return (
    <section
      id="habilidades"
      className="section-ambient"
      style={{ padding: '96px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          {/* Badge */}
          <div className="section-badge">
            <span>Tecnologias & Ferramentas</span>
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
            Tecnologias que uso <mark>no dia a dia</mark>
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
            Ecossistema técnico aplicado em produção para suporte corporativo, automação inteligente de processos
            e orquestração de inteligência artificial generativa.
          </p>

          {/* Skills Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {skillCategories.map((cat, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      margin: 0,
                    }}
                  >
                    {cat.category}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: '#EA1D2C',
                      fontWeight: 700,
                    }}
                  >
                    0{i + 1}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.items.map((item, j) => (
                    <span key={j} className="tag-badge">
                      {item}
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
