import { useEffect, useState } from 'react';

/**
 * useActiveSection — rileva quale sezione è attualmente in viewport,
 * per evidenziare il link corrispondente nella sticky nav.
 * Le sezioni tracciate devono avere data-section="id".
 */
export function useActiveSection(defaultId = 'cover') {
  const [activeSection, setActiveSection] = useState(defaultId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || entry.target.getAttribute('data-section'));
          }
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}
