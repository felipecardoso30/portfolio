import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { experiences } from '../data/content';

export default function Experience() {
  const ref = useScrollAnimation();

  return (
    <section id="experiencia" className="section section-ambient">
      <div className="container">
        <div ref={ref} className="fade-in">
          <header className="section-head">
            <span className="section-badge">Experiência profissional</span>
            <h2 className="section-title">
              Experiência <mark>em TI</mark>
            </h2>
          </header>

          <div className="exp-list">
            {experiences.map((exp) => (
              <article key={exp.id} className="card exp-card">
                <div className="exp-card__head">
                  <div>
                    <h3 className="exp-card__title">
                      {exp.role} — {exp.company}
                    </h3>
                    {exp.department && (
                      <div className="exp-card__dept">{exp.department}</div>
                    )}
                  </div>

                  <div className="pill-row">
                    {exp.id === 'hydro' && (
                      <span className="pill pill--accent pill--sm">
                        Medido no ServiceNow
                      </span>
                    )}
                    <span className="pill">{exp.period}</span>
                  </div>
                </div>

                <ul className="arrow-list">
                  {exp.bullets.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
