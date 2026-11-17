import { useEffect, useRef, useState } from 'react';

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
      className={`diagram ${visible ? 'is-visible' : ''}`}
      style={{
        background: '#07070A',
        border: '1px solid #21262D',
        borderRadius: '12px',
        padding: '14px',
        overflowX: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '10px',
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
          Arquitetura ORAC · Fluxo com Dados Fictícios
        </span>
        <span
          style={{
            fontSize: '0.72rem',
            color: '#8B949E',
          }}
        >
          Tópicos restritos + confirmação Sim/Não
        </span>
      </div>

      <svg
        viewBox="0 0 680 148"
        role="img"
        aria-label="Diagrama do fluxo do agente ORAC: Ticket fictício INC-0000000 no Teams passa pelo orquestrador no Copilot Studio, consulta mais de 16 mil KBs via SQL no Fabric e SOPs, aciona subagentes P1/P2 e Work Notes, exige confirmação humana por botões Sim/Não e atualiza o ServiceNow."
        style={{
          width: '100%',
          minWidth: '520px',
          height: 'auto',
          display: 'block',
        }}
      >
        {/* Conexões */}
        <line
          x1="120"
          y1="52"
          x2="165"
          y2="52"
          stroke="#EA1D2C"
          strokeWidth="2"
          className="flow-line"
        />
        <line
          x1="305"
          y1="52"
          x2="350"
          y2="52"
          stroke="#EA1D2C"
          strokeWidth="2"
          className="flow-line"
        />
        <line
          x1="490"
          y1="52"
          x2="535"
          y2="52"
          stroke="#EA1D2C"
          strokeWidth="2"
          className="flow-line"
        />
        <line
          x1="235"
          y1="86"
          x2="235"
          y2="104"
          stroke="#8B949E"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Nó 1: Ticket no Teams */}
        <rect
          x="8"
          y="20"
          width="112"
          height="64"
          rx="8"
          fill="#0E1217"
          stroke="#30363D"
        />
        <text x="64" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
          Teams · Analista
        </text>
        <text x="64" y="61" textAnchor="middle" fill="#8B949E" fontSize="9.5">
          INC-0000000
        </text>
        <text x="64" y="75" textAnchor="middle" fill="#8B949E" fontSize="8.5">
          (fictício)
        </text>

        {/* Nó 2: Copilot Studio + Tópicos */}
        <rect
          x="165"
          y="18"
          width="140"
          height="68"
          rx="8"
          fill="#141820"
          stroke="#EA1D2C"
          strokeWidth="1.5"
        />
        <text x="235" y="40" textAnchor="middle" fill="#EA1D2C" fontSize="11" fontWeight="800">
          ORAC · Copilot Studio
        </text>
        <text x="235" y="56" textAnchor="middle" fill="#F0F6FC" fontSize="9.5">
          Tópicos por função
        </text>
        <text x="235" y="72" textAnchor="middle" fill="#8B949E" fontSize="9">
          Subagentes P1/P2 · Notes
        </text>

        {/* Base: Fabric SQL + ServiceNow */}
        <rect
          x="145"
          y="104"
          width="180"
          height="36"
          rx="6"
          fill="#0E1217"
          stroke="#30363D"
        />
        <text x="235" y="120" textAnchor="middle" fill="#CBD5E1" fontSize="9.5" fontWeight="600">
          Power Automate · Fabric (SQL)
        </text>
        <text x="235" y="133" textAnchor="middle" fill="#8B949E" fontSize="8.5">
          +16 mil KBs · SOPs · Health Score
        </text>

        {/* Nó 3: Humano no controle */}
        <rect
          x="350"
          y="18"
          width="140"
          height="68"
          rx="8"
          fill="#141820"
          stroke="#EA1D2C"
          strokeWidth="1.5"
          className="human-gate-box"
        />
        <text x="420" y="40" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
          Humano no Controle
        </text>
        <text x="420" y="56" textAnchor="middle" fill="#CBD5E1" fontSize="9.5">
          Botões Sim / Não
        </text>
        <text x="420" y="72" textAnchor="middle" fill="#EA1D2C" fontSize="9" fontWeight="700">
          Validação obrigatória
        </text>

        {/* Nó 4: ServiceNow */}
        <rect
          x="535"
          y="20"
          width="135"
          height="64"
          rx="8"
          fill="#0E1217"
          stroke="#30363D"
        />
        <text x="602" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
          ServiceNow
        </text>
        <text x="602" y="60" textAnchor="middle" fill="#CBD5E1" fontSize="9.5">
          Work note padronizada
        </text>
        <text x="602" y="74" textAnchor="middle" fill="#8B949E" fontSize="8.5">
          Encerramento seguro
        </text>
      </svg>
    </div>
  );
}
