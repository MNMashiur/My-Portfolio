import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the current section
      const currentSection = sectionIds.reduce((current, id) => {
        const element = document.getElementById(id);
        if (!element) return current;

        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          return id;
        }
        return current;
      }, '');

      if (currentSection && currentSection !== activeId) {
        setActiveId(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once initially
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, activeId, offset]);

  return activeId;
}
