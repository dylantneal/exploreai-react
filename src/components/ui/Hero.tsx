import ParticleNetwork from './ParticleNetwork';
import FloatingElements from './FloatingElements';
import styles from '../../styles/components/Hero.module.css';

interface HeroProps {
  title: React.ReactNode;
  subtitle?: string;
  backgroundImage?: string;
  animated?: boolean;
  overlay?: boolean;
  fullHeight?: boolean;
  children?: React.ReactNode;
  variant?: 'default' | 'subtle';
  showFloatingElements?: boolean;
  staggeredAnimation?: boolean;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  animated = true,
  overlay = true,
  fullHeight = false,
  children,
  variant = 'default',
  showFloatingElements = false,
  staggeredAnimation = false,
}: HeroProps) {
  const showAnimation = animated && !backgroundImage;
  
  return (
    <section
      className={`${styles.hero} ${fullHeight ? styles.heroFullHeight : ''} ${variant === 'subtle' ? styles.heroSubtle : ''}`}
    >
      {/* Gradient orbs for depth */}
      {fullHeight && (
        <>
          <div className={styles.gradientOrb1} />
          <div className={styles.gradientOrb2} />
          <div className={styles.gradientOrb3} />
        </>
      )}
      
      {showFloatingElements && <FloatingElements />}
      
      {showAnimation && (
        <ParticleNetwork 
          particleCount={fullHeight ? 250 : 140}
          connectionDistance={fullHeight ? 170 : 140}
        />
      )}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className={styles.heroImage}
          aria-hidden="true"
        />
      )}
      {(backgroundImage || overlay) && !showAnimation && (
        <div className={styles.heroOverlay} />
      )}
      <div className={`${styles.heroContent} ${staggeredAnimation ? styles.staggered : ''}`}>
        <h1 className={`${styles.heroTitle} ${staggeredAnimation ? styles.staggerItem : ''}`}>{title}</h1>
        {subtitle && <p className={`${styles.heroSubtitle} ${staggeredAnimation ? styles.staggerItem : ''}`}>{subtitle}</p>}
        <div className={staggeredAnimation ? styles.staggerItem : ''}>
          {children}
        </div>
      </div>
    </section>
  );
}
