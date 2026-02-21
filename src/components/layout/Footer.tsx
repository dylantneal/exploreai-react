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

          <div className={styles.linkGroup}>
            <h4>Research</h4>
            <ul>
              <li><Link to="/insights/climate-change">Climate & Environment</Link></li>
              <li><Link to="/insights/global-health">Global Health</Link></li>
              <li><Link to="/insights/economic-systems">World Economics</Link></li>
              <li><Link to="/insights/demographics">Demographics</Link></li>
              <li><Link to="/insights/food-agriculture">Food & Agriculture</Link></li>
              <li><Link to="/insights/energy-systems">Energy Systems</Link></li>
              <li><Link to="/insights/biodiversity-ecosystems">Biodiversity & Ecosystems</Link></li>
              <li><Link to="/insights/education-human-capital">Education & Human Capital</Link></li>
              <li><Link to="/insights/inequality-inclusive-growth">Inequality & Inclusive Growth</Link></li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>About</h4>
            <ul>
              <li><Link to="/about">Our Mission</Link></li>
              <li><Link to="/research">All Research</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/contact#commission">Commission Research</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className={styles.footerEmail}>
                  <Mail size={14} />
                  {SOCIAL_LINKS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {FOUNDED_YEAR}&ndash;{SITE_YEAR} {SITE_NAME}. Open research for humanity.
          </p>
        </div>
      </div>
    </footer>
  );
}
