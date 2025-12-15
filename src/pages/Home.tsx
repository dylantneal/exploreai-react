import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Globe, Microscope } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import DataTicker from '../components/ui/DataTicker';
import styles from '../styles/pages/Home.module.css';

const FOCUS_AREAS = [
  {
    id: 'climate',
    title: 'Climate & Environment',
    icon: <Globe size={28} />,
    description: 'Atmospheric CO₂ concentrations, temperature anomalies, ice sheet dynamics, and extreme weather patterns, tracked from primary sources.',
    stat: '426 ppm',
    statLabel: 'Current CO₂',
    link: '/insights/climate-change',
  },
  {
    id: 'health',
    title: 'Global Health',
    icon: <Microscope size={28} />,
    description: 'Life expectancy trends, healthcare expenditure disparities, disease burden, and vaccination coverage across 190+ countries.',
    stat: '75 years',
    statLabel: 'Global life expectancy',
    link: '/insights/global-health',
  },
  {
    id: 'economics',
    title: 'World Economics',
    icon: <BarChart3 size={28} />,
    description: 'GDP growth, trade flows, employment dynamics, and inequality metrics. Analyzing economic systems beyond surface-level indicators.',
    stat: '$25T',
    statLabel: 'Annual global trade',
    link: '/insights/economic-systems',
  },
];


export default function Home() {
  return (
    <>
      <Hero
        title={
          <span className={styles.heroTitleWrapper}>
            <span className={styles.heroLogoPrimary}>Clarity</span>
            <span className={styles.heroLogoAccent}>Lab</span>
          </span>
        }
        subtitle="Quantitative research on climate, health, and economic systems"
        fullHeight
        staggeredAnimation
      >
        <DataTicker />
        <div className={styles.heroActions}>
          <Button to="/research" size="large">
            Explore Research <ArrowRight size={18} />
          </Button>
          <Button to="/about" variant="secondary" size="large">
            Our Methodology
          </Button>
        </div>
      </Hero>

      <Section title="Research Areas">
        <div className={styles.focusGrid}>
          {FOCUS_AREAS.map((area) => (
            <Link to={area.link} key={area.id} className={styles.focusCard}>
              <div className={styles.focusHeader}>
                <div className={styles.focusIcon}>{area.icon}</div>
                <div className={styles.focusStat}>
                  <span className={styles.statValue}>{area.stat}</span>
                  <span className={styles.statLabel}>{area.statLabel}</span>
                </div>
              </div>
              <h3 className={styles.focusTitle}>{area.title}</h3>
              <p className={styles.focusDescription}>{area.description}</p>
              <span className={styles.focusLink}>
                View Analysis <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section variant="dark">
        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>Collaborate</h2>
          <p className={styles.ctaText}>
            Data contributions, methodology feedback, and research partnerships welcome.
          </p>
          <Button to="/contact" size="large">
            Contact <ArrowRight size={18} />
          </Button>
        </div>
      </Section>
    </>
  );
}
