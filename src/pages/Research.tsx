import { Link } from 'react-router-dom';
import { 
  ArrowRight, Globe, Microscope, BarChart3, Users, Wheat, Zap,
  TrendingUp, AlertTriangle, Lightbulb, Clock
} from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import styles from '../styles/pages/Research.module.css';

// Key findings from each research area
const HEADLINE_STATS = [
  { value: '+1.28°C', label: 'Global warming since pre-industrial era', icon: <TrendingUp size={20} /> },
  { value: '28 yrs', label: 'Life expectancy gained since 1950', icon: <TrendingUp size={20} /> },
  { value: '$25T', label: 'Annual global trade volume', icon: <TrendingUp size={20} /> },
  { value: '8.2B', label: 'Global population', icon: <Users size={20} /> },
  { value: '735M', label: 'Facing hunger (FAO 2022)', icon: <Wheat size={20} /> },
  { value: '~90%', label: 'New power capacity from renewables', icon: <Zap size={20} /> },
];

const KEY_FINDINGS = [
  {
    area: 'Climate',
    icon: <Globe size={20} />,
    color: '#00BFFF',
    findings: [
      'CO₂ at 426 ppm, the highest level in 3 million years',
      'At current rates, 1.5°C carbon budget exhausted in ~5 years',
      'Acting on climate costs $4T/year; not acting costs $52T/year',
      'Renewables now cheaper than fossil fuels in most markets',
    ],
    link: '/insights/climate-change',
  },
  {
    area: 'Health',
    icon: <Microscope size={20} />,
    color: '#27AE60',
    findings: [
      'Global life expectancy rose from 47 (1950) to 75 years (2024)',
      'Healthcare spending varies 100× between richest and poorest regions',
      'Vaccination coverage plateaued at 85% and is now declining',
      'Pandemic disruptions reversed years of infectious disease progress',
    ],
    link: '/insights/global-health',
  },
  {
    area: 'Economics',
    icon: <BarChart3 size={20} />,
    color: '#9B59B6',
    findings: [
      '2020 saw largest single-year GDP contraction (-3.1%) in modern history',
      'Global trade has grown 5× since 2000',
      'E-commerce now 22% of retail, up from 7% in 2015',
      'Labor markets recovered but structural shifts continue',
    ],
    link: '/insights/economic-systems',
  },
  {
    area: 'Demographics',
    icon: <Users size={20} />,
    color: '#E67E22',
    findings: [
      'Global population reached 8.2 billion in 2024, doubling since 1974',
      'Share aged 65+ is 10% globally and rising; Japan and Europe lead',
      'Half of all countries have fertility below replacement level (2.1)',
      'International migrant stock: 281 million, with 123 million displaced',
    ],
    link: '/insights/demographics',
  },
  {
    area: 'Food & Agriculture',
    icon: <Wheat size={20} />,
    color: '#2ECC71',
    findings: [
      '735 million people faced hunger in 2022; progress reversed after COVID',
      'Cereal yields have doubled since 1960 but growth is slowing',
      'Agriculture accounts for about 22% of global GHG emissions',
      'Climate change is already reducing yields in many regions (IPCC)',
    ],
    link: '/insights/food-agriculture',
  },
  {
    area: 'Energy Systems',
    icon: <Zap size={20} />,
    color: '#F1C40F',
    findings: [
      'Primary energy is still ~80% fossil; transition is accelerating',
      'Renewables accounted for >90% of new power capacity added globally',
      'About 760 million people still lack electricity access',
      'Critical minerals demand for batteries and grids is surging (IEA)',
    ],
    link: '/insights/energy-systems',
  },
];

const BIG_PICTURE = [
  {
    icon: <AlertTriangle size={24} />,
    title: 'Converging Crises',
    text: 'Climate change, health inequity, and economic instability are interconnected. A pandemic disrupts vaccination programs; climate change amplifies health risks; economic shocks hit the most vulnerable hardest.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Progress Is Possible',
    text: 'Life expectancy rose 60% in 75 years. Renewables are scaling rapidly. Extreme poverty fell 75% since 1990. The data shows that focused investment and policy action produce measurable results.',
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Action Beats Inaction',
    text: 'The economics are clear: prevention costs less than remediation. Climate action returns $13 for every $1 invested. Vaccines are among the highest-ROI interventions in history.',
  },
];

const PROJECTS = [
  {
    title: 'Climate Indicators',
    focusArea: 'Climate & Environment',
    icon: <Globe size={24} />,
    description: 'Comprehensive analysis of atmospheric CO₂, temperature anomalies, ice sheet dynamics, sea level rise, and tipping points. Tracking the evidence from 1880 to present.',
    status: 'active' as const,
    chartCount: 15,
    sources: ['NASA', 'NOAA', 'IPCC'],
    link: '/insights/climate-change',
  },
  {
    title: 'Health Disparities',
    focusArea: 'Global Health',
    icon: <Microscope size={24} />,
    description: 'Analysis of life expectancy, healthcare spending, disease burden, and vaccination coverage. Examining why health outcomes vary so dramatically across regions.',
    status: 'active' as const,
    chartCount: 4,
    sources: ['WHO', 'World Bank', 'UNICEF'],
    link: '/insights/global-health',
  },
  {
    title: 'Economic Systems',
    focusArea: 'World Economics',
    icon: <BarChart3 size={24} />,
    description: 'GDP growth patterns, trade flows, employment dynamics, and digital transformation. Understanding the forces shaping global prosperity.',
    status: 'active' as const,
    chartCount: 4,
    sources: ['World Bank', 'IMF', 'WTO'],
    link: '/insights/economic-systems',
  },
  {
    title: 'Demographics & Population',
    focusArea: 'Demographics & Population',
    icon: <Users size={24} />,
    description: 'Population size and growth, aging, fertility, urbanization, and migration. Analysis from UN World Population Prospects, UNPD, and IOM.',
    status: 'active' as const,
    chartCount: 10,
    sources: ['UN DESA', 'UNPD', 'IOM'],
    link: '/insights/demographics',
  },
  {
    title: 'Food & Agriculture',
    focusArea: 'Food & Agriculture',
    icon: <Wheat size={24} />,
    description: 'Undernourishment, crop yields, land use, fertilizer, fisheries, food prices, and climate impact. Analysis from FAO, IFPRI, World Bank, and IPCC.',
    status: 'active' as const,
    chartCount: 10,
    sources: ['FAO', 'IFPRI', 'World Bank', 'IPCC'],
    link: '/insights/food-agriculture',
  },
  {
    title: 'Energy Systems',
    focusArea: 'Energy Systems',
    icon: <Zap size={24} />,
    description: 'Primary energy mix, electricity by source, fossil phase-out, energy access, and critical minerals. Analysis from IEA, IRENA, BP, and World Bank.',
    status: 'active' as const,
    chartCount: 10,
    sources: ['IEA', 'IRENA', 'BP', 'World Bank'],
    link: '/insights/energy-systems',
  },
];

export default function Research() {
  return (
    <>
      <Hero
        title="Research"
        subtitle="Data-driven analysis of the world's biggest challenges"
      />

      {/* Headline Stats */}
      <div className={styles.headlineStats}>
        {HEADLINE_STATS.map((stat) => (
          <div key={stat.label} className={styles.headlineStat}>
            <span className={styles.headlineIcon}>{stat.icon}</span>
            <span className={styles.headlineValue}>{stat.value}</span>
            <span className={styles.headlineLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Key Findings by Area */}
      <Section title="What the Data Shows">
        <div className={styles.findingsGrid}>
          {KEY_FINDINGS.map((area) => (
            <div key={area.area} className={styles.findingsCard}>
              <div className={styles.findingsHeader} style={{ borderLeftColor: area.color }}>
                <span className={styles.findingsIcon} style={{ color: area.color }}>{area.icon}</span>
                <h3 className={styles.findingsTitle}>{area.area}</h3>
              </div>
              <ul className={styles.findingsList}>
                {area.findings.map((finding, i) => (
                  <li key={i}>{finding}</li>
                ))}
              </ul>
              <Link to={area.link} className={styles.findingsLink}>
                Full Analysis <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Big Picture */}
      <Section variant="dark" title="The Big Picture">
        <div className={styles.bigPictureGrid}>
          {BIG_PICTURE.map((item) => (
            <div key={item.title} className={styles.bigPictureCard}>
              <div className={styles.bigPictureIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Research Projects */}
      <Section title="Research Projects">
        <div className={styles.projectsGrid}>
          {PROJECTS.map((project) => (
            <article key={project.title} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <div className={styles.projectIcon}>{project.icon}</div>
                <span className={styles.statusBadge}>
                  <Clock size={14} /> Active
                </span>
              </div>
              
              <span className={styles.focusArea}>{project.focusArea}</span>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.projectMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaValue}>{project.chartCount}</span>
                  <span className={styles.metaLabel}>Charts</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaValue}>{project.sources.length}</span>
                  <span className={styles.metaLabel}>Sources</span>
                </div>
              </div>

              <div className={styles.sources}>
                {project.sources.map((source) => (
                  <span key={source} className={styles.sourceTag}>{source}</span>
                ))}
              </div>

              <Link to={project.link} className={styles.projectLink}>
                View Analysis <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* Methodology */}
      <Section variant="alt">
        <div className={styles.process}>
          <h2>Our Process</h2>
          <p className={styles.processIntro}>
            Every analysis follows the same rigorous methodology to ensure accuracy and reproducibility.
          </p>
          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <span className={styles.stepNumber}>1</span>
              <h3>Primary Sources</h3>
              <p>Data from authoritative institutions: NASA, WHO, World Bank, NOAA. We verify provenance and methodology.</p>
            </div>
            <div className={styles.processStep}>
              <span className={styles.stepNumber}>2</span>
              <h3>Rigorous Analysis</h3>
              <p>Statistical methods appropriate to the data. All transformations documented. Uncertainties quantified.</p>
            </div>
            <div className={styles.processStep}>
              <span className={styles.stepNumber}>3</span>
              <h3>Clear Visualization</h3>
              <p>Interactive charts linked to source data. Complex findings presented accessibly.</p>
            </div>
            <div className={styles.processStep}>
              <span className={styles.stepNumber}>4</span>
              <h3>Open Publication</h3>
              <p>Full methodology disclosed. Independent verification welcomed.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
