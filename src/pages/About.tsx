import { ArrowRight, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import { FOUNDED_YEAR, SITE_YEAR } from '../utils/constants';
import styles from '../styles/pages/About.module.css';

export default function About() {
  return (
    <>
      <Hero
        title="About"
        subtitle="How we work and why it matters"
      />

      <Section>
        <div className={styles.overview}>
          <h2>Mission</h2>
          <p className={styles.lead}>
            Clarity Lab produces quantitative research on the global systems that shape human 
            and planetary well-being. We work across climate, health, economics, demographics, 
            food, energy, biodiversity, education, and inequality, using primary data sources 
            and transparent, documented methodology.
          </p>
          <p>
            We take complex global data, analyze it rigorously, and present findings clearly. 
            All research is open access and built for verification. Our mission is to make 
            the evidence base for action as clear and accessible as possible.
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
                <p>We continue to update our analyses across all nine research areas with the latest data. Our work is built for educators, policymakers, and journalists who need clear, source-transparent analysis. Our mission remains the same: clarity through rigorous, open, source-transparent research.</p>
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
                Research draws exclusively from authoritative primary sources across all 
                domains: climate (NASA, NOAA), health and demographics (WHO, UN), economics 
                (World Bank, IMF, WTO), energy (IEA, IRENA), food (FAO), biodiversity, and 
                education. The full list appears below. Secondary aggregations are avoided 
                where possible.
              </p>
            </div>
            <div className={styles.methodCard}>
              <h3>Reproducibility</h3>
              <p>
                Every finding is independently verifiable using the linked source data. 
                Methodology is documented and published with each piece of research.
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

      <Section variant="dark">
        <div className={styles.sources}>
          <h2>Primary Data Sources</h2>
          <p className={styles.sourcesIntro}>
            All research draws from authoritative institutional sources.
            Secondary aggregations are avoided where possible.
          </p>
          <div className={styles.sourceColumns}>
            <div className={styles.sourceGroup}>
              <h3>Climate &amp; Environment</h3>
              <a href="https://climate.nasa.gov/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>NASA Climate <ExternalLink size={12} /></a>
              <a href="https://www.noaa.gov/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>NOAA <ExternalLink size={12} /></a>
              <a href="https://www.ipcc.ch/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>IPCC <ExternalLink size={12} /></a>
              <a href="https://nsidc.org/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>NSIDC <ExternalLink size={12} /></a>
            </div>
            <div className={styles.sourceGroup}>
              <h3>Health &amp; Demographics</h3>
              <a href="https://www.who.int/data" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>WHO <ExternalLink size={12} /></a>
              <a href="https://population.un.org/wpp/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>UN DESA <ExternalLink size={12} /></a>
              <a href="https://www.iom.int/data-and-research" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>IOM <ExternalLink size={12} /></a>
            </div>
            <div className={styles.sourceGroup}>
              <h3>Economics &amp; Inequality</h3>
              <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>World Bank <ExternalLink size={12} /></a>
              <a href="https://www.imf.org/en/Data" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>IMF <ExternalLink size={12} /></a>
              <a href="https://data.wto.org/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>WTO <ExternalLink size={12} /></a>
              <a href="https://wid.world/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>World Inequality Database <ExternalLink size={12} /></a>
              <a href="https://data.oecd.org/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>OECD <ExternalLink size={12} /></a>
            </div>
            <div className={styles.sourceGroup}>
              <h3>Energy &amp; Food</h3>
              <a href="https://www.iea.org/data-and-statistics" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>IEA <ExternalLink size={12} /></a>
              <a href="https://www.irena.org/Data" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>IRENA <ExternalLink size={12} /></a>
              <a href="https://www.fao.org/faostat/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>FAO <ExternalLink size={12} /></a>
            </div>
            <div className={styles.sourceGroup}>
              <h3>Biodiversity &amp; Education</h3>
              <a href="https://www.iucnredlist.org/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>IUCN Red List <ExternalLink size={12} /></a>
              <a href="https://www.worldwildlife.org/pages/living-planet-report-2024" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>WWF Living Planet <ExternalLink size={12} /></a>
              <a href="https://data.uis.unesco.org/" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>UNESCO UIS <ExternalLink size={12} /></a>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="alt">
        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>Explore the research</h2>
          <p className={styles.ctaText}>
            All analyses are open access with interactive charts, methodology notes, and links to source data.
          </p>
          <Button to="/research" size="large">
            View Research <ArrowRight size={18} />
          </Button>
        </div>
      </Section>
    </>
  );
}
