import { ExternalLink } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import { FOUNDED_YEAR, SITE_YEAR } from '../utils/constants';
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
          </p>
        </div>
      </Section>

      <Section variant="alt">
        <div className={styles.story}>
          <h2>Our Story</h2>
          <ul className={styles.timeline}>
            <li>
              <span className={styles.timelineYear}>{FOUNDED_YEAR}</span>
              <div className={styles.timelineContent}>
                <h3>Founded</h3>
                <p>Clarity Lab was established as an independent research initiative focused on climate and environmental data. From the start we committed to primary sources only, open methodology, and clear communication of uncertainty. Those same principles still guide us today.</p>
              </div>
            </li>
            <li>
              <span className={styles.timelineYear}>2023</span>
              <div className={styles.timelineContent}>
                <h3>Expanded scope</h3>
                <p>We extended our work into global health and economic systems, applying the same rigorous, source-led approach. Every analysis continued to draw from authoritative institutions (WHO, World Bank, IMF, WTO) with full transparency and reproducibility.</p>
              </div>
            </li>
            <li>
              <span className={styles.timelineYear}>2024</span>
              <div className={styles.timelineContent}>
                <h3>Public platform</h3>
                <p>We launched our public research platform so that analyses and visualizations could be freely available to everyone. Interactive charts, methodology notes, and direct links to source data became the standard for every publication.</p>
              </div>
            </li>
            <li>
              <span className={styles.timelineYear}>2025–{SITE_YEAR}</span>
              <div className={styles.timelineContent}>
                <h3>Ongoing research</h3>
                <p>We continue to update our climate, health, and economics analyses with the latest data. Our work is cited by educators, used in policy discussions, and referenced by news organizations. Our mission remains the same: clarity through rigorous, open, source-transparent research.</p>
              </div>
            </li>
          </ul>
        </div>
      </Section>

      <Section>
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
                Any finding should be independently verifiable using the linked source data. 
                Methodology is available on request.
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

      <Section variant="alt">
        <div className={styles.team}>
          <h2>Our Team</h2>
          <p className={styles.teamIntro}>
            Clarity Lab is run by a small team of researchers and engineers who share a commitment 
            to rigorous, source-transparent analysis. We work with advisors and external reviewers 
            on methodology and interpretation.
          </p>
          <div className={styles.teamCard}>
            <h3>Dylan Neal</h3>
            <p className={styles.role}>Founder & Lead Researcher</p>
            <p>
              Leads research design, data analysis, and publication. Background in software engineering 
              and data systems; Master's in Software Engineering (DePaul). Ensures all outputs meet 
              our standards for source quality, reproducibility, and clear communication of uncertainty.
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
