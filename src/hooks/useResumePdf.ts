import { useEffect, useState } from 'react';
import { CURRICULO_PATH } from '../data/content';

export function useResumePdf() {
  const [available, setAvailable] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    fetch(CURRICULO_PATH, { method: 'HEAD' })
      .then((res) => {
        if (!active) return;
        const ct = (res.headers.get('content-type') || '').toLowerCase();
        setAvailable(res.ok && ct.includes('pdf'));
      })
      .catch(() => {
        if (active) setAvailable(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { available, href: CURRICULO_PATH };
}
