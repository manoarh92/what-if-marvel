import React, { useEffect, useRef } from 'react';

/**
 * Cosmic Background Component
 * Renders an ambient multiversal starfield with shimmering nebula particles
 * and delicate quantum timeline strands using HTML5 Canvas.
 */
export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Starfield
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
      color: Math.random() > 0.3 ? '#e0f2fe' : (Math.random() > 0.5 ? '#f59e0b' : '#c084fc')
    }));

    // Multiverse strands
    const strands = [
      { yOffset: 0.3, waveSpeed: 0.001, amp: 40, color: 'rgba(56, 189, 248, 0.04)' },
      { yOffset: 0.6, waveSpeed: 0.0015, amp: 60, color: 'rgba(139, 92, 246, 0.03)' },
      { yOffset: 0.8, waveSpeed: 0.0008, amp: 30, color: 'rgba(244, 63, 94, 0.03)' }
    ];

    let t = 0;

    const render = () => {
      t += 1;
      ctx.fillStyle = '#050711';
      ctx.fillRect(0, 0, width, height);

      // Render cosmic nebula strands
      strands.forEach(strand => {
        ctx.beginPath();
        ctx.strokeStyle = strand.color;
        ctx.lineWidth = 45;
        ctx.lineCap = 'round';
        for (let x = 0; x < width; x += 15) {
          const y = height * strand.yOffset + Math.sin(x * 0.003 + t * strand.waveSpeed) * strand.amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Render Stars
      stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.speed = -star.speed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
