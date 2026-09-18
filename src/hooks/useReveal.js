import { useEffect, useRef, useCallback } from 'react';

export default function useReveal() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const ref = useCallback((node) => {
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  }, []);

  return ref;
}
