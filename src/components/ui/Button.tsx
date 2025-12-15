import { Link } from 'react-router-dom';
import styles from '../../styles/components/Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  href?: string;
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  href,
  to,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const className = `
    ${styles.button}
    ${styles[variant]}
    ${size !== 'medium' ? styles[size] : ''}
    ${fullWidth ? styles.fullWidth : ''}
  `.trim();

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  // Button
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

