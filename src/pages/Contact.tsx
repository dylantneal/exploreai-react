import { Mail, Github, MessageCircle } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
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
            <h2>Contact Channels</h2>
            
            <a href="mailto:contact@clarity-lab.net" className={styles.channel}>
              <div className={styles.channelIcon}>
                <Mail size={22} />
              </div>
              <div className={styles.channelInfo}>
                <h3>Email</h3>
                <p>contact@clarity-lab.net</p>
              </div>
            </a>

            <a 
              href="https://github.com/dylantneal" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.channel}
            >
              <div className={styles.channelIcon}>
                <Github size={22} />
              </div>
              <div className={styles.channelInfo}>
                <h3>GitHub</h3>
                <p>Code repositories and issue tracking</p>
              </div>
            </a>

            <a 
              href="https://discord.gg/qffBtcYX" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.channel}
            >
              <div className={styles.channelIcon}>
                <MessageCircle size={22} />
              </div>
              <div className={styles.channelInfo}>
                <h3>Discord</h3>
                <p>Community discussion</p>
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
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
