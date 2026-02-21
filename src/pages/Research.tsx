import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ArrowUpRight, ArrowDownRight, Minus,
  Globe, Microscope, BarChart3, Users, Wheat, Zap, TreePine, GraduationCap, Scale,
  TrendingUp, AlertTriangle, Lightbulb
} from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import styles from '../styles/pages/Research.module.css';

const HEADLINE_STATS = [
  {
    topic: 'Climate & Environment',
    value: '+1.28°C',
    label: 'Global warming since pre-industrial era',
    context: 'vs. ~0°C in 1880; 2024 was the hottest year on record',
    icon: <TrendingUp size={20} />,
  },
  {
    topic: 'Global Health',
    value: '28 yrs',
    label: 'Life expectancy gained since 1950',
    context: 'from 47 years to 75 years; progress now at risk of stalling',
    icon: <TrendingUp size={20} />,
  },
  {
    topic: 'World Economics',
    value: '$25T',
    label: 'Annual global trade volume',
    context: 'grown 5× since 2000; now the backbone of global prosperity',
    icon: <TrendingUp size={20} />,
  },
  {
    topic: 'Demographics & Population',
    value: '8.2B',
    label: 'Global population',
    context: 'doubled since 1974; growth slowing as fertility falls worldwide',
    icon: <Users size={20} />,
  },
  {
    topic: 'Food & Agriculture',
    value: '735M',
    label: 'Facing hunger (FAO 2022)',
    context: 'a reversal of progress; COVID and conflict drove the increase',
    icon: <Wheat size={20} />,
  },
  {
    topic: 'Energy Systems',
    value: '~90%',
    label: 'New power capacity from renewables',
    context: 'solar and wind now cheaper than new fossil fuel plants in most markets',
    icon: <Zap size={20} />,
  },
  {
    topic: 'Biodiversity & Ecosystems',
    value: '−69%',
    label: 'Wildlife population decline since 1970',
    context: 'monitored vertebrate populations; driven by habitat loss and climate',
    icon: <TreePine size={20} />,
  },
  {
    topic: 'Education & Human Capital',
    value: '250M',
    label: 'Children and youth out of school',
    context: 'UNESCO 2022; 70% of 10-year-olds in developing countries cannot read',
    icon: <GraduationCap size={20} />,
  },
  {
    topic: 'Inequality & Inclusive Growth',
    value: '52%',
    label: 'Global income taken by top 10%',
    context: 'bottom 50% receive just 8.5%; the gap has widened in most regions',
    icon: <Scale size={20} />,
  },
];

const KEY_FINDINGS = [
  {
    area: 'Climate',
    icon: <Globe size={20} />,
    color: '#00BFFF',
    situation: "Earth's atmosphere has crossed 426 ppm CO₂, the highest concentration in 3 million years. The resulting +1.28°C of global warming is accelerating ice loss, sea level rise, and the frequency of extreme weather events. The window to limit warming to 1.5°C is closing rapidly, but the energy transition is also moving faster than any comparable shift in history, with renewables now at cost parity or below in most markets.",
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
    situation: "Global health has made extraordinary progress over 75 years: life expectancy nearly doubled, child mortality plummeted, and infectious disease was brought under control in many regions. That progress is now under pressure. The COVID-19 pandemic reversed vaccination gains, disrupted essential health services, and widened the already stark gap between healthcare systems in wealthy and low-income nations.",
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
    situation: "The global economy has grown substantially over the past three decades, with trade expanding fivefold and hundreds of millions lifted out of poverty. But that growth has been uneven and fragile. The 2020 contraction, the largest in modern recorded history, exposed deep structural vulnerabilities, while ongoing shifts in labor markets, supply chains, and digital commerce are redrawing the map of global economic activity.",
    findings: [
      '2020 saw largest single-year GDP contraction (−3.1%) in modern history',
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
    situation: "The world's population reached 8.2 billion in 2024, representing a doubling in just 50 years, but demographic momentum is shifting. Fertility has fallen below replacement level in half of all countries, while the share of people over 65 is rising steadily. These trends are creating divergent pressures: aging societies in Europe and East Asia face shrinking workforces, while parts of Sub-Saharan Africa manage rapid population growth and expanding youth cohorts.",
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
    situation: "Humanity has roughly doubled cereal yields since 1960, a triumph of agricultural science and sustained investment. Yet 735 million people still faced hunger in 2022, a number that rose sharply after COVID disrupted food systems, supply chains, and aid flows. Climate change is now emerging as a direct threat to yields in the most food-insecure regions, while agriculture itself accounts for about 22% of global greenhouse gas emissions.",
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
    situation: "The global energy system is in the early stages of a historic transition. Fossil fuels still account for roughly 80% of primary energy, but renewables are now the dominant source of new electricity capacity, accounting for over 90% of additions in recent years. The central challenge is speed: an estimated 760 million people still lack electricity access, and critical mineral supply chains must scale dramatically to support battery storage and grid expansion.",
    findings: [
      'Primary energy is still ~80% fossil; transition is accelerating',
      'Renewables accounted for >90% of new power capacity added globally',
      'About 760 million people still lack electricity access',
      'Critical minerals demand for batteries and grids is surging (IEA)',
    ],
    link: '/insights/energy-systems',
  },
  {
    area: 'Biodiversity',
    icon: <TreePine size={20} />,
    color: '#16A085',
    situation: "Earth is experiencing its sixth mass extinction event, driven almost entirely by human activity. Monitored wildlife populations have declined by an average of 69% since 1970, a rate of loss roughly 1,000 times the natural baseline. Habitat destruction, agricultural expansion, pollution, invasive species, and accelerating climate change are the primary drivers. The Kunming-Montreal Global Biodiversity Framework (2022) set a target of protecting 30% of land and ocean by 2030; current coverage falls well short.",
    findings: [
      'Monitored wildlife populations declined 69% on average since 1970 (WWF)',
      'Over 44,000 species are threatened with extinction on the IUCN Red List',
      'Protected areas cover 17% of land and 8% of oceans, short of the 30×30 target',
      'Global ecosystem services are valued at ~$125 trillion per year (Costanza et al.)',
    ],
    link: '/insights/biodiversity-ecosystems',
  },
  {
    area: 'Education',
    icon: <GraduationCap size={20} />,
    color: '#2980B9',
    situation: "Education is the clearest pathway to long-run human development, yet access and quality remain deeply unequal. More than 250 million children and young people are out of school, and enrollment alone does not guarantee learning: 70% of 10-year-olds in developing countries cannot read a basic text. The COVID-19 pandemic caused the largest disruption to schooling in a century, and PISA 2022 results showed the steepest recorded decline in math performance, signaling that years of learning gains have been lost.",
    findings: [
      '250 million children and youth are out of school globally (UNESCO 2022)',
      '70% of 10-year-olds in developing countries cannot read a simple text',
      "PISA 2022 recorded the steepest math score decline in the programme's history",
      'Per-pupil spending varies nearly 200× between low- and high-income countries',
    ],
    link: '/insights/education-human-capital',
  },
  {
    area: 'Inequality',
    icon: <Scale size={20} />,
    color: '#D35400',
    situation: "Economic inequality remains one of the defining challenges of the 21st century. The top 10% of earners capture 52% of global income, while the bottom 50% share just 8.5%, a distribution that has remained persistently skewed despite decades of growth. Extreme poverty has fallen dramatically since 1990, from 38% to 8.6%, but 692 million people still live below the poverty line. Gender, geography, and intergenerational mobility gaps mean that inequality is not simply an economic issue but a structural constraint on development across all other domains.",
    findings: [
      'Top 10% earners take 52% of global income; bottom 50% get just 8.5% (WID)',
      'The top 1% owns 38% of global wealth; bottom 50% owns about 2%',
      'Extreme poverty fell from 38% to 8.6% since 1990, but 692 million remain',
      'Women earn ~20% less than men globally; the gap persists in every country',
    ],
    link: '/insights/inequality-inclusive-growth',
  },
];

const SYNTHESIS = [
  "Taken together, the nine research areas on this page describe a world that is simultaneously advancing and under stress. Life expectancy is at an all-time high. Extreme poverty has fallen by more than three-quarters since 1990. Renewable energy is growing faster than any power source in history. These are genuine, measurable achievements, the product of sustained investment, scientific progress, and international cooperation. The data does not support pessimism as a baseline.",
  "At the same time, the structural risks are real and interconnected. The +1.28°C of warming already recorded is not an isolated physical fact: it amplifies food insecurity, displaces populations, threatens the ecosystems on which agriculture depends, and disproportionately burdens the countries least responsible and least equipped to adapt. The 69% decline in monitored wildlife populations and the 735 million facing hunger are symptoms of the same underlying pressures: land use, energy systems, and economic structures that have not yet been fully realigned with long-run sustainability. Inequality compounds every other risk: the bottom 50% of earners, who receive just 8.5% of global income, bear the greatest exposure to climate, health, and food shocks while having the least capacity to absorb them.",
  "The evidence consistently shows that action is both feasible and economically rational. Climate investment that costs $4 trillion per year avoids $52 trillion in damages. Vaccination programs return more per dollar than almost any other health intervention. Education spending in low-income countries produces returns that outpace nearly every alternative investment in human capital. The purpose of this research is not to document inevitability; it is to make the data accessible, clearly sourced, and contextualized, so that the case for evidence-based action is as clear as possible.",
];

const SYNTHESIS_NOTE = 'February 2026. Figures drawn from the nine active research areas above; primary sources listed in each full analysis.';

const BIG_PICTURE = [
  {
    icon: <AlertTriangle size={24} />,
    title: 'Converging Crises',
    text: 'The +1.28°C of recorded warming, a 69% decline in wildlife populations since 1970, and 735 million people facing hunger are not separate problems; they share root causes in land use, energy systems, and economic inequality. A pandemic disrupts vaccination programs; climate change reduces crop yields and displaces populations; economic shocks fall hardest on the 692 million still living in extreme poverty. These crises do not resolve independently.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Progress Is Possible',
    text: 'The data is clear that sustained effort produces measurable results. Life expectancy rose 28 years between 1950 and 2024. Extreme poverty fell from 38% to 8.6% since 1990. Renewables now account for over 90% of new electricity capacity added globally. These outcomes did not happen by chance; they reflect deliberate investment, international coordination, and policy frameworks that held. The same approach scales.',
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Action Beats Inaction',
    text: 'Prevention consistently costs less than remediation. Climate action at $4 trillion per year averts an estimated $52 trillion in economic damage, a 13-to-1 return on investment. Childhood vaccination is among the highest-ROI health interventions ever documented. Education spending in low-income countries generates economic returns that outpace most alternatives. The cost of delay in each of these domains compounds annually.',
  },
];

// ============================================
// WHERE WE STAND — 1990 vs. 2024
// One flagship metric per research area.
// All values from authoritative primary sources.
// ============================================

type IndicatorDirection = 'improving' | 'worsening' | 'mixed' | 'stagnant';

interface Indicator {
  domain: string;
  icon: React.ReactNode;
  then: string;
  now: string;
  unit: string;
  direction: IndicatorDirection;
  context: string;
  source: string;
}

const INDICATORS: Indicator[] = [
  {
    domain: 'Life Expectancy',
    icon: <Microscope size={20} />,
    then: '64.2',
    now: '75.0',
    unit: 'years',
    direction: 'improving',
    context: 'Steady gains across all regions; COVID caused a brief dip in 2020-21, now recovered',
    source: 'WHO 2025',
  },
  {
    domain: 'Extreme Poverty',
    icon: <BarChart3 size={20} />,
    then: '37.8%',
    now: '8.5%',
    unit: 'of world population',
    direction: 'improving',
    context: 'More than a billion people lifted above the poverty line since 1990',
    source: 'World Bank 2025 est.',
  },
  {
    domain: 'Renewable Energy',
    icon: <Zap size={20} />,
    then: '754 GW',
    now: '~5,200 GW',
    unit: 'installed capacity',
    direction: 'improving',
    context: 'Nearly sevenfold growth; now cheaper than new fossil plants in most markets',
    source: 'IRENA 2025 est.',
  },
  {
    domain: 'School Completion',
    icon: <GraduationCap size={20} />,
    then: '~73%',
    now: '~90%',
    unit: 'primary completion rate',
    direction: 'improving',
    context: 'Enrollment up sharply, but learning quality remains deeply unequal',
    source: 'UNESCO UIS 2024',
  },
  {
    domain: 'Atmospheric CO₂',
    icon: <Globe size={20} />,
    then: '354 ppm',
    now: '427 ppm',
    unit: 'concentration',
    direction: 'worsening',
    context: 'Highest level in 3 million years; annual emissions still rising globally',
    source: 'NOAA Mauna Loa 2025',
  },
  {
    domain: 'Global Temperature',
    icon: <Globe size={20} />,
    then: '+0.45°C',
    now: '+1.21°C',
    unit: 'anomaly vs. 1951-80',
    direction: 'worsening',
    context: '2024 was the hottest year on record at +1.28°C; 2025 slightly lower but still extreme',
    source: 'NASA GISTEMP 2025',
  },
  {
    domain: 'Wildlife Populations',
    icon: <TreePine size={20} />,
    then: '56',
    now: '~31',
    unit: 'index (1970 = 100)',
    direction: 'worsening',
    context: 'Monitored vertebrate populations roughly halved in three decades',
    source: 'WWF Living Planet 2024',
  },
  {
    domain: 'Hunger',
    icon: <Wheat size={20} />,
    then: '~1.01B',
    now: '~733M',
    unit: 'undernourished',
    direction: 'mixed',
    context: 'Fell to ~590M by 2015, then reversed; conflict, climate, and cost pressures persist',
    source: 'FAO SOFI 2025',
  },
  {
    domain: 'Income Inequality',
    icon: <Scale size={20} />,
    then: '51.8%',
    now: '52.0%',
    unit: 'top 10% income share',
    direction: 'stagnant',
    context: 'Near-flat for decades despite rapid GDP growth; a structural condition',
    source: 'World Inequality Database 2025',
  },
];

const DIRECTION_CONFIG = {
  improving: { label: 'Improving', icon: <ArrowUpRight size={14} /> },
  worsening: { label: 'Worsening', icon: <ArrowDownRight size={14} /> },
  mixed:     { label: 'Mixed',     icon: <ArrowRight size={14} /> },
  stagnant:  { label: 'Stagnant',  icon: <Minus size={14} /> },
};

const directionCounts = INDICATORS.reduce(
  (acc, ind) => { acc[ind.direction]++; return acc; },
  { improving: 0, worsening: 0, mixed: 0, stagnant: 0 } as Record<IndicatorDirection, number>,
);

const STATS_PER_GROUP = 3;
const TOTAL_GROUPS = Math.ceil(HEADLINE_STATS.length / STATS_PER_GROUP);
const ROTATION_INTERVAL = 9000;
const FADE_DURATION = 400;

export default function Research() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setGroupIndex((prev) => (prev + 1) % TOTAL_GROUPS);
        setIsVisible(true);
      }, FADE_DURATION);
    }, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const currentStats = HEADLINE_STATS.slice(
    groupIndex * STATS_PER_GROUP,
    (groupIndex + 1) * STATS_PER_GROUP,
  );

  return (
    <>
      <Hero
        title="Research"
        subtitle="Data-driven analysis of the world's biggest challenges"
      />

      {/* Headline Stats Carousel */}
      <div className={styles.headlineStats}>
        <div className={`${styles.headlineStatsRow} ${isVisible ? styles.statsVisible : styles.statsHidden}`}>
          {currentStats.map((stat) => (
            <div key={stat.label} className={styles.headlineStat}>
              <span className={styles.headlineTopic}>{stat.topic}</span>
              <span className={styles.headlineIcon}>{stat.icon}</span>
              <span className={styles.headlineValue}>{stat.value}</span>
              <span className={styles.headlineLabel}>{stat.label}</span>
              <span className={styles.headlineContext}>{stat.context}</span>
            </div>
          ))}
        </div>
        <div className={styles.headlineDots}>
          {Array.from({ length: TOTAL_GROUPS }).map((_, i) => (
            <button
              key={i}
              className={`${styles.headlineDot} ${i === groupIndex ? styles.headlineDotActive : ''}`}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => { setGroupIndex(i); setIsVisible(true); }, FADE_DURATION);
              }}
              aria-label={`View stats group ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Key Findings by Area */}
      <Section title="What the Data Shows">
        <div className={styles.findingsStack}>
          {KEY_FINDINGS.map((area) => (
            <Link to={area.link} key={area.area} className={styles.findingsRow}>
              <div className={styles.findingsLeft}>
                <div className={styles.findingsHeader} style={{ borderLeftColor: area.color }}>
                  <span className={styles.findingsIcon} style={{ color: area.color }}>{area.icon}</span>
                  <h3 className={styles.findingsTitle}>{area.area}</h3>
                </div>
                <p className={styles.findingsSituation}>{area.situation}</p>
                <span className={styles.findingsLink}>
                  Read full analysis <ArrowRight size={16} />
                </span>
              </div>
              <div className={styles.findingsRight}>
                <span className={styles.findingsSubheading}>Key data points</span>
                <ul className={styles.findingsList}>
                  {area.findings.map((finding, i) => (
                    <li key={i}>{finding}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Cross-Domain Synthesis */}
      <Section variant="alt" title="Cross-Domain Synthesis">
        <div className={styles.synthesis}>
          {SYNTHESIS.map((paragraph, i) => (
            <p key={i} className={styles.synthesisParagraph}>{paragraph}</p>
          ))}
          <p className={styles.synthesisNote}>{SYNTHESIS_NOTE}</p>
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

      {/* Where We Stand */}
      <Section title="Where We Stand: 1990 vs. 2025">
        <div className={styles.standSection}>
          <p className={styles.standIntro}>
            One flagship metric from each research area, using the most recent data
            available as of early 2026. No indices, no normalization. Just where we
            were and where we are.
          </p>

          <div className={styles.indicatorGrid}>
            {INDICATORS.map((ind) => {
              const dir = DIRECTION_CONFIG[ind.direction];
              return (
                <div key={ind.domain} className={`${styles.indicatorCard} ${styles[`indicator_${ind.direction}`]}`}>
                  <div className={styles.indicatorHeader}>
                    <span className={styles.indicatorIcon}>{ind.icon}</span>
                    <span className={styles.indicatorDomain}>{ind.domain}</span>
                  </div>

                  <div className={styles.indicatorValues}>
                    <div className={styles.indicatorThen}>
                      <span className={styles.valueLabel}>1990</span>
                      <span className={styles.valueNumber}>{ind.then}</span>
                    </div>
                    <span className={styles.valueArrow}>→</span>
                    <div className={styles.indicatorNow}>
                      <span className={styles.valueLabel}>2025</span>
                      <span className={styles.valueNumber}>{ind.now}</span>
                    </div>
                  </div>

                  <span className={styles.indicatorUnit}>{ind.unit}</span>

                  <div className={`${styles.directionBadge} ${styles[`badge_${ind.direction}`]}`}>
                    {dir.icon}
                    {dir.label}
                  </div>

                  <p className={styles.indicatorContext}>{ind.context}</p>
                  <span className={styles.indicatorSource}>{ind.source}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.standSummary}>
            <span className={styles.summaryCount}>
              <span className={styles.countImproving}>{directionCounts.improving} improving</span>
              <span className={styles.countDot} />
              <span className={styles.countWorsening}>{directionCounts.worsening} worsening</span>
              <span className={styles.countDot} />
              <span className={styles.countMixed}>{directionCounts.mixed} mixed</span>
              <span className={styles.countDot} />
              <span className={styles.countStagnant}>{directionCounts.stagnant} stagnant</span>
            </span>
          </div>

          <p className={styles.standClosing}>
            The trajectory is not fixed. Every indicator on this page has responded,
            in both directions, to policy, investment, and collective action.
          </p>
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
