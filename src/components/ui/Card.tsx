import { Link } from 'react-router-dom';
import styles from '../../styles/components/Card.module.css';

interface CardProps {
  title?: string;
  titleLink?: string;
  image?: string;
  imageAlt?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  featured?: boolean;
  footer?: React.ReactNode;
}

export default function Card({
  title,
  titleLink,
  image,
  imageAlt = '',
  children,
  hoverable = true,
  featured = false,
  footer,
}: CardProps) {
  return (
    <article
      className={`${styles.card} ${hoverable ? styles.cardHoverable : ''} ${featured ? styles.cardFeatured : ''}`}
    >
      {image && (
        <img src={image} alt={imageAlt} className={styles.cardImage} />
      )}
      <div className={styles.cardBody}>
        {title && (
          <h3 className={styles.cardTitle}>
            {titleLink ? (
              <Link to={titleLink} className={styles.cardTitleLink}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
        )}
        <div className={styles.cardText}>{children}</div>
      </div>
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </article>
  );
}

