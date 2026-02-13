"use client";

import { useEffect, useRef, ReactNode } from "react";

interface MouseFollowProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function MouseFollow({
  children,
  className = "",
  intensity = 0.05,
}: MouseFollowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * intensity;
      const deltaY = (e.clientY - centerY) * intensity;

      container.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = "translate(0, 0)";
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
