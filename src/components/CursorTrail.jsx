import  { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CursorTrail() {
  const { settings } = useTheme();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!settings.animations) return;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
      
      if (ringRef.current) {
        // Adding a slight delay to the ring for lag effect
        ringRef.current.animate({
          left: `${x}px`,
          top: `${y}px`
        }, { duration: 150, fill: 'forwards' });
      }
    };

    const handleMouseOver = (e) => {
      // Scale up cursor on interactive elements
      const target = e.target;
      const isHoverable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.interactive-card');

      if (isHoverable) {
        if (dotRef.current) {
          dotRef.current.style.width = '12px';
          dotRef.current.style.height = '12px';
          dotRef.current.style.backgroundColor = '#756AB6';
        }
        if (ringRef.current) {
          ringRef.current.style.width = '60px';
          ringRef.current.style.height = '60px';
          ringRef.current.style.borderColor = '#E0AED0';
        }
      } else {
        if (dotRef.current) {
          dotRef.current.style.width = '8px';
          dotRef.current.style.height = '8px';
          dotRef.current.style.backgroundColor = '#E0AED0';
        }
        if (ringRef.current) {
          ringRef.current.style.width = '40px';
          ringRef.current.style.height = '40px';
          ringRef.current.style.borderColor = '#AC87C5';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [settings.animations]);

  if (!settings.animations) return null;

  return (
    <div className="cursor-trail">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
