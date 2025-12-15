import { useEffect, useRef, useCallback } from 'react';
import styles from '../../styles/components/ClimateBackground.module.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  hue: number; // For color variation (warm tones)
  wobblePhase: number;
  wobbleSpeed: number;
}

interface ClimateBackgroundProps {
  className?: string;
}

export default function ClimateBackground({ className = '' }: ClimateBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    // Responsive particle count
    const count = width < 768 ? 30 : width < 1024 ? 50 : 70;
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: height + Math.random() * height, // Start below screen
        size: Math.random() * 4 + 2,
        speed: 0.4 + Math.random() * 0.6,
        opacity: 0.08 + Math.random() * 0.12, // More visible
        hue: 190 + Math.random() * 30, // Cyan to blue tones
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.02,
      });
    }
    return particles;
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = dimensionsRef.current;
    const particles = particlesRef.current;
    timeRef.current += 1;
    const time = timeRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw subtle wave patterns at the bottom (representing rising seas/heat)
    const waveCount = 3;
    for (let w = 0; w < waveCount; w++) {
      ctx.beginPath();
      const baseY = height - (w * 80) - 30;
      const amplitude = 12 + w * 6;
      const frequency = 0.003 - w * 0.0005;
      const phase = time * 0.01 + w * 0.5;
      
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 5) {
        const y = baseY + Math.sin(x * frequency + phase) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, baseY - amplitude, 0, height);
      const opacity = 0.04 - w * 0.008;
      gradient.addColorStop(0, `rgba(0, 191, 255, ${opacity})`);
      gradient.addColorStop(1, `rgba(0, 150, 200, ${opacity * 0.5})`);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw rising particles (representing CO2/heat rising)
    particles.forEach((particle) => {
      // Update position
      particle.y -= particle.speed;
      particle.wobblePhase += particle.wobbleSpeed;
      
      // Wobble horizontally
      const wobbleX = Math.sin(particle.wobblePhase) * 20;
      const drawX = particle.x + wobbleX;
      
      // Fade out near top
      const fadeStart = height * 0.3;
      let currentOpacity = particle.opacity;
      if (particle.y < fadeStart) {
        currentOpacity = particle.opacity * (particle.y / fadeStart);
      }
      
      // Reset if off screen
      if (particle.y < -20) {
        particle.y = height + 50;
        particle.x = Math.random() * width;
        particle.wobblePhase = Math.random() * Math.PI * 2;
      }

      // Draw particle with glow
      const gradient = ctx.createRadialGradient(
        drawX, particle.y, 0,
        drawX, particle.y, particle.size * 4
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, ${currentOpacity})`);
      gradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 50%, ${currentOpacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 60%, 40%, 0)`);
      
      ctx.beginPath();
      ctx.arc(drawX, particle.y, particle.size * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });

    // Draw subtle horizontal lines (representing atmospheric layers/data)
    const lineCount = 5;
    for (let i = 0; i < lineCount; i++) {
      const y = (height / (lineCount + 1)) * (i + 1);
      const linePhase = time * 0.005 + i * 0.3;
      const lineOpacity = 0.04 + Math.sin(linePhase) * 0.02;
      
      ctx.beginPath();
      ctx.moveTo(0, y);
      
      // Wavy line
      for (let x = 0; x <= width; x += 10) {
        const offsetY = Math.sin(x * 0.005 + linePhase) * 4;
        ctx.lineTo(x, y + offsetY);
      }
      
      ctx.strokeStyle = `rgba(0, 191, 255, ${lineOpacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Subtle corner gradients (representing heat zones)
    const cornerSize = Math.min(width, height) * 0.5;
    
    // Top-right warm glow
    const warmGradient = ctx.createRadialGradient(
      width, 0, 0,
      width, 0, cornerSize
    );
    const warmPulse = 0.06 + Math.sin(time * 0.008) * 0.03;
    warmGradient.addColorStop(0, `rgba(255, 150, 100, ${warmPulse})`);
    warmGradient.addColorStop(0.5, `rgba(255, 180, 130, ${warmPulse * 0.5})`);
    warmGradient.addColorStop(1, 'rgba(255, 200, 150, 0)');
    ctx.fillStyle = warmGradient;
    ctx.fillRect(0, 0, width, height);

    // Bottom-left cool glow (ice/ocean)
    const coolGradient = ctx.createRadialGradient(
      0, height, 0,
      0, height, cornerSize
    );
    const coolPulse = 0.06 + Math.sin(time * 0.006 + 1) * 0.03;
    coolGradient.addColorStop(0, `rgba(100, 200, 255, ${coolPulse})`);
    coolGradient.addColorStop(0.5, `rgba(150, 220, 255, ${coolPulse * 0.5})`);
    coolGradient.addColorStop(1, 'rgba(180, 230, 255, 0)');
    ctx.fillStyle = coolGradient;
    ctx.fillRect(0, 0, width, height);

  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    draw(ctx);
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
      particlesRef.current = initParticles(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <div className={`${styles.container} ${className}`}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

