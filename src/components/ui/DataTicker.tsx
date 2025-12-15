import { useState, useEffect } from 'react';
import styles from '../../styles/components/DataTicker.module.css';

interface DataFact {
  value: string;
  label: string;
  context: string;
  source: string;
}

const DATA_FACTS: DataFact[] = [
  { 
    value: '426 ppm', 
    label: 'atmospheric CO₂', 
    context: 'Highest level in 3 million years',
    source: 'NOAA' 
  },
  { 
    value: '8.1 billion', 
    label: 'global population', 
    context: 'Doubled since 1974',
    source: 'UN' 
  },
  { 
    value: '74.9 years', 
    label: 'global life expectancy', 
    context: 'Up from 47 years in 1950',
    source: 'WHO' 
  },
  { 
    value: '+1.28°C', 
    label: 'warming since 1880', 
    context: '2024 was the hottest year on record',
    source: 'NASA' 
  },
  { 
    value: '$105 trillion', 
    label: 'world GDP', 
    context: '10× larger than in 1960',
    source: 'World Bank' 
  },
  { 
    value: '1 in 6', 
    label: 'species face extinction', 
    context: 'Current rate 1,000× natural baseline',
    source: 'IUCN' 
  },
];

export default function DataTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % DATA_FACTS.length);
        setIsVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const fact = DATA_FACTS[currentIndex];

  return (
    <div className={styles.ticker}>
      <div className={`${styles.factContainer} ${isVisible ? styles.fadeIn : styles.fadeOut}`}>
        <span className={styles.value}>{fact.value}</span>
        <span className={styles.label}>{fact.label}</span>
        <span className={styles.context}>{fact.context}</span>
      </div>
      <div className={styles.source}>{fact.source}</div>
    </div>
  );
}

