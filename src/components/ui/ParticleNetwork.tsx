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
  colorIndex: number; // Index into color palette
  // Twinkling properties
  twinkle: boolean; // Whether this particle twinkles
  twinkleSpeed: number; // How fast it pulses (radians per frame)
  twinklePhase: number; // Starting phase offset (0 to 2π)
  twinkleIntensity: number; // How much the brightness varies (0-1)
  // Particle type
  isAmbient: boolean; // True = background ambient particle, False = globe particle
  // Escape properties
  escaped: boolean; // Has this particle escaped the globe?
  escapeTimer: number; // How long until it can be recaptured
}

// Color palette - shades of blue and white
const PARTICLE_COLORS = [
  { r: 0, g: 191, b: 255 },    // Cyan (primary)
  { r: 100, g: 200, b: 255 },  // Light sky blue
  { r: 0, g: 150, b: 255 },    // Deep sky blue
  { r: 70, g: 130, b: 220 },   // Steel blue
  { r: 150, g: 220, b: 255 },  // Pale cyan
  { r: 200, g: 230, b: 255 },  // Ice blue
  { r: 255, g: 255, b: 255 },  // Pure white
  { r: 180, g: 200, b: 255 },  // Lavender blue
  { r: 0, g: 170, b: 230 },    // Ocean blue
  { r: 120, g: 180, b: 255 },  // Soft blue
];

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

// Parallax configuration
const SCROLL_PARALLAX_STRENGTH = 0.15; // Multiplier for scroll-based offset

// Globe/Sphere configuration
const GLOBE_RADIUS_RATIO = 0.45; // Sphere radius as ratio of canvas height - fills most of screen
const GLOBE_ATTRACTION_STRENGTH = 0.00010; // Very gentle pull toward sphere surface
const GLOBE_SURFACE_THICKNESS = 200; // Wide "shell" zone - particles roam freely within
const GLOBE_OUTER_FADE = 250; // Distance beyond shell where attraction kicks in

// Escape mechanics
const ESCAPE_VELOCITY = 0.8; // Speed threshold to potentially escape
const ESCAPE_CHANCE = 0.002; // Chance per frame to escape when moving fast outward
const ESCAPE_DURATION_MIN = 300; // Minimum frames before recapture (5 seconds at 60fps)
const ESCAPE_DURATION_MAX = 900; // Maximum frames before recapture (15 seconds)
const RECAPTURE_DISTANCE = 1.5; // When escaped particle is this far (ratio of globe radius), start recapturing

// Ambient background particles configuration
const AMBIENT_PARTICLE_RATIO = 0.6; // 60% of particles are ambient background
const AMBIENT_BRIGHTNESS_MULT = 0.4; // Ambient particles are 40% as bright
const AMBIENT_SIZE_MULT = 0.65; // Ambient particles are 65% the size

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
  
  // Scroll parallax state
  const scrollOffsetRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const globeRadius = Math.min(width, height) * GLOBE_RADIUS_RATIO;
    
    const ambientCount = Math.floor(particleCount * AMBIENT_PARTICLE_RATIO);
    const globeCount = particleCount - ambientCount;
    
    // Create AMBIENT background particles first (render behind)
    for (let i = 0; i < ambientCount; i++) {
      const depth = Math.random() * 0.5; // Ambient particles are always "far" (low depth)
      const willTwinkle = Math.random() < 0.3; // 30% twinkle
      
      // Spawn ambient particles across the ENTIRE screen
      let x, y;
      const spawnType = Math.random();
      
      if (spawnType < 0.4) {
        // 40% spawn completely randomly across screen
        x = Math.random() * width;
        y = Math.random() * height;
      } else if (spawnType < 0.7) {
        // 30% spawn in edge/corner regions
        // Pick a random edge or corner
        const edge = Math.floor(Math.random() * 4);
        const margin = Math.random() * 0.3; // 0-30% from edge
        switch (edge) {
          case 0: // Top
            x = Math.random() * width;
            y = margin * height;
            break;
          case 1: // Bottom
            x = Math.random() * width;
            y = height - margin * height;
            break;
          case 2: // Left
            x = margin * width;
            y = Math.random() * height;
            break;
          default: // Right
            x = width - margin * width;
            y = Math.random() * height;
        }
      } else {
        // 30% spawn in corners specifically
        const corner = Math.floor(Math.random() * 4);
        const spreadX = Math.random() * width * 0.35;
        const spreadY = Math.random() * height * 0.35;
        switch (corner) {
          case 0: // Top-left
            x = spreadX;
            y = spreadY;
            break;
          case 1: // Top-right
            x = width - spreadX;
            y = spreadY;
            break;
          case 2: // Bottom-left
            x = spreadX;
            y = height - spreadY;
            break;
          default: // Bottom-right
            x = width - spreadX;
            y = height - spreadY;
        }
      }
      
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: (0.8 + depth * 1.2) * AMBIENT_SIZE_MULT,
        brightness: (0.2 + depth * 0.5) * AMBIENT_BRIGHTNESS_MULT,
        depth,
        colorIndex: Math.floor(Math.random() * PARTICLE_COLORS.length),
        twinkle: willTwinkle,
        twinkleSpeed: 0.015 + Math.random() * 0.025, // Slower twinkle
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleIntensity: 0.2 + Math.random() * 0.3, // Subtler twinkle
        isAmbient: true,
        escaped: false,
        escapeTimer: 0,
      });
    }
    
    // Create GLOBE particles
    for (let i = 0; i < globeCount; i++) {
      const depth = Math.random();
      // ~40% of particles will twinkle, with brighter ones more likely
      const twinkleChance = depth > 0.5 ? 0.5 : 0.25;
      const willTwinkle = Math.random() < twinkleChance;
      
      // Spawn particles distributed around the globe zone
      let x, y;
      if (Math.random() < 0.85) {
        // 85% spawn in/around the globe zone
        const angle = Math.random() * Math.PI * 2;
        const dist = globeRadius * (0.2 + Math.random() * 1.1); // 20% to 130% of radius
        x = centerX + Math.cos(angle) * dist;
        y = centerY + Math.sin(angle) * dist;
      } else {
        // 15% spawn randomly (will drift toward globe)
        x = Math.random() * width;
        y = Math.random() * height;
      }
      
      // Give particles initial orbital velocity (tangent to globe)
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const tangentX = -dy / dist;
      const tangentY = dx / dist;
      
      // Mix of orbital and random velocity
      const orbitalSpeed = 0.3 + Math.random() * 0.5;
      const randomSpeed = 0.4;
      const orbitDir = depth > 0.5 ? 1 : -1;
      
      particles.push({
        x,
        y,
        vx: tangentX * orbitalSpeed * orbitDir + (Math.random() - 0.5) * randomSpeed,
        vy: tangentY * orbitalSpeed * orbitDir + (Math.random() - 0.5) * randomSpeed,
        radius: 1 + depth * 2,
        brightness: 0.3 + depth * 0.7,
        depth,
        colorIndex: Math.floor(Math.random() * PARTICLE_COLORS.length),
        twinkle: willTwinkle,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleIntensity: 0.3 + Math.random() * 0.5,
        isAmbient: false,
        escaped: false,
        escapeTimer: 0,
      });
    }
    
    // Sort: ambient first (background), then by depth
    return particles.sort((a, b) => {
      if (a.isAmbient !== b.isAmbient) return a.isAmbient ? -1 : 1;
      return a.depth - b.depth;
    });
  }, [particleCount]);

  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const { width, height } = dimensionsRef.current;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const scrollOffset = scrollOffsetRef.current;

    // Clear completely - no trails
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, width, height);

    // Helper function to get parallax-adjusted position (scroll only)
    const getParallaxPosition = (particle: Particle) => {
      // Depth affects parallax intensity: deeper (0) = less movement, closer (1) = more movement
      const depthFactor = 0.3 + particle.depth * 0.7;
      
      // Scroll parallax - closer particles move more with scroll
      const scrollOffsetY = scrollOffset * SCROLL_PARALLAX_STRENGTH * depthFactor;
      
      return {
        x: particle.x,
        y: particle.y - scrollOffsetY,
      };
    };

    // Draw connections first (behind particles)
    particles.forEach((particle, i) => {
      const pColor = PARTICLE_COLORS[particle.colorIndex];
      const pPos = getParallaxPosition(particle);
      
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const oColor = PARTICLE_COLORS[other.colorIndex];
        const oPos = getParallaxPosition(other);
        
        const dx = pPos.x - oPos.x;
        const dy = pPos.y - oPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Connection distance - longer for ambient-to-ambient to fill space
        const bothAmbient = particle.isAmbient && other.isAmbient;
        const isAmbientConnection = particle.isAmbient || other.isAmbient;
        const baseDistance = bothAmbient 
          ? connectionDistance * 1.1  // Ambient-to-ambient: longer range
          : isAmbientConnection 
            ? connectionDistance * 0.8  // Mixed: medium range
            : connectionDistance;       // Globe-to-globe: normal
        const effectiveDistance = baseDistance * (0.7 + (particle.depth + other.depth) * 0.3);
        
        if (dist < effectiveDistance) {
          // Dimmer connections for ambient particles
          const ambientMult = isAmbientConnection ? 0.4 : 1;
          const opacity = (1 - dist / effectiveDistance) * 0.4 * Math.min(particle.brightness, other.brightness) * ambientMult;
          
          // Blend the two particle colors for the line
          const avgR = Math.round((pColor.r + oColor.r) / 2);
          const avgG = Math.round((pColor.g + oColor.g) / 2);
          const avgB = Math.round((pColor.b + oColor.b) / 2);
          ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${opacity})`;
          ctx.lineWidth = isAmbientConnection 
            ? 0.3 + (particle.depth + other.depth) * 0.15 
            : 0.5 + (particle.depth + other.depth) * 0.25;
          ctx.beginPath();
          ctx.moveTo(pPos.x, pPos.y);
          ctx.lineTo(oPos.x, oPos.y);
          ctx.stroke();
        }
      }
    });

    // Update and draw particles
    particles.forEach((particle) => {
      const color = PARTICLE_COLORS[particle.colorIndex];
      const pos = getParallaxPosition(particle);
      
      // Calculate twinkle effect
      let twinkleBrightness = particle.brightness;
      let twinkleScale = 1;
      
      if (particle.twinkle) {
        // Use time to create smooth pulsing - sine wave oscillation
        const twinkleValue = Math.sin(time * particle.twinkleSpeed * 0.001 + particle.twinklePhase);
        // Map from -1,1 to a brightness multiplier
        const twinkleMultiplier = 1 + twinkleValue * particle.twinkleIntensity;
        twinkleBrightness = Math.min(1, particle.brightness * twinkleMultiplier);
        // Also slightly scale the particle when bright
        twinkleScale = 1 + twinkleValue * 0.15;
      }
      
      // Mouse interaction - only for closer particles (use actual position, not parallax)
      if (interactive && particle.depth > 0.4 && !particle.isAmbient) {
        const dx = mouse.x - pos.x;
        const dy = mouse.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          particle.vx -= (dx / dist) * force * 0.015;
          particle.vy -= (dy / dist) * force * 0.015;
        }
      }

      // Globe/Sphere attraction - ONLY for non-ambient particles
      if (!particle.isAmbient) {
        const globeCenterX = width / 2;
        const globeCenterY = height / 2;
        const globeRadius = Math.min(width, height) * GLOBE_RADIUS_RATIO;
        
        // Distance from particle to globe center
        const dxGlobe = particle.x - globeCenterX;
        const dyGlobe = particle.y - globeCenterY;
        const distFromCenter = Math.sqrt(dxGlobe * dxGlobe + dyGlobe * dyGlobe);
        
        // Distance from sphere surface (positive = outside, negative = inside)
        const distFromSurface = distFromCenter - globeRadius;
        
        if (distFromCenter > 0.1) { // Avoid division by zero
          // Normalize direction from center
          const dirX = dxGlobe / distFromCenter;
          const dirY = dyGlobe / distFromCenter;
          
          // Calculate outward velocity (positive = moving away from center)
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          const velocityDotDir = (particle.vx * dirX + particle.vy * dirY);
          
          // ESCAPE MECHANICS
          if (particle.escaped) {
            // Particle is escaped - count down timer
            particle.escapeTimer--;
            
            // Check if it's time to start recapturing
            const recaptureThreshold = globeRadius * RECAPTURE_DISTANCE;
            if (particle.escapeTimer <= 0 || distFromCenter > recaptureThreshold) {
              // Very gentle pull back - escaped particles drift back slowly
              const recaptureForce = 0.00008;
              particle.vx -= dirX * recaptureForce * distFromCenter;
              particle.vy -= dirY * recaptureForce * distFromCenter;
              
              // If close enough and slow enough, recapture
              if (distFromSurface < GLOBE_SURFACE_THICKNESS && speed < 0.5) {
                particle.escaped = false;
              }
            }
            // Escaped particles still get very light orbital motion
            const orbitStrength = 0.0002;
            const orbitDir = particle.depth > 0.5 ? 1 : -1;
            particle.vx += -dirY * orbitStrength * orbitDir;
            particle.vy += dirX * orbitStrength * orbitDir;
          } else {
            // Normal globe particle - check for escape
            // Can escape if: moving fast, moving outward, outside the globe surface
            if (speed > ESCAPE_VELOCITY && velocityDotDir > 0 && distFromSurface > 0) {
              if (Math.random() < ESCAPE_CHANCE) {
                // ESCAPE!
                particle.escaped = true;
                particle.escapeTimer = ESCAPE_DURATION_MIN + 
                  Math.floor(Math.random() * (ESCAPE_DURATION_MAX - ESCAPE_DURATION_MIN));
                // Give a little boost outward
                particle.vx += dirX * 0.1;
                particle.vy += dirY * 0.1;
              }
            }
            
            // Normal attraction when not escaped
            const comfortZone = GLOBE_SURFACE_THICKNESS + GLOBE_OUTER_FADE;
            
            if (Math.abs(distFromSurface) > comfortZone) {
              const overshoot = Math.abs(distFromSurface) - comfortZone;
              const attractionForce = overshoot * GLOBE_ATTRACTION_STRENGTH;
              
              if (distFromSurface > 0) {
                particle.vx -= dirX * attractionForce;
                particle.vy -= dirY * attractionForce;
              } else {
                particle.vx += dirX * attractionForce;
                particle.vy += dirY * attractionForce;
              }
            }
            
            // Orbital motion for globe particles
            const orbitStrength = 0.0006 * (0.5 + particle.depth * 0.5);
            const orbitDir = particle.depth > 0.5 ? 1 : -1;
            particle.vx += -dirY * orbitStrength * orbitDir;
            particle.vy += dirX * orbitStrength * orbitDir;
          }
        }
      }

      // Update actual position (not parallax position)
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges smoothly
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      // Different physics for ambient vs globe particles
      if (particle.isAmbient) {
        // Ambient particles: slow, gentle drift
        particle.vx += (Math.random() - 0.5) * 0.015;
        particle.vy += (Math.random() - 0.5) * 0.015;
        particle.vx *= 0.995;
        particle.vy *= 0.995;
        
        // Slower max speed for ambient
        const maxSpeed = 0.5;
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }
      } else {
        // Globe particles: more active movement
        particle.vx += (Math.random() - 0.5) * 0.04;
        particle.vy += (Math.random() - 0.5) * 0.04;
        particle.vx *= 0.998;
        particle.vy *= 0.998;
        
        const maxSpeed = 1.5;
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }
      }

      // Draw glow for brighter particles (use parallax position)
      // Twinkling particles get enhanced glow
      const glowThreshold = particle.twinkle ? 0.4 : 0.6;
      if (twinkleBrightness > glowThreshold) {
        const baseGlowRadius = particle.radius * 4;
        const glowRadius = baseGlowRadius * twinkleScale;
        const glowIntensity = particle.twinkle ? 0.25 : 0.18;
        
        const glow = ctx.createRadialGradient(
          pos.x, pos.y, 0,
          pos.x, pos.y, glowRadius
        );
        glow.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${twinkleBrightness * glowIntensity})`);
        glow.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${twinkleBrightness * glowIntensity * 0.3})`);
        glow.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      // Draw particle core (use parallax position)
      const coreRadius = particle.radius * twinkleScale;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${twinkleBrightness})`;
      ctx.fill();

      // Bright center for larger particles - always white for sparkle
      // Enhanced sparkle for twinkling particles
      if (coreRadius > 1.5) {
        const centerIntensity = particle.twinkle ? twinkleBrightness * 1.1 : twinkleBrightness * 0.9;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, coreRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, centerIntensity)})`;
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
      
      // Update mouse position for particle interaction
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleScroll = () => {
      // Get scroll position relative to the canvas container
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      // Use the container's position relative to viewport
      // Negative rect.top means we've scrolled past the top of the container
      scrollOffsetRef.current = -rect.top;
    };

    handleResize();
    handleScroll(); // Initialize scroll position
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Only add mouse interaction on non-touch devices
    if (interactive && !isMobile) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
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

