import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { galleryItems, galleryFilters, type GalleryItem } from '../data/content';
import OracFlowDiagram from './OracFlowDiagram';
import NfsBeforeAfterDiagram from './NfsBeforeAfterDiagram';

export default function Gallery() {
  const ref = useScrollAnimation();
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

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

  const filteredItems =
    selectedFilter === 'Todos'
      ? galleryItems
      : galleryItems.filter((item) => item.categoria === selectedFilter);

  return (
    <section
      id="evidencias"
      className="section-ambient"
      style={{ padding: '80px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          <div className="section-badge">
            <span>Evidências</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '14px',
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            Diagramas & <mark>Capturas</mark>
          </h2>

          <p
            style={{
              color: '#8B949E',
              fontSize: '1.02rem',
              lineHeight: 1.7,
              maxWidth: '750px',
              marginBottom: '28px',
            }}
          >
            Arquitetura dos fluxos corporativos (com dados fictícios) e capturas dos
            agentes em n8n e WhatsApp (com cabeçalhos e endereços anonimizados).
          </p>

          {/* Filtros */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '32px',
            }}
            role="tablist"
            aria-label="Filtro de evidências por projeto"
          >
            {galleryFilters.map((filtro) => {
              const isActive = selectedFilter === filtro;
              return (
                <button
                  type="button"
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
                >
                  {filtro}
                </button>
              );
            })}
          </div>

          {/* Grade de itens */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
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
                <div style={{ marginBottom: '16px' }}>
                  {item.kind === 'orac-diagram' ? (
                    <OracFlowDiagram />
                  ) : item.kind === 'nfs-diagram' ? (
                    <NfsBeforeAfterDiagram />
                  ) : (
                    <div
                      style={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        height: '200px',
                        background: '#07070A',
                        border: '1px solid #21262D',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={item.src}
                        alt={item.titulo}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '8px',
                          background: 'rgba(7, 7, 10, 0.88)',
                          border: '1px solid rgba(234, 29, 44, 0.4)',
                          color: '#FFFFFF',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        Ampliar ↗
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div
                    style={{
                      color: '#EA1D2C',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      marginBottom: '4px',
                    }}
                  >
                    {item.projetoNome}
                  </div>
                  <h3
                    style={{
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '1rem',
                      marginBottom: '6px',
                      marginTop: 0,
                    }}
                  >
                    {item.titulo}
                  </h3>
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
        </div>
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada da evidência"
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
              maxHeight: '92vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Fechar ampliação (Esc)"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#EA1D2C',
                border: 'none',
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
            >
              ✕
            </button>

            <div style={{ marginBottom: '16px', paddingRight: '44px' }}>
              <span style={{ color: '#EA1D2C', fontSize: '0.85rem', fontWeight: 700 }}>
                {activeItem.projetoNome}
              </span>
              <h3
                style={{
                  color: '#FFFFFF',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: '4px 0 0 0',
                }}
              >
                {activeItem.titulo}
              </h3>
            </div>

            <div style={{ marginBottom: '16px' }}>
              {activeItem.kind === 'orac-diagram' ? (
                <OracFlowDiagram />
              ) : activeItem.kind === 'nfs-diagram' ? (
                <NfsBeforeAfterDiagram />
              ) : (
                <div
                  style={{
                    background: '#07070A',
                    border: '1px solid #21262D',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={activeItem.src}
                    alt={activeItem.legenda}
                    width={activeItem.width}
                    height={activeItem.height}
                    style={{
                      width: '100%',
                      maxHeight: '65vh',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto',
                    }}
                  />
                </div>
              )}
            </div>

            <p style={{ color: '#CBD5E1', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
              {activeItem.legenda}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
