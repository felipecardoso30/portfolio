import { useState, useEffect } from 'react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'agent';
  text: string;
  time: string;
  isStructured?: boolean;
}

const CONVERSATION_STEPS: ChatMessage[] = [
  {
    id: 1,
    sender: 'user',
    text: 'Olá! Preciso consultar o procedimento e analisar o chamado INC-0842.',
    time: '14:20',
  },
  {
    id: 2,
    sender: 'agent',
    text: 'Olá! Localizei o chamado no ServiceNow. Analisando histórico e KBs...',
    time: '14:20',
  },
  {
    id: 3,
    sender: 'agent',
    text: '📌 Resumo Executivo (INC-0842)\n• Impacto: Instabilidade em switch de rede\n• Prioridade: P2 • SLA: 2h restantes\n• Ação: Procedimento KB019 validado.',
    time: '14:21',
    isStructured: true,
  },
  {
    id: 4,
    sender: 'user',
    text: 'Excelente! Pode registrar a Work Note padronizada e alertar no Teams?',
    time: '14:21',
  },
  {
    id: 5,
    sender: 'agent',
    text: '✅ Work Note registrada com sucesso via fluxo automatizado e alerta disparado no Teams do N2.',
    time: '14:22',
  },
];

export default function WhatsAppMockup() {
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    let timeoutId: number;

    const runSequence = () => {
      if (visibleCount < CONVERSATION_STEPS.length) {
        setIsTyping(true);
        timeoutId = window.setTimeout(() => {
          setIsTyping(false);
          setVisibleCount((prev) => prev + 1);
        }, 1800);
      } else {
        timeoutId = window.setTimeout(() => {
          setVisibleCount(1);
          setIsTyping(true);
        }, 7000);
      }
    };

    runSequence();

    return () => clearTimeout(timeoutId);
  }, [visibleCount]);

  return (
    <div
      role="region"
      aria-label="Simulação de conversa de WhatsApp com agente de IA"
      style={{
        width: '100%',
        maxWidth: '380px',
        margin: '0 auto',
        borderRadius: '16px',
        background: '#0D1117',
        border: '1px solid #21262D',
        boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {/* Terminal-inspired chat header */}
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
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#EA1D2C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.85rem',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            AI
          </div>
          <span
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#EA1D2C',
              border: '2px solid #161B22',
            }}
          />
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
            }}
          >
            Agente Operacional
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                background: 'rgba(234, 29, 44, 0.15)',
                color: '#EA1D2C',
                padding: '1px 6px',
                borderRadius: '4px',
              }}
            >
              n8n
            </span>
          </div>
          <div
            style={{
              color: '#8B949E',
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
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
            online • dados fictícios
          </div>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            color: '#8B949E',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '3px 8px',
            borderRadius: '4px',
            border: '1px solid #21262D',
          }}
        >
          DEMO
        </div>
      </div>

      {/* Chat messages canvas */}
      <div
        style={{
          padding: '16px 14px',
          minHeight: '300px',
          maxHeight: '340px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          overflowY: 'auto',
          background: '#07070A',
        }}
      >
        {CONVERSATION_STEPS.slice(0, visibleCount).map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '85%',
                padding: '9px 12px',
                borderRadius:
                  msg.sender === 'user'
                    ? '14px 14px 2px 14px'
                    : '14px 14px 14px 2px',
                background:
                  msg.sender === 'user'
                    ? '#1F242C'
                    : msg.isStructured
                    ? 'rgba(234, 29, 44, 0.08)'
                    : '#161B22',
                border:
                  msg.sender === 'user'
                    ? '1px solid #30363D'
                    : msg.isStructured
                    ? '1px solid rgba(234, 29, 44, 0.35)'
                    : '1px solid #21262D',
                color: '#F0F6FC',
                fontSize: '0.84rem',
                lineHeight: 1.45,
                whiteSpace: 'pre-line',
              }}
            >
              <div>{msg.text}</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '4px',
                  marginTop: '4px',
                  fontSize: '0.68rem',
                  color: '#8B949E',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <span>{msg.time}</span>
                {msg.sender === 'user' && (
                  <span style={{ color: '#EA1D2C' }}>✓✓</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Animated typing indicator */}
        {isTyping && visibleCount < CONVERSATION_STEPS.length && (
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
            aria-label="Agente digitando resposta"
          >
            <span
              style={{
                fontSize: '0.72rem',
                color: '#8B949E',
                fontFamily: "'JetBrains Mono', monospace",
                marginRight: '4px',
              }}
            >
              Agente
            </span>
            <span className="typing-dot" style={{ animationDelay: '0ms' }} />
            <span className="typing-dot" style={{ animationDelay: '180ms' }} />
            <span className="typing-dot" style={{ animationDelay: '360ms' }} />
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div
        style={{
          background: '#161B22',
          padding: '10px 14px',
          borderTop: '1px solid #21262D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: '#8B949E',
          }}
        >
          Prompt & nós em n8n
        </span>
        <span
          style={{
            fontSize: '0.7rem',
            color: '#EA1D2C',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          ● loop ativo
        </span>
      </div>

      <style>{`
        .typing-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #EA1D2C;
          display: inline-block;
          animation: bounceDot 1.2s infinite ease-in-out;
        }
        @keyframes bounceDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
