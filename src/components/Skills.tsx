import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { skillCategories } from '../data/content';

export default function Skills() {
  const ref = useScrollAnimation();

  return (
    <section
      id="stack"
      className="section-ambient"
      style={{ padding: '80px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          <div className="section-badge">
            <span>Stack</span>
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
            Ferramentas & <mark>Tecnologias</mark>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {skillCategories.map((cat, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
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
                      fontSize: '1.08rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      margin: 0,
                    }}
                  >
                    {cat.category}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.78rem',
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
