import { useEffect, useRef, useState } from 'react';

export default function NfsBeforeAfterDiagram() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{
        background: '#07070A',
        border: '1px solid #21262D',
        borderRadius: '12px',
        padding: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '12px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            color: '#EA1D2C',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Antes e Depois · Dados Fictícios (NF-000000 · PO-000000)
        </span>
        <span
          className="metric-tag"
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#EA1D2C',
            background: 'rgba(234, 29, 44, 0.12)',
            border: '1px solid rgba(234, 29, 44, 0.35)',
            padding: '2px 8px',
            borderRadius: '9999px',
          }}
        >
          Observado no meu uso
        </span>
      </div>

      {/* Barras comparativas Antes x Depois */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              color: '#CBD5E1',
              marginBottom: '4px',
            }}
          >
            <span>Antes (manual: abrir PDF, renomear, subir e mover)</span>
            <strong style={{ color: '#FFFFFF' }}>~8 min / nota</strong>
          </div>
          <div
            style={{
              height: '10px',
              background: '#161B22',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#30363D',
                transformOrigin: 'left',
                transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              color: '#CBD5E1',
              marginBottom: '4px',
            }}
          >
            <span>Depois (Power Automate + AI Builder OCR)</span>
            <strong style={{ color: '#EA1D2C' }}>~15 s / nota (~97% menos)</strong>
          </div>
          <div
            style={{
              height: '10px',
              background: '#161B22',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '6%',
                minWidth: '14px',
                height: '100%',
                background: '#EA1D2C',
                transformOrigin: 'left',
                transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 120ms',
              }}
            />
          </div>
        </div>
      </div>

      {/* Etapas com dados fictícios */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '8px',
          fontSize: '0.74rem',
        }}
      >
        <div
          style={{
            background: '#0E1217',
            border: '1px solid #21262D',
            borderRadius: '8px',
            padding: '8px 10px',
          }}
        >
          <div style={{ color: '#EA1D2C', fontWeight: 700 }}>1. Leitura OCR</div>
          <div style={{ color: '#8B949E' }}>NF-000000 · PO-000000 e usuário à mão</div>
        </div>
        <div
          style={{
            background: '#0E1217',
            border: '1px solid #21262D',
            borderRadius: '8px',
            padding: '8px 10px',
          }}
        >
          <div style={{ color: '#EA1D2C', fontWeight: 700 }}>2. Padronização</div>
          <div style={{ color: '#8B949E' }}>Renomeia e salva no SharePoint (DLP)</div>
        </div>
        <div
          style={{
            background: '#0E1217',
            border: '1px solid #21262D',
            borderRadius: '8px',
            padding: '8px 10px',
          }}
        >
          <div style={{ color: '#EA1D2C', fontWeight: 700 }}>3. Notificação</div>
          <div style={{ color: '#8B949E' }}>Avisa no Teams e envia PDF por e-mail</div>
        </div>
      </div>
    </div>
  );
}
