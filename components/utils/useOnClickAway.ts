import { useEffect } from 'react';

export function useOnClickAway(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener as any);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener as any);
    };
  }, [ref, handler]);
}
