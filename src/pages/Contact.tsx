import { Mail } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import { SOCIAL_LINKS } from '../utils/constants';
import styles from '../styles/pages/Contact.module.css';

export default function Contact() {
  return (
    <>
      <Hero
        title="Contact"
        subtitle="Collaboration, feedback, and inquiries"
      />

      <Section>
        <div className={styles.contactGrid}>
          <div className={styles.channels}>
            <h2>Contact</h2>
            <p className={styles.channelsIntro}>
              For all inquiries, including media, partnerships, and methodology requests, 
              contact us by email. We typically respond within 2 to 3 business days.
            </p>
            
            <a href={`mailto:${SOCIAL_LINKS.email}`} className={styles.channel}>
              <div className={styles.channelIcon}>
                <Mail size={22} />
              </div>
              <div className={styles.channelInfo}>
                <h3>Email</h3>
                <p>{SOCIAL_LINKS.email}</p>
                <span className={styles.channelMeta}>General inquiries, partnerships, media, methodology</span>
              </div>
            </a>
          </div>

          <div className={styles.inquiries}>
            <h2>Inquiry Types</h2>
            
            <div className={styles.inquiryList}>
              <div className={styles.inquiry}>
                <h3>Methodology Feedback</h3>
                <p>
                  Comments on analytical methods, statistical approaches, or 
                  data interpretation.
                </p>
              </div>

              <div className={styles.inquiry}>
                <h3>Error Reports</h3>
                <p>
                  Identification of data errors, calculation mistakes, or 
                  incorrect source citations.
                </p>
              </div>

              <div className={styles.inquiry}>
                <h3>Data Sources</h3>
                <p>
                  Suggestions for authoritative data sources or datasets 
                  relevant to current research areas.
                </p>
              </div>

              <div className={styles.inquiry}>
                <h3>Research Collaboration</h3>
                <p>
                  Proposals for joint research, data sharing, or 
                  methodological partnerships.
                </p>
              </div>

              <div className={styles.inquiry}>
                <h3>Media & Speaking</h3>
                <p>
                  Requests for interviews, commentary, or speaking 
                  engagements. We can provide data context and source citations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
