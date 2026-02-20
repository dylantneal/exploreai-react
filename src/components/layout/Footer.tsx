import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { SITE_NAME, SITE_YEAR, FOUNDED_YEAR, SOCIAL_LINKS } from '../../utils/constants';
import styles from '../../styles/components/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.footerLogo}>{SITE_NAME}</Link>
            <p className={styles.footerTagline}>
              Data-driven clarity on the world's biggest challenges
            </p>
            <p className={styles.footerFounded}>
              Independent research since {FOUNDED_YEAR}.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>Research</h4>
              <ul>
                <li><Link to="/insights/climate-change">Climate & Environment</Link></li>
                <li><Link to="/insights/global-health">Global Health</Link></li>
                <li><Link to="/insights/economic-systems">World Economics</Link></li>
                <li><Link to="/insights/demographics">Demographics & Population</Link></li>
                <li><Link to="/insights/food-agriculture">Food & Agriculture</Link></li>
                <li><Link to="/insights/energy-systems">Energy Systems</Link></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4>About</h4>
              <ul>
                <li><Link to="/about">Our Mission</Link></li>
                <li><Link to="/research">Research Areas</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerSocial}>
            <h4>Contact</h4>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className={styles.footerEmail}>
              <Mail size={18} />
              {SOCIAL_LINKS.email}
            </a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {FOUNDED_YEAR}&ndash;{SITE_YEAR} {SITE_NAME}. Open research for humanity.
          </p>
          <nav className={styles.footerLegal} aria-label="Legal">
            <Link to="/privacy">Privacy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
