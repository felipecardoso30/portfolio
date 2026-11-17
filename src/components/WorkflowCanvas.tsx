import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function WorkflowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const nodeCount = 12;
    const nodes: Node[] = [];
    const colors = ['#EA1D2C', '#EA1D2C', '#8B949E', '#EA1D2C', '#FFFFFF'];

    const w = canvas.parentElement?.clientWidth || 800;
    const h = canvas.parentElement?.clientHeight || 600;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * (w - 80) + 40,
        y: Math.random() * (h - 80) + 40,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 3,
        color: colors[i % colors.length],
      });
    }

    interface Packet {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
    }
    const packets: Packet[] = [];

    const spawnPacket = (from: number, to: number) => {
      packets.push({
        fromIndex: from,
        toIndex: to,
        progress: 0,
        speed: 0.007 + Math.random() * 0.006,
      });
    };

    let lastPacketTime = 0;

    const render = (time: number) => {
      const currentW = canvas.parentElement?.clientWidth || 800;
      const currentH = canvas.parentElement?.clientHeight || 600;

      ctx.clearRect(0, 0, currentW, currentH);

      const maxDistance = 200;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(234, 29, 44, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            if (!prefersReducedMotion && time - lastPacketTime > 1200 && Math.random() < 0.03) {
              spawnPacket(i, j);
              lastPacketTime = time;
            }
          }
        }
      }

      if (!prefersReducedMotion) {
        for (let k = packets.length - 1; k >= 0; k--) {
          const p = packets[k];
          p.progress += p.speed;

          const n1 = nodes[p.fromIndex];
          const n2 = nodes[p.toIndex];

          if (n1 && n2 && p.progress <= 1) {
            const px = n1.x + (n2.x - n1.x) * p.progress;
            const py = n1.y + (n2.y - n1.y) * p.progress;

            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#EA1D2C';
            ctx.fill();
          } else {
            packets.splice(k, 1);
          }
        }
      }

      for (const node of nodes) {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x <= 20 || node.x >= currentW - 20) node.vx *= -1;
          if (node.y <= 20 || node.y >= currentH - 20) node.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(234, 29, 44, 0.12)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render(0);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  );
}
