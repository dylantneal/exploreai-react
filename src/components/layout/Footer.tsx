import { Link } from 'react-router-dom';
import { Github, Mail, MessageCircle } from 'lucide-react';
import { SITE_NAME, SITE_YEAR, SOCIAL_LINKS } from '../../utils/constants';
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
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>Research</h4>
              <ul>
                <li><Link to="/insights/climate-change">Climate & Environment</Link></li>
                <li><Link to="/insights/global-health">Global Health</Link></li>
                <li><Link to="/insights/economic-systems">World Economics</Link></li>
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
            <h4>Connect</h4>
            <div className={styles.socialLinks}>
              <a href={`mailto:${SOCIAL_LINKS.email}`} aria-label="Email">
                <Mail size={20} />
              </a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {SITE_YEAR} {SITE_NAME}. Open research for humanity.
          </p>
        </div>
      </div>
    </footer>
  );
}
