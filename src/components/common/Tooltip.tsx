import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  delay?: number;
}

export function Tooltip({ content, children, delay = 300 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeout = useRef<number>();

  const showTooltip = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    timeout.current = window.setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeout.current);
    setIsVisible(false);
  };

  const updatePosition = (e: React.MouseEvent) => {
    if (!isVisible) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const child = React.Children.only(children) as React.ReactElement<any>;
  const trigger = React.cloneElement(child, {
    onMouseEnter: (e: React.MouseEvent) => {
      showTooltip(e);
      if (child.props.onMouseEnter) child.props.onMouseEnter(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hideTooltip();
      if (child.props.onMouseLeave) child.props.onMouseLeave(e);
    },
    onMouseMove: (e: React.MouseEvent) => {
      updatePosition(e);
      if (child.props.onMouseMove) child.props.onMouseMove(e);
    },
    // We intentionally strip the native 'title' attribute out so the OS native tooltip
    // doesn't awkwardly render alongside our beautiful custom themed tooltip.
    title: undefined, 
  });

  return (
    <>
      {trigger}
      {isVisible && content && createPortal(
        <div
          className="pointer-events-none fixed z-[9999] max-w-[16rem] break-words rounded-md border border-[var(--color-cta)]/50 bg-[var(--color-primary)] px-3 py-2 text-xs font-bold leading-relaxed text-[var(--color-text)] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          style={{ 
            top: Math.min(position.y + 15, window.innerHeight - 80), 
            left: Math.min(position.x + 15, window.innerWidth - 220) 
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
}
