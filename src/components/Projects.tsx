import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  projects,
  otherProjects,
  type Project,
  type ProjectImage,
} from '../data/content';
import OracFlowDiagram from './OracFlowDiagram';
import NfsBeforeAfterDiagram from './NfsBeforeAfterDiagram';

interface ProjectCardProps {
  project: Project;
  onZoomImage: (img: ProjectImage) => void;
}

function ProjectCard({ project, onZoomImage }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="card"
      style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div>
        {/* Topo Visual do Projeto */}
        <div style={{ marginBottom: '20px' }}>
          {project.tipoVisual === 'orac-flow' ? (
            <OracFlowDiagram />
          ) : project.tipoVisual === 'nfs-before-after' ? (
            <NfsBeforeAfterDiagram />
          ) : project.galeria.length > 0 ? (
            <div>
              <div
                onClick={() => onZoomImage(project.galeria[0])}
                style={{
                  width: '100%',
                  height: '190px',
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
                  width={project.galeria[0].width}
                  height={project.galeria[0].height}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 220ms ease',
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
                  }}
                >
                  Ampliar captura ↗
                </div>
              </div>

              {project.galeria.length > 1 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(
                      project.galeria.length - 1,
                      4
                    )}, 1fr)`,
                    gap: '6px',
                  }}
                >
                  {project.galeria.slice(1, 5).map((img, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => onZoomImage(img)}
                      title={img.legenda}
                      aria-label={`Ampliar imagem: ${img.legenda}`}
                      style={{
                        height: '56px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: '1px solid #21262D',
                        background: '#07070A',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.legenda}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
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
                Fluxo da Solução
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
          )}
        </div>

        {/* Status e Iniciativa */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
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

          {project.iniciativa && (
            <span
              style={{
                fontSize: '0.75rem',
                color: '#8B949E',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid #21262D',
                padding: '3px 10px',
                borderRadius: '9999px',
              }}
            >
              {project.iniciativa}
            </span>
          )}
        </div>

        {/* Título */}
        <h3
          style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '12px',
            lineHeight: 1.3,
          }}
        >
          {project.titulo}
        </h3>

        {/* Problema e Solução */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '16px',
          }}
        >
          <p
            style={{
              color: '#CBD5E1',
              fontSize: '0.94rem',
              lineHeight: 1.62,
              margin: 0,
            }}
          >
            <strong style={{ color: '#FFFFFF' }}>Problema: </strong>
            {project.problema}
          </p>
          <p
            style={{
              color: '#CBD5E1',
              fontSize: '0.94rem',
              lineHeight: 1.62,
              margin: 0,
            }}
          >
            <strong style={{ color: '#FFFFFF' }}>Solução: </strong>
            {project.solucao}
          </p>
        </div>

        {/* Resultados rotulados (quando existirem) */}
        {project.resultados && project.resultados.length > 0 && (
          <div
            style={{
              background: '#07070A',
              border: '1px solid #21262D',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: '#EA1D2C',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Resultado
            </div>
            {project.resultados.map((res, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '10px',
                  flexWrap: 'wrap',
                  fontSize: '0.88rem',
                  color: '#F0F6FC',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ flex: '1 1 220px' }}>{res.texto}</span>
                {res.rotulo && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#EA1D2C',
                      background: 'rgba(234, 29, 44, 0.12)',
                      border: '1px solid rgba(234, 29, 44, 0.35)',
                      padding: '2px 9px',
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {res.rotulo}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* Stack */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '18px',
          }}
        >
          {project.stack.map((tech, i) => (
            <span key={i} className="tag-badge">
              {tech}
            </span>
          ))}
        </div>

        {/* Botão para expandir Decisões, Falha/Correção, Limitações e Diagrama */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid #21262D',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '9px 18px',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'border-color 180ms ease, background 180ms ease',
          }}
          aria-expanded={expanded}
        >
          {expanded
            ? 'Ocultar detalhes da solução'
            : 'Ver detalhes da solução (arquitetura e testes)'}
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
              transition: 'transform 180ms ease',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Detalhes Completos do Case Study */}
        {expanded && (
          <div
            style={{
              marginTop: '18px',
              borderTop: '1px solid #21262D',
              paddingTop: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Diagrama em texto sempre acessível nos detalhes */}
            <div>
              <div
                style={{
                  color: '#EA1D2C',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Diagrama de Fluxo
              </div>
              <div
                style={{
                  background: '#07070A',
                  border: '1px solid #21262D',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  overflowX: 'auto',
                }}
              >
                <pre
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    color: '#F0F6FC',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {project.diagrama}
                </pre>
              </div>
            </div>

            {/* Decisões de arquitetura */}
            {project.decisoes && project.decisoes.length > 0 && (
              <div>
                <div
                  style={{
                    color: '#EA1D2C',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Decisões de Arquitetura
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  {project.decisoes.map((dec, i) => (
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
                      <span>{dec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Falha e correção (molde de 4 linhas) */}
            {project.falhaCorrecao && (
              <div
                style={{
                  background: '#07070A',
                  border: '1px solid #21262D',
                  borderLeft: '3px solid #EA1D2C',
                  borderRadius: '8px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    color: '#EA1D2C',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  Falha Real & Correção
                </div>
                <p style={{ color: '#CBD5E1', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                  <strong style={{ color: '#FFFFFF' }}>O que aconteceu: </strong>
                  {project.falhaCorrecao.oQueAconteceu}
                </p>
                <p style={{ color: '#CBD5E1', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                  <strong style={{ color: '#FFFFFF' }}>Causa: </strong>
                  {project.falhaCorrecao.causa}
                </p>
                <p style={{ color: '#CBD5E1', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                  <strong style={{ color: '#FFFFFF' }}>Correção: </strong>
                  {project.falhaCorrecao.correcao}
                </p>
                <p style={{ color: '#F0F6FC', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                  <strong style={{ color: '#EA1D2C' }}>Efeito: </strong>
                  {project.falhaCorrecao.efeito}
                </p>
              </div>
            )}

            {/* Limitações e próximos passos (somente quando preenchido) */}
            {project.limitacoes && (
              <div>
                <div
                  style={{
                    color: '#8B949E',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  Limitações e próximos passos
                </div>
                <p style={{ color: '#CBD5E1', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                  {project.limitacoes}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const ref = useScrollAnimation();
  const [zoomedImage, setZoomedImage] = useState<ProjectImage | null>(null);

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

  return (
    <section
      id="projetos"
      className="section-ambient"
      style={{ padding: '88px 24px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div ref={ref} className="fade-in">
          <div className="section-badge">
            <span>Projetos principais</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '14px',
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            Agentes de IA & <mark>Automações</mark>
          </h2>

          <p
            style={{
              color: '#8B949E',
              fontSize: '1.04rem',
              lineHeight: 1.7,
              maxWidth: '820px',
              marginBottom: '44px',
            }}
          >
            Case studies completos com problema, arquitetura, falhas reais corrigidas,
            validação humana e resultados classificados por origem.
          </p>

          {/* Grade dos 5 projetos principais */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
              marginBottom: '44px',
            }}
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onZoomImage={(img) => setZoomedImage(img)}
              />
            ))}
          </div>

          {/* Outros projetos (CuidAI em cartão compacto, sem prints e sem métricas) */}
          {otherProjects.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '14px',
                }}
              >
                Outros projetos
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '20px',
                }}
              >
                {otherProjects.map((item) => (
                  <div
                    key={item.id}
                    className="card"
                    style={{
                      padding: '22px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '1.08rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          margin: 0,
                        }}
                      >
                        {item.titulo}
                      </h4>
                      <span
                        className="status-pill"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#CBD5E1',
                          border: '1px solid #30363D',
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p
                      style={{
                        color: '#CBD5E1',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {item.descricao}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.stack.map((tech, i) => (
                        <span key={i} className="tag-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox para zoom de imagens dos cards */}
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
              type="button"
              onClick={() => setZoomedImage(null)}
              aria-label="Fechar visualização (Esc)"
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
              ✕
            </button>
            <img
              src={zoomedImage.src}
              alt={zoomedImage.legenda}
              width={zoomedImage.width}
              height={zoomedImage.height}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '10px',
                border: '1px solid #30363D',
              }}
            />
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
          </div>
        </div>
      )}
    </section>
  );
}
