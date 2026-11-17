import { useEffect, useRef, useState } from 'react';

interface FlowStep {
  badge: string;
  title: string;
  detail: string;
  accent?: boolean;
}

const FLOW_STEPS: FlowStep[] = [
  {
    badge: '1 · Entrada',
    title: 'Teams · Analista',
    detail: 'Ticket INC0045821 (dados fictícios)',
  },
  {
    badge: '2 · Orquestração',
    title: 'ORAC · Copilot Studio',
    detail: 'Tópicos por função + subagentes P1/P2 e Work Notes',
    accent: true,
  },
  {
    badge: '3 · Dados e Base',
    title: 'Power Automate + Fabric (SQL)',
    detail: '+16 mil KBs, SOPs e Health Score (0–100)',
  },
  {
    badge: '4 · Controle',
    title: 'Humano no Controle',
    detail: 'Confirmação por botões Sim / Não antes de fechar',
    accent: true,
  },
  {
    badge: '5 · Saída',
    title: 'ServiceNow',
    detail: 'Work note padronizada e atualização do chamado',
  },
];

function FlowConnector() {
  return (
    <div className="flow-diagram__connector" aria-hidden="true">
      {/* Seta horizontal (desktop) */}
      <svg
        className="flow-diagram__arrow flow-diagram__arrow--h"
        viewBox="0 0 36 16"
        fill="none"
      >
        <line
          x1="0"
          y1="8"
          x2="28"
          y2="8"
          stroke="currentColor"
          strokeWidth="2"
          className="flow-line"
        />
        <polyline
          points="24,3 31,8 24,13"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Seta vertical (mobile) */}
      <svg
        className="flow-diagram__arrow flow-diagram__arrow--v"
        viewBox="0 0 16 28"
        fill="none"
      >
        <line
          x1="8"
          y1="0"
          x2="8"
          y2="21"
          stroke="currentColor"
          strokeWidth="2"
          className="flow-line"
        />
        <polyline
          points="3,17 8,24 13,17"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function OracFlowDiagram() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Diagrama de arquitetura do agente ORAC com dados fictícios"
      className={`diagram flow-diagram ${visible ? 'is-visible' : ''}`}
    >
      <div className="flow-diagram__head">
        <span className="eyebrow">Arquitetura ORAC · Fluxo de Ponta a Ponta</span>
        <span className="pill pill--accent pill--sm">dados fictícios</span>
      </div>

      <ol className="flow-diagram__track">
        {FLOW_STEPS.map((step, index) => (
          <li key={step.title} className="flow-diagram__item">
            <div
              className={`flow-node ${
                step.accent ? 'flow-node--accent' : ''
              }`}
            >
              <span className="flow-node__badge">{step.badge}</span>
              <strong className="flow-node__title">{step.title}</strong>
              <span className="flow-node__detail">{step.detail}</span>
            </div>
            {index < FLOW_STEPS.length - 1 && <FlowConnector />}
          </li>
        ))}
      </ol>
    </div>
  );
}
