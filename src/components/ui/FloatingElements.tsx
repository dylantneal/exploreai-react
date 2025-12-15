import { useEffect, useRef } from 'react';
import styles from '../../styles/components/FloatingElements.module.css';

interface DataSymbol {
  char: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
}

// Data visualization symbols and mini-charts
const SYMBOLS = ['∑', 'Δ', 'π', '∞', '≈', '±', '∫', 'μ', 'σ', '√', 'φ', 'λ', '∂', 'ε'];

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<DataSymbol[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    
    // Initialize floating elements
    elementsRef.current = Array.from({ length: 20 }, () => ({
      char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      size: 14 + Math.random() * 24,
      opacity: 0.03 + Math.random() * 0.08,
      speed: 0.2 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
    }));

    const animate = () => {
      elementsRef.current.forEach((el) => {
        el.y -= el.speed;
        el.rotation += el.rotationSpeed;
        
        // Reset when off screen
        if (el.y < -50) {
          el.y = height + 50;
          el.x = Math.random() * width;
        }
      });

      // Force re-render
      container.innerHTML = elementsRef.current
        .map((el) => `
          <span 
            class="${styles.symbol}" 
            style="
              left: ${el.x}px; 
              top: ${el.y}px; 
              font-size: ${el.size}px; 
              opacity: ${el.opacity};
              transform: rotate(${el.rotation}deg);
            "
          >${el.char}</span>
        `)
        .join('');

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}

