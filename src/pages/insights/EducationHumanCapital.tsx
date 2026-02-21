import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, ExternalLink, AlertTriangle, Calendar, GraduationCap,
  BookOpen, Users, DollarSign, TrendingUp, Globe, BarChart3, Landmark
} from 'lucide-react';
import PlotlyChart from '../../components/charts/PlotlyChart';
import TableOfContents, { TOCItem } from '../../components/ui/TableOfContents';
import SectionInsight from '../../components/ui/SectionInsight';
import CiteThisReport from '../../components/ui/CiteThisReport';
import { SITE_NAME, SITE_URL } from '../../utils/constants';
import styles from '../../styles/pages/Article.module.css';

const INSIGHT_TITLE = 'Education & Human Capital: A Data-Driven Analysis';
const INSIGHT_DESCRIPTION = 'Enrollment, completion, learning outcomes, education spending, gender gaps, and human capital. Data from UNESCO UIS, World Bank EdStats, and OECD PISA.';

// ============================================
// DATA SETS – UNESCO UIS, World Bank, OECD
// ============================================

// Gross enrollment ratio by level (UNESCO UIS) – global, percent
const ENROLLMENT_BY_LEVEL = {
  years: [1970, 1980, 1990, 2000, 2010, 2015, 2020, 2022],
  primary: [80, 90, 99, 100, 104, 104, 103, 103],
  secondary: [35, 45, 54, 60, 72, 76, 78, 80],
  tertiary: [10, 12, 14, 19, 30, 36, 40, 42],
};

// Out-of-school children and youth (UNESCO UIS) – millions
const OUT_OF_SCHOOL = {
  years: [2000, 2005, 2010, 2015, 2019, 2020, 2022],
  primaryAge: [100, 72, 63, 62, 59, 62, 64],
  lowerSecondary: [99, 80, 71, 63, 60, 63, 62],
  upperSecondary: [140, 136, 131, 128, 126, 130, 128],
};

// Primary completion rate by region (World Bank EdStats, circa 2022) – percent
const COMPLETION_BY_REGION = {
  regions: ['Sub-Saharan Africa', 'South Asia', 'Latin America & Carib.', 'East Asia & Pacific', 'Europe & Central Asia', 'North America'],
  rate: [65, 90, 95, 98, 99, 99],
  colors: ['#E74C3C', '#F39C12', '#E67E22', '#3498DB', '#2ECC71', '#27AE60'],
};

// PISA 2022 scores – OECD average and selected top/bottom performers
const PISA_2022_SCORES = {
  countries: ['Singapore', 'Japan', 'South Korea', 'Estonia', 'OECD Average', 'United States', 'United Kingdom', 'France', 'Chile', 'Colombia'],
  math: [575, 536, 527, 510, 472, 465, 489, 474, 412, 383],
  reading: [543, 516, 515, 511, 476, 504, 494, 474, 448, 409],
  science: [561, 547, 528, 526, 485, 499, 503, 487, 444, 411],
};

// PISA math trends – OECD average over time
const PISA_MATH_TREND = {
  years: [2003, 2006, 2009, 2012, 2015, 2018, 2022],
  oecdAvg: [500, 498, 496, 494, 490, 489, 472],
  singapore: [undefined, undefined, 562, 573, 564, 569, 575],
};

// Learning poverty (World Bank) – % of 10-year-olds who cannot read a simple text
const LEARNING_POVERTY = {
  regions: ['Sub-Saharan Africa', 'South Asia', 'Latin America & Carib.', 'Middle East & N. Africa', 'East Asia & Pacific', 'Europe & Central Asia'],
  preCovid: [86, 58, 51, 63, 21, 10],
  postCovid: [89, 78, 65, 69, 30, 15],
  colors: ['#E74C3C', '#F39C12', '#E67E22', '#9B59B6', '#3498DB', '#2ECC71'],
};

// Government expenditure on education (UNESCO UIS / World Bank) – % of GDP, global weighted average
const EDUCATION_SPENDING = {
  years: [2000, 2005, 2010, 2015, 2018, 2020, 2022],
  global: [4.0, 4.2, 4.5, 4.3, 4.4, 4.5, 4.3],
};

// Education spending by income group (UNESCO UIS, circa 2022) – % of GDP
const SPENDING_BY_INCOME = {
  groups: ['Low income', 'Lower-middle income', 'Upper-middle income', 'High income'],
  pctGDP: [3.5, 3.8, 4.5, 5.0],
  perPupilUSD: [53, 260, 1800, 10200],
  colors: ['#E74C3C', '#F39C12', '#3498DB', '#2ECC71'],
};

// Gender Parity Index for gross enrollment (UNESCO UIS) – GPI (female/male ratio; 1.0 = parity)
const GENDER_PARITY = {
  years: [1970, 1980, 1990, 2000, 2010, 2015, 2020, 2022],
  primary: [0.78, 0.85, 0.88, 0.92, 0.97, 0.99, 1.00, 1.00],
  secondary: [0.58, 0.68, 0.76, 0.87, 0.96, 0.99, 1.02, 1.03],
  tertiary: [0.45, 0.62, 0.76, 0.97, 1.08, 1.14, 1.18, 1.20],
};

// World Bank Human Capital Index (HCI 2020) – by region (scale 0–1)
const HUMAN_CAPITAL_INDEX = {
  regions: ['Sub-Saharan Africa', 'South Asia', 'Latin America & Carib.', 'Middle East & N. Africa', 'East Asia & Pacific', 'Europe & Central Asia', 'North America'],
  hci: [0.40, 0.48, 0.56, 0.57, 0.59, 0.69, 0.75],
  colors: ['#E74C3C', '#F39C12', '#E67E22', '#9B59B6', '#3498DB', '#2ECC71', '#27AE60'],
};

// Tertiary attainment among 25–64-year-olds (OECD 2023) – percent
const TERTIARY_ATTAINMENT = {
  countries: ['South Korea', 'Canada', 'Japan', 'United Kingdom', 'United States', 'Australia', 'OECD Average', 'France', 'Germany', 'Italy'],
  percent: [70, 66, 65, 52, 50, 49, 40, 42, 35, 21],
  colors: ['#3498DB', '#2980B9', '#1ABC9C', '#16A085', '#2ECC71', '#27AE60', '#F39C12', '#E67E22', '#E74C3C', '#C0392B'],
};

// Table of Contents
const tocItems: TOCItem[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'enrollment', label: 'Part 1: Enrollment & Access' },
  { id: 'completion', label: 'Part 2: Completion & Out-of-School' },
  { id: 'learning', label: 'Part 3: Learning Outcomes' },
  { id: 'spending', label: 'Part 4: Education Spending' },
  { id: 'gender', label: 'Part 5: Gender Gaps' },
  { id: 'human-capital', label: 'Part 6: The Human Capital Imperative' },
  { id: 'conclusions', label: 'Conclusions' },
  { id: 'methodology', label: 'Methodology' },
];

export default function EducationHumanCapital() {
  const canonicalUrl = `${SITE_URL}/insights/education-human-capital`;
  return (
    <div className={styles.articlePage}>
      <Helmet>
        <title>{INSIGHT_TITLE} | {SITE_NAME}</title>
        <meta name="description" content={INSIGHT_DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${INSIGHT_TITLE} | ${SITE_NAME}`} />
        <meta property="og:description" content={INSIGHT_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className={styles.articleWrapper}>
        <aside className={styles.articleSidebar}>
          <TableOfContents items={tocItems} />
        </aside>

        <main className={styles.articleMain}>
          <Link to="/research" className={styles.backLink}>
            <ArrowLeft size={18} />
            Back to Research
          </Link>

          <header className={styles.articleHeader}>
            <span className={styles.focusArea}>Education &amp; Human Capital</span>
            <h1 className={styles.articleTitle}>{INSIGHT_TITLE}</h1>
            <p className={styles.articleMeta}>
              Enrollment, completion, learning outcomes, education spending, gender gaps, and human capital formation. Data from UNESCO UIS, World Bank EdStats, and OECD PISA.
            </p>
            <div className={styles.lastUpdated}>
              <Calendar size={14} />
              <span>Last updated: February 2026</span>
            </div>
          </header>

          <CiteThisReport
            reportId="CL-2025-08"
            title={INSIGHT_TITLE}
            version="February 2026"
            path="/insights/education-human-capital"
          />

          <section id="summary" className={styles.executiveSummary}>
            <h2 className={styles.summaryTitle}>The Bottom Line</h2>
            <ul className={styles.summaryPoints}>
              <li>Global primary enrollment is near-universal, but about <strong>250 million children and youth</strong> remain out of school (UNESCO 2022), overwhelmingly in sub-Saharan Africa and South Asia</li>
              <li>Enrollment gains have outpaced learning: an estimated <strong>70% of 10-year-olds</strong> in low- and middle-income countries cannot read a simple text, up from 57% before COVID (World Bank)</li>
              <li>PISA 2022 recorded the <strong>sharpest decline in math scores</strong> in the programme&apos;s history; the OECD average fell 15 points, erasing two decades of progress</li>
              <li>Countries spend a global average of <strong>4.3% of GDP</strong> on education, but per-pupil spending varies nearly <strong>200-fold</strong> between low- and high-income countries</li>
              <li>Gender parity has been achieved at primary level globally; at tertiary level, <strong>women now outnumber men</strong> in most regions (GPI 1.20), though disparities persist in STEM and in the poorest countries</li>
            </ul>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>250M</span>
                <span className={styles.statLabel}>Out of school</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>70%</span>
                <span className={styles.statLabel}>Learning poverty</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>4.3%</span>
                <span className={styles.statLabel}>Avg spending (% GDP)</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>1.20</span>
                <span className={styles.statLabel}>Tertiary GPI (F/M)</span>
              </div>
            </div>
          </section>

          <div className={styles.articleContent}>

            {/* ======== PART 1: ENROLLMENT & ACCESS ======== */}
            <section id="enrollment" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 1</span>
              <h2 className={styles.sectionHeading}>Enrollment &amp; Access</h2>
              <p className={styles.sectionLead}>
                One of the great achievements of the past half-century has been the dramatic expansion of access to education at every level.
                UNESCO Institute for Statistics (UIS) tracks gross enrollment ratios globally, measuring total enrollment as a share of the
                official school-age population.
              </p>
            </section>

            <section id="enrollment-trends">
              <h3><GraduationCap size={20} /> Gross Enrollment by Level</h3>
              <p>
                Primary enrollment reached near-universal levels by 2000 (gross ratios above 100% reflect over-age or under-age
                enrollment). Secondary enrollment has more than doubled since 1970, from 35% to 80%. Tertiary enrollment has
                quadrupled, from 10% to 42%, driven by rising demand for skilled labor and expanding higher education systems
                in middle-income countries.
              </p>

              <PlotlyChart
                title="Global Gross Enrollment Ratio by Level (1970–2022)"
                data={[
                  {
                    x: ENROLLMENT_BY_LEVEL.years,
                    y: ENROLLMENT_BY_LEVEL.primary,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Primary',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: ENROLLMENT_BY_LEVEL.years,
                    y: ENROLLMENT_BY_LEVEL.secondary,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Secondary',
                    line: { color: '#E67E22', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: ENROLLMENT_BY_LEVEL.years,
                    y: ENROLLMENT_BY_LEVEL.tertiary,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Tertiary',
                    line: { color: '#9B59B6', width: 3 },
                    marker: { size: 6 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Gross enrollment ratio (%)' },
                }}
                source={{ name: 'UNESCO Institute for Statistics (UIS)', url: 'http://data.uis.unesco.org/' }}
              />

              <SectionInsight variant="success">
                <p>
                  <strong>Tertiary enrollment has quadrupled since 1970.</strong> The expansion of higher education has been
                  one of the most consequential social transformations of the modern era, reshaping labor markets, innovation
                  systems, and social mobility, though quality and equity remain uneven.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 2: COMPLETION & OUT-OF-SCHOOL ======== */}
            <section id="completion" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 2</span>
              <h2 className={styles.sectionHeading}>Completion &amp; Out-of-School Children</h2>
              <p className={styles.sectionLead}>
                Enrollment alone does not guarantee education. Millions of children drop out before completing primary or
                secondary school, and completion rates vary dramatically by region. UNESCO tracks the number of out-of-school
                children and adolescents; the World Bank reports completion rates.
              </p>
            </section>

            <section id="out-of-school">
              <h3><Users size={20} /> Out-of-School Children and Youth</h3>
              <p>
                After significant progress in the 2000s, the decline in out-of-school numbers stalled around 2015.
                As of 2022, approximately 64 million children of primary age, 62 million of lower-secondary age, and
                128 million of upper-secondary age were out of school, a total of about 250 million. Sub-Saharan Africa
                accounts for the largest share.
              </p>

              <PlotlyChart
                title="Out-of-School Children and Youth by Level (2000–2022)"
                data={[
                  {
                    x: OUT_OF_SCHOOL.years,
                    y: OUT_OF_SCHOOL.primaryAge,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Primary age (millions)',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: OUT_OF_SCHOOL.years,
                    y: OUT_OF_SCHOOL.lowerSecondary,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Lower secondary (millions)',
                    line: { color: '#E67E22', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: OUT_OF_SCHOOL.years,
                    y: OUT_OF_SCHOOL.upperSecondary,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Upper secondary (millions)',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 6 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Millions' },
                }}
                source={{ name: 'UNESCO Institute for Statistics (UIS)', url: 'http://data.uis.unesco.org/' }}
              />

              <h3><BarChart3 size={20} /> Primary Completion Rate by Region</h3>
              <p>
                Primary completion rates are near 100% in high-income regions but remain well below that in parts of
                sub-Saharan Africa, where conflict, poverty, and inadequate infrastructure prevent millions of children
                from finishing even basic education.
              </p>

              <PlotlyChart
                title="Primary Completion Rate by Region (circa 2022)"
                data={[{
                  x: COMPLETION_BY_REGION.regions,
                  y: COMPLETION_BY_REGION.rate,
                  type: 'bar',
                  marker: { color: COMPLETION_BY_REGION.colors },
                  text: COMPLETION_BY_REGION.rate.map(r => `${r}%`),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'Completion rate (%)', range: [0, 110] },
                  showlegend: false,
                }}
                source={{ name: 'World Bank EdStats', url: 'https://datatopics.worldbank.org/education/' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Progress has stalled since 2015</strong>
                  <p>
                    The number of out-of-school children of primary age has barely budged since 2015 and increased
                    slightly after COVID-19. At current rates, SDG 4 (quality education for all by 2030) will not be
                    met. Conflict-affected countries account for a disproportionate and growing share of out-of-school children.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 3: LEARNING OUTCOMES ======== */}
            <section id="learning" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 3</span>
              <h2 className={styles.sectionHeading}>Learning Outcomes</h2>
              <p className={styles.sectionLead}>
                Being in school is not the same as learning. The OECD&apos;s Programme for International Student
                Assessment (PISA) tests 15-year-olds in math, reading, and science across 80+ countries. The World
                Bank&apos;s &ldquo;learning poverty&rdquo; metric captures the share of 10-year-olds who cannot read a simple
                text, a stark measure of foundational skill deficits.
              </p>
            </section>

            <section id="pisa-scores">
              <h3><BookOpen size={20} /> PISA 2022: International Comparison</h3>
              <p>
                PISA 2022 tested students in 81 countries and economies. Singapore led in all three subjects. The OECD
                average declined significantly, especially in mathematics, the steepest drop in the programme&apos;s 20+ year
                history. COVID-19 disruptions are a major factor, though longer-term trends were already softening before
                the pandemic.
              </p>

              <PlotlyChart
                title="PISA 2022 Scores – Math, Reading, Science (Selected Countries)"
                data={[
                  {
                    x: PISA_2022_SCORES.countries,
                    y: PISA_2022_SCORES.math,
                    type: 'bar',
                    name: 'Math',
                    marker: { color: '#3498DB' },
                  },
                  {
                    x: PISA_2022_SCORES.countries,
                    y: PISA_2022_SCORES.reading,
                    type: 'bar',
                    name: 'Reading',
                    marker: { color: '#2ECC71' },
                  },
                  {
                    x: PISA_2022_SCORES.countries,
                    y: PISA_2022_SCORES.science,
                    type: 'bar',
                    name: 'Science',
                    marker: { color: '#F39C12' },
                  },
                ]}
                layout={{
                  xaxis: { title: '', tickangle: -30 },
                  yaxis: { title: 'Score', range: [350, 600] },
                  barmode: 'group',
                }}
                source={{ name: 'OECD PISA 2022', url: 'https://www.oecd.org/pisa/' }}
              />

              <PlotlyChart
                title="PISA Math Score Trend – OECD Average vs Singapore"
                data={[
                  {
                    x: PISA_MATH_TREND.years,
                    y: PISA_MATH_TREND.oecdAvg,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'OECD Average',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: PISA_MATH_TREND.years,
                    y: PISA_MATH_TREND.singapore,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Singapore',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 6 },
                    connectgaps: false,
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'PISA math score', range: [440, 590] },
                }}
                source={{ name: 'OECD PISA', url: 'https://www.oecd.org/pisa/' }}
              />

              <h3><AlertTriangle size={20} /> Learning Poverty</h3>
              <p>
                The World Bank defines &ldquo;learning poverty&rdquo; as the share of 10-year-olds who cannot read and
                understand a simple, age-appropriate text. Before COVID-19, the rate was already 57% in low- and
                middle-income countries. Post-pandemic estimates put it at roughly 70%, meaning seven in ten children
                in developing countries lack foundational literacy.
              </p>

              <PlotlyChart
                title="Learning Poverty by Region – Pre-COVID vs Post-COVID (%)"
                data={[
                  {
                    x: LEARNING_POVERTY.regions,
                    y: LEARNING_POVERTY.preCovid,
                    type: 'bar',
                    name: 'Pre-COVID (2019)',
                    marker: { color: '#3498DB' },
                  },
                  {
                    x: LEARNING_POVERTY.regions,
                    y: LEARNING_POVERTY.postCovid,
                    type: 'bar',
                    name: 'Post-COVID (est. 2022)',
                    marker: { color: '#E74C3C' },
                  },
                ]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: '% of 10-year-olds', range: [0, 100] },
                  barmode: 'group',
                }}
                source={{ name: 'World Bank – State of Global Learning Poverty', url: 'https://www.worldbank.org/en/topic/education/brief/learning-poverty' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>COVID-19 caused the worst education crisis in a century</strong>
                  <p>
                    At peak, 1.6 billion learners were out of school due to closures. The World Bank, UNESCO, and UNICEF
                    estimate that the pandemic erased years of learning gains in many countries. Recovery is underway but
                    uneven: the poorest children lost the most and are recovering the slowest.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 4: EDUCATION SPENDING ======== */}
            <section id="spending" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 4</span>
              <h2 className={styles.sectionHeading}>Education Spending</h2>
              <p className={styles.sectionLead}>
                Government expenditure on education, as a share of GDP and in per-pupil terms, is a key measure of
                national commitment to human capital. UNESCO and the World Bank track spending globally; disparities
                between income groups are vast.
              </p>
            </section>

            <section id="spending-trends">
              <h3><DollarSign size={20} /> Global Education Expenditure</h3>
              <p>
                Countries spend an average of 4.3% of GDP on education, though this headline figure masks enormous variation.
                UNESCO and the Education Commission recommend a benchmark of 4–6% of GDP or 15–20% of total government spending.
                Many low-income countries fall below these thresholds.
              </p>

              <PlotlyChart
                title="Global Average Government Education Expenditure (% of GDP)"
                data={[{
                  x: EDUCATION_SPENDING.years,
                  y: EDUCATION_SPENDING.global,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: '% of GDP',
                  line: { color: '#2980B9', width: 3 },
                  marker: { size: 6 },
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: '% of GDP', range: [3, 5.5] },
                  shapes: [
                    { type: 'line', x0: 2000, x1: 2022, y0: 4, y1: 4, line: { dash: 'dot', color: '#E74C3C', width: 1 } },
                  ],
                  annotations: [
                    { x: 2001, y: 4, text: 'UNESCO 4% floor', showarrow: false, yanchor: 'bottom', font: { color: '#E74C3C', size: 10 } },
                  ],
                }}
                source={{ name: 'UNESCO UIS / World Bank', url: 'http://data.uis.unesco.org/' }}
              />

              <h3><Globe size={20} /> Spending by Income Group</h3>
              <p>
                While high-income countries spend roughly 5% of GDP on education, the real gulf is in per-pupil spending: high-income
                countries spend an average of about $10,200 per student per year, compared to roughly $53 in low-income countries, a
                nearly 200-fold difference.
              </p>

              <PlotlyChart
                title="Education Spending as % of GDP by Income Group (circa 2022)"
                data={[{
                  x: SPENDING_BY_INCOME.groups,
                  y: SPENDING_BY_INCOME.pctGDP,
                  type: 'bar',
                  marker: { color: SPENDING_BY_INCOME.colors },
                  text: SPENDING_BY_INCOME.pctGDP.map(v => `${v}%`),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: '% of GDP', range: [0, 6.5] },
                  showlegend: false,
                }}
                source={{ name: 'UNESCO UIS / World Bank EdStats', url: 'https://datatopics.worldbank.org/education/' }}
              />

              <PlotlyChart
                title="Per-Pupil Spending by Income Group (USD, circa 2022)"
                data={[{
                  x: SPENDING_BY_INCOME.groups,
                  y: SPENDING_BY_INCOME.perPupilUSD,
                  type: 'bar',
                  marker: { color: SPENDING_BY_INCOME.colors },
                  text: SPENDING_BY_INCOME.perPupilUSD.map(v => `$${v.toLocaleString()}`),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'USD per pupil per year', type: 'log' },
                  showlegend: false,
                }}
                source={{ name: 'UNESCO UIS / World Bank EdStats', url: 'https://datatopics.worldbank.org/education/' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>The spending gap is a learning gap.</strong> Per-pupil expenditure is one of the strongest
                  predictors of learning outcomes. The 200-fold gap in per-pupil spending between low- and high-income
                  countries translates directly into differences in teacher quality, infrastructure, materials, and
                  technology, and ultimately into the learning poverty figures documented above.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 5: GENDER GAPS ======== */}
            <section id="gender" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 5</span>
              <h2 className={styles.sectionHeading}>Gender Gaps</h2>
              <p className={styles.sectionLead}>
                Gender parity in education has seen remarkable progress. UNESCO tracks the Gender Parity Index (GPI), the
                ratio of female to male enrollment, at each level of education. A value of 1.0 indicates parity; below 1.0
                means fewer females; above 1.0 means more females than males enrolled.
              </p>
            </section>

            <section id="gender-parity">
              <h3><TrendingUp size={20} /> Gender Parity Index Over Time</h3>
              <p>
                At primary level, gender parity has been effectively achieved globally (GPI ≈ 1.00). At secondary level,
                females now slightly outnumber males in aggregate (GPI 1.03). The most dramatic reversal is at the tertiary
                level, where women now significantly outnumber men in most regions (GPI 1.20), though South Asia and
                sub-Saharan Africa still have GPI below 1.0 at this level.
              </p>

              <PlotlyChart
                title="Gender Parity Index (Female/Male Enrollment) by Level (1970–2022)"
                data={[
                  {
                    x: GENDER_PARITY.years,
                    y: GENDER_PARITY.primary,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Primary',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: GENDER_PARITY.years,
                    y: GENDER_PARITY.secondary,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Secondary',
                    line: { color: '#E67E22', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: GENDER_PARITY.years,
                    y: GENDER_PARITY.tertiary,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Tertiary',
                    line: { color: '#9B59B6', width: 3 },
                    marker: { size: 6 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'GPI (female / male)', range: [0.3, 1.35] },
                  shapes: [
                    { type: 'line', x0: 1970, x1: 2022, y0: 1.0, y1: 1.0, line: { dash: 'dash', color: '#999', width: 1 } },
                  ],
                  annotations: [
                    { x: 2022, y: 1.0, text: 'Parity', showarrow: false, xanchor: 'left', font: { color: '#666', size: 10 } },
                  ],
                }}
                source={{ name: 'UNESCO Institute for Statistics (UIS)', url: 'http://data.uis.unesco.org/' }}
              />

              <div className={styles.infoBox}>
                <h3><GraduationCap size={20} /> A reversal at the top</h3>
                <p>
                  In most OECD countries and many middle-income nations, women now earn the majority of bachelor&apos;s and
                  master&apos;s degrees. Globally, women account for about 55% of tertiary graduates. However, persistent gaps
                  remain in STEM fields (science, technology, engineering, mathematics), in political representation, and in
                  labor market outcomes, where women still earn 20% less than men on average (ILO).
                </p>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 6: HUMAN CAPITAL IMPERATIVE ======== */}
            <section id="human-capital" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 6</span>
              <h2 className={styles.sectionHeading}>The Human Capital Imperative</h2>
              <p className={styles.sectionLead}>
                The World Bank&apos;s Human Capital Index (HCI) measures the amount of human capital a child born today can
                expect to attain by age 18, accounting for survival, schooling, and health. A score of 1.0 means full
                potential; the global average is 0.56, meaning the average child will be only 56% as productive as they
                could be with full education and health.
              </p>
            </section>

            <section id="hci">
              <h3><Landmark size={20} /> Human Capital Index by Region</h3>
              <p>
                The HCI combines years of schooling, learning-adjusted years (penalizing for low quality), child survival
                rates, and stunting/health measures. It reveals stark disparities: a child in sub-Saharan Africa (HCI 0.40)
                can expect to realize only 40% of their potential productivity, compared to 75% for a child in North America.
              </p>

              <PlotlyChart
                title="World Bank Human Capital Index by Region (2020)"
                data={[{
                  x: HUMAN_CAPITAL_INDEX.regions,
                  y: HUMAN_CAPITAL_INDEX.hci,
                  type: 'bar',
                  marker: { color: HUMAN_CAPITAL_INDEX.colors },
                  text: HUMAN_CAPITAL_INDEX.hci.map(h => h.toFixed(2)),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'HCI (0–1)', range: [0, 0.9] },
                  showlegend: false,
                }}
                source={{ name: 'World Bank Human Capital Project', url: 'https://www.worldbank.org/en/publication/human-capital' }}
              />

              <h3><BarChart3 size={20} /> Tertiary Attainment Across Countries</h3>
              <p>
                The share of working-age adults with a tertiary qualification varies widely across OECD countries, from 70%
                in South Korea to 21% in Italy. Tertiary attainment is strongly correlated with earnings, employment, and
                innovation capacity; the OECD average is 40%.
              </p>

              <PlotlyChart
                title="Tertiary Attainment Among 25–64-Year-Olds (OECD 2023, %)"
                data={[{
                  x: TERTIARY_ATTAINMENT.countries,
                  y: TERTIARY_ATTAINMENT.percent,
                  type: 'bar',
                  marker: { color: TERTIARY_ATTAINMENT.colors },
                  text: TERTIARY_ATTAINMENT.percent.map(p => `${p}%`),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -30 },
                  yaxis: { title: '%', range: [0, 80] },
                  showlegend: false,
                }}
                source={{ name: 'OECD Education at a Glance 2023', url: 'https://www.oecd.org/education/education-at-a-glance/' }}
              />

              <SectionInsight>
                <p>
                  <strong>Education is the highest-return investment in development.</strong> The World Bank estimates that
                  each additional year of schooling raises individual earnings by 8–13%. For nations, human capital accounts
                  for roughly two-thirds of wealth. Closing the learning and access gaps documented in this report would
                  yield trillions in lifetime earnings and drive faster economic convergence between countries.
                </p>
              </SectionInsight>
            </section>

            {/* ======== CONCLUSIONS ======== */}
            <section id="conclusions" className={styles.takeaways}>
              <h2><BookOpen size={20} /> The Bottom Line</h2>
              <ul>
                <li>
                  <strong>Access has expanded dramatically, but 250 million children are still out of school.</strong> Near-universal
                  primary enrollment is a genuine achievement, yet progress has stalled since 2015 and upper-secondary enrollment
                  remains low in the poorest countries.
                </li>
                <li>
                  <strong>The real crisis is learning, not just schooling.</strong> An estimated 70% of 10-year-olds in low- and
                  middle-income countries cannot read a simple text. PISA 2022 showed the largest decline in math scores ever
                  recorded. COVID-19 reversed years of fragile gains.
                </li>
                <li>
                  <strong>Spending gaps drive outcome gaps.</strong> Per-pupil spending varies nearly 200-fold between low- and
                  high-income countries. Adequate financing is necessary (though not sufficient) for quality education.
                </li>
                <li>
                  <strong>Gender parity is a success story with caveats.</strong> Girls now match or outnumber boys at every
                  level of education globally, but disparities persist in the poorest countries, in STEM fields, and in the
                  translation of education into labor market outcomes.
                </li>
                <li>
                  <strong>Human capital is the foundation of everything else.</strong> Education connects to every other challenge
                  this lab studies: climate adaptation, health outcomes, economic growth, demographic transition, food security. There
                  is no path to sustainable development that does not run through the classroom.
                </li>
              </ul>
            </section>

            {/* ======== METHODOLOGY ======== */}
            <section id="methodology" className={styles.methodology}>
              <h2>Data Sources &amp; Methodology</h2>
              <p>
                This analysis draws primarily from the UNESCO Institute for Statistics (UIS) for enrollment, completion,
                gender parity, and spending data; the World Bank EdStats and Human Capital Project for completion rates,
                learning poverty, per-pupil expenditure, and the Human Capital Index; and the OECD for PISA assessments
                and tertiary attainment data (Education at a Glance 2023).
              </p>
              <p>
                <strong>Key indicators:</strong> Gross enrollment ratio can exceed 100% due to over-age and under-age students.
                The Gender Parity Index is the ratio of female to male gross enrollment. PISA scores are on a scale where 500 was
                the original OECD average (2000); they are designed for cross-country comparison, not absolute proficiency. Learning
                poverty combines schooling access and minimum reading proficiency data.
              </p>
              <p>
                <strong>Limitations:</strong> National data quality varies; many low-income countries have incomplete or
                delayed reporting. PISA covers only 15-year-olds in school and does not include out-of-school youth, potentially
                overstating performance in countries with low enrollment. Human Capital Index estimates rely on modeled data for
                some countries. Spending figures may not capture private expenditure, which is significant in many countries.
              </p>
              <p>
                <strong>Last Updated:</strong> February 2026. Data align with UNESCO UIS (2022 reference year), World Bank HCI 2020,
                OECD PISA 2022, and OECD Education at a Glance 2023.
              </p>
            </section>

            {/* ======== RESOURCES ======== */}
            <section className={styles.resources}>
              <h2>Primary Sources</h2>
              <ul>
                <li>
                  <a href="http://data.uis.unesco.org/" target="_blank" rel="noopener noreferrer">
                    UNESCO Institute for Statistics (UIS) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://datatopics.worldbank.org/education/" target="_blank" rel="noopener noreferrer">
                    World Bank EdStats <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.oecd.org/pisa/" target="_blank" rel="noopener noreferrer">
                    OECD PISA <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.worldbank.org/en/publication/human-capital" target="_blank" rel="noopener noreferrer">
                    World Bank Human Capital Project <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.oecd.org/education/education-at-a-glance/" target="_blank" rel="noopener noreferrer">
                    OECD Education at a Glance <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.worldbank.org/en/topic/education/brief/learning-poverty" target="_blank" rel="noopener noreferrer">
                    World Bank – Learning Poverty <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.resources}>
              <h2>Further Reading</h2>
              <ul>
                <li>
                  <a href="https://gem-report-2023.unesco.org/" target="_blank" rel="noopener noreferrer">
                    UNESCO Global Education Monitoring Report <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://ourworldindata.org/global-education" target="_blank" rel="noopener noreferrer">
                    Our World in Data – Global Education <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://educationcommission.org/" target="_blank" rel="noopener noreferrer">
                    The Education Commission <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.unicef.org/education" target="_blank" rel="noopener noreferrer">
                    UNICEF Education <ExternalLink size={14} />
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
