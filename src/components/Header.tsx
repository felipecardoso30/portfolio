import { useState } from 'react';
import { LINKEDIN, WHATSAPP_LINK } from '../data/content';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre mim', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Galeria', href: '#galeria' },
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
        {/* Brand */}
        <a
          href="#inicio"
          onClick={handleNavClick}
          style={{
            fontSize: '1.15rem',
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
              fontSize: '0.85rem',
            }}
          >
            FC
          </span>
          <span>Felipe Cardoso</span>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          className="hidden-mobile"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.92rem',
                fontWeight: 500,
                color: '#CBD5E1',
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: '9999px',
                transition: 'color 150ms ease, background 150ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#CBD5E1';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Social Quick Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid #21262D' }}>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: '#8B949E', display: 'flex', alignItems: 'center', transition: 'color 140ms' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#EA1D2C')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#8B949E')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              padding: '8px 18px',
              fontSize: '0.86rem',
              marginLeft: '8px',
            }}
          >
            Falar no WhatsApp
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          aria-label="Abrir menu de navegação"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            color: '#FFFFFF',
            minWidth: '44px',
            minHeight: '44px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="show-mobile"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          style={{
            background: '#0E1217',
            borderTop: '1px solid #21262D',
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              style={{
                color: '#CBD5E1',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '10px 14px',
                borderRadius: '8px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.background = 'rgba(234, 29, 44, 0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#CBD5E1';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
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
        @media (max-width: 960px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 961px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
