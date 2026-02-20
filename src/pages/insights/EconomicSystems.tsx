import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, ExternalLink, AlertTriangle, TrendingUp, TrendingDown,
  Calendar, DollarSign, Globe, Users, Building, ShoppingCart,
  Scale, BookOpen, Briefcase, BarChart3, Percent, Landmark,
  PiggyBank, Wallet, Activity, Clock, Zap, Factory, Fuel
} from 'lucide-react';
import PlotlyChart from '../../components/charts/PlotlyChart';
import TableOfContents, { TOCItem } from '../../components/ui/TableOfContents';
import SectionInsight from '../../components/ui/SectionInsight';
import CiteThisReport from '../../components/ui/CiteThisReport';
import { SITE_NAME, SITE_URL } from '../../utils/constants';
import styles from '../../styles/pages/Article.module.css';

const INSIGHT_TITLE = 'Economic Systems: A Data-Driven Analysis';
const INSIGHT_DESCRIPTION = 'Global economic patterns, inequality, trade, employment, and public finance. Data from World Bank, IMF, WTO, ILO.';

// ============================================
// DATA SETS - Based on World Bank, IMF, WTO, ILO
// ============================================

// World GDP Growth (World Bank)
const GDP_GROWTH = {
  years: [2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  world: [4.5, 2.2, 4.4, 4.4, 1.8, 5.4, 2.6, 3.1, 2.8, 3.3, 2.8, -3.1, 6.0, 3.2, 3.0, 3.1],
  advanced: [3.9, 1.5, 3.2, 2.9, 0.2, 3.1, 1.2, 2.1, 1.9, 2.3, 1.7, -4.5, 5.2, 2.6, 1.5, 1.7],
  emerging: [5.8, 4.4, 7.5, 8.0, 5.7, 7.5, 5.2, 4.7, 4.4, 4.6, 3.6, -2.0, 6.8, 4.0, 4.3, 4.2],
};

// Global Trade (WTO)
const TRADE_DATA = {
  years: [2000, 2005, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024],
  merchandise_trillion: [6.3, 10.5, 16.0, 15.2, 18.4, 18.9, 15.9, 19.5, 17.5, 22.0, 24.5, 25.0, 25.5],
  services_trillion: [1.5, 2.5, 3.8, 3.9, 4.5, 5.0, 4.9, 5.8, 4.8, 5.7, 6.8, 7.2, 7.5],
};

// Unemployment (ILO)
const UNEMPLOYMENT_DATA = {
  years: [2000, 2005, 2008, 2010, 2012, 2014, 2016, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  world: [6.3, 6.0, 5.6, 6.2, 6.0, 5.8, 5.7, 5.4, 5.4, 6.9, 6.2, 5.8, 5.5, 5.3],
  advanced: [6.0, 6.5, 5.8, 8.5, 8.0, 7.2, 6.2, 5.0, 4.8, 7.0, 5.8, 4.8, 4.5, 4.3],
  emerging: [6.5, 5.8, 5.5, 5.3, 5.2, 5.1, 5.5, 5.6, 5.6, 6.8, 6.4, 6.2, 5.8, 5.6],
};

// Income Inequality - Gini Index by Region (World Bank)
const INEQUALITY_DATA = {
  regions: ['Latin America', 'Sub-Saharan Africa', 'South Asia', 'East Asia', 'Middle East', 'Europe', 'North America'],
  gini: [46, 43, 35, 38, 36, 31, 40],
  colors: ['#E74C3C', '#C0392B', '#27AE60', '#3498DB', '#9B59B6', '#2ECC71', '#E67E22'],
};

// Global Poverty (World Bank)
const POVERTY_DATA = {
  years: [1990, 1995, 2000, 2005, 2010, 2015, 2019, 2020, 2022],
  extreme_poverty_percent: [36, 31, 26, 20, 15, 10, 8.4, 9.3, 8.8],
  people_millions: [1900, 1800, 1640, 1380, 1120, 750, 659, 719, 698],
};

// E-commerce Share (Statista/UNCTAD)
const ECOMMERCE_DATA = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  share_percent: [7.4, 8.6, 10.2, 11.9, 13.6, 18.0, 19.6, 20.8, 22.3, 24.0],
};

// Debt Levels (IMF)
const DEBT_DATA = {
  years: [2000, 2005, 2008, 2010, 2015, 2019, 2020, 2021, 2022, 2023, 2024],
  global_debt_gdp: [195, 205, 210, 245, 225, 230, 256, 250, 238, 237, 240],
  government_debt_gdp: [60, 65, 70, 80, 82, 84, 99, 95, 92, 93, 95],
};

// Labor Force Participation (ILO)
const LABOR_PARTICIPATION = {
  years: [2000, 2005, 2010, 2015, 2019, 2020, 2021, 2022, 2023],
  male: [78, 77, 76, 75, 74, 72, 73, 73, 73],
  female: [52, 52, 52, 50, 48, 46, 47, 47, 47],
};

// Sector Employment Shifts (ILO)
const SECTOR_EMPLOYMENT = {
  sectors: ['Agriculture', 'Industry', 'Services'],
  year_2000: [40, 21, 39],
  year_2023: [27, 23, 50],
  colors: ['#27AE60', '#F39C12', '#3498DB'],
};

// Digital Economy (UNCTAD)
const DIGITAL_ECONOMY = {
  metrics: ['Internet Users', 'Mobile Subscriptions', 'Digital Payments', 'Cloud Revenue'],
  value_2023: [5.3, 8.6, 8.5, 0.6],
  unit: ['Billion', 'Billion', 'Trillion $', 'Trillion $'],
};

// Regional GDP Share (IMF)
const REGIONAL_GDP = {
  regions: ['North America', 'Europe', 'East Asia', 'South Asia', 'Latin America', 'Middle East', 'Africa', 'Oceania'],
  share_2000: [35, 28, 18, 4, 7, 4, 2, 2],
  share_2023: [28, 22, 28, 8, 5, 5, 3, 1],
};

// ============================================
// NEW DATA SETS - Filling Research Gaps
// ============================================

// Global Inflation Rates (IMF World Economic Outlook)
const INFLATION_DATA = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  world: [2.8, 2.9, 3.2, 3.6, 3.5, 3.2, 4.7, 8.8, 6.5, 5.2, 4.0],
  advanced: [0.3, 0.8, 1.7, 2.0, 1.4, 0.7, 3.1, 7.3, 4.6, 3.5, 2.8],
  emerging: [4.7, 4.4, 4.3, 4.8, 5.1, 5.0, 5.9, 9.9, 7.8, 6.4, 5.0],
};

// Wealth Distribution (Credit Suisse/UBS Global Wealth Report, World Inequality Database)
const WEALTH_DISTRIBUTION = {
  groups: ['Top 1%', 'Top 10%', 'Middle 40%', 'Bottom 50%'],
  share: [45.8, 76.0, 22.0, 2.0],
  colors: ['#922B21', '#E74C3C', '#F39C12', '#27AE60'],
};

// Wealth Growth by Segment Since 1995 (World Inequality Lab)
const WEALTH_GROWTH = {
  segments: ['Top 0.001%', 'Top 1%', 'Upper Classes', 'Middle 40%', 'Bottom 50%'],
  annual_growth: [5.0, 4.0, 3.0, 1.0, 0.5],
  colors: ['#922B21', '#C0392B', '#E74C3C', '#F39C12', '#27AE60'],
};

// Top 1% Wealth Share by Country (World Inequality Database)
const WEALTH_BY_COUNTRY = {
  countries: ['Russia', 'India', 'United States', 'China', 'UK', 'France', 'Europe Avg'],
  top1_share: [58, 40, 35, 31, 28, 26, 25],
  colors: ['#E74C3C', '#C0392B', '#3498DB', '#E67E22', '#9B59B6', '#2ECC71', '#27AE60'],
};

// Wages vs Productivity (ILO Global Wage Report)
const WAGES_PRODUCTIVITY = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  real_wage_growth: [1.5, 1.7, 1.8, 2.0, 1.9, 1.2, 0.5, -0.3, 0.7, 1.0, 1.3],
  productivity_growth: [2.0, 1.8, 2.1, 2.3, 2.0, 1.5, 1.0, 0.8, 1.2, 1.5, 1.7],
};

// Labor Share of Income (IMF, OECD)
const LABOR_SHARE = {
  years: [1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024],
  share: [65, 64, 63, 62, 62, 60, 58, 57, 57, 56],
};

// Energy Consumption by Source (BP Statistical Review, IEA)
const ENERGY_MIX = {
  sources: ['Oil', 'Coal', 'Natural Gas', 'Renewables', 'Hydropower', 'Nuclear'],
  share_2015: [33, 29, 24, 3, 7, 4],
  share_2025: [31, 26, 22, 9, 7, 5],
  colors: ['#2C3E50', '#7F8C8D', '#3498DB', '#27AE60', '#00BFFF', '#9B59B6'],
};

// Oil Price Volatility (IEA, EIA)
const OIL_PRICES = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  brent: [52, 44, 54, 71, 64, 42, 71, 101, 83, 80, 75],
};

// Global Population Aging (UN World Population Prospects)
const AGING_POPULATION = {
  years: [2000, 2010, 2020, 2025, 2030, 2040, 2050],
  global_65plus: [7, 8, 9, 10, 12, 14, 16],
  advanced_65plus: [14, 16, 18, 20, 23, 26, 28],
  emerging_65plus: [5, 6, 8, 9, 10, 13, 15],
};

// Regional Median Age (UN DESA)
const MEDIAN_AGE = {
  regions: ['Africa', 'South Asia', 'Latin America', 'East Asia', 'North America', 'Europe'],
  age: [19, 28, 31, 38, 38, 44],
  colors: ['#27AE60', '#2ECC71', '#F39C12', '#E67E22', '#3498DB', '#9B59B6'],
};

// Youth Unemployment by Region (ILO)
const YOUTH_UNEMPLOYMENT = {
  regions: ['Southern Europe', 'MENA', 'Sub-Saharan Africa', 'Latin America', 'Global Average'],
  rate: [28, 25, 22, 18, 13],
  colors: ['#E74C3C', '#C0392B', '#E67E22', '#F39C12', '#3498DB'],
};

// Government Debt by Country (IMF Fiscal Monitor)
const GOVT_DEBT_BY_COUNTRY = {
  countries: ['Japan', 'Italy', 'United States', 'France', 'UK', 'Germany', 'Emerging Avg'],
  debt_gdp: [260, 140, 125, 110, 100, 65, 60],
  colors: ['#922B21', '#C0392B', '#E74C3C', '#E67E22', '#F39C12', '#27AE60', '#2ECC71'],
};

// Government Debt Trends (IMF Fiscal Monitor)
const GOVT_DEBT_TRENDS = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  world: [84, 85, 86, 87, 88, 97, 96, 95, 94, 93, 92],
  advanced: [105, 106, 107, 108, 109, 122, 120, 118, 116, 114, 112],
  emerging: [50, 51, 52, 53, 54, 61, 60, 59, 58, 57, 56],
};

// Geopolitical Trade Disruptions (WTO)
const TRADE_DISRUPTIONS = {
  events: ['US-China Tensions', 'Brexit', 'Russia-Ukraine', 'Middle East', 'S. China Sea', 'Supply Chain Shift'],
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  impact_percent: [-1.5, -0.8, -2.0, -1.0, -0.5, -1.2],
  colors: ['#E74C3C', '#E67E22', '#C0392B', '#F39C12', '#9B59B6', '#3498DB'],
};

// FDI Trends (UNCTAD)
const FDI_DATA = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  inflows_trillion: [2.0, 1.9, 1.7, 1.5, 1.5, 1.0, 1.6, 1.3, 1.4, 1.5, 1.35],
};

// Table of Contents
const tocItems: TOCItem[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'growth', label: 'Part 1: Economic Growth' },
  { id: 'gdp', label: 'GDP Trends', level: 2 },
  { id: 'trade', label: 'Global Trade', level: 2 },
  { id: 'regional', label: 'Regional Shifts', level: 2 },
  { id: 'inflation', label: 'Part 2: Inflation & Monetary Policy' },
  { id: 'inflation-trends', label: 'Inflation Trends', level: 2 },
  { id: 'labor', label: 'Part 3: Labor & Employment' },
  { id: 'unemployment', label: 'Unemployment', level: 2 },
  { id: 'workforce', label: 'Workforce Changes', level: 2 },
  { id: 'wages-productivity', label: 'Wages vs Productivity', level: 2 },
  { id: 'inequality', label: 'Part 4: Inequality & Wealth' },
  { id: 'poverty', label: 'Poverty Trends', level: 2 },
  { id: 'distribution', label: 'Income Distribution', level: 2 },
  { id: 'wealth', label: 'Wealth Concentration', level: 2 },
  { id: 'transformation', label: 'Part 5: Economic Transformation' },
  { id: 'digital', label: 'Digital Economy', level: 2 },
  { id: 'energy', label: 'Energy Economics', level: 2 },
  { id: 'fiscal', label: 'Part 6: Fiscal & Demographics' },
  { id: 'debt', label: 'Debt & Sustainability', level: 2 },
  { id: 'demographics', label: 'Demographics', level: 2 },
  { id: 'geopolitics', label: 'Part 7: Geopolitical Economics' },
  { id: 'trade-disruptions', label: 'Trade Disruptions', level: 2 },
  { id: 'conclusions', label: 'Conclusions' },
  { id: 'methodology', label: 'Methodology' },
];

export default function EconomicSystems() {
  const canonicalUrl = `${SITE_URL}/insights/economic-systems`;
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
            <span className={styles.focusArea}>World Economics</span>
            <h1 className={styles.articleTitle}>Economic Systems: A Data-Driven Analysis</h1>
            <p className={styles.articleMeta}>
              Analyzing global economic patterns, inequality, trade dynamics, and the forces shaping prosperity
            </p>
            <div className={styles.lastUpdated}>
              <Calendar size={14} />
              <span>Last updated: December 2025</span>
            </div>
          </header>

          <CiteThisReport
            reportId="CL-2025-03"
            title={INSIGHT_TITLE}
            version="December 2025"
            path="/insights/economic-systems"
          />

          {/* Executive Summary */}
          <section id="summary" className={styles.executiveSummary}>
            <h2 className={styles.summaryTitle}>The Bottom Line</h2>
            <ul className={styles.summaryPoints}>
              <li>Global GDP reached <strong>$105 trillion</strong> in 2024, now 10× larger than in 1960</li>
              <li>The 2022 inflation surge hit <strong>8.8%</strong> globally (the highest in 40 years), triggering aggressive central bank responses</li>
              <li>The top 1% owns <strong>46%</strong> of global wealth while the bottom 50% owns just <strong>2%</strong></li>
              <li>Real wages fell <strong>-0.3%</strong> in 2022 while productivity still grew, meaning workers lost purchasing power</li>
              <li>Extreme poverty fell from <strong>36%</strong> (1990) to <strong>8.8%</strong> (2022), lifting 1.2 billion people out</li>
              <li>Government debt reached <strong>112%</strong> of GDP in advanced economies, the highest since WWII</li>
            </ul>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>$105T</span>
                <span className={styles.statLabel}>World GDP</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>8.8%</span>
                <span className={styles.statLabel}>2022 Inflation</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>46%</span>
                <span className={styles.statLabel}>Top 1% Wealth</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>112%</span>
                <span className={styles.statLabel}>Govt Debt/GDP</span>
              </div>
            </div>
          </section>

          <div className={styles.articleContent}>

            {/* PART 1: ECONOMIC GROWTH */}
            <section id="growth" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 1</span>
              <h2 className={styles.sectionHeading}>Economic Growth: The Big Picture</h2>
              <p className={styles.sectionLead}>
                The global economy has grown enormously over the past decades, but growth patterns 
                vary significantly across regions and over time. Understanding these dynamics is 
                essential for policy and investment decisions.
              </p>
            </section>

            {/* GDP Trends */}
            <section id="gdp">
              <h3><TrendingUp size={20} /> GDP Growth Patterns</h3>
              <p>
                GDP growth measures the expansion of economic activity. While imperfect, it remains 
                the primary indicator of economic performance and development.
              </p>

              <PlotlyChart
                title="World GDP Growth Rate (2000-2024)"
                data={[
                  {
                    x: GDP_GROWTH.years,
                    y: GDP_GROWTH.world,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'World',
                    line: { color: '#00BFFF', width: 3 },
                    marker: { size: 6 },
                    fill: 'tozeroy',
                    fillcolor: 'rgba(0, 191, 255, 0.1)',
                  },
                  {
                    x: GDP_GROWTH.years,
                    y: GDP_GROWTH.advanced,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Advanced Economies',
                    line: { color: '#9B59B6', width: 2, dash: 'dot' },
                  },
                  {
                    x: GDP_GROWTH.years,
                    y: GDP_GROWTH.emerging,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Emerging Markets',
                    line: { color: '#27AE60', width: 2, dash: 'dot' },
                  },
                  {
                    x: [2000, 2024],
                    y: [0, 0],
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Zero Growth',
                    line: { color: '#666', width: 1, dash: 'dash' },
                    showlegend: false,
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Growth Rate (%)', range: [-5, 8] },
                }}
                source={{ name: 'World Bank / IMF', url: 'https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG' }}
              />

              <SectionInsight>
                <p>
                  <strong>Emerging markets now drive global growth.</strong> Since 2000, emerging economies 
                  have consistently grown faster than advanced economies, averaging 5.1% vs 1.9% annually. 
                  The 2020 pandemic was the sharpest contraction since the Great Depression.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* Trade */}
            <section id="trade">
              <h3><Globe size={20} /> Global Trade</h3>
              <p>
                International trade has been a primary driver of economic growth, enabling 
                specialization and creating both opportunities and dependencies.
              </p>

              <PlotlyChart
                title="Global Trade Value (2000-2024)"
                data={[
                  {
                    x: TRADE_DATA.years,
                    y: TRADE_DATA.merchandise_trillion,
                    type: 'bar',
                    name: 'Merchandise',
                    marker: { color: 'rgba(52, 152, 219, 0.8)' },
                  },
                  {
                    x: TRADE_DATA.years,
                    y: TRADE_DATA.services_trillion,
                    type: 'bar',
                    name: 'Services',
                    marker: { color: 'rgba(155, 89, 182, 0.8)' },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Value (Trillion USD)' },
                  barmode: 'stack',
                }}
                source={{ name: 'World Trade Organization', url: 'https://www.wto.org/english/res_e/statis_e/statis_e.htm' }}
              />

              <SectionInsight>
                <p>
                  Global trade reached <strong>$33 trillion in 2024</strong>, a 5× increase since 2000. 
                  Services trade is growing faster than goods, driven by digital services, finance, and 
                  professional services. Recent years show increased focus on supply chain resilience.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* Regional Shifts */}
            <section id="regional">
              <h3><BarChart3 size={20} /> Regional Economic Shifts</h3>
              <p>
                The global economic center of gravity is shifting. Understanding these changes is 
                crucial for businesses, investors, and policymakers.
              </p>

              <PlotlyChart
                title="Share of World GDP by Region (2000 vs 2023)"
                data={[
                  {
                    x: REGIONAL_GDP.regions,
                    y: REGIONAL_GDP.share_2000,
                    type: 'bar',
                    name: '2000',
                    marker: { color: 'rgba(231, 76, 60, 0.7)' },
                  },
                  {
                    x: REGIONAL_GDP.regions,
                    y: REGIONAL_GDP.share_2023,
                    type: 'bar',
                    name: '2023',
                    marker: { color: 'rgba(52, 152, 219, 0.8)' },
                  },
                ]}
                layout={{
                  xaxis: { title: '', tickangle: -45 },
                  yaxis: { title: 'Share of World GDP (%)' },
                  barmode: 'group',
                }}
                height={420}
                source={{ name: 'IMF World Economic Outlook', url: 'https://www.imf.org/en/Publications/WEO' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>East Asia's share of world GDP doubled</strong> from 18% to 28% since 2000, 
                  while North America and Europe's combined share fell from 63% to 50%. This represents 
                  the most significant shift in global economic power in modern history.
                </p>
              </SectionInsight>
            </section>

            {/* PART 2: INFLATION & MONETARY POLICY */}
            <section id="inflation" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 2</span>
              <h2 className={styles.sectionHeading}>Inflation & Monetary Policy</h2>
              <p className={styles.sectionLead}>
                The 2021-2022 inflation surge was the most significant monetary shock in four decades, 
                triggering the most aggressive central bank response since the 1980s. Understanding 
                what happened, and why, is essential for economic literacy.
              </p>
            </section>

            {/* Inflation Trends */}
            <section id="inflation-trends">
              <h3><Landmark size={20} /> The Inflation Crisis</h3>
              <p>
                Inflation measures the rate at which prices rise, eroding purchasing power. After decades 
                of low and stable inflation, the world experienced a historic surge beginning in 2021.
              </p>

              <PlotlyChart
                title="Global Inflation Rates (2015-2025)"
                data={[
                  {
                    x: INFLATION_DATA.years,
                    y: INFLATION_DATA.world,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'World',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 7 },
                    fill: 'tozeroy',
                    fillcolor: 'rgba(231, 76, 60, 0.1)',
                  },
                  {
                    x: INFLATION_DATA.years,
                    y: INFLATION_DATA.advanced,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Advanced Economies',
                    line: { color: '#3498DB', width: 2, dash: 'dot' },
                  },
                  {
                    x: INFLATION_DATA.years,
                    y: INFLATION_DATA.emerging,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Emerging Markets',
                    line: { color: '#27AE60', width: 2, dash: 'dot' },
                  },
                  {
                    x: [2015, 2025],
                    y: [2, 2],
                    type: 'scatter',
                    mode: 'lines',
                    name: '2% Target',
                    line: { color: '#666', width: 2, dash: 'dash' },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Inflation Rate (%)', range: [0, 11] },
                  annotations: [{
                    x: 2022,
                    y: 8.8,
                    xref: 'x',
                    yref: 'y',
                    text: '2022: 40-year high',
                    showarrow: true,
                    arrowhead: 2,
                    ax: 40,
                    ay: -30,
                    font: { color: '#E74C3C', size: 12 },
                  }],
                }}
                source={{ name: 'IMF World Economic Outlook', url: 'https://www.imf.org/en/Publications/WEO' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>2022: The Inflation Shock</strong>
                  <p>
                    Global inflation hit <strong>8.8% in 2022</strong>, the highest in over 40 years. 
                    Advanced economies saw inflation surge from near-zero (0.7% in 2020) to 7.3% in just 
                    two years. This was driven by: pandemic-era stimulus, supply chain disruptions, 
                    and the energy price shock from Russia's invasion of Ukraine.
                  </p>
                </div>
              </div>

              <SectionInsight>
                <p>
                  <strong>The central bank response was historic.</strong> The Federal Reserve raised rates 
                  from 0% to 5.25% in 18 months, the fastest tightening cycle since the 1980s. The ECB and 
                  other central banks followed. By 2025, inflation has moderated to 4%, but remains above 
                  the 2% target in most economies.
                </p>
              </SectionInsight>

              <div className={styles.infoBox}>
                <h4><DollarSign size={18} /> Why Inflation Matters</h4>
                <p>
                  Inflation is a hidden tax on savings and wages. When prices rise faster than incomes, 
                  purchasing power falls. The 2022 surge particularly hurt lower-income households, who 
                  spend a higher share of income on essentials like food and energy. Real wages actually 
                  <strong> fell 0.3%</strong> in 2022 despite nominal wage increases.
                </p>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* PART 3: LABOR & EMPLOYMENT */}
            <section id="labor" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 3</span>
              <h2 className={styles.sectionHeading}>Labor & Employment</h2>
              <p className={styles.sectionLead}>
                Employment patterns reveal how economic changes affect individuals and households. 
                The nature of work is transforming rapidly.
              </p>
            </section>

            {/* Unemployment */}
            <section id="unemployment">
              <h3><Users size={20} /> Unemployment Trends</h3>
              <p>
                Unemployment rates provide a key indicator of economic health and labor market 
                functioning. Rates vary significantly by region and respond to economic shocks.
              </p>

              <PlotlyChart
                title="Unemployment Rate (2000-2024)"
                data={[
                  {
                    x: UNEMPLOYMENT_DATA.years,
                    y: UNEMPLOYMENT_DATA.world,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'World',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: UNEMPLOYMENT_DATA.years,
                    y: UNEMPLOYMENT_DATA.advanced,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Advanced Economies',
                    line: { color: '#3498DB', width: 2, dash: 'dot' },
                  },
                  {
                    x: UNEMPLOYMENT_DATA.years,
                    y: UNEMPLOYMENT_DATA.emerging,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Emerging Markets',
                    line: { color: '#27AE60', width: 2, dash: 'dot' },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Unemployment Rate (%)' },
                }}
                source={{ name: 'International Labour Organization', url: 'https://www.ilo.org/global/statistics-and-databases/' }}
              />

              <SectionInsight>
                <p>
                  Global unemployment spiked to <strong>6.9% in 2020</strong> during the pandemic, 
                  the highest in decades, but recovered faster than after previous crises. Labor markets have 
                  shown surprising resilience, with unemployment returning to pre-pandemic levels by 2023.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* Workforce Changes */}
            <section id="workforce">
              <h3><Briefcase size={20} /> Structural Changes in Employment</h3>
              <p>
                The structure of employment is shifting dramatically, with profound implications 
                for workers, education systems, and social safety nets.
              </p>

              <PlotlyChart
                title="Employment by Sector: 2000 vs 2023"
                data={[
                  {
                    x: SECTOR_EMPLOYMENT.sectors,
                    y: SECTOR_EMPLOYMENT.year_2000,
                    type: 'bar',
                    name: '2000',
                    marker: { color: 'rgba(231, 76, 60, 0.7)' },
                    text: SECTOR_EMPLOYMENT.year_2000.map(v => `${v}%`),
                    textposition: 'outside',
                  },
                  {
                    x: SECTOR_EMPLOYMENT.sectors,
                    y: SECTOR_EMPLOYMENT.year_2023,
                    type: 'bar',
                    name: '2023',
                    marker: { color: 'rgba(52, 152, 219, 0.8)' },
                    text: SECTOR_EMPLOYMENT.year_2023.map(v => `${v}%`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'Share of Employment (%)', range: [0, 60] },
                  barmode: 'group',
                }}
                height={380}
                source={{ name: 'ILO World Employment and Social Outlook', url: 'https://www.ilo.org/global/research/global-reports/weso/' }}
              />

              <SectionInsight>
                <p>
                  <strong>Services now employ 50% of the global workforce</strong>, up from 39% in 2000. 
                  Agricultural employment has fallen from 40% to 27%, representing a historic transformation. 
                  This shift brings higher productivity but also displacement and transition challenges.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* Wages vs Productivity */}
            <section id="wages-productivity">
              <h3><Activity size={20} /> The Productivity-Wage Gap</h3>
              <p>
                One of the most consequential economic trends of the past 40 years has been the 
                decoupling of wages from productivity. Workers are producing more but not 
                being compensated proportionally.
              </p>

              <PlotlyChart
                title="Real Wage Growth vs. Productivity Growth (2015-2025)"
                data={[
                  {
                    x: WAGES_PRODUCTIVITY.years,
                    y: WAGES_PRODUCTIVITY.productivity_growth,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Productivity Growth',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 7 },
                  },
                  {
                    x: WAGES_PRODUCTIVITY.years,
                    y: WAGES_PRODUCTIVITY.real_wage_growth,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Real Wage Growth',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 7 },
                  },
                  {
                    x: [2015, 2025],
                    y: [0, 0],
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Zero Growth',
                    line: { color: '#666', width: 1, dash: 'dash' },
                    showlegend: false,
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Annual Growth Rate (%)', range: [-1, 3] },
                  annotations: [{
                    x: 2022,
                    y: -0.3,
                    xref: 'x',
                    yref: 'y',
                    text: '2022: Real wages fell',
                    showarrow: true,
                    arrowhead: 2,
                    ax: -60,
                    ay: -30,
                    font: { color: '#E74C3C', size: 11 },
                  }],
                }}
                source={{ name: 'ILO Global Wage Report', url: 'https://www.ilo.org/global/research/global-reports/global-wage-report/' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>2022: Workers Lost Ground</strong>
                  <p>
                    In 2022, real wages actually <strong>declined by 0.3%</strong> while productivity 
                    still grew by 0.8%. This means workers' purchasing power fell even as they produced 
                    more. High inflation eroded nominal wage gains, hitting lower-income workers hardest.
                  </p>
                </div>
              </div>

              <PlotlyChart
                title="Labor Share of Income (1980-2024)"
                data={[
                  {
                    x: LABOR_SHARE.years,
                    y: LABOR_SHARE.share,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Labor Share',
                    line: { color: '#E74C3C', width: 3, shape: 'spline' },
                    marker: { size: 7 },
                    fill: 'tozeroy',
                    fillcolor: 'rgba(231, 76, 60, 0.1)',
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Labor Share of Income (%)', range: [50, 70] },
                }}
                source={{ name: 'IMF / OECD', url: 'https://www.imf.org/en/Publications/WEO' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>Labor's share of income has fallen from 65% to 56%</strong> over four decades. 
                  This 9 percentage point decline represents a massive redistribution from workers to 
                  capital owners. Factors include globalization, automation, declining union membership, 
                  and the rise of "superstar" firms with high profit margins.
                </p>
              </SectionInsight>
            </section>

            {/* PART 4: INEQUALITY & POVERTY */}
            <section id="inequality" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 4</span>
              <h2 className={styles.sectionHeading}>Inequality & Wealth</h2>
              <p className={styles.sectionLead}>
                Economic growth is only meaningful if its benefits are broadly shared. 
                The data reveals both remarkable poverty reduction and persistent inequality.
              </p>
            </section>

            {/* Poverty */}
            <section id="poverty">
              <h3><TrendingDown size={20} /> Poverty Trends</h3>
              <p>
                The reduction of extreme poverty is one of the most significant achievements of 
                the past three decades, though challenges remain.
              </p>

              <PlotlyChart
                title="Extreme Poverty (Living on Less Than $2.15/day)"
                data={[
                  {
                    x: POVERTY_DATA.years,
                    y: POVERTY_DATA.extreme_poverty_percent,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Share of Population (%)',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 7 },
                    fill: 'tozeroy',
                    fillcolor: 'rgba(231, 76, 60, 0.1)',
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Population in Extreme Poverty (%)', range: [0, 40] },
                }}
                source={{ name: 'World Bank PovcalNet', url: 'https://pip.worldbank.org/' }}
              />

              <SectionInsight variant="success">
                <p>
                  <strong>Extreme poverty fell from 36% to 8.8%</strong> between 1990 and 2022, lifting 
                  over 1.2 billion people out of poverty. This is the fastest poverty reduction in human 
                  history, driven primarily by growth in China and India. The 2020 pandemic temporarily 
                  reversed progress, adding 70 million to extreme poverty.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* Income Distribution */}
            <section id="distribution">
              <h3><Percent size={20} /> Income Inequality</h3>
              <p>
                While poverty has fallen, inequality within countries has often increased. 
                The Gini coefficient measures income distribution, where 0 = perfect equality 
                and 100 = maximum inequality.
              </p>

              <PlotlyChart
                title="Income Inequality by Region (Gini Index, 2023)"
                data={[
                  {
                    x: INEQUALITY_DATA.regions,
                    y: INEQUALITY_DATA.gini,
                    type: 'bar',
                    marker: { color: INEQUALITY_DATA.colors },
                    text: INEQUALITY_DATA.gini.map(v => `${v}`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '', tickangle: -45 },
                  yaxis: { title: 'Gini Coefficient', range: [0, 55] },
                }}
                height={420}
                source={{ name: 'World Bank', url: 'https://data.worldbank.org/indicator/SI.POV.GINI' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Inequality Varies Dramatically</strong>
                  <p>
                    Latin America has the highest inequality (Gini 46) while Europe has the lowest (31). 
                    Within-country inequality has increased in most advanced economies since 1980.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* Wealth Concentration */}
            <section id="wealth">
              <h3><PiggyBank size={20} /> Wealth Concentration</h3>
              <p>
                While income inequality is widely discussed, <strong>wealth inequality is far more extreme</strong>. 
                Wealth (accumulated assets like property, stocks, and savings) is much more concentrated than 
                annual income, and this concentration has been increasing.
              </p>

              <PlotlyChart
                title="Global Wealth Distribution (2025)"
                data={[
                  {
                    x: WEALTH_DISTRIBUTION.groups,
                    y: WEALTH_DISTRIBUTION.share,
                    type: 'bar',
                    marker: { color: WEALTH_DISTRIBUTION.colors },
                    text: WEALTH_DISTRIBUTION.share.map(v => `${v}%`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'Share of Global Wealth (%)', range: [0, 85] },
                }}
                height={400}
                source={{ name: 'UBS Global Wealth Report / World Inequality Database', url: 'https://wid.world/' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Extreme Concentration</strong>
                  <p>
                    The <strong>top 1% owns 46% of global wealth</strong>: nearly half of everything. 
                    Meanwhile, the <strong>bottom 50% owns just 2%</strong>. The wealth Gini coefficient 
                    (0.85-0.88) is far higher than the income Gini (~0.70), meaning wealth is distributed 
                    even more unequally than income.
                  </p>
                </div>
              </div>

              <PlotlyChart
                title="Wealth Growth by Segment (Annual Rate Since 1995)"
                data={[
                  {
                    x: WEALTH_GROWTH.segments,
                    y: WEALTH_GROWTH.annual_growth,
                    type: 'bar',
                    marker: { color: WEALTH_GROWTH.colors },
                    text: WEALTH_GROWTH.annual_growth.map(v => `${v}%`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '', tickangle: -20 },
                  yaxis: { title: 'Annual Growth Rate (%)', range: [0, 6] },
                }}
                height={400}
                source={{ name: 'World Inequality Lab', url: 'https://wir2022.wid.world/' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>Wealth is concentrating faster at the top.</strong> Since 1995, the wealth of 
                  the ultra-rich (top 0.001%, roughly 56,000 people) has grown at 5% annually, while the 
                  middle 40% saw just 1% growth and the bottom 50% saw less than 0.5%. This compounds 
                  over time: a 5% return doubles wealth in 14 years; a 0.5% return takes 140 years.
                </p>
              </SectionInsight>

              <PlotlyChart
                title="Top 1% Wealth Share by Country (2024)"
                data={[
                  {
                    x: WEALTH_BY_COUNTRY.countries,
                    y: WEALTH_BY_COUNTRY.top1_share,
                    type: 'bar',
                    marker: { color: WEALTH_BY_COUNTRY.colors },
                    text: WEALTH_BY_COUNTRY.top1_share.map(v => `${v}%`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'Top 1% Wealth Share (%)', range: [0, 70] },
                }}
                height={400}
                source={{ name: 'World Inequality Database', url: 'https://wid.world/' }}
              />

              <SectionInsight>
                <p>
                  <strong>Wealth concentration varies dramatically by country.</strong> In Russia, the 
                  top 1% owns 58% of national wealth, the highest of any major economy. The US (35%) and 
                  India (40%) also show high concentration. Europe has the most equal wealth distribution 
                  among developed regions, with the top 1% holding ~25%.
                </p>
              </SectionInsight>

              <div className={styles.infoBox}>
                <h4><TrendingUp size={18} /> Millionaire Boom</h4>
                <p>
                  In 2024 alone, the US added over <strong>379,000 new millionaires</strong>, more than 
                  1,000 per day. The US now accounts for nearly 40% of the world's millionaires. Globally, 
                  over <strong>500,000 individuals</strong> now have at least $30 million in assets. This 
                  elite 1% of millionaires controls 32% of ultra-high-net-worth wealth.
                </p>
              </div>
            </section>

            {/* PART 5: ECONOMIC TRANSFORMATION */}
            <section id="transformation" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 5</span>
              <h2 className={styles.sectionHeading}>Economic Transformation</h2>
              <p className={styles.sectionLead}>
                Technology and policy are reshaping economic structures in fundamental ways. 
                Understanding these transformations is essential for navigating the future.
              </p>
            </section>

            {/* Digital Economy */}
            <section id="digital">
              <h3><ShoppingCart size={20} /> Digital Economy</h3>
              <p>
                The digital economy is growing rapidly, transforming how goods and services 
                are produced, distributed, and consumed.
              </p>

              <PlotlyChart
                title="E-commerce Share of Global Retail Sales (2015-2024)"
                data={[
                  {
                    x: ECOMMERCE_DATA.years,
                    y: ECOMMERCE_DATA.share_percent,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'E-commerce Share',
                    line: { color: '#00BFFF', width: 3, shape: 'spline' },
                    marker: { size: 7 },
                    fill: 'tozeroy',
                    fillcolor: 'rgba(0, 191, 255, 0.1)',
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Share of Retail Sales (%)', range: [0, 30] },
                }}
                source={{ name: 'Statista / UNCTAD', url: 'https://unctad.org/topic/ecommerce-and-digital-economy' }}
              />

              <SectionInsight>
                <p>
                  <strong>E-commerce tripled its share</strong> from 7% to 24% of retail since 2015, 
                  accelerated by the pandemic. Over 5 billion people now use the internet. Digital 
                  payments exceed $8.5 trillion annually, reshaping financial systems globally.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* Energy Economics */}
            <section id="energy">
              <h3><Fuel size={20} /> Energy Economics</h3>
              <p>
                Energy is the lifeblood of the global economy. Energy prices, supply disruptions, 
                and the transition to renewables have profound economic implications for every sector 
                and country.
              </p>

              <PlotlyChart
                title="Global Energy Mix: 2015 vs 2025"
                data={[
                  {
                    x: ENERGY_MIX.sources,
                    y: ENERGY_MIX.share_2015,
                    type: 'bar',
                    name: '2015',
                    marker: { color: 'rgba(231, 76, 60, 0.7)' },
                    text: ENERGY_MIX.share_2015.map(v => `${v}%`),
                    textposition: 'outside',
                  },
                  {
                    x: ENERGY_MIX.sources,
                    y: ENERGY_MIX.share_2025,
                    type: 'bar',
                    name: '2025',
                    marker: { color: 'rgba(52, 152, 219, 0.8)' },
                    text: ENERGY_MIX.share_2025.map(v => `${v}%`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'Share of Global Energy (%)', range: [0, 40] },
                  barmode: 'group',
                }}
                height={400}
                source={{ name: 'BP Statistical Review / IEA', url: 'https://www.iea.org/reports/world-energy-outlook-2025' }}
              />

              <SectionInsight>
                <p>
                  <strong>Fossil fuels still dominate</strong> at 79% of global energy (down from 86% in 2015). 
                  Renewables have tripled from 3% to 9%, but the transition is slower than needed for 
                  climate targets. The energy mix varies dramatically by country: some regions remain 
                  80%+ coal-dependent while others approach 50% renewables.
                </p>
              </SectionInsight>

              <PlotlyChart
                title="Oil Price Volatility (Brent Crude, 2015-2025)"
                data={[
                  {
                    x: OIL_PRICES.years,
                    y: OIL_PRICES.brent,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Brent Crude',
                    line: { color: '#2C3E50', width: 3 },
                    marker: { size: 7 },
                    fill: 'tozeroy',
                    fillcolor: 'rgba(44, 62, 80, 0.1)',
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Price ($/barrel)', range: [0, 120] },
                  annotations: [
                    {
                      x: 2020,
                      y: 42,
                      text: 'COVID crash',
                      showarrow: true,
                      arrowhead: 2,
                      ax: -40,
                      ay: -30,
                      font: { size: 11 },
                    },
                    {
                      x: 2022,
                      y: 101,
                      text: 'Ukraine war spike',
                      showarrow: true,
                      arrowhead: 2,
                      ax: 40,
                      ay: -25,
                      font: { size: 11 },
                    },
                  ],
                }}
                source={{ name: 'IEA / EIA', url: 'https://www.eia.gov/dnav/pet/pet_pri_spt_s1_d.htm' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Energy Price Volatility</strong>
                  <p>
                    Oil prices collapsed to <strong>$42 in 2020</strong> during COVID, then surged to 
                    <strong> $101 in 2022</strong> following Russia's invasion of Ukraine, a 140% swing. 
                    This volatility rippled through the global economy, contributing significantly to 
                    the 2022 inflation crisis and straining energy-dependent industries and households.
                  </p>
                </div>
              </div>
            </section>

            {/* PART 6: FISCAL & DEMOGRAPHICS */}
            <section id="fiscal" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 6</span>
              <h2 className={styles.sectionHeading}>Fiscal Policy & Demographics</h2>
              <p className={styles.sectionLead}>
                Government debt levels and demographic shifts are slow-moving but powerful forces that 
                shape economic possibilities for decades. Both are reaching historic inflection points.
              </p>
            </section>

            {/* Debt */}
            <section id="debt">
              <h3><Building size={20} /> Debt & Fiscal Sustainability</h3>
              <p>
                Debt levels have reached historic highs, raising questions about fiscal 
                sustainability and future policy flexibility.
              </p>

              <PlotlyChart
                title="Government Debt Trends (% of GDP, 2015-2025)"
                data={[
                  {
                    x: GOVT_DEBT_TRENDS.years,
                    y: GOVT_DEBT_TRENDS.world,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'World Average',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: GOVT_DEBT_TRENDS.years,
                    y: GOVT_DEBT_TRENDS.advanced,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Advanced Economies',
                    line: { color: '#3498DB', width: 2 },
                    marker: { size: 5 },
                  },
                  {
                    x: GOVT_DEBT_TRENDS.years,
                    y: GOVT_DEBT_TRENDS.emerging,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Emerging Markets',
                    line: { color: '#27AE60', width: 2 },
                    marker: { size: 5 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Debt (% of GDP)', range: [40, 130] },
                  annotations: [{
                    x: 2020,
                    y: 122,
                    text: 'Pandemic spike',
                    showarrow: true,
                    arrowhead: 2,
                    ax: 40,
                    ay: -20,
                    font: { size: 11 },
                  }],
                }}
                source={{ name: 'IMF Fiscal Monitor', url: 'https://www.imf.org/en/Publications/FM' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>2020: The Fiscal Turning Point</strong>
                  <p>
                    Pandemic-era spending caused government debt in advanced economies to jump from 
                    <strong> 109% to 122% of GDP</strong> in a single year, a 13 percentage point spike. 
                    While debt has moderated since, it remains at the highest sustained levels since WWII.
                  </p>
                </div>
              </div>

              <PlotlyChart
                title="Government Debt by Country (% of GDP, 2025)"
                data={[
                  {
                    x: GOVT_DEBT_BY_COUNTRY.countries,
                    y: GOVT_DEBT_BY_COUNTRY.debt_gdp,
                    type: 'bar',
                    marker: { color: GOVT_DEBT_BY_COUNTRY.colors },
                    text: GOVT_DEBT_BY_COUNTRY.debt_gdp.map(v => `${v}%`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'Debt (% of GDP)', range: [0, 290] },
                }}
                height={400}
                source={{ name: 'IMF Fiscal Monitor', url: 'https://www.imf.org/en/Publications/FM' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>Japan's debt (260% of GDP)</strong> is the highest of any major economy, yet 
                  interest costs remain low due to domestic ownership and central bank purchases. The 
                  US (125%), Italy (140%), and France (110%) face different dynamics with more foreign 
                  holders. Rising interest rates have increased debt servicing costs globally, with 
                  the US alone paying over $1 trillion annually in interest.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* Demographics */}
            <section id="demographics">
              <h3><Users size={20} /> Demographic Shifts</h3>
              <p>
                Demographic change is a slow-moving but powerful force. Population aging in developed 
                countries and youth bulges in developing regions create both challenges and opportunities 
                for economic systems.
              </p>

              <PlotlyChart
                title="Population Aging: 65+ Share (2000-2050)"
                data={[
                  {
                    x: AGING_POPULATION.years,
                    y: AGING_POPULATION.global_65plus,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Global',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 7 },
                  },
                  {
                    x: AGING_POPULATION.years,
                    y: AGING_POPULATION.advanced_65plus,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Advanced Economies',
                    line: { color: '#9B59B6', width: 2, dash: 'dot' },
                    marker: { size: 5 },
                  },
                  {
                    x: AGING_POPULATION.years,
                    y: AGING_POPULATION.emerging_65plus,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Emerging Markets',
                    line: { color: '#27AE60', width: 2, dash: 'dot' },
                    marker: { size: 5 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Population 65+ (%)', range: [0, 32] },
                }}
                source={{ name: 'UN World Population Prospects', url: 'https://population.un.org/wpp/' }}
              />

              <SectionInsight>
                <p>
                  <strong>By 2050, 28% of people in advanced economies will be 65+</strong>, up from 14% in 
                  2000. This doubles the old-age dependency ratio, straining pension systems and healthcare. 
                  Meanwhile, emerging markets are aging rapidly too, from 5% to 15% over the same period.
                </p>
              </SectionInsight>

              <PlotlyChart
                title="Regional Median Age (2025)"
                data={[
                  {
                    x: MEDIAN_AGE.regions,
                    y: MEDIAN_AGE.age,
                    type: 'bar',
                    marker: { color: MEDIAN_AGE.colors },
                    text: MEDIAN_AGE.age.map(v => `${v} yrs`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'Median Age (Years)', range: [0, 52] },
                }}
                height={380}
                source={{ name: 'UN DESA', url: 'https://population.un.org/wpp/' }}
              />

              <div className={styles.infoBox}>
                <h4><Clock size={18} /> The Demographic Divide</h4>
                <p>
                  The median person in <strong>Africa is 19 years old</strong>; in <strong>Europe, 44</strong>. 
                  This 25-year gap represents vastly different economic realities: Africa faces youth 
                  unemployment challenges but has demographic potential; Europe faces labor shortages 
                  and pension pressures. Some countries (Japan, Italy, Germany) are already experiencing 
                  population decline.
                </p>
              </div>

              <PlotlyChart
                title="Youth Unemployment by Region (2024)"
                data={[
                  {
                    x: YOUTH_UNEMPLOYMENT.regions,
                    y: YOUTH_UNEMPLOYMENT.rate,
                    type: 'bar',
                    marker: { color: YOUTH_UNEMPLOYMENT.colors },
                    text: YOUTH_UNEMPLOYMENT.rate.map(v => `${v}%`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '', tickangle: -20 },
                  yaxis: { title: 'Youth Unemployment (%)', range: [0, 35] },
                }}
                height={380}
                source={{ name: 'ILO', url: 'https://www.ilo.org/global/statistics-and-databases/' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>Youth unemployment exceeds 25% in Southern Europe and the Middle East</strong>, more 
                  than double the global average. This represents both a human tragedy and wasted economic 
                  potential. Regions with young populations but limited opportunities face risks of social 
                  instability and emigration.
                </p>
              </SectionInsight>
            </section>

            {/* PART 7: GEOPOLITICAL ECONOMICS */}
            <section id="geopolitics" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 7</span>
              <h2 className={styles.sectionHeading}>Geopolitical Economics</h2>
              <p className={styles.sectionLead}>
                Political events and international relations increasingly shape economic outcomes. 
                Trade tensions, conflicts, and shifting alliances have measurable impacts on growth, 
                investment, and prosperity.
              </p>
            </section>

            {/* Trade Disruptions */}
            <section id="trade-disruptions">
              <h3><Globe size={20} /> Trade Disruptions & Tensions</h3>
              <p>
                The era of accelerating globalization has given way to a more fractured landscape. 
                Trade tensions, sanctions, and supply chain reshoring have tangible economic costs.
              </p>

              <PlotlyChart
                title="Impact of Geopolitical Events on Global Trade (2020-2025)"
                data={[
                  {
                    x: TRADE_DISRUPTIONS.events,
                    y: TRADE_DISRUPTIONS.impact_percent,
                    type: 'bar',
                    marker: { color: TRADE_DISRUPTIONS.colors },
                    text: TRADE_DISRUPTIONS.impact_percent.map(v => `${v}%`),
                    textposition: 'outside',
                  },
                ]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'Impact on Global Trade (%)', range: [-2.5, 0.5] },
                }}
                height={420}
                source={{ name: 'WTO Annual Report', url: 'https://www.wto.org/english/res_e/reser_e/annual_report_e.htm' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Cumulative Impact: ~7% Trade Reduction</strong>
                  <p>
                    Geopolitical events since 2020 have cumulatively reduced global trade by approximately 
                    <strong> 7%</strong> from what it would otherwise have been. The Russia-Ukraine conflict 
                    alone caused a 2% reduction through energy disruptions, sanctions, and supply chain 
                    disruptions.
                  </p>
                </div>
              </div>

              <PlotlyChart
                title="Foreign Direct Investment Flows (2015-2025)"
                data={[
                  {
                    x: FDI_DATA.years,
                    y: FDI_DATA.inflows_trillion,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Global FDI Inflows',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 7 },
                    fill: 'tozeroy',
                    fillcolor: 'rgba(52, 152, 219, 0.1)',
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'FDI Inflows (Trillion USD)', range: [0, 2.5] },
                  annotations: [{
                    x: 2020,
                    y: 1.0,
                    text: 'Pandemic collapse',
                    showarrow: true,
                    arrowhead: 2,
                    ax: -50,
                    ay: -30,
                    font: { size: 11 },
                  }],
                }}
                source={{ name: 'UNCTAD World Investment Report', url: 'https://unctad.org/topic/investment/world-investment-report' }}
              />

              <SectionInsight>
                <p>
                  <strong>FDI flows remain 30% below pre-2016 levels.</strong> After peaking near $2 trillion 
                  in 2015-2016, foreign direct investment collapsed during COVID and has not fully recovered. 
                  Geopolitical uncertainty, rising protectionism, and supply chain reshoring have made 
                  companies more cautious about cross-border investments.
                </p>
              </SectionInsight>

              <div className={styles.infoBox}>
                <h4><Factory size={18} /> The New Economic Order</h4>
                <p>
                  We are witnessing a restructuring of the global economic order. Key trends include:
                  <strong> "friend-shoring"</strong> (relocating supply chains to allied nations), 
                  <strong> industrial policy revival</strong> (governments subsidizing strategic industries), 
                  and <strong> economic security</strong> taking precedence over pure efficiency. The 
                  number of trade restrictions imposed annually has increased from 80 (2020) to 120 (2025).
                </p>
              </div>
            </section>

            {/* CONCLUSIONS */}
            <section id="conclusions" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Synthesis</span>
              <h2 className={styles.sectionHeading}>Conclusions</h2>
              <p className={styles.sectionLead}>
                The data reveals an economic system in transformation, with remarkable progress 
                alongside deep structural challenges that demand attention.
              </p>
            </section>

            <div className={styles.infoBox}>
              <h3><Scale size={18} /> Key Conclusions</h3>
              <ul>
                <li><strong>Growth is real but uneven:</strong> Global GDP has grown 10× since 1960, but benefits vary dramatically by region and income level</li>
                <li><strong>Inflation returned with a vengeance:</strong> The 2022 surge to 8.8% was the highest in 40 years, a reminder that price stability cannot be taken for granted</li>
                <li><strong>Wealth inequality is extreme:</strong> The top 1% owns 46% of global wealth while the bottom 50% owns just 2%, and this gap is widening</li>
                <li><strong>Workers are falling behind:</strong> Real wages declined in 2022 while productivity grew; labor's share of income has fallen from 65% to 56% over 40 years</li>
                <li><strong>Poverty reduction is historic:</strong> 1.2 billion lifted from extreme poverty since 1990, but the remaining 700 million in extreme poverty are the hardest to reach</li>
                <li><strong>Demographics are diverging:</strong> Europe's median age is 44, Africa's is 19, creating vastly different economic challenges and opportunities</li>
                <li><strong>Debt constrains policy:</strong> Government debt at 112% of GDP in advanced economies limits fiscal flexibility for future crises</li>
                <li><strong>Geopolitics is reshaping economics:</strong> Trade tensions have reduced global trade by ~7%; FDI remains 30% below 2015 peaks</li>
              </ul>
            </div>

            <section className={styles.takeaways}>
              <h2><BookOpen size={20} /> The Bottom Line</h2>
              <ul>
                <li>
                  <strong>The productivity-wage gap is unsustainable.</strong> For 40 years, workers have 
                  produced more while receiving proportionally less. A 9 percentage point decline in 
                  labor's share represents a massive redistribution from workers to capital owners. This 
                  fuels inequality and undermines social cohesion.
                </li>
                <li>
                  <strong>Wealth concentration creates political economy problems.</strong> When the top 1% 
                  owns nearly half of everything while the bottom half owns 2%, economic power translates 
                  into political power. This dynamic shapes policies in ways that often reinforce concentration.
                </li>
                <li>
                  <strong>The inflation crisis revealed vulnerabilities.</strong> The 2022 surge showed how 
                  supply chain disruptions, energy dependence, and monetary policy all interact. Central 
                  banks responded aggressively, but the underlying vulnerabilities remain.
                </li>
                <li>
                  <strong>Demographics will define the next 30 years.</strong> Aging populations in developed 
                  economies will strain pensions and healthcare; youth bulges in developing regions need 
                  jobs. These slow-moving forces will reshape everything from fiscal policy to migration.
                </li>
                <li>
                  <strong>Globalization is being restructured.</strong> Pure economic efficiency is giving way 
                  to security, resilience, and geopolitical alignment. The costs of this transition, through 
                  reduced trade and investment, are real, even if the benefits in terms of risk reduction 
                  are harder to measure.
                </li>
              </ul>
            </section>

            {/* Methodology */}
            <section id="methodology" className={styles.methodology}>
              <h2>Data Sources & Methodology</h2>
              <p>
                This analysis draws from primary authoritative sources: IMF World Economic Outlook 
                and Fiscal Monitor for growth, inflation, and debt data; World Bank for poverty and 
                development indicators; ILO Global Wage Report for labor market statistics; WTO for 
                trade data; UN Population Division for demographics; Credit Suisse/UBS Global Wealth 
                Report and World Inequality Database for wealth distribution; BP Statistical Review 
                and IEA for energy data; and UNCTAD for investment statistics.
              </p>
              <p>
                <strong>Limitations:</strong> GDP measures market activity, not welfare or sustainability. 
                Wealth data relies on surveys and estimates with significant uncertainty. Unemployment 
                definitions vary by country. Informal economic activity is underrepresented globally. 
                Poverty lines are somewhat arbitrary thresholds. Future projections (post-2025) involve 
                scenario assumptions.
              </p>
              <p>
                <strong>Last Updated:</strong> December 2025. Inflation data incorporates IMF WEO 
                October 2025. Wealth data from UBS Global Wealth Report 2025 and World Inequality 
                Lab 2026 preview. Debt figures from IMF Fiscal Monitor October 2025.
              </p>
            </section>

            <section className={styles.resources}>
              <h2>Primary Sources</h2>
              <ul>
                <li>
                  <a href="https://www.imf.org/en/Publications/WEO" target="_blank" rel="noopener noreferrer">
                    IMF World Economic Outlook <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.imf.org/en/Publications/FM" target="_blank" rel="noopener noreferrer">
                    IMF Fiscal Monitor <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer">
                    World Bank Open Data <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.ilo.org/global/research/global-reports/global-wage-report/" target="_blank" rel="noopener noreferrer">
                    ILO Global Wage Report <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://wid.world/" target="_blank" rel="noopener noreferrer">
                    World Inequality Database <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.wto.org/english/res_e/statis_e/statis_e.htm" target="_blank" rel="noopener noreferrer">
                    WTO Statistics <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://population.un.org/wpp/" target="_blank" rel="noopener noreferrer">
                    UN World Population Prospects <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://unctad.org/topic/investment/world-investment-report" target="_blank" rel="noopener noreferrer">
                    UNCTAD World Investment Report <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.iea.org/reports/world-energy-outlook-2025" target="_blank" rel="noopener noreferrer">
                    IEA World Energy Outlook <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://pip.worldbank.org/" target="_blank" rel="noopener noreferrer">
                    World Bank Poverty & Inequality Platform <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.resources}>
              <h2>Further Reading</h2>
              <ul>
                <li>
                  <a href="https://wir2022.wid.world/" target="_blank" rel="noopener noreferrer">
                    World Inequality Report 2022 <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://ourworldindata.org/economic-growth" target="_blank" rel="noopener noreferrer">
                    Our World in Data - Economic Growth <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://ourworldindata.org/income-inequality" target="_blank" rel="noopener noreferrer">
                    Our World in Data - Income Inequality <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://unctad.org/topic/ecommerce-and-digital-economy" target="_blank" rel="noopener noreferrer">
                    UNCTAD Digital Economy Report <ExternalLink size={14} />
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
