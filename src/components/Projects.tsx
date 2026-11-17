import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { projects, type Project } from '../data/content';

interface ImageZoom {
  src: string;
  legenda: string;
}

interface ProjectCardProps {
  project: Project;
  onOpenDemo: (project: Project) => void;
  onZoomImage: (img: ImageZoom) => void;
}

function ProjectCard({ project, onOpenDemo, onZoomImage }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="card"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div>
        {/* FOTOS / CAPTURAS DO PROJETO DIRETAMENTE NO CARD */}
        {project.galeria && project.galeria.length > 0 ? (
          <div style={{ marginBottom: '18px' }}>
            {/* Foto Principal */}
            <div
              onClick={() =>
                onZoomImage({
                  src: project.galeria[0].src,
                  legenda: project.galeria[0].legenda,
                })
              }
              style={{
                width: '100%',
                height: '180px',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #21262D',
                background: '#07070A',
                cursor: 'pointer',
                position: 'relative',
                marginBottom: project.galeria.length > 1 ? '8px' : '0',
              }}
            >
              <img
                src={project.galeria[0].src}
                alt={project.galeria[0].legenda}
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
                  background: 'rgba(7, 7, 10, 0.9)',
                  border: '1px solid rgba(234, 29, 44, 0.4)',
                  color: '#FFFFFF',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>🔍 Ampliar</span>
              </div>
            </div>

            {/* Faixa de Fotos Secundárias (Miniaturas) */}
            {project.galeria.length > 1 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(project.galeria.length - 1, 4)}, 1fr)`,
                  gap: '6px',
                }}
              >
                {project.galeria.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => onZoomImage({ src: img.src, legenda: img.legenda })}
                    title={img.legenda}
                    style={{
                      height: '54px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: '1px solid #21262D',
                      background: '#07070A',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.legenda}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'opacity 150ms ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.opacity = '0.75';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.opacity = '1';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : project.demoVideoUrl ? (
          /* Prévia de Vídeo para projetos com vídeo demonstrativo gravado */
          <div
            onClick={() => onOpenDemo(project)}
            style={{
              marginBottom: '18px',
              position: 'relative',
              height: '160px',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid rgba(234, 29, 44, 0.45)',
              background: 'linear-gradient(180deg, #161B22 0%, #07070A 100%)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: 'inset 0 0 20px rgba(234, 29, 44, 0.1)',
              transition: 'border-color 180ms ease, transform 180ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#EA1D2C';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(234, 29, 44, 0.45)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
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
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem' }}>
                Assistir Demonstração em Vídeo
              </span>
              <p style={{ color: '#8B949E', fontSize: '0.76rem', margin: '3px 0 0' }}>
                Clique para abrir o player gravado
              </p>
            </div>
          </div>
        ) : project.diagrama ? (
          /* Prévia de Arquitetura para projetos sem fotos carregadas */
          <div
            style={{
              marginBottom: '18px',
              background: '#07070A',
              border: '1px solid #21262D',
              borderRadius: '10px',
              padding: '14px',
              overflowX: 'auto',
            }}
          >
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#EA1D2C',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '6px',
              }}
            >
              Arquitetura & Fluxo
            </div>
            <pre
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.74rem',
                color: '#CBD5E1',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {project.diagrama}
            </pre>
          </div>
        ) : null}

        {/* Status Pill */}
        <div style={{ marginBottom: '12px' }}>
          <span
            className="status-pill"
            style={{
              background: 'rgba(234, 29, 44, 0.1)',
              color: '#EA1D2C',
              border: '1px solid rgba(234, 29, 44, 0.35)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#EA1D2C',
              }}
            />
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '10px',
            lineHeight: 1.35,
          }}
        >
          {project.titulo}
        </h3>

        {/* Summary */}
        <p
          style={{
            color: '#CBD5E1',
            fontSize: '0.96rem',
            lineHeight: 1.65,
            marginBottom: '18px',
          }}
        >
          {project.resumo}
        </p>
      </div>

      <div>
        {/* Technologies Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '20px',
          }}
        >
          {project.tecnologias.slice(0, 4).map((tech, i) => (
            <span key={i} className="tag-badge">
              {tech}
            </span>
          ))}
          {project.tecnologias.length > 4 && (
            <span
              className="tag-badge"
              style={{ color: '#EA1D2C', borderColor: 'rgba(234, 29, 44, 0.3)' }}
            >
              +{project.tecnologias.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons: SEM 'Ver demo' onde não há vídeo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {/* Mostra 'Ver demo' APENAS se houver demoVideoUrl cadastrado */}
          {project.demoVideoUrl && (
            <button
              onClick={() => onOpenDemo(project)}
              className="btn-primary"
              style={{
                padding: '8px 18px',
                fontSize: '0.88rem',
              }}
              aria-label={`Ver demonstração em vídeo de ${project.titulo}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Ver demo
            </button>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid #21262D',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '8px 18px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#EA1D2C';
              (e.currentTarget as HTMLElement).style.background = 'rgba(234, 29, 44, 0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#21262D';
              (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.04)';
            }}
            aria-expanded={expanded}
          >
            {expanded ? 'Ocultar detalhes' : 'Ver detalhes da solução'}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
              style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms ease',
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Collapsible Details */}
        {expanded && (
          <div
            style={{
              marginTop: '18px',
              borderTop: '1px solid #21262D',
              paddingTop: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div>
              <div
                style={{
                  color: '#EA1D2C',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Desafio & Problema
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                {project.problema}
              </p>
            </div>

            <div>
              <div
                style={{
                  color: '#EA1D2C',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Solução Implementada
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {project.solucao.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      color: '#CBD5E1',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ color: '#EA1D2C', flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {project.resultados.length > 0 && (
              <div>
                <div
                  style={{
                    color: '#EA1D2C',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Resultados & Impacto
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {project.resultados.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        color: '#CBD5E1',
                        fontSize: '0.88rem',
                        lineHeight: 1.55,
                      }}
                    >
                      <span style={{ color: '#EA1D2C', flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface ProjectsProps {
  onOpenDemo: (project: Project) => void;
}

export default function Projects({ onOpenDemo }: ProjectsProps) {
  const ref = useScrollAnimation();
  const [zoomedImage, setZoomedImage] = useState<ImageZoom | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!zoomedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedImage]);

  const hydroProjects = projects.filter((p) => p.categoria === 'Hydro (Corporativo)');
  const n8nProjects = projects.filter((p) => p.categoria === 'Projetos em n8n & WhatsApp');

  return (
    <section
      id="projetos"
      className="section-ambient"
      style={{ padding: '96px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          {/* Badge */}
          <div className="section-badge">
            <span>Projetos em destaque</span>
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
            Soluções & <mark>Agentes de IA</mark>
          </h2>

          <p
            style={{
              color: '#8B949E',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '820px',
              marginBottom: '56px',
            }}
          >
            Projetos desenvolvidos por iniciativa própria, divididos entre soluções corporativas para operações de TI na Hydro
            e agentes autônomos em n8n com WhatsApp entregues a clientes.
          </p>

          {/* BLOCO 1: OPERAÇÕES DE TI (HYDRO) */}
          <div style={{ marginBottom: '64px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '4px',
                  }}
                >
                  Operações de TI (Hydro)
                </h3>
                <p style={{ color: '#8B949E', fontSize: '0.92rem', margin: 0 }}>
                  Iniciativas próprias integradas a ServiceNow, Microsoft Fabric, Copilot Studio e Power Automate.
                </p>
              </div>

              <span
                style={{
                  background: 'rgba(234, 29, 44, 0.1)',
                  color: '#EA1D2C',
                  border: '1px solid rgba(234, 29, 44, 0.3)',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                Iniciativas Próprias em AIOps
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                alignItems: 'stretch',
              }}
            >
              {hydroProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDemo={onOpenDemo}
                  onZoomImage={(img) => setZoomedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* BLOCO 2: AGENTES EM N8N E WHATSAPP */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '4px',
                  }}
                >
                  Agentes em n8n e WhatsApp
                </h3>
                <p style={{ color: '#8B949E', fontSize: '0.92rem', margin: 0 }}>
                  Soluções entregues com RAG, Model Context Protocol (MCP), transcrição de áudios e agendamento em tempo real.
                </p>
              </div>

              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: '#CBD5E1',
                  border: '1px solid #21262D',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                n8n • MCP • RAG
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                alignItems: 'stretch',
              }}
            >
              {n8nProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDemo={onOpenDemo}
                  onZoomImage={(img) => setZoomedImage(img)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox para zoom de fotos clicadas nos cards de projetos */}
      {zoomedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Imagem ampliada do projeto"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            background: 'rgba(5, 7, 10, 0.94)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setZoomedImage(null)}
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
              onClick={() => setZoomedImage(null)}
              aria-label="Fechar visualização"
              style={{
                position: 'absolute',
                top: '-46px',
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
              src={zoomedImage.src}
              alt={zoomedImage.legenda}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '10px',
                border: '1px solid #30363D',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.95)',
              }}
            />
            {zoomedImage.legenda && (
              <p
                style={{
                  color: '#CBD5E1',
                  fontSize: '0.92rem',
                  marginTop: '12px',
                  textAlign: 'center',
                  maxWidth: '680px',
                  lineHeight: 1.5,
                }}
              >
                {zoomedImage.legenda}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
