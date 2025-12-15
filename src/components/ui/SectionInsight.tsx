import styles from '../../styles/components/SectionInsight.module.css';

interface SectionInsightProps {
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success';
}

export default function SectionInsight({ 
  children, 
  variant = 'default' 
}: SectionInsightProps) {
  return (
    <div className={`${styles.insight} ${styles[variant]}`}>
      <div className={styles.indicator} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

