import { useEffect, useRef, useState } from 'react';

interface FlowStep {
  num: string;
  role: string;
  title: string;
  detail: string;
  variant?: 'default' | 'core' | 'gate';
}

const FLOW_STEPS: FlowStep[] = [
  {
    num: '01',
    role: 'Entrada',
    title: 'Teams · Analista',
    detail: 'Envia o chamado INC0045821 (dados fictícios) no chat.',
    variant: 'default',
  },
  {
    num: '02',
    role: 'Orquestrador',
    title: 'ORAC · Copilot Studio',
    detail: 'Roteia em tópicos restritos e subagentes (P1/P2 e Work Notes).',
    variant: 'core',
  },
  {
    num: '03',
    role: 'Contexto & RAG SQL',
    title: 'Power Automate + Fabric',
    detail: 'Consulta ServiceNow, +16 mil KBs via SQL, SOPs e Health Score.',
    variant: 'default',
  },
  {
    num: '04',
    role: 'Human-in-the-Loop',
    title: 'Confirmação Humana',
    detail: 'Analista aprova por botões Sim / Não antes de qualquer ação.',
    variant: 'gate',
  },
  {
    num: '05',
    role: 'Desfecho',
    title: 'ServiceNow',
    detail: 'Grava work note padronizada e atualiza ou encerra o ticket.',
    variant: 'default',
  },
];

function StepConnector({ label }: { label?: string }) {
  return (
    <div className="flow-diagram__connector" aria-hidden="true">
      <svg className="flow-diagram__svg-v" viewBox="0 0 20 28" fill="none">
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="21"
          stroke="currentColor"
          strokeWidth="2"
          className="flow-line"
        />
        <polyline
          points="5,17 10,24 15,17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {label && <span className="flow-diagram__edge-label">{label}</span>}
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
        <div className="flow-diagram__title-group">
          <span className="eyebrow">Arquitetura ORAC · Pipeline de Execução</span>
          <span className="flow-diagram__sub">
            Fluxo guiado por tópicos com validação humana obrigatória
          </span>
        </div>
        <span className="pill pill--accent pill--sm">dados fictícios</span>
      </div>

      <ol className="flow-pipeline">
        {FLOW_STEPS.map((step, index) => (
          <li key={step.num} className="flow-pipeline__item">
            <div
              className={`flow-node ${
                step.variant === 'core'
                  ? 'flow-node--accent'
                  : step.variant === 'gate'
                  ? 'flow-node--gate'
                  : ''
              }`}
            >
              <div className="flow-node__rail">
                <span className="flow-node__num">{step.num}</span>
              </div>

              <div className="flow-node__content">
                <div className="flow-node__top">
                  <strong className="flow-node__title">{step.title}</strong>
                  <span
                    className={`flow-node__tag ${
                      step.variant === 'core' || step.variant === 'gate'
                        ? 'flow-node__tag--accent'
                        : ''
                    }`}
                  >
                    {step.role}
                  </span>
                </div>
                <p className="flow-node__detail">{step.detail}</p>
              </div>
            </div>

            {index < FLOW_STEPS.length - 1 && (
              <StepConnector
                label={
                  index === 2
                    ? 'proposta de solução'
                    : index === 3
                    ? 'após clicar Sim'
                    : undefined
                }
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
