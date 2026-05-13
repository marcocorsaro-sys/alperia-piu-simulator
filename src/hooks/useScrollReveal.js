import { useEffect } from 'react';

/**
 * useScrollReveal — attacca IntersectionObserver a tutti gli elementi
 * con className "reveal" e aggiunge "is-visible" quando entrano in viewport.
 * Include fallback di sicurezza dopo 1.8s per prevenire contenuto nascosto
 * se l'observer non scatta (es. anchor jumps, prefer-reduced-motion).
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach(el => observer.observe(el));

    // Safety fallback
    const fallback = setTimeout(() => {
      elements.forEach(el => {
        if (!el.classList.contains('is-visible')) el.classList.add('is-visible');
      });
    }, 1800);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);
}
