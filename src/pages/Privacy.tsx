import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import { SITE_NAME } from '../utils/constants';
import styles from '../styles/pages/Privacy.module.css';

export default function Privacy() {
  return (
    <>
      <Hero
        title="Privacy"
        subtitle="How we handle your information"
      />

      <Section>
        <div className={styles.content}>
          <p className={styles.lead}>
            {SITE_NAME} does not collect personal data through this website beyond what your browser
            sends by default (such as IP address and basic request data). We do not use tracking
            cookies or third-party analytics that identify you.
          </p>

          <h2>Contact and correspondence</h2>
          <p>
            If you email us, we use your address and message only to respond. We do not add you to
            mailing lists or share your details with third parties unless required by law.
          </p>

          <h2>Research and published work</h2>
          <p>
            Our research uses publicly available data from sources such as NASA, WHO, and the World
            Bank. We do not collect or process personal data for our analyses. Charts and figures
            on this site are based on aggregated, anonymized datasets.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this page from time to time. The date of the last update will be shown
            below. Continued use of the site after changes constitutes acceptance of the updated
            policy.
          </p>

          <p className={styles.updated}>
            Last updated: February 2026
          </p>
        </div>
      </Section>
    </>
  );
}
