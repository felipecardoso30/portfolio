import { useEffect, useState } from 'react';
import { CURRICULO_PATH } from '../data/content';

let cachedResult: boolean | null = null;
let pendingCheck: Promise<boolean> | null = null;

function checkResumeExists(): Promise<boolean> {
  if (cachedResult !== null) {
    return Promise.resolve(cachedResult);
  }
  if (!pendingCheck) {
    pendingCheck = fetch(CURRICULO_PATH, { method: 'HEAD' })
      .then((res) => {
        const ct = (res.headers.get('content-type') || '').toLowerCase();
        const ok = res.ok && ct.includes('pdf');
        cachedResult = ok;
        return ok;
      })
      .catch(() => {
        cachedResult = false;
        return false;
      });
  }
  return pendingCheck;
}

export function useResumePdf() {
  const [available, setAvailable] = useState<boolean>(cachedResult ?? false);

  useEffect(() => {
    let active = true;
    checkResumeExists().then((ok) => {
      if (active) setAvailable(ok);
    });
    return () => {
      active = false;
    };
  }, []);

  return { available, href: CURRICULO_PATH };
}
