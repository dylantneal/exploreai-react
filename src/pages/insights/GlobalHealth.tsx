import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, AlertTriangle, TrendingUp, TrendingDown,
  Calendar, Heart, Users, DollarSign, Activity, Syringe,
  Globe, Scale, BookOpen, Target, Stethoscope, Banknote,
  Baby, Thermometer, Wind, Droplets, Bug
} from 'lucide-react';
import PlotlyChart from '../../components/charts/PlotlyChart';
import TableOfContents, { TOCItem } from '../../components/ui/TableOfContents';
import SectionInsight from '../../components/ui/SectionInsight';
import styles from '../../styles/pages/Article.module.css';

// ============================================
// DATA SETS - Updated December 2025
// Based on WHO, World Bank, UNICEF, UNAIDS
// ============================================

// Global Life Expectancy (WHO World Health Statistics 2025)
// Note: 2019-2021 saw 1.8 year drop due to COVID-19, largest in modern history
const LIFE_EXPECTANCY_DATA = {
  years: [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2015, 2019, 2020, 2021, 2023, 2024],
  global: [47, 52, 58, 62, 65, 67, 70, 72, 73.3, 72.0, 71.4, 73.4, 74.9],
  high_income: [66, 70, 72, 74, 76, 78, 80, 81, 81.5, 80.2, 79.8, 81.2, 81.8],
  low_income: [38, 42, 47, 52, 54, 55, 60, 63, 64.5, 63.8, 63.2, 64.8, 65.2],
};

// Healthcare Spending per Capita (World Bank 2024)
const HEALTHCARE_SPENDING = {
  regions: ['North America', 'Western Europe', 'East Asia', 'Latin America', 'South Asia', 'Sub-Saharan Africa'],
  spending: [13500, 5800, 3100, 1350, 280, 130],
  colors: ['#3498DB', '#2ECC71', '#9B59B6', '#E67E22', '#E74C3C', '#C0392B'],
};

// Leading Causes of Death (WHO 2024)
// NCDs now account for over 60% of global deaths
const CAUSES_OF_DEATH = {
  causes: ['Heart Disease', 'Stroke', 'COPD', 'Lower Respiratory', 'Neonatal', 'Cancer (Lung)', 'Dementia', 'Diabetes', 'Kidney Disease', 'TB'],
  deaths_millions: [9.0, 6.6, 3.3, 2.5, 2.3, 2.2, 1.9, 1.7, 1.4, 1.3],
};

// Vaccination Coverage (WHO/UNICEF 2024)
const VACCINATION_DATA = {
  years: [1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2019, 2020, 2021, 2022, 2023, 2024],
  dtp3: [20, 38, 55, 72, 75, 80, 85, 86, 86, 83, 81, 84, 84, 84],
  measles: [16, 35, 72, 78, 72, 77, 85, 86, 86, 83, 81, 83, 83, 84],
};

// Child Mortality (UN IGME) - CRITICAL: First rise in 25 years projected for 2025
const CHILD_MORTALITY = {
  years: [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2022, 2024, 2025],
  under5_per1000: [93, 87, 76, 63, 52, 43, 38, 37, 36, 37],
  infant_per1000: [65, 60, 53, 45, 38, 32, 29, 28, 27, 28],
  note: '2025 projected rise due to 27% reduction in health aid from major donors',
};

// Malaria Cases (WHO World Malaria Report 2024)
// Cases and deaths RISING since 2015
const MALARIA_DATA = {
  years: [2000, 2005, 2010, 2015, 2017, 2019, 2020, 2021, 2022, 2023, 2024],
  cases_millions: [262, 244, 227, 212, 219, 229, 241, 247, 249, 273, 282],
  deaths_thousands: [896, 801, 571, 453, 435, 409, 625, 619, 608, 597, 610],
};

// HIV/AIDS Progress (UNAIDS/PEPFAR 2024)
// PEPFAR has saved 26 million lives as of Dec 2024
const HIV_DATA = {
  years: [2000, 2005, 2010, 2015, 2020, 2022, 2023, 2024],
  new_infections_millions: [3.0, 2.5, 2.1, 1.7, 1.5, 1.3, 1.3, 1.2],
  deaths_millions: [1.5, 2.0, 1.4, 1.0, 0.68, 0.63, 0.60, 0.58],
  people_on_treatment_millions: [0.3, 2.0, 7.5, 17.0, 27.5, 29.8, 30.7, 30.9],
};

// Mental Health Burden (WHO 2025)
// Depression is leading cause of disability worldwide
// 1 in 4 people will experience mental health issue in lifetime
const MENTAL_HEALTH_DATA = {
  conditions: ['Depression', 'Anxiety', 'Bipolar', 'Schizophrenia', 'Eating Disorders'],
  prevalence_millions: [300, 320, 45, 24, 16],
  economic_cost_trillions: 6.0, // 2025 projected cost to global economy
};

// Healthcare Workers per 10,000 population (WHO 2024)
const HEALTHCARE_WORKERS = {
  regions: ['Europe', 'Americas', 'Western Pacific', 'Eastern Med', 'South-East Asia', 'Africa'],
  doctors: [43, 29, 24, 13, 9, 3],
  nurses: [84, 59, 46, 23, 16, 12],
};

// Maternal Mortality (WHO 2025)
// 260,000 women died in 2023 - 40% decline since 2000, but progress slowing
const MATERNAL_MORTALITY = {
  years: [2000, 2005, 2010, 2015, 2020, 2023],
  global_per100k: [339, 288, 248, 227, 223, 197],
  sub_saharan_africa: [870, 760, 650, 550, 530, 480],
  developed_regions: [17, 15, 14, 12, 11, 10],
};

// Global Health Funding Crisis (2025)
const FUNDING_CRISIS = {
  global_fund_target: 18, // billion USD
  global_fund_raised: 11.34, // billion USD
  aid_cuts_percent: 35, // expected cuts in 2025 vs 2023
  projected_additional_deaths_by_2030: 22.6, // millions if cuts continue
};

// Tuberculosis Data (WHO Global TB Report 2024)
// TB is now #1 single infectious agent killer, surpassing COVID-19
const TB_DATA = {
  years: [2000, 2005, 2010, 2015, 2019, 2020, 2021, 2022, 2023],
  cases_millions: [8.3, 8.8, 8.8, 10.4, 10.1, 9.9, 10.3, 10.6, 10.8],
  deaths_millions: [1.7, 1.6, 1.4, 1.4, 1.4, 1.5, 1.6, 1.3, 1.25],
  treatment_success_percent: [69, 77, 82, 83, 86, 86, 85, 85, 85],
};

// Drug-Resistant TB (WHO 2024)
const DR_TB_DATA = {
  mdr_tb_cases_2023: 410000, // Multi-drug resistant TB cases
  xdr_tb_cases_2023: 25000, // Extensively drug-resistant TB
  treatment_success_mdr: 63, // percent
  treatment_success_xdr: 53, // percent
};

// Climate and Health Data (WHO, Lancet Countdown 2024)
const CLIMATE_HEALTH_DATA = {
  air_pollution_deaths_millions: 6.7, // 2019 data, most recent comprehensive
  deaths_per_100k_air_pollution: 104,
  heat_related_deaths_annual: 550000, // estimated
  wash_deaths_millions: 1.4, // water, sanitation, hygiene related
  economic_cost_by_2050_trillions: 1.5, // lost productivity
  vector_borne_disease_increase: 12, // percent increase in dengue transmission suitability since 1950s
};

// Table of Contents
const tocItems: TOCItem[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'progress', label: 'Part 1: The Progress' },
  { id: 'life-expectancy', label: 'Life Expectancy', level: 2 },
  { id: 'maternal-health', label: 'Maternal Health', level: 2 },
  { id: 'child-mortality', label: 'Child Survival', level: 2 },
  { id: 'disease-burden', label: 'Disease Burden', level: 2 },
  { id: 'disparities', label: 'Part 2: The Disparities' },
  { id: 'spending', label: 'Healthcare Spending', level: 2 },
  { id: 'workforce', label: 'Healthcare Workforce', level: 2 },
  { id: 'challenges', label: 'Part 3: Current Challenges' },
  { id: 'infectious', label: 'Infectious Diseases', level: 2 },
  { id: 'tuberculosis', label: 'Tuberculosis', level: 2 },
  { id: 'vaccines', label: 'Vaccination Crisis', level: 2 },
  { id: 'mental-health', label: 'Mental Health', level: 2 },
  { id: 'climate-health', label: 'Part 4: Climate & Health' },
  { id: 'funding-crisis', label: 'Part 5: The Funding Crisis' },
  { id: 'conclusions', label: 'Conclusions' },
  { id: 'methodology', label: 'Methodology' },
];

export default function GlobalHealth() {
  return (
    <div className={styles.articlePage}>
      <div className={styles.articleWrapper}>
        {/* Sidebar Navigation */}
        <aside className={styles.articleSidebar}>
          <TableOfContents items={tocItems} />
        </aside>

        {/* Main Content */}
        <main className={styles.articleMain}>
          <Link to="/research" className={styles.backLink}>
            <ArrowLeft size={18} />
            Back to Research
          </Link>

          <header className={styles.articleHeader}>
            <span className={styles.focusArea}>Global Health</span>
            <h1 className={styles.articleTitle}>Global Health: A Data-Driven Analysis</h1>
            <p className={styles.articleMeta}>
              Examining worldwide health trends, disparities, and the factors that determine population wellbeing
            </p>
            <div className={styles.lastUpdated}>
              <Calendar size={14} />
              <span>Last updated: December 2025</span>
            </div>
          </header>

          {/* Executive Summary */}
          <section id="summary" className={styles.executiveSummary}>
            <h2 className={styles.summaryTitle}>The Bottom Line</h2>
            <ul className={styles.summaryPoints}>
              <li>Global life expectancy reached <strong>74.9 years</strong> in 2024, recovering from a 1.8-year COVID drop, but gains are slowing</li>
              <li><strong>260,000 women</strong> die annually in childbirth; progress has stalled at 10% reduction since 2016</li>
              <li><strong>TB is now the #1 infectious disease killer</strong> (1.25M deaths), surpassing COVID-19 in 2023</li>
              <li><strong>6.7 million die from air pollution</strong> annually; climate change is the defining health threat of the century</li>
              <li>Global health aid faces <strong>30-40% cuts</strong> in 2025; child mortality projected to rise for first time in 25 years</li>
            </ul>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>74.9 yrs</span>
                <span className={styles.statLabel}>Life Expectancy</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>260K</span>
                <span className={styles.statLabel}>Maternal Deaths</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>6.7M</span>
                <span className={styles.statLabel}>Air Pollution Deaths</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>-35%</span>
                <span className={styles.statLabel}>Aid Cuts</span>
              </div>
            </div>
          </section>

          <div className={styles.articleContent}>

            {/* PART 1: THE PROGRESS */}
            <section id="progress" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 1</span>
              <h2 className={styles.sectionHeading}>The Progress: Remarkable Gains</h2>
              <p className={styles.sectionLead}>
                The past 75 years have seen unprecedented improvements in human health, gains that 
                previous generations could not have imagined. Understanding this progress is essential 
                for protecting and extending it.
              </p>
            </section>

            {/* Life Expectancy */}
            <section id="life-expectancy">
              <h3><Heart size={20} /> Life Expectancy</h3>
              <p>
                Life expectancy is the most comprehensive measure of population health, capturing the 
                combined effects of healthcare, nutrition, sanitation, economic development, and disease 
                control. The past few years have seen unprecedented volatility.
              </p>

              <PlotlyChart
                title="Global Life Expectancy at Birth (1950-2024)"
                data={[
                  {
                    x: LIFE_EXPECTANCY_DATA.years,
                    y: LIFE_EXPECTANCY_DATA.global,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Global Average',
                    line: { color: '#00BFFF', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: LIFE_EXPECTANCY_DATA.years,
                    y: LIFE_EXPECTANCY_DATA.high_income,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'High Income Countries',
                    line: { color: '#27AE60', width: 2, dash: 'dot' },
                  },
                  {
                    x: LIFE_EXPECTANCY_DATA.years,
                    y: LIFE_EXPECTANCY_DATA.low_income,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Low Income Countries',
                    line: { color: '#E74C3C', width: 2, dash: 'dot' },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Life Expectancy (Years)', range: [30, 85] },
                }}
                source={{ name: 'WHO World Health Statistics 2025', url: 'https://www.who.int/data/gho' }}
              />

              <SectionInsight variant="success">
                <p>
                  <strong>Life expectancy increased by nearly 28 years</strong> since 1950, more than in all of prior 
                  human history combined. Even low-income countries now exceed the life expectancy that 
                  high-income countries had in 1950.
                </p>
              </SectionInsight>

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>COVID-19: The Largest Drop in Modern History</strong>
                  <p>
                    Between 2019 and 2021, global life expectancy <strong>fell by 1.8 years</strong>, from 
                    73.3 to 71.4 years, effectively reversing a decade of progress. This was the largest 
                    single decline since records began. By 2024, recovery brought life expectancy to 
                    74.9 years, but the WHO warns that gains are slowing.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* Maternal Health */}
            <section id="maternal-health">
              <h3><Baby size={20} /> Maternal Health</h3>
              <p>
                Maternal mortality (deaths during pregnancy or childbirth) remains one of the starkest 
                indicators of global health inequality. While significant progress has been made, 
                it has slowed dramatically in recent years.
              </p>

              <PlotlyChart
                title="Maternal Mortality Ratio (2000-2023)"
                data={[
                  {
                    x: MATERNAL_MORTALITY.years,
                    y: MATERNAL_MORTALITY.global_per100k,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Global Average',
                    line: { color: '#9B59B6', width: 3 },
                    marker: { size: 7 },
                  },
                  {
                    x: MATERNAL_MORTALITY.years,
                    y: MATERNAL_MORTALITY.sub_saharan_africa,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Sub-Saharan Africa',
                    line: { color: '#E74C3C', width: 2, dash: 'dot' },
                    marker: { size: 5 },
                  },
                  {
                    x: MATERNAL_MORTALITY.years,
                    y: MATERNAL_MORTALITY.developed_regions,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Developed Regions',
                    line: { color: '#27AE60', width: 2, dash: 'dot' },
                    marker: { size: 5 },
                  },
                  {
                    x: [2000, 2030],
                    y: [70, 70],
                    type: 'scatter',
                    mode: 'lines',
                    name: 'SDG 2030 Target',
                    line: { color: '#666', width: 2, dash: 'dash' },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Deaths per 100,000 Live Births', range: [0, 900] },
                }}
                source={{ name: 'WHO World Health Statistics 2025', url: 'https://www.who.int/data/gho' }}
              />

              <SectionInsight>
                <p>
                  In 2023, approximately <strong>260,000 women died</strong> due to complications during 
                  pregnancy or childbirth. While this represents a <strong>40% decline since 2000</strong>, 
                  progress has slowed dramatically, with only a 10% reduction between 2016 and 2023.
                </p>
              </SectionInsight>

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>SDG Target at Risk</strong>
                  <p>
                    The Sustainable Development Goal target is fewer than <strong>70 deaths per 100,000 
                    live births</strong> by 2030. At current rates, this requires an annual reduction of 
                    <strong> 14.8%</strong>, far exceeding recent progress. Sub-Saharan Africa's maternal 
                    mortality rate (480/100K) is <strong>48× higher</strong> than developed regions (10/100K).
                  </p>
                </div>
              </div>

              <div className={styles.infoBox}>
                <h4><Heart size={18} /> Leading Causes of Maternal Death</h4>
                <p>
                  The majority of maternal deaths are preventable. Leading causes include: 
                  <strong> severe bleeding</strong> (27%), <strong>hypertensive disorders</strong> (14%), 
                  <strong>sepsis</strong> (11%), and <strong>unsafe abortion</strong> (8%). Most deaths 
                  occur in settings with inadequate access to skilled birth attendants, emergency obstetric 
                  care, and blood transfusion services.
                </p>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* Child Mortality */}
            <section id="child-mortality">
              <h3><Users size={20} /> Child Survival</h3>
              <p>
                Child mortality is among the most sensitive indicators of societal development. While its 
                dramatic decline represents one of humanity's greatest achievements, that progress is now 
                under unprecedented threat.
              </p>

              <PlotlyChart
                title="Child Mortality Rates (1990-2025)"
                data={[
                  {
                    x: CHILD_MORTALITY.years,
                    y: CHILD_MORTALITY.under5_per1000,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Under-5 Mortality',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 7 },
                    fill: 'tozeroy',
                    fillcolor: 'rgba(231, 76, 60, 0.1)',
                  },
                  {
                    x: CHILD_MORTALITY.years,
                    y: CHILD_MORTALITY.infant_per1000,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Infant Mortality',
                    line: { color: '#F39C12', width: 3 },
                    marker: { size: 7 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Deaths per 1,000 Live Births' },
                  annotations: [{
                    x: 2025,
                    y: 37,
                    xref: 'x',
                    yref: 'y',
                    text: '2025: First rise in 25 years',
                    showarrow: true,
                    arrowhead: 2,
                    ax: -60,
                    ay: -40,
                    font: { color: '#E74C3C', size: 12 },
                  }],
                }}
                source={{ name: 'UN IGME / Institute for Health Metrics and Evaluation', url: 'https://childmortality.org/' }}
              />

              <SectionInsight>
                <p>
                  <strong>5.9 million fewer children die each year</strong> compared to 1990. The under-5 
                  mortality rate has fallen from 93 to 36 per 1,000 births, a 61% reduction. This means 
                  16,000 more children survive each day than would have under 1990 rates.
                </p>
              </SectionInsight>

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Historic Reversal: Child Deaths Projected to Rise in 2025</strong>
                  <p>
                    For the first time in 25 years, global child mortality is projected to <strong>increase</strong>. 
                    New models from the Institute for Health Metrics and Evaluation estimate an 
                    <strong> additional 200,000 children under five</strong> may die in 2025 from diseases 
                    preventable through vaccines or treatments. This reversal is largely attributed to a 
                    <strong> 27% reduction in health aid</strong> from major donors.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* Disease Burden */}
            <section id="disease-burden">
              <h3><Activity size={20} /> Disease Burden</h3>
              <p>
                Understanding what kills people is essential for targeting health interventions 
                effectively. The disease burden has shifted dramatically as infectious diseases 
                decline and non-communicable diseases rise.
              </p>

              <PlotlyChart
                title="Leading Causes of Death Globally (2023)"
                data={[
                  {
                    x: CAUSES_OF_DEATH.causes,
                    y: CAUSES_OF_DEATH.deaths_millions,
                    type: 'bar',
                    marker: { 
                      color: CAUSES_OF_DEATH.deaths_millions.map((v, i) => 
                        i < 3 ? '#E74C3C' : i < 6 ? '#F39C12' : '#3498DB'
                      ),
                    },
                    text: CAUSES_OF_DEATH.deaths_millions.map(v => `${v}M`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '', tickangle: -45 },
                  yaxis: { title: 'Deaths (Millions)', range: [0, 10] },
                }}
                height={420}
                source={{ name: 'World Health Organization', url: 'https://www.who.int/data/gho/data/themes/mortality-and-global-health-estimates' }}
              />

              <SectionInsight>
                <p>
                  <strong>Cardiovascular diseases</strong> (heart disease + stroke) account for nearly 
                  <strong>30% of all deaths</strong>. Non-communicable diseases now dominate global mortality, 
                  reflecting both success against infectious diseases and the rise of lifestyle-related 
                  conditions.
                </p>
              </SectionInsight>
            </section>

            {/* PART 2: THE DISPARITIES */}
            <section id="disparities" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 2</span>
              <h2 className={styles.sectionHeading}>The Disparities: An Unequal World</h2>
              <p className={styles.sectionLead}>
                Despite remarkable global progress, where you're born still largely determines your 
                health outcomes. These disparities represent both a moral failure and an opportunity.
              </p>
            </section>

            {/* Healthcare Spending */}
            <section id="spending">
              <h3><DollarSign size={20} /> Healthcare Spending</h3>
              <p>
                Healthcare spending varies dramatically across regions, reflecting and reinforcing 
                inequalities in health outcomes.
              </p>

              <PlotlyChart
                title="Healthcare Spending per Capita by Region (2024)"
                data={[
                  {
                    x: HEALTHCARE_SPENDING.regions,
                    y: HEALTHCARE_SPENDING.spending,
                    type: 'bar',
                    marker: { color: HEALTHCARE_SPENDING.colors },
                    text: HEALTHCARE_SPENDING.spending.map(v => `$${v.toLocaleString()}`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'USD per Capita', range: [0, 16000] },
                }}
                height={400}
                source={{ name: 'World Bank', url: 'https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>100× Spending Gap</strong>
                  <p>
                    North America spends $13,500 per person annually on healthcare while Sub-Saharan Africa 
                    spends just $130, a <strong>100-fold difference</strong>. This translates directly into 
                    disparities in life expectancy, child survival, and disease outcomes. Global health 
                    insurance costs are projected to rise by over 10% in 2026, continuing a trend of 
                    double-digit increases.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* Healthcare Workforce */}
            <section id="workforce">
              <h3><Stethoscope size={20} /> Healthcare Workforce</h3>
              <p>
                Healthcare workers are the foundation of any health system. Their distribution 
                mirrors and amplifies resource disparities.
              </p>

              <PlotlyChart
                title="Healthcare Workers per 10,000 Population (2024)"
                data={[
                  {
                    x: HEALTHCARE_WORKERS.regions,
                    y: HEALTHCARE_WORKERS.doctors,
                    type: 'bar',
                    name: 'Doctors',
                    marker: { color: 'rgba(52, 152, 219, 0.8)' },
                  },
                  {
                    x: HEALTHCARE_WORKERS.regions,
                    y: HEALTHCARE_WORKERS.nurses,
                    type: 'bar',
                    name: 'Nurses',
                    marker: { color: 'rgba(46, 204, 113, 0.8)' },
                  },
                ]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'Per 10,000 Population' },
                  barmode: 'group',
                }}
                source={{ name: 'WHO Global Health Workforce Statistics', url: 'https://www.who.int/data/gho/data/themes/topics/health-workforce' }}
              />

              <SectionInsight variant="warning">
                <p>
                  Africa has <strong>3 doctors per 10,000 people</strong> compared to Europe's 42, a 14× 
                  gap. The WHO estimates a global shortage of <strong>10 million health workers</strong> 
                  by 2030, concentrated in the poorest regions.
                </p>
              </SectionInsight>
            </section>

            {/* PART 3: CURRENT CHALLENGES */}
            <section id="challenges" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 3</span>
              <h2 className={styles.sectionHeading}>Current Challenges</h2>
              <p className={styles.sectionLead}>
                Despite progress, significant health challenges persist and new ones emerge. 
                Understanding these is essential for continued advancement.
              </p>
            </section>

            {/* Infectious Diseases */}
            <section id="infectious">
              <h3><Activity size={20} /> Infectious Diseases</h3>
              <p>
                Major infectious diseases continue to burden low and middle-income countries. 
                While HIV/AIDS treatment has been a remarkable success, malaria is now resurging 
                after years of progress.
              </p>

              <PlotlyChart
                title="Malaria Cases and Deaths (2000-2024)"
                data={[
                  {
                    x: MALARIA_DATA.years,
                    y: MALARIA_DATA.cases_millions,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Cases (Millions)',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 6 },
                    yaxis: 'y',
                  },
                  {
                    x: MALARIA_DATA.years,
                    y: MALARIA_DATA.deaths_thousands,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Deaths (Thousands)',
                    line: { color: '#F39C12', width: 3 },
                    marker: { size: 6 },
                    yaxis: 'y2',
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Cases (Millions)', side: 'left' },
                  yaxis2: { title: 'Deaths (Thousands)', side: 'right', overlaying: 'y' },
                }}
                source={{ name: 'WHO World Malaria Report 2024', url: 'https://www.who.int/teams/global-malaria-programme/reports/world-malaria-report' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Malaria is Resurging</strong>
                  <p>
                    After years of progress, malaria has been resurging since 2015. In 2024, deaths 
                    <strong> rose to 610,000</strong>, primarily among young children in Sub-Saharan Africa. 
                    Cases climbed from 263 million (2023) to <strong>282 million</strong> (2024). Contributing 
                    factors include drug resistance, decreased effectiveness of insecticide-treated bed nets, 
                    climate change, conflict, and funding shortfalls.
                  </p>
                </div>
              </div>

              <PlotlyChart
                title="HIV/AIDS: New Infections, Deaths, and Treatment (2000-2024)"
                data={[
                  {
                    x: HIV_DATA.years,
                    y: HIV_DATA.new_infections_millions,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'New Infections (M)',
                    line: { color: '#E74C3C', width: 2 },
                  },
                  {
                    x: HIV_DATA.years,
                    y: HIV_DATA.deaths_millions,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Deaths (M)',
                    line: { color: '#9B59B6', width: 2 },
                  },
                  {
                    x: HIV_DATA.years,
                    y: HIV_DATA.people_on_treatment_millions,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'On Treatment (M)',
                    line: { color: '#27AE60', width: 3 },
                    fill: 'tozeroy',
                    fillcolor: 'rgba(39, 174, 96, 0.1)',
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'People (Millions)' },
                }}
                source={{ name: 'UNAIDS / PEPFAR', url: 'https://www.unaids.org/en/resources/fact-sheet' }}
              />

              <SectionInsight variant="success">
                <p>
                  <strong>HIV/AIDS treatment is a major success:</strong> 30.9 million people now receive 
                  antiretroviral therapy, up from just 300,000 in 2000. PEPFAR alone has saved 
                  <strong> 26 million lives</strong> as of December 2024. New infections have fallen 60% 
                  and deaths have fallen 71% from their peaks.
                </p>
              </SectionInsight>

              <SectionInsight variant="warning">
                <p>
                  <strong>But funding cuts threaten progress:</strong> Global funding cuts have severely 
                  impacted HIV prevention programs. UNAIDS warns that persisting shortages undermine 
                  efforts to meet 2030 targets to end AIDS as a public health threat.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* Tuberculosis */}
            <section id="tuberculosis">
              <h3><Bug size={20} /> Tuberculosis: The Forgotten Pandemic</h3>
              <p>
                Tuberculosis (TB) is now the world's deadliest infectious disease from a single 
                pathogen, surpassing even COVID-19 in 2023. Despite being preventable and treatable, 
                TB continues to kill over a million people annually.
              </p>

              <PlotlyChart
                title="Global Tuberculosis Cases and Deaths (2000-2023)"
                data={[
                  {
                    x: TB_DATA.years,
                    y: TB_DATA.cases_millions,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Cases (Millions)',
                    line: { color: '#9B59B6', width: 3 },
                    marker: { size: 6 },
                    yaxis: 'y',
                  },
                  {
                    x: TB_DATA.years,
                    y: TB_DATA.deaths_millions,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Deaths (Millions)',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 6 },
                    yaxis: 'y2',
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Cases (Millions)', side: 'left', range: [7, 12] },
                  yaxis2: { title: 'Deaths (Millions)', side: 'right', overlaying: 'y', range: [1, 2] },
                }}
                source={{ name: 'WHO Global TB Report 2024', url: 'https://www.who.int/teams/global-tuberculosis-programme/tb-reports' }}
              />

              <SectionInsight>
                <p>
                  In 2023, an estimated <strong>10.8 million people</strong> developed TB, with 
                  <strong> 1.25 million deaths</strong>, finally falling below pre-pandemic levels. 
                  However, TB remains the <strong>#1 cause of death from a single infectious agent</strong>, 
                  surpassing COVID-19. Treatment success rates have plateaued at 85%.
                </p>
              </SectionInsight>

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>The Drug Resistance Crisis</strong>
                  <p>
                    In 2023, approximately <strong>410,000 people</strong> developed multidrug-resistant 
                    TB (MDR-TB), with an additional 25,000 cases of extensively drug-resistant TB (XDR-TB). 
                    Treatment success for MDR-TB is only <strong>63%</strong>, compared to 85% for 
                    drug-susceptible TB. Drug-resistant TB threatens to reverse decades of progress.
                  </p>
                </div>
              </div>

              <div className={styles.infoBox}>
                <h4><Globe size={18} /> Geographic Burden</h4>
                <p>
                  TB is heavily concentrated in specific regions. Eight countries account for 
                  <strong> two-thirds of all TB cases</strong>: India, Indonesia, China, the Philippines, 
                  Pakistan, Nigeria, Bangladesh, and the Democratic Republic of the Congo. Many of 
                  these countries face significant healthcare infrastructure and funding challenges.
                </p>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* Vaccination */}
            <section id="vaccines">
              <h3><Syringe size={20} /> The Vaccination Crisis</h3>
              <p>
                Vaccines are among the most cost-effective health interventions ever developed. 
                However, coverage has stalled and is now declining in some areas, while other 
                programs show notable success.
              </p>

              <PlotlyChart
                title="Global Vaccination Coverage (1980-2024)"
                data={[
                  {
                    x: VACCINATION_DATA.years,
                    y: VACCINATION_DATA.dtp3,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'DTP3 (Diphtheria, Tetanus, Pertussis)',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: VACCINATION_DATA.years,
                    y: VACCINATION_DATA.measles,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Measles (First Dose)',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: [1980, 2024],
                    y: [95, 95],
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Herd Immunity Threshold (Measles)',
                    line: { color: '#666', width: 2, dash: 'dash' },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Coverage (%)', range: [0, 100] },
                }}
                source={{ name: 'WHO/UNICEF Estimates of National Immunization Coverage', url: 'https://www.who.int/data/gho/data/themes/topics/immunization-coverage' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Vaccination Stall and Decline</strong>
                  <p>
                    Coverage plateaued at ~86% before COVID-19 and has stagnated at 84%. Millions of 
                    "zero-dose" children who receive no vaccines remain at highest risk. Measles 
                    outbreaks are resurging globally as coverage falls below herd immunity thresholds.
                  </p>
                </div>
              </div>

              <SectionInsight variant="success">
                <p>
                  <strong>HPV Vaccination Milestone:</strong> Gavi, the Vaccine Alliance, reached its 
                  target of vaccinating an estimated <strong>86 million girls</strong> against human 
                  papillomavirus (HPV) by end of 2025. This milestone is expected to prevent 
                  <strong> 1.4 million deaths</strong> from cervical cancer in lower-income countries.
                </p>
              </SectionInsight>

              <p>
                In response to vaccination challenges, Gavi and the World Bank announced a collaboration 
                to mobilize <strong>at least $2 billion</strong> over the next five years to enhance 
                immunization and primary healthcare systems, with a focus on bolstering vaccine 
                manufacturing in Africa.
              </p>
            </section>

            <div className={styles.sectionDivider} />

            {/* Mental Health */}
            <section id="mental-health">
              <h3><Target size={20} /> Mental Health</h3>
              <p>
                Mental health conditions represent a massive and growing burden, yet remain 
                severely underfunded and stigmatized worldwide. Depression is now the 
                <strong> leading cause of disability globally</strong>.
              </p>

              <PlotlyChart
                title="Global Mental Health Burden (2025)"
                data={[
                  {
                    x: MENTAL_HEALTH_DATA.conditions,
                    y: MENTAL_HEALTH_DATA.prevalence_millions,
                    type: 'bar',
                    marker: { 
                      color: ['#3498DB', '#2ECC71', '#9B59B6', '#E74C3C', '#F39C12'],
                    },
                    text: MENTAL_HEALTH_DATA.prevalence_millions.map(v => `${v}M`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'People Affected (Millions)', range: [0, 380] },
                }}
                height={380}
                source={{ name: 'WHO Mental Health Atlas', url: 'https://www.who.int/publications/i/item/9789240049338' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>1 in 4 people</strong> will experience a mental health issue during their 
                  lifetime. Nearly 1 billion people currently live with a mental health condition. 
                  Depression and anxiety alone affect over <strong>620 million people</strong>. Yet countries 
                  spend on average just <strong>2% of health budgets</strong> on mental health, and 
                  treatment gaps exceed 75% in low-income countries.
                </p>
              </SectionInsight>

              <div className={styles.infoBox}>
                <h4><DollarSign size={18} /> Economic Impact</h4>
                <p>
                  In 2025, mental health disorders are projected to cost the global economy 
                  <strong> over $6 trillion</strong>, more than cancer, diabetes, and respiratory 
                  diseases combined. This includes direct healthcare costs, lost productivity, 
                  and social welfare impacts.
                </p>
              </div>
            </section>

            {/* PART 4: CLIMATE & HEALTH */}
            <section id="climate-health" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 4</span>
              <h2 className={styles.sectionHeading}>Climate Change & Health</h2>
              <p className={styles.sectionLead}>
                Climate change is increasingly recognized as the defining health threat of the 
                21st century. Its impacts, from extreme heat to expanding disease vectors, are 
                already measurable and accelerating.
              </p>
            </section>

            <section>
              <h3><Wind size={20} /> Air Pollution</h3>
              <p>
                Air pollution is the world's largest environmental health risk, killing more people 
                than malaria, tuberculosis, and HIV/AIDS combined.
              </p>

              <PlotlyChart
                title="Deaths Attributable to Environmental Factors"
                data={[
                  {
                    x: ['Air Pollution', 'Unsafe Water/Sanitation', 'Heat-Related', 'Climate-Sensitive Diseases'],
                    y: [
                      CLIMATE_HEALTH_DATA.air_pollution_deaths_millions, 
                      CLIMATE_HEALTH_DATA.wash_deaths_millions, 
                      CLIMATE_HEALTH_DATA.heat_related_deaths_annual / 1000000,
                      0.6
                    ],
                    type: 'bar',
                    marker: { color: ['#7F8C8D', '#3498DB', '#E74C3C', '#27AE60'] },
                    text: ['6.7M', '1.4M', '550K', '600K+'],
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'Deaths (Millions)', range: [0, 8] },
                }}
                height={380}
                source={{ name: 'WHO / Lancet Countdown 2024', url: 'https://www.who.int/health-topics/air-pollution' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>6.7 million people die annually</strong> from air pollution, accounting for 
                  104 deaths per 100,000 population. An additional <strong>1.4 million deaths</strong> 
                  are attributed to inadequate water, sanitation, and hygiene. These environmental 
                  factors disproportionately affect low and middle-income countries.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            <section>
              <h3><Thermometer size={20} /> Heat-Related Mortality</h3>
              <p>
                Extreme heat is becoming one of the deadliest consequences of climate change, 
                with annual heat-related deaths now exceeding half a million.
              </p>

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Rising Heat Deaths</strong>
                  <p>
                    Annual heat-related deaths now exceed <strong>550,000 globally</strong>. 2025 is 
                    projected to be the second or third hottest year on record, potentially completing 
                    a three-year stretch exceeding 1.5°C above pre-industrial levels. Vulnerable 
                    populations (the elderly, outdoor workers, and those without air conditioning) face 
                    the highest risk.
                  </p>
                </div>
              </div>

              <SectionInsight>
                <p>
                  Climate-driven health risks could cost the global economy at least 
                  <strong> $1.5 trillion in lost productivity by 2050</strong>, affecting sectors 
                  including agriculture, construction, and healthcare. At COP30, a coalition of 
                  philanthropies announced <strong>$300 million</strong> for climate-health research.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            <section>
              <h3><Droplets size={20} /> Vector-Borne Diseases</h3>
              <p>
                Climate change is expanding the geographic range and transmission seasons of 
                diseases like dengue fever, malaria, and Zika as temperatures warm and 
                precipitation patterns shift.
              </p>

              <div className={styles.infoBox}>
                <h4><TrendingUp size={18} /> Expanding Disease Range</h4>
                <p>
                  Transmission suitability for dengue fever has increased by <strong>12% since the 
                  1950s</strong>. In 2025, nearly <strong>4 million dengue cases</strong> with 2,700 
                  deaths have been reported across 90 countries. Malaria is spreading to previously 
                  unaffected highland areas in Africa as temperatures rise. The WHO warns that 
                  climate change could cause an additional <strong>250,000 deaths per year</strong> 
                  between 2030-2050 from malnutrition, malaria, diarrhea, and heat stress alone.
                </p>
              </div>

              <SectionInsight>
                <p>
                  In 2024, <strong>135 (69%) of 196 WHO member states</strong> reported high-to-very-high 
                  implementation of health emergency management capacity, an increase of 4 countries 
                  from 2023. Meanwhile, 66% of public health institutions now provide climate and 
                  health education, up significantly from previous years.
                </p>
              </SectionInsight>
            </section>

            {/* PART 5: THE FUNDING CRISIS */}
            <section id="funding-crisis" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 5</span>
              <h2 className={styles.sectionHeading}>The Funding Crisis</h2>
              <p className={styles.sectionLead}>
                Global health is facing an unprecedented funding crisis that threatens to reverse 
                decades of hard-won progress. Major donors are cutting aid at a critical moment.
              </p>
            </section>

            <div className={styles.warningBox}>
              <AlertTriangle size={20} />
              <div>
                <strong>30-40% Cuts in Global Health Aid</strong>
                <p>
                  International aid to combat AIDS, tuberculosis, and malaria faces expected cuts of 
                  <strong> 30-40% in 2025</strong> compared to 2023. The Global Fund to Fight AIDS, TB, 
                  and Malaria raised only <strong>$11.34 billion</strong> for 2027-2029, falling far short 
                  of its $18 billion target.
                </p>
              </div>
            </div>

            <PlotlyChart
              title="Global Fund Funding Gap"
              data={[
                {
                  x: ['Target', 'Raised', 'Gap'],
                  y: [FUNDING_CRISIS.global_fund_target, FUNDING_CRISIS.global_fund_raised, FUNDING_CRISIS.global_fund_target - FUNDING_CRISIS.global_fund_raised],
                  type: 'bar',
                  marker: { color: ['#27AE60', '#3498DB', '#E74C3C'] },
                  text: [`$${FUNDING_CRISIS.global_fund_target}B`, `$${FUNDING_CRISIS.global_fund_raised}B`, `$${(FUNDING_CRISIS.global_fund_target - FUNDING_CRISIS.global_fund_raised).toFixed(2)}B`],
                  textposition: 'outside',
                },
              ]}
              layout={{
                xaxis: { title: '' },
                yaxis: { title: 'Billion USD', range: [0, 22] },
              }}
              height={350}
              source={{ name: 'Global Fund', url: 'https://www.theglobalfund.org/' }}
            />

            <SectionInsight variant="warning">
              <p>
                A study warns that ongoing and planned reductions in development aid by major donors 
                could lead to <strong>22.6 million additional deaths globally by 2030</strong>, including 
                5.4 million children under five. This would represent a catastrophic reversal of 
                progress achieved over the past three decades.
              </p>
            </SectionInsight>

            <div className={styles.infoBox}>
              <h4><Globe size={18} /> New Bilateral Approaches</h4>
              <p>
                In response to changing global health dynamics, new bilateral agreements are emerging. 
                In December 2025, Kenya became the first African country to sign a bilateral health 
                agreement with the United States under the "America First Global Health Strategy," 
                allocating over <strong>$1.6 billion</strong> from the U.S. over five years with Kenya 
                contributing an additional $850 million.
              </p>
            </div>

            {/* CONCLUSIONS */}
            <section id="conclusions" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Synthesis</span>
              <h2 className={styles.sectionHeading}>Conclusions</h2>
              <p className={styles.sectionLead}>
                The data reveals both remarkable progress and urgent new challenges in global health.
              </p>
            </section>

            <div className={styles.infoBox}>
              <h3><Scale size={18} /> Key Conclusions</h3>
              <ul>
                <li><strong>Progress is real but fragile:</strong> Life expectancy gains of 28 years since 1950 represent extraordinary achievement, but COVID-19 erased a decade of progress in just two years</li>
                <li><strong>Maternal health progress has stalled:</strong> 260,000 women die annually in childbirth; the 14.8% annual reduction needed to meet SDG targets is far beyond current rates</li>
                <li><strong>TB is the forgotten pandemic:</strong> Now the #1 infectious disease killer with 1.25M deaths and 410,000 drug-resistant cases annually</li>
                <li><strong>Climate change is a health emergency:</strong> 6.7M die from air pollution, 550K+ from heat, and it's accelerating disease spread</li>
                <li><strong>Funding crisis threatens everything:</strong> 30-40% cuts in global health aid could lead to 22.6 million additional deaths by 2030</li>
                <li><strong>Child mortality is reversing:</strong> For the first time in 25 years, child deaths are projected to rise in 2025 due to aid cuts</li>
              </ul>
            </div>

            <section className={styles.takeaways}>
              <h2><BookOpen size={20} /> The Bottom Line</h2>
              <ul>
                <li>
                  <strong>We know what works.</strong> Vaccines, clean water, basic healthcare, and 
                  nutrition interventions have proven their effectiveness. PEPFAR saved 26 million 
                  lives. HPV vaccination will prevent 1.4 million cancer deaths. The solutions exist.
                </li>
                <li>
                  <strong>Progress is reversing.</strong> Child mortality is projected to rise for 
                  the first time in 25 years. Malaria deaths are increasing. COVID-19 erased a decade 
                  of life expectancy gains. Without sustained investment, more reversals will follow.
                </li>
                <li>
                  <strong>Funding cuts have consequences.</strong> A 30-40% reduction in global 
                  health aid could lead to 22.6 million additional deaths by 2030. The math is 
                  unforgiving.
                </li>
                <li>
                  <strong>The stakes are highest for the poorest.</strong> The 100× spending gap 
                  between richest and poorest regions translates directly into who lives and who 
                  dies. Closing this gap remains both a moral imperative and an achievable goal.
                </li>
                <li>
                  <strong>This is a moment of choice.</strong> The progress of the past 75 years 
                  was not inevitable. It was the result of deliberate investment and international 
                  cooperation. Continuing that progress requires the same commitment.
                </li>
              </ul>
            </section>

            {/* Methodology */}
            <section id="methodology" className={styles.methodology}>
              <h2>Data Sources & Methodology</h2>
              <p>
                This analysis draws from WHO World Health Statistics 2025, WHO Global Health Observatory, 
                WHO Global TB Report 2024, Lancet Countdown on Health and Climate Change, World Bank, 
                UNICEF, UNAIDS, the UN Inter-agency Group for Child Mortality Estimation (IGME), 
                the Institute for Health Metrics and Evaluation (IHME), the Global Fund, and PEPFAR. 
                All sources use standardized methodologies and are regularly updated.
              </p>
              <p>
                <strong>Limitations:</strong> Health data quality varies by country. Some figures are 
                modeled estimates where direct measurement is unavailable. Regional averages mask 
                significant within-region disparities. Projections for 2025 are based on current 
                trends and announced policy changes; actual outcomes may differ. Climate-health 
                attribution data involves modeling uncertainty.
              </p>
              <p>
                <strong>Last Updated:</strong> December 2025. Data incorporates the WHO World Health 
                Statistics 2025 report, WHO World Malaria Report 2024, WHO Global TB Report 2024, 
                Lancet Countdown 2024, UNAIDS Global AIDS Update 2024, and recent funding announcements 
                from the Global Fund replenishment conference.
              </p>
            </section>

            <section className={styles.resources}>
              <h2>Primary Sources</h2>
              <ul>
                <li>
                  <a href="https://www.who.int/data/gho" target="_blank" rel="noopener noreferrer">
                    WHO Global Health Observatory <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.who.int/news/item/15-05-2025-who-warns-of-slowing-global-health-gains-in-new-statistics-report" target="_blank" rel="noopener noreferrer">
                    WHO World Health Statistics 2025 <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.who.int/teams/global-tuberculosis-programme/tb-reports" target="_blank" rel="noopener noreferrer">
                    WHO Global TB Report 2024 <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://lancetcountdown.org/" target="_blank" rel="noopener noreferrer">
                    Lancet Countdown on Health and Climate Change <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer">
                    World Bank Open Data <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://childmortality.org/" target="_blank" rel="noopener noreferrer">
                    UN IGME Child Mortality Estimates <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.unaids.org/" target="_blank" rel="noopener noreferrer">
                    UNAIDS Data <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://data.unicef.org/" target="_blank" rel="noopener noreferrer">
                    UNICEF Data <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.theglobalfund.org/" target="_blank" rel="noopener noreferrer">
                    The Global Fund <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.state.gov/pepfar/" target="_blank" rel="noopener noreferrer">
                    PEPFAR <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.resources}>
              <h2>Further Reading</h2>
              <ul>
                <li>
                  <a href="https://ourworldindata.org/health-meta" target="_blank" rel="noopener noreferrer">
                    Our World in Data - Health <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.healthdata.org/" target="_blank" rel="noopener noreferrer">
                    Institute for Health Metrics and Evaluation <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.thelancet.com/global-health" target="_blank" rel="noopener noreferrer">
                    The Lancet Global Health <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
