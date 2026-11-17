import { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: number;
  sender: 'analyst' | 'orac';
  text: string;
  time: string;
  isStructured?: boolean;
  requiresConfirmation?: boolean;
}

const STEP_INTERVAL_MS = 2750;
const END_PAUSE_MS = 3000;

const ORAC_STEPS: ChatMessage[] = [
  {
    id: 1,
    sender: 'analyst',
    text: 'ORAC, analise o chamado INC0045821 e verifique se há KB aplicável.',
    time: '14:20',
  },
  {
    id: 2,
    sender: 'orac',
    text: '📌 Diagnóstico (INC0045821)\n• Estado: In Progress · Health Score: 88/100\n• Base localizada: KB00142 (+16 mil KBs no Fabric SQL)\n• Work note gerada no padrão da equipe.',
    time: '14:20',
    isStructured: true,
  },
  {
    id: 3,
    sender: 'orac',
    text: 'O procedimento resolveu o incidente? Confirme para registrar e encerrar:',
    time: '14:21',
    requiresConfirmation: true,
  },
  {
    id: 4,
    sender: 'analyst',
    text: 'Sim, confirmado. Pode registrar e encerrar.',
    time: '14:21',
  },
  {
    id: 5,
    sender: 'orac',
    text: '✅ Work note padronizada gravada e chamado INC0045821 encerrado no ServiceNow.',
    time: '14:22',
  },
];

export default function OracChatMock() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
    if (reducedMotion || !inView) return;

    const delay =
      visibleCount < ORAC_STEPS.length ? STEP_INTERVAL_MS : END_PAUSE_MS;

    const timer = window.setTimeout(() => {
      setVisibleCount((prev) => (prev < ORAC_STEPS.length ? prev + 1 : 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleCount, reducedMotion, inView]);

  const isTyping = !reducedMotion && inView && visibleCount < ORAC_STEPS.length;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Simulação do agente ORAC no Microsoft Teams com dados fictícios"
      className="chat-mock"
    >
      <div className="chat-mock__header">
        <div className="chat-mock__avatar" aria-hidden="true">
          ORAC
        </div>
        <div className="chat-mock__meta">
          <div className="chat-mock__title">ORAC · Copilot Studio · Teams</div>
          <div className="chat-mock__subtitle">
            <span className="dot dot--accent" aria-hidden="true" />
            <span>Ticket INC0045821</span>
          </div>
        </div>
        <span className="pill pill--accent pill--sm">dados fictícios</span>
      </div>

      <div className="chat-mock__body">
        {ORAC_STEPS.slice(0, visibleCount).map((msg) => (
          <div
            key={msg.id}
            className={`chat-mock__row ${
              msg.sender === 'analyst'
                ? 'chat-mock__row--analyst'
                : 'chat-mock__row--orac'
            } orac-msg-enter`}
          >
            <div
              className={`chat-mock__bubble ${
                msg.sender === 'analyst'
                  ? 'chat-mock__bubble--analyst'
                  : msg.isStructured
                  ? 'chat-mock__bubble--structured'
                  : 'chat-mock__bubble--orac'
              }`}
            >
              <div className="chat-mock__text">{msg.text}</div>
              {msg.requiresConfirmation && (
                <div className="chat-mock__actions" aria-hidden="true">
                  <span className="chat-mock__choice chat-mock__choice--yes">
                    Sim (Confirmar)
                  </span>
                  <span className="chat-mock__choice chat-mock__choice--no">
                    Não
                  </span>
                </div>
              )}
              <div className="chat-mock__time">{msg.time}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div
            className="chat-mock__typing"
            aria-live="polite"
            aria-label="ORAC processando resposta"
          >
            <span>ORAC</span>
            <span className="typing-dot" />
            <span className="typing-dot typing-dot--d1" />
            <span className="typing-dot typing-dot--d2" />
          </div>
        )}
      </div>

      <div className="chat-mock__footer">
        <span>Power Automate · Fabric (SQL) · ServiceNow</span>
        <span className="chat-mock__status">● Humano no controle</span>
      </div>
    </div>
  );
}
