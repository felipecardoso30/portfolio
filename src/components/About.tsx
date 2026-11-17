import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { about } from '../data/content';

export default function About() {
  const ref = useScrollAnimation();

  return (
    <section id="sobre" className="section section-ambient">
      <div className="container">
        <div ref={ref} className="fade-in">
          <header className="section-head">
            <span className="section-badge">Formação e sobre</span>
            <h2 className="section-title">
              Sobre & <mark>Formação</mark>
            </h2>
          </header>

          <div className="about-grid">
            <div className="card about-card">
              <div className="stack-xs">
                <h3 className="about-card__title">Sobre mim</h3>
                <p className="text-body">{about.resumo}</p>
              </div>

              <div className="lang-block">
                <h4 className="lang-block__title">Idiomas</h4>
                <div className="lang-list">
                  {about.languages.map((lang) => (
                    <div key={lang.name} className="lang-item">
                      <span className="lang-item__name">{lang.name}</span>
                      <span className="pill pill--sm">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card about-card">
              <h3 className="about-card__title">Formação Acadêmica</h3>
              <div className="edu-list">
                {about.education.map((edu) => (
                  <div key={edu.institution} className="edu-item">
                    <div className="edu-item__degree">{edu.degree}</div>
                    <div className="edu-item__meta">{edu.institution}</div>
                    <div className="edu-item__period">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
