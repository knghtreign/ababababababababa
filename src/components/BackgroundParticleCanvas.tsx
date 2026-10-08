import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  alpha: number;
  alphaSpeed: number;
  color: string;
  type: 'bubble' | 'sparkle' | 'microDot' | 'cross';
  rotation: number;
  rotationSpeed: number;
}

export const BackgroundParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Palette matching the new light gold and natural botanical tones
    const colors = [
      'rgba(223, 172, 56, 0.55)',  // Rich gold (#DFAC38)
      'rgba(119, 141, 122, 0.45)', // Sage green (#778D7A)
      'rgba(65, 90, 119, 0.3)',    // Soft slate (#415A77)
      'rgba(212, 164, 48, 0.45)',  // Warm metallic gold
    ];

    const particleTypes: ('bubble' | 'sparkle' | 'microDot' | 'cross')[] = [
      'bubble',
      'sparkle',
      'microDot',
      'cross',
      'bubble',
      'sparkle'
    ];

    // Responsive particle count
    const particleCount = Math.min(Math.floor(width / 25), 48);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      const baseSize = type === 'bubble' ? Math.random() * 5 + 3 : type === 'sparkle' ? Math.random() * 4 + 2 : Math.random() * 3 + 1.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.15, // gently drift upwards like micro-bubbles
        size: baseSize,
        baseSize,
        alpha: Math.random() * 0.6 + 0.2,
        alphaSpeed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Mouse tracking for subtle organic drift reaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Draw sparkle star icon
    const drawSparkle = (cx: number, cy: number, size: number, color: string, alpha: number, rot: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;

      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * size * 2.2, Math.sin((i * Math.PI) / 2) * size * 2.2);
        ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.5), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.5));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Draw 4-point cross
    const drawCross = (cx: number, cy: number, size: number, color: string, alpha: number, rot: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();
      ctx.restore();
    };

    // Draw glowing bubble
    const drawBubble = (cx: number, cy: number, radius: number, color: string, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      // Outer glow
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Delicate specular reflection highlight on bubble rim
      ctx.beginPath();
      ctx.arc(cx - radius * 0.3, cy - radius * 0.3, radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();

      ctx.restore();
    };

    // Render loop using requestAnimationFrame
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Oscillate opacity
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.85) {
          p.alpha = 0.85;
          p.alphaSpeed = -Math.abs(p.alphaSpeed);
        } else if (p.alpha < 0.15) {
          p.alpha = 0.15;
          p.alphaSpeed = Math.abs(p.alphaSpeed);
        }

        // Slight mouse avoidance
        if (mouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100 * 0.4;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Boundary wrap
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Render specific shape
        if (p.type === 'sparkle') {
          drawSparkle(p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else if (p.type === 'cross') {
          drawCross(p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else if (p.type === 'bubble') {
          drawBubble(p.x, p.y, p.size, p.color, p.alpha);
        } else {
          // microDot
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="background-particle-canvas"
      className="fixed inset-0 pointer-events-none z-[2] w-full h-full"
      style={{ opacity: 0.9 }}
    />
  );
};
