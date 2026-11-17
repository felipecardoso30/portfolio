import { useEffect, useRef, useState } from 'react';

const NFS_STEPS = [
  {
    num: '01',
    step: 'Leitura OCR',
    tool: 'AI Builder',
    detail: 'Extrai nº da NF (ex.: NF-004582), PO, itens e usuário escrito à mão.',
  },
  {
    num: '02',
    step: 'Padronização',
    tool: 'SharePoint · DLP',
    detail: 'Renomeia o PDF no padrão corporativo e arquiva na biblioteca.',
  },
  {
    num: '03',
    step: 'Notificação',
    tool: 'Teams + Outlook',
    detail: 'Avisa o solicitante no Teams e envia cópia do PDF por e-mail.',
  },
];

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
      role="group"
      aria-label="Comparativo antes e depois da automação de notas fiscais com dados fictícios"
      className="nfs-diagram"
    >
      <div className="nfs-diagram__head">
        <div className="flow-diagram__title-group">
          <span className="eyebrow">Comparativo de Tempo · Dados Fictícios</span>
          <span className="flow-diagram__sub">
            Exemplo: NF-004582 · PO-009120 (~20 notas/mês)
          </span>
        </div>
        <span className="pill pill--accent pill--sm">Observado no meu uso</span>
      </div>

      <div className="nfs-diagram__bars">
        <div className="nfs-bar">
          <div className="nfs-bar__label">
            <span>Antes · 5 etapas manuais por nota</span>
            <strong className="nfs-bar__time">~8 min / nota</strong>
          </div>
          <div className="nfs-bar__track">
            <div
              className={`nfs-bar__fill nfs-bar__fill--before ${
                visible ? 'is-visible' : ''
              }`}
            />
          </div>
        </div>

        <div className="nfs-bar">
          <div className="nfs-bar__label">
            <span>Depois · Power Automate + AI Builder (OCR)</span>
            <div className="nfs-bar__badges">
              <span className="nfs-bar__delta">-97% tempo</span>
              <strong className="nfs-bar__time text-accent">~15 s / nota</strong>
            </div>
          </div>
          <div className="nfs-bar__track">
            <div
              className={`nfs-bar__fill nfs-bar__fill--after ${
                visible ? 'is-visible' : ''
              }`}
            />
          </div>
        </div>
      </div>

      <ol className="nfs-diagram__steps">
        {NFS_STEPS.map((item) => (
          <li key={item.num} className="nfs-step">
            <div className="nfs-step__top">
              <span className="nfs-step__num">{item.num}</span>
              <span className="nfs-step__tool">{item.tool}</span>
            </div>
            <strong className="nfs-step__title">{item.step}</strong>
            <span className="nfs-step__detail">{item.detail}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
