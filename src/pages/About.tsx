import { ExternalLink } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import styles from '../styles/pages/About.module.css';

export default function About() {
  return (
    <>
      <Hero
        title="About"
        subtitle="Mission, methodology, and principles"
      />

      <Section>
        <div className={styles.overview}>
          <h2>Mission</h2>
          <p className={styles.lead}>
            Clarity Lab produces quantitative research on global systems (climate, health, 
            and economics) using primary data sources and transparent methodology.
          </p>
          <p>
            The objective is straightforward: take complex global data, analyze it rigorously, 
            and present findings clearly. All research is open access. All methodology is documented. 
            All code is available for review.
          </p>
        </div>
      </Section>

      <Section variant="alt">
        <div className={styles.methodology}>
          <h2>Methodology</h2>
          <div className={styles.methodGrid}>
            <div className={styles.methodCard}>
              <h3>Data Sources</h3>
              <p>
                Research draws exclusively from authoritative primary sources: NASA and NOAA 
                for climate data, WHO and World Bank for health metrics, IMF and WTO for 
                economic indicators. Secondary aggregations are avoided where possible.
              </p>
            </div>
            <div className={styles.methodCard}>
              <h3>Reproducibility</h3>
              <p>
                Analysis code is published on GitHub. Data transformations and statistical 
                methods are documented. Any finding should be independently verifiable using 
                the linked source data.
              </p>
            </div>
            <div className={styles.methodCard}>
              <h3>Uncertainty</h3>
              <p>
                Research acknowledges data limitations, confidence intervals, and areas of 
                genuine uncertainty. Conclusions are scoped appropriately to what the data 
                actually supports.
              </p>
            </div>
            <div className={styles.methodCard}>
              <h3>Corrections</h3>
              <p>
                Errors, when identified, are corrected promptly and transparently. 
                Feedback on methodology and analysis is welcomed and reviewed.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className={styles.team}>
          <h2>Team</h2>
          <div className={styles.teamCard}>
            <h3>Dylan Neal</h3>
            <p className={styles.role}>Founder & Lead Researcher</p>
            <p>
              Software engineer with a Master's degree in Software Engineering from 
              DePaul University. Background in software development, data engineering, 
              and machine learning systems.
            </p>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className={styles.sources}>
          <h2>Primary Data Sources</h2>
          <div className={styles.sourceGrid}>
            <a href="https://climate.nasa.gov/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
              NASA Climate <ExternalLink size={14} />
            </a>
            <a href="https://www.noaa.gov/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
              NOAA <ExternalLink size={14} />
            </a>
            <a href="https://www.who.int/data" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
              World Health Organization <ExternalLink size={14} />
            </a>
            <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
              World Bank <ExternalLink size={14} />
            </a>
            <a href="https://www.imf.org/en/Data" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
              IMF <ExternalLink size={14} />
            </a>
            <a href="https://nsidc.org/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
              NSIDC <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
