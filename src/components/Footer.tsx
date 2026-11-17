import { LINKEDIN, EMAIL, LOCATION } from '../data/content';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      style={{
        background: '#07070A',
        borderTop: '1px solid #21262D',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 20px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          textAlign: 'center',
        }}
      >
        {/* Name & Title */}
        <div>
          <p
            style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '-0.02em',
              marginBottom: '6px',
            }}
          >
            Felipe Cardoso das Neves
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: '#8B949E',
              fontSize: '0.85rem',
            }}
          >
            {LOCATION} • Sistemas de Informação • IA & Automação em IT Operations
          </p>
        </div>

        {/* Social Links */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: '#8B949E', display: 'flex', alignItems: 'center', transition: 'color 140ms' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#EA1D2C')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#8B949E')}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="E-mail"
            style={{ color: '#8B949E', display: 'flex', alignItems: 'center', transition: 'color 140ms' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#EA1D2C')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#8B949E')}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: '#8B949E',
            fontSize: '0.8rem',
            margin: 0,
          }}
        >
          © {currentYear} Felipe Cardoso das Neves · IA & Automação · Belém, PA
        </p>
      </div>

      {/* Red accent line at bottom */}
      <div
        style={{
          height: '2px',
          background: '#EA1D2C',
        }}
      />
    </footer>
  );
}
