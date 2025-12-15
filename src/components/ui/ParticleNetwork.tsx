import { useEffect, useRef, useCallback, useState } from 'react';
import styles from '../../styles/components/ParticleNetwork.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  brightness: number;
  depth: number; // 0-1, affects size and opacity
}

interface ParticleNetworkProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  particleColor?: string;
  lineColor?: string;
  interactive?: boolean;
}

// Responsive particle count based on screen size
function getResponsiveParticleCount(baseCount: number, width: number): number {
  if (width < 480) return Math.floor(baseCount * 0.3);
  if (width < 768) return Math.floor(baseCount * 0.5);
  if (width < 1024) return Math.floor(baseCount * 0.7);
  return baseCount;
}

export default function ParticleNetwork({
  className = '',
  particleCount = 80,
  connectionDistance = 150,
  particleColor = '#00BFFF',
  lineColor = '#00BFFF',
  interactive = true,
}: ParticleNetworkProps) {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2 * (0.5 + depth * 0.5),
        vy: (Math.random() - 0.5) * 1.2 * (0.5 + depth * 0.5),
        radius: 1 + depth * 2,
        brightness: 0.3 + depth * 0.7,
        depth,
      });
    }
    // Sort by depth so farther particles render first
    return particles.sort((a, b) => a.depth - b.depth);
  }, [particleCount]);

  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const { width, height } = dimensionsRef.current;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Clear completely - no trails
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, width, height);

    // Draw connections first (behind particles)
    particles.forEach((particle, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Connection distance affected by depth
        const effectiveDistance = connectionDistance * (0.7 + (particle.depth + other.depth) * 0.3);
        
        if (dist < effectiveDistance) {
          const opacity = (1 - dist / effectiveDistance) * 0.4 * Math.min(particle.brightness, other.brightness);
          ctx.strokeStyle = `rgba(0, 191, 255, ${opacity})`;
          ctx.lineWidth = 0.5 + (particle.depth + other.depth) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    });

    // Update and draw particles
    particles.forEach((particle) => {
      // Mouse interaction - only for closer particles
      if (interactive && particle.depth > 0.4) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          particle.vx -= (dx / dist) * force * 0.015;
          particle.vy -= (dy / dist) * force * 0.015;
        }
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges smoothly
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      // Subtle random drift
      particle.vx += (Math.random() - 0.5) * 0.02;
      particle.vy += (Math.random() - 0.5) * 0.02;

      // Light velocity damping
      particle.vx *= 0.998;
      particle.vy *= 0.998;

      // Draw glow for brighter particles
      if (particle.brightness > 0.6) {
        const glowRadius = particle.radius * 4;
        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowRadius
        );
        glow.addColorStop(0, `rgba(0, 191, 255, ${particle.brightness * 0.15})`);
        glow.addColorStop(1, 'rgba(0, 191, 255, 0)');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      // Draw particle core
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 191, 255, ${particle.brightness})`;
      ctx.fill();

      // Bright center for larger particles
      if (particle.radius > 2) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.brightness * 0.8})`;
        ctx.fill();
      }
    });
  }, [connectionDistance, interactive]);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    draw(ctx, time);
    animationRef.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      dimensionsRef.current = { width, height };

      // Check if mobile for disabling interaction on touch devices
      setIsMobile(width < 768);

      // Use responsive particle count based on screen size
      const responsiveCount = getResponsiveParticleCount(particleCount, width);
      particlesRef.current = initParticles(width, height);
      
      // Limit particles on smaller screens
      if (responsiveCount < particlesRef.current.length) {
        particlesRef.current = particlesRef.current.slice(0, responsiveCount);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Only add mouse interaction on non-touch devices
    if (interactive && !isMobile) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initParticles, interactive, isMobile, particleCount]);

  return (
    <div className={`${styles.container} ${className}`}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

