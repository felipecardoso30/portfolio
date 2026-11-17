import { useEffect, useState } from 'react';
import type { Project } from '../data/content';

interface DemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function DemoModal({ project, onClose }: DemoModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close on Escape & trap body scroll
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, selectedImage, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(5, 7, 10, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#0D1117',
          border: '1px solid #EA1D2C',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 25px rgba(234, 29, 44, 0.2)',
          borderRadius: '16px',
          overflow: 'hidden',
          animation: 'modalSlideUp 200ms ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #21262D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            background: '#161B22',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Status Pill & Category */}
            <span
              className="status-pill"
              style={{
                background: 'rgba(234, 29, 44, 0.12)',
                color: '#EA1D2C',
                border: '1px solid rgba(234, 29, 44, 0.4)',
              }}
            >
              {project.status}
            </span>
            <span
              style={{
                fontSize: '0.88rem',
                color: '#8B949E',
              }}
            >
              {project.categoria}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar modal de demonstração (Esc)"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid #30363D',
              color: '#F0F6FC',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 140ms, border-color 140ms',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#EA1D2C';
              (e.currentTarget as HTMLElement).style.borderColor = '#EA1D2C';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.05)';
              (e.currentTarget as HTMLElement).style.borderColor = '#30363D';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '26px',
            fontSize: '0.96rem',
          }}
        >
          {/* Title & Summary */}
          <div>
            <h3
              id="modal-title"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '10px',
                lineHeight: 1.3,
              }}
            >
              {project.titulo}
            </h3>
            <p
              style={{
                color: '#CBD5E1',
                fontSize: '1rem',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {project.resumo}
            </p>
          </div>

          {/* Video Demonstration (only if demo video url exists) */}
          {project.demoVideoUrl && (
            <div>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#EA1D2C',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '10px',
                }}
              >
                Demonstração em Vídeo
              </div>

              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#07070A',
                  border: '1px solid #21262D',
                }}
              >
                {project.demoVideoUrl.endsWith('.mp4') || project.demoVideoUrl.startsWith('/') ? (
                  <video
                    src={project.demoVideoUrl}
                    controls
                    preload="metadata"
                    playsInline
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: '#000000',
                    }}
                  >
                    Seu navegador não suporta a reprodução deste vídeo.
                  </video>
                ) : (
                  <iframe
                    src={project.demoVideoUrl}
                    title={`Demonstração de ${project.titulo}`}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Project Gallery if available */}
          {project.galeria && project.galeria.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#EA1D2C',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '12px',
                }}
              >
                Capturas de Tela & Evidências Reais
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '14px',
                }}
              >
                {project.galeria.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(item.src)}
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid #21262D',
                      background: '#07070A',
                      cursor: 'pointer',
                      transition: 'border-color 160ms, transform 160ms',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#EA1D2C';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#21262D';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ height: '120px', overflow: 'hidden' }}>
                      <img
                        src={item.src}
                        alt={item.legenda}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div
                      style={{
                        padding: '8px 10px',
                        fontSize: '0.78rem',
                        color: '#8B949E',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.legenda}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture / Diagram */}
          <div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#EA1D2C',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '10px',
              }}
            >
              Diagrama de Fluxo & Integração
            </div>

            <div
              style={{
                background: '#07070A',
                border: '1px solid #21262D',
                borderRadius: '10px',
                padding: '18px',
                overflowX: 'auto',
              }}
            >
              <pre
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.82rem',
                  color: '#F0F6FC',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {project.diagrama}
              </pre>
            </div>
          </div>

          {/* Details: Problema e Tecnologias */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Problema */}
            <div
              style={{
                background: '#07070A',
                border: '1px solid #21262D',
                borderRadius: '10px',
                padding: '18px',
              }}
            >
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#EA1D2C',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                Desafio & Problema
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                {project.problema}
              </p>
            </div>

            {/* Tecnologias */}
            <div
              style={{
                background: '#07070A',
                border: '1px solid #21262D',
                borderRadius: '10px',
                padding: '18px',
              }}
            >
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#EA1D2C',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Tecnologias Utilizadas
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tecnologias.map((tech, i) => (
                  <span key={i} className="tag-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Solução */}
          <div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#EA1D2C',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '10px',
              }}
            >
              Solução Implementada
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {project.solucao.map((step, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    color: '#CBD5E1',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: '#EA1D2C', fontWeight: 700, flexShrink: 0 }}>→</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resultados */}
          {project.resultados.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#EA1D2C',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '10px',
                }}
              >
                Resultados & Impacto
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {project.resultados.map((res, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      color: '#F0F6FC',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: '#EA1D2C', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Evolução & Próximas etapas */}
          {(project.evolucao || project.proximasEtapas) && (
            <div style={{ borderTop: '1px solid #21262D', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.evolucao && (
                <div>
                  <div style={{ color: '#8B949E', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Evolução
                  </div>
                  <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.6, margin: '4px 0 0 0' }}>
                    {project.evolucao}
                  </p>
                </div>
              )}
              {project.proximasEtapas && (
                <div>
                  <div style={{ color: '#8B949E', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Próximas Etapas
                  </div>
                  <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.6, margin: '4px 0 0 0' }}>
                    {project.proximasEtapas}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid #21262D',
            background: '#161B22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '7px 18px', fontSize: '0.85rem' }}
          >
            Fechar
          </button>
        </div>
      </div>

      {/* Lightbox para imagem ampliada dentro do modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Imagem ampliada"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(0, 0, 0, 0.94)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Fechar ampliação"
              style={{
                position: 'absolute',
                top: '-44px',
                right: '0',
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
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Visualização ampliada"
              style={{
                maxWidth: '100%',
                maxHeight: '84vh',
                objectFit: 'contain',
                borderRadius: '12px',
                border: '1px solid #30363D',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9)',
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
