import { useState, useEffect } from 'react';
import styles from '../../styles/components/TableOfContents.module.css';

export interface TOCItem {
  id: string;
  label: string;
  level?: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  title?: string;
}

export default function TableOfContents({ items, title = 'Contents' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <h3 className={styles.tocTitle}>{title}</h3>
      <ul className={styles.tocList}>
        {items.map((item) => (
          <li 
            key={item.id} 
            className={`${styles.tocItem} ${item.level === 2 ? styles.tocItemNested : ''}`}
          >
            <button
              onClick={() => handleClick(item.id)}
              className={`${styles.tocLink} ${activeId === item.id ? styles.active : ''}`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

