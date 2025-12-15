import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants';
import { useScrolled } from '../../hooks/useScrolled';
import styles from '../../styles/components/Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(50);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoText}>
            <span className={styles.logoPrimary}>Clarity</span>
            <span className={styles.logoAccent}>Lab</span>
          </span>
        </Link>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
