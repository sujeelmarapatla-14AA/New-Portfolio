import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const isPressedRef = useRef(false);
  const isHiddenRef = useRef(true);
  const isTextInputRef = useRef(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse) and hover capability
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      // Touchscreens, tablets, and mobile devices keep normal native touch behavior
      return;
    }

    const container = containerRef.current;
    const visual = visualRef.current;
    if (!container || !visual) return;

    // Apply class to html to cleanly hide the native cursor on desktop
    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let rafId: number | null = null;

    const render = () => {
      if (!container || !visual) return;

      // Hotspot offset: tip is at (2.4, 2.2) inside the SVG
      container.style.transform = `translate3d(${mouseX - 2.4}px, ${mouseY - 2.2}px, 0)`;

      // Scale state for press & hover
      const scale = isPressedRef.current ? 0.88 : (isHoveringRef.current ? 0.95 : 1);
      visual.style.transform = `scale(${scale})`;

      // Visibility state
      if (isHiddenRef.current || isTextInputRef.current) {
        container.style.opacity = '0';
      } else {
        container.style.opacity = '1';
      }

      rafId = null;
    };

    const scheduleRender = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (isHiddenRef.current) {
        isHiddenRef.current = false;
      }
      scheduleRender();
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // If hovering over text inputs, allow the native I-beam text cursor to show naturally
      const isText = Boolean(
        target.closest(
          'input[type="text"], input[type="email"], input[type="search"], input[type="tel"], input[type="url"], input[type="password"], textarea, [contenteditable="true"]'
        )
      );
      isTextInputRef.current = isText;

      // Check if hovering over clickable or interactive elements
      const isClickable = Boolean(
        target.closest(
          'a, button, [role="button"], input[type="submit"], input[type="button"], select, .cursor-pointer, [data-cursor="pointer"]'
        )
      );
      isHoveringRef.current = isClickable;

      scheduleRender();
    };

    const handlePointerDown = () => {
      isPressedRef.current = true;
      scheduleRender();
    };

    const handlePointerUp = () => {
      isPressedRef.current = false;
      scheduleRender();
    };

    const handleMouseLeave = () => {
      isHiddenRef.current = true;
      scheduleRender();
    };

    const handleMouseEnter = () => {
      isHiddenRef.current = false;
      scheduleRender();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        willChange: 'transform',
        opacity: 0,
        transition: 'opacity 0.15s ease',
      }}
    >
      <div
        ref={visualRef}
        style={{
          transformOrigin: '2.4px 2.2px',
          transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.4, 1)',
        }}
      >
        <svg
          width="22"
          height="26"
          viewBox="0 0 24 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            filter:
              'drop-shadow(0 2px 4px rgba(0,0,0,0.38)) drop-shadow(0 4px 8px rgba(0,0,0,0.20))',
          }}
        >
          <path
            d="M 2.4 2.2 C 2.1 1.5 3.0 1.0 3.6 1.5 L 20.2 17.5 C 20.8 18.1 20.4 19.1 19.6 19.1 L 12.8 19.1 C 12.2 19.1 11.6 19.4 11.3 19.9 L 5.4 27.2 C 4.8 27.9 3.7 27.5 3.6 26.6 L 2.4 2.2 Z"
            fill="#080808"
            stroke="#d4d4d8"
            strokeWidth="1.15"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
