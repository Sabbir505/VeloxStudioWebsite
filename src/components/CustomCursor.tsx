"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Use refs for position to avoid re-renders
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef<{ x: number; y: number }[]>([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
  ]);
  
  const isPointer = useRef(false);
  const isVisible = useRef(false);
  const isClicking = useRef(false);
  const isDarkMode = useRef(true);
  const animationFrameId = useRef<number | null>(null);
  const lastTime = useRef(0);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Check for touch device
    if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      isTouchDevice.current = true;
      // Hide cursor elements if they exist
      if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
      if (cursorRingRef.current) cursorRingRef.current.style.display = 'none';
      trailRefs.current.forEach(ref => { if (ref) ref.style.display = 'none'; });
      return;
    }

    // Initialize cursor position off-screen
    mousePos.current = { x: -100, y: -100 };
    cursorPos.current = { x: -100, y: -100 };
    ringPos.current = { x: -100, y: -100 };

    // Function to check current theme
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      isDarkMode.current = theme !== "light";
      updateRingColor();
    };

    // Update ring color based on theme
    const updateRingColor = () => {
      if (cursorRingRef.current) {
        const innerRing = cursorRingRef.current.querySelector('.cursor-inner-ring') as HTMLElement;
        if (innerRing && !isPointer.current) {
          innerRing.style.borderColor = isDarkMode.current 
            ? 'rgba(255, 255, 255, 0.4)' 
            : 'rgba(0, 0, 0, 0.5)';
        }
      }
    };

    // Initial theme check
    checkTheme();

    // Observe theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Optimized smooth interpolation with delta time for consistent movement
    const lerp = (start: number, end: number, factor: number, deltaFactor: number = 1) => {
      const adjustedFactor = 1 - Math.pow(1 - factor, deltaFactor);
      return start + (end - start) * adjustedFactor;
    };

    // Animation loop using requestAnimationFrame with delta time
    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime.current) / 16.667, 2); // Normalize to 60fps, cap at 2x
      lastTime.current = currentTime;

      // Smooth cursor dot movement (very responsive)
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.5, deltaTime);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.5, deltaTime);

      // Smooth ring movement (slightly delayed for elegant effect)
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.25, deltaTime);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.25, deltaTime);

      // Update trail positions with cascading delay
      for (let i = trailPositions.current.length - 1; i > 0; i--) {
        trailPositions.current[i].x = lerp(
          trailPositions.current[i].x,
          trailPositions.current[i - 1].x,
          0.4,
          deltaTime
        );
        trailPositions.current[i].y = lerp(
          trailPositions.current[i].y,
          trailPositions.current[i - 1].y,
          0.4,
          deltaTime
        );
      }
      trailPositions.current[0].x = lerp(
        trailPositions.current[0].x,
        cursorPos.current.x,
        0.5,
        deltaTime
      );
      trailPositions.current[0].y = lerp(
        trailPositions.current[0].y,
        cursorPos.current.y,
        0.5,
        deltaTime
      );

      // Apply transforms directly to DOM elements (no React re-render)
      if (cursorDotRef.current) {
        const scale = isClicking.current ? 0.7 : isPointer.current ? 1.2 : 1;
        cursorDotRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        cursorDotRef.current.style.opacity = isVisible.current ? "1" : "0";
      }

      if (cursorRingRef.current) {
        const scale = isPointer.current ? 1.8 : 1;
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        cursorRingRef.current.style.opacity = isVisible.current ? "1" : "0";
      }

      // Update trail elements
      trailRefs.current.forEach((ref, index) => {
        if (ref) {
          const pos = trailPositions.current[index];
          const scale = 0.7 - index * 0.2;
          const opacity = isVisible.current ? 0.5 - index * 0.15 : 0;
          ref.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
          ref.style.opacity = String(Math.max(0, opacity));
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      if (!isVisible.current) {
        // First mouse move - instantly position cursor
        cursorPos.current.x = e.clientX;
        cursorPos.current.y = e.clientY;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        trailPositions.current.forEach(pos => {
          pos.x = e.clientX;
          pos.y = e.clientY;
        });
      }
      
      isVisible.current = true;

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer";
      
      isPointer.current = Boolean(isClickable);
      
      // Update pointer state classes
      if (cursorDotRef.current) {
        const innerDot = cursorDotRef.current.querySelector('.cursor-inner-dot') as HTMLElement;
        if (innerDot) {
          innerDot.style.width = isPointer.current ? '18px' : '10px';
          innerDot.style.height = isPointer.current ? '18px' : '10px';
          innerDot.style.boxShadow = isPointer.current 
            ? '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3)' 
            : '0 0 10px rgba(0, 255, 255, 0.4)';
        }
      }
      
      if (cursorRingRef.current) {
        const innerRing = cursorRingRef.current.querySelector('.cursor-inner-ring') as HTMLElement;
        if (innerRing) {
          innerRing.style.width = isPointer.current ? '44px' : '28px';
          innerRing.style.height = isPointer.current ? '44px' : '28px';
          innerRing.style.borderColor = isPointer.current 
            ? 'var(--accent-primary)' 
            : (isDarkMode.current ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.5)');
          innerRing.style.boxShadow = isPointer.current ? '0 0 20px rgba(0, 255, 255, 0.3)' : 'none';
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
    };

    const handleMouseDown = () => {
      isClicking.current = true;
    };

    const handleMouseUp = () => {
      isClicking.current = false;
    };

    // Start animation loop
    lastTime.current = performance.now();
    animationFrameId.current = requestAnimationFrame(animate);

    // Add event listeners with passive flag for better performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <>
      {/* Cursor trail dots - reduced to 3 for better performance */}
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          ref={(el) => { trailRefs.current[index] = el; }}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{ 
            opacity: 0,
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            perspective: 1000,
          }}
        >
          <div 
            className="w-2 h-2 rounded-full bg-accent-primary/50"
            style={{ boxShadow: '0 0 6px rgba(0, 255, 255, 0.3)' }}
          />
        </div>
      ))}

      {/* Main cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          opacity: 0,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          perspective: 1000,
        }}
      >
        <div
          className="cursor-inner-dot rounded-full bg-accent-primary"
          style={{
            width: '10px',
            height: '10px',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
            transition: 'width 0.15s ease-out, height 0.15s ease-out, box-shadow 0.15s ease-out',
          }}
        />
        {/* Glow effect */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-accent-primary/20 blur-sm"
        />
      </div>

      {/* Cursor ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ 
          opacity: 0,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          perspective: 1000,
        }}
      >
        <div
          className="cursor-inner-ring rounded-full border-2"
          style={{
            width: '28px',
            height: '28px',
            borderColor: 'rgba(255, 255, 255, 0.4)',
            transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out',
          }}
        />
      </div>

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
