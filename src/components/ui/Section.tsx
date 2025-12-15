import styles from '../../styles/components/Section.module.css';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'alt' | 'dark';
  className?: string;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  variant = 'default',
  className = '',
}: SectionProps) {
  const variantClass = variant === 'alt' 
    ? styles.sectionAlt 
    : variant === 'dark' 
    ? styles.sectionDark 
    : '';

  return (
    <section id={id} className={`${styles.section} ${variantClass} ${className}`}>
      <div className={styles.sectionInner}>
        {title && <h2 className={styles.sectionTitle}>{title}</h2>}
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

// Export grid utilities
export const Grid = {
  styles,
};

