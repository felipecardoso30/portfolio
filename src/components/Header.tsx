import { useState } from 'react';
import { LINKEDIN, WHATSAPP_LINK } from '../data/content';

const navLinks = [
  { label: 'Topo', href: '#inicio' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Como construo', href: '#como-construo' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Stack', href: '#stack' },
  { label: 'Formação', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(7, 7, 10, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #21262D',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* Marca */}
        <a
          href="#inicio"
          onClick={handleNavClick}
          style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: '#FFFFFF',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            letterSpacing: '-0.02em',
          }}
        >
          <span
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: '#EA1D2C',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.82rem',
            }}
          >
            FC
          </span>
          <span>Felipe Cardoso</span>
        </a>

        {/* Navegação Desktop */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          className="hidden-mobile"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.88rem',
                fontWeight: 500,
                color: '#CBD5E1',
                textDecoration: 'none',
                padding: '7px 11px',
                borderRadius: '9999px',
                transition: 'color 150ms ease, background 150ms ease',
              }}
            >
              {link.label}
            </a>
          ))}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginLeft: '8px',
              paddingLeft: '12px',
              borderLeft: '1px solid #21262D',
            }}
          >
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                color: '#8B949E',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 140ms',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: '7px 15px',
                fontSize: '0.84rem',
              }}
            >
              WhatsApp
            </a>
          </div>
        </nav>

        {/* Botão Menu Mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={menuOpen}
          className="show-mobile"
          style={{
            background: 'none',
            border: '1px solid #21262D',
            borderRadius: '8px',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '8px',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div
          style={{
            background: '#0E1217',
            borderBottom: '1px solid #21262D',
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid #161B22',
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
            className="btn-primary"
            style={{
              marginTop: '12px',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            Falar no WhatsApp
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 1020px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 1021px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
