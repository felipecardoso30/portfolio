import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { galleryItems, galleryFilters, type GalleryItem } from '../data/content';

export default function Gallery() {
  const ref = useScrollAnimation();
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Esc key closes lightbox
  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  const filteredItems = selectedFilter === 'Todos'
    ? galleryItems
    : galleryItems.filter((item) => item.categoria === selectedFilter);

  return (
    <section
      id="galeria"
      className="section-ambient"
      style={{ padding: '96px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          {/* Badge */}
          <div className="section-badge">
            <span>Galeria de telas & fluxos</span>
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
            Evidências & <mark>Capturas Reais</mark>
          </h2>

          <p
            style={{
              color: '#8B949E',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '750px',
              marginBottom: '36px',
            }}
          >
            Capturas reais dos fluxos construídos em n8n e das conversas em tempo real com os agentes de IA no WhatsApp.
            Filtre por projeto e clique para ampliar.
          </p>

          {/* Filters Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '36px',
            }}
            role="tablist"
            aria-label="Filtro de projetos da galeria"
          >
            {galleryFilters.map((filtro) => {
              const isActive = selectedFilter === filtro;
              return (
                <button
                  key={filtro}
                  onClick={() => setSelectedFilter(filtro)}
                  role="tab"
                  aria-selected={isActive}
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    transition: 'all 160ms ease',
                    background: isActive ? '#EA1D2C' : 'rgba(255, 255, 255, 0.04)',
                    color: isActive ? '#FFFFFF' : '#CBD5E1',
                    border: isActive ? '1px solid #EA1D2C' : '1px solid #21262D',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = '#EA1D2C';
                      (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = '#21262D';
                      (e.currentTarget as HTMLElement).style.color = '#CBD5E1';
                    }
                  }}
                >
                  {filtro}
                </button>
              );
            })}
          </div>

          {/* Gallery Items Grid */}
          {filteredItems.length === 0 ? (
            <div
              className="card"
              style={{
                padding: '48px 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#EA1D2C',
                  background: 'rgba(234, 29, 44, 0.1)',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                }}
              >
                DEMOS EM BREVE
              </div>
              <p style={{ color: '#8B949E', fontSize: '0.95rem', margin: 0 }}>
                O vídeo demonstrativo das notas fiscais e capturas corporativas estão em preparação.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="card"
                  onClick={() => setActiveItem(item)}
                  style={{
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Image container */}
                  <div
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '16px',
                      height: '210px',
                      background: '#07070A',
                      border: '1px solid #21262D',
                      position: 'relative',
                    }}
                  >
                    {item.src.endsWith('.mp4') ? (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(180deg, #161B22 0%, #07070A 100%)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                        }}
                      >
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: '#EA1D2C',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 16px rgba(234, 29, 44, 0.5)',
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                        <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.82rem' }}>
                          Vídeo Demonstrativo
                        </span>
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            background: 'rgba(7, 7, 10, 0.85)',
                            border: '1px solid rgba(234, 29, 44, 0.4)',
                            color: '#FFFFFF',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          assistir vídeo ▶
                        </div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={item.src}
                          alt={item.titulo}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 300ms ease',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            background: 'rgba(7, 7, 10, 0.85)',
                            border: '1px solid rgba(234, 29, 44, 0.4)',
                            color: '#FFFFFF',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          ampliar ↗
                        </div>
                      </>
                    )}
                  </div>

                  {/* Caption info */}
                  <div>
                    <div
                      style={{
                        color: '#EA1D2C',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        marginBottom: '4px',
                      }}
                    >
                      {item.projetoNome}
                    </div>
                    <div
                      style={{
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '1rem',
                        marginBottom: '6px',
                      }}
                    >
                      {item.titulo}
                    </div>
                    <p
                      style={{
                        color: '#8B949E',
                        fontSize: '0.88rem',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.legenda}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada da captura"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(5, 7, 10, 0.94)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setActiveItem(null)}
        >
          <div
            className="card"
            style={{
              maxWidth: '920px',
              width: '100%',
              background: '#0E1217',
              border: '1px solid #EA1D2C',
              padding: '24px',
              position: 'relative',
              animation: 'fadeIn 200ms ease-out',
              maxHeight: '92vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              aria-label="Fechar ampliação (Esc)"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid #21262D',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#EA1D2C';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              ✕
            </button>

            {/* Title & Project */}
            <div style={{ marginBottom: '16px', paddingRight: '44px' }}>
              <span style={{ color: '#EA1D2C', fontSize: '0.85rem', fontWeight: 700 }}>
                {activeItem.projetoNome}
              </span>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', fontWeight: 800, margin: '4px 0 0 0' }}>
                {activeItem.titulo}
              </h3>
            </div>

            {/* Image Preview */}
            <div
              style={{
                background: '#07070A',
                border: '1px solid #21262D',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '16px',
              }}
            >
              {activeItem.src.endsWith('.mp4') ? (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  preload="auto"
                  playsInline
                  style={{ width: '100%', maxHeight: '68vh', display: 'block', margin: '0 auto', background: '#000000' }}
                >
                  Seu navegador não suporta a reprodução deste vídeo.
                </video>
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.legenda}
                  style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block', margin: '0 auto' }}
                />
              )}
            </div>

            {/* Caption */}
            <p style={{ color: '#CBD5E1', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
              {activeItem.legenda}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
