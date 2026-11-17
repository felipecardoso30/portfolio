import { useEffect, useRef, useState } from 'react';

const NFS_STEPS = [
  {
    step: '1. Leitura OCR',
    detail: 'Extrai nº da NF (ex.: NF-004582), PO, itens e usuário escrito à mão.',
  },
  {
    step: '2. Padronização',
    detail: 'Renomeia no padrão e salva no SharePoint em conformidade com DLP.',
  },
  {
    step: '3. Notificação',
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
    <div ref={ref} className="nfs-diagram">
      <div className="nfs-diagram__head">
        <span className="eyebrow">
          Antes e Depois · Dados Fictícios (NF-004582 · PO-009120)
        </span>
        <span className="pill pill--accent pill--sm">Observado no meu uso</span>
      </div>

      <div className="nfs-diagram__bars">
        <div className="nfs-bar">
          <div className="nfs-bar__label">
            <span>Antes (manual: escanear, abrir PDF, renomear, subir e mover)</span>
            <strong>~8 min / nota</strong>
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
            <span>Depois (Power Automate + AI Builder OCR)</span>
            <strong className="text-accent">~15 s / nota (~97% menos)</strong>
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
          <li key={item.step} className="nfs-step">
            <strong className="nfs-step__title">{item.step}</strong>
            <span className="nfs-step__detail">{item.detail}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
