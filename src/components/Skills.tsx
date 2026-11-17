import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { skillCategories } from '../data/content';

export default function Skills() {
  const ref = useScrollAnimation();

  return (
    <section id="stack" className="section section-ambient">
      <div className="container">
        <div ref={ref} className="fade-in">
          <header className="section-head">
            <span className="section-badge">Stack</span>
            <h2 className="section-title">
              Ferramentas & <mark>Tecnologias</mark>
            </h2>
          </header>

          <div className="skill-grid">
            {skillCategories.map((cat, i) => (
              <div key={cat.category} className="card skill-card">
                <div className="pillar-card__head">
                  <h3 className="pillar-card__title">{cat.category}</h3>
                  <span className="pillar-card__num">0{i + 1}</span>
                </div>

                <ul className="tags" aria-label={cat.category}>
                  {cat.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
