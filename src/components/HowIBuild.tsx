import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { howIBuild } from '../data/content';

export default function HowIBuild() {
  const ref = useScrollAnimation();

  return (
    <section id="como-construo" className="section section-ambient">
      <div className="container">
        <div ref={ref} className="fade-in">
          <header className="section-head">
            <span className="section-badge">Método de engenharia</span>
            <h2 className="section-title">
              Como eu <mark>construo</mark>
            </h2>
          </header>

          <blockquote className="card quote-card">
            <p>“{howIBuild.statement}”</p>
          </blockquote>

          <div className="pillar-grid">
            {howIBuild.pillars.map((pillar, i) => (
              <div key={pillar.title} className="card pillar-card">
                <div className="pillar-card__head">
                  <h3 className="pillar-card__title">{pillar.title}</h3>
                  <span className="pillar-card__num">0{i + 1}</span>
                </div>
                <p className="text-body">{pillar.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
