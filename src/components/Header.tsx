import { useState } from 'react';
import { LINKEDIN, WHATSAPP_LINK } from '../data/content';
import { useResumePdf } from '../hooks/useResumePdf';

const navLinks = [
  { label: 'Topo', href: '#inicio' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Como construo', href: '#como-construo' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Stack', href: '#stack' },
  { label: 'Formação', href: '#sobre' },
  { label: 'Evidências', href: '#evidencias' },
  { label: 'Contato', href: '#contato' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { available: hasResumePdf, href: resumeHref } = useResumePdf();

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a href="#inicio" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <div className="container site-header__inner">
        <a href="#inicio" onClick={handleNavClick} className="brand">
          <span className="brand__mark" aria-hidden="true">
            FC
          </span>
          <span className="brand__text">Felipe Cardoso</span>
        </a>

        <nav className="site-nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="site-nav__link">
              {link.label}
            </a>
          ))}

          <div className="site-nav__actions">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="site-nav__icon"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {hasResumePdf && (
              <a
                href={resumeHref}
                download
                className="btn btn--resume btn--sm"
                aria-label="Baixar currículo em PDF"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Currículo</span>
                <span className="btn__badge">PDF</span>
              </a>
            )}

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--sm"
            >
              WhatsApp
            </a>
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={menuOpen}
          className="menu-toggle"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Navegação móvel">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="mobile-menu__link"
            >
              {link.label}
            </a>
          ))}

          {hasResumePdf && (
            <a
              href={resumeHref}
              download
              onClick={handleNavClick}
              className="btn btn--resume mobile-menu__cta"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Baixar currículo</span>
              <span className="btn__badge">PDF</span>
            </a>
          )}

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
            className="btn btn--primary mobile-menu__cta"
          >
            Falar no WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
