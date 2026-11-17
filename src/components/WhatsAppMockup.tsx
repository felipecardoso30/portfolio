import { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: number;
  sender: 'analyst' | 'orac';
  text: string;
  time: string;
  isStructured?: boolean;
  requiresConfirmation?: boolean;
}

const ORAC_STEPS: ChatMessage[] = [
  {
    id: 1,
    sender: 'analyst',
    text: 'ORAC, analise o chamado fictício INC-0000000 e verifique se há KB aplicável.',
    time: '14:20',
  },
  {
    id: 2,
    sender: 'orac',
    text: 'Consultando INC-0000000 no ServiceNow via Power Automate e pesquisando +16 mil KBs no Fabric (SQL)...',
    time: '14:20',
  },
  {
    id: 3,
    sender: 'orac',
    text: '📌 Diagnóstico (INC-0000000 · Dados Fictícios)\n• Estado: In Progress · Health Score: 88/100\n• Base localizada: KB-00000 (Procedimento padrão de endpoint)\n• Work note técnica gerada no formato da equipe.',
    time: '14:21',
    isStructured: true,
  },
  {
    id: 4,
    sender: 'orac',
    text: 'O procedimento resolveu o incidente? Confirme para registrar a work note e encerrar o chamado:',
    time: '14:21',
    requiresConfirmation: true,
  },
  {
    id: 5,
    sender: 'analyst',
    text: 'Sim, confirmado. Pode registrar e encerrar.',
    time: '14:22',
  },
  {
    id: 6,
    sender: 'orac',
    text: '✅ Work note padronizada gravada e chamado INC-0000000 atualizado após confirmação do analista.',
    time: '14:22',
  },
];

export default function WhatsAppMockup() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const [inView, setInView] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? ORAC_STEPS.length
      : 1
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) {
        setVisibleCount(ORAC_STEPS.length);
      }
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !inView || visibleCount >= ORAC_STEPS.length) return;

    const timer = window.setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 1, ORAC_STEPS.length));
    }, 950);

    return () => clearTimeout(timer);
  }, [visibleCount, reducedMotion, inView]);

  const isTyping = !reducedMotion && inView && visibleCount < ORAC_STEPS.length;

  const handleReplay = () => {
    if (reducedMotion) return;
    setVisibleCount(1);
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Simulação do agente ORAC no Microsoft Teams com dados fictícios"
      style={{
        width: '100%',
        maxWidth: '410px',
        margin: '0 auto',
        borderRadius: '16px',
        background: '#0D1117',
        border: '1px solid #21262D',
        boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
      }}
    >
      {/* Header do ORAC */}
      <div
        style={{
          background: '#161B22',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid #21262D',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#EA1D2C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.78rem',
            letterSpacing: '0.02em',
            flexShrink: 0,
          }}
        >
          ORAC
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: '#F0F6FC',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
            }}
          >
            <span>ORAC · Copilot Studio · Teams</span>
          </div>
          <div
            style={{
              color: '#8B949E',
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
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
            <span>Simulação · ticket e dados fictícios</span>
          </div>
        </div>
        {!reducedMotion && visibleCount >= ORAC_STEPS.length && (
          <button
            type="button"
            onClick={handleReplay}
            aria-label="Repetir simulação da conversa do ORAC"
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#F0F6FC',
              background: 'rgba(234, 29, 44, 0.14)',
              padding: '4px 10px',
              borderRadius: '9999px',
              border: '1px solid rgba(234, 29, 44, 0.4)',
              cursor: 'pointer',
            }}
          >
            Repetir ↻
          </button>
        )}
      </div>

      {/* Mensagens */}
      <div
        style={{
          padding: '14px',
          minHeight: '320px',
          maxHeight: '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          overflowY: 'auto',
          background: '#07070A',
        }}
      >
        {ORAC_STEPS.slice(0, visibleCount).map((msg) => (
          <div
            key={msg.id}
            className="orac-msg-enter"
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'analyst' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '88%',
                padding: '9px 12px',
                borderRadius:
                  msg.sender === 'analyst'
                    ? '14px 14px 2px 14px'
                    : '14px 14px 14px 2px',
                background:
                  msg.sender === 'analyst'
                    ? '#1F242C'
                    : msg.isStructured
                    ? 'rgba(234, 29, 44, 0.08)'
                    : '#161B22',
                border:
                  msg.sender === 'analyst'
                    ? '1px solid #30363D'
                    : msg.isStructured
                    ? '1px solid rgba(234, 29, 44, 0.35)'
                    : '1px solid #21262D',
                color: '#F0F6FC',
                fontSize: '0.82rem',
                lineHeight: 1.48,
                whiteSpace: 'pre-line',
              }}
            >
              <div>{msg.text}</div>
              {msg.requiresConfirmation && (
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '6px',
                      background: '#EA1D2C',
                      color: '#FFFFFF',
                    }}
                  >
                    Sim (Confirmar)
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid #30363D',
                      color: '#CBD5E1',
                    }}
                  >
                    Não
                  </span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '4px',
                  marginTop: '4px',
                  fontSize: '0.66rem',
                  color: '#8B949E',
                }}
              >
                <span>{msg.time}</span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && visibleCount < ORAC_STEPS.length && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '7px 12px',
              background: '#161B22',
              borderRadius: '12px 12px 12px 2px',
              width: 'fit-content',
              border: '1px solid #21262D',
            }}
            aria-live="polite"
            aria-label="ORAC processando resposta"
          >
            <span
              style={{
                fontSize: '0.72rem',
                color: '#8B949E',
                marginRight: '4px',
              }}
            >
              ORAC
            </span>
            <span className="typing-dot" style={{ animationDelay: '0ms' }} />
            <span className="typing-dot" style={{ animationDelay: '180ms' }} />
            <span className="typing-dot" style={{ animationDelay: '360ms' }} />
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div
        style={{
          background: '#161B22',
          padding: '10px 14px',
          borderTop: '1px solid #21262D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.72rem',
          color: '#8B949E',
        }}
      >
        <span>Power Automate · Fabric (SQL) · ServiceNow</span>
        <span style={{ color: '#EA1D2C', fontWeight: 600 }}>● Humano no controle</span>
      </div>
    </div>
  );
}
