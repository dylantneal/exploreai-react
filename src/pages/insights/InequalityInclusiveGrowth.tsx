import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, ExternalLink, AlertTriangle, Calendar, Scale,
  TrendingUp, TrendingDown, Users, DollarSign, Globe, MapPin, Landmark, BookOpen
} from 'lucide-react';
import PlotlyChart from '../../components/charts/PlotlyChart';
import TableOfContents, { TOCItem } from '../../components/ui/TableOfContents';
import SectionInsight from '../../components/ui/SectionInsight';
import CiteThisReport from '../../components/ui/CiteThisReport';
import { SITE_NAME, SITE_URL } from '../../utils/constants';
import styles from '../../styles/pages/Article.module.css';

const INSIGHT_TITLE = 'Inequality & Inclusive Growth: A Data-Driven Analysis';
const INSIGHT_DESCRIPTION = 'Income and wealth distribution, top shares, extreme poverty, gender wage gaps, regional disparities, and social mobility. Data from WID, World Bank, OECD, and ILO.';

// ============================================
// DATA SETS – WID, World Bank PIP, OECD, ILO
// ============================================

// Global income shares (World Inequality Database 2022)
const GLOBAL_INCOME_SHARES = {
  groups: ['Bottom 50%', 'Middle 40%', 'Top 10%', 'Top 1%'],
  share: [8.5, 39.5, 52.0, 19.0],
  colors: ['#E74C3C', '#F39C12', '#3498DB', '#1A1A2E'],
};

// Top 10% income share by region (WID 2022)
const TOP10_BY_REGION = {
  regions: ['Europe', 'East Asia', 'North America', 'Sub-Saharan Africa', 'Latin America', 'South & SE Asia', 'MENA'],
  share: [36, 43, 47, 54, 55, 57, 58],
  colors: ['#2ECC71', '#3498DB', '#E67E22', '#E74C3C', '#C0392B', '#9B59B6', '#8E44AD'],
};

// Global wealth distribution (WID / Credit Suisse Global Wealth Report)
const GLOBAL_WEALTH_SHARES = {
  groups: ['Bottom 50%', 'Middle 40%', 'Top 10%', 'Top 1%'],
  share: [2, 22, 76, 38],
  colors: ['#E74C3C', '#F39C12', '#3498DB', '#1A1A2E'],
};

// Top 1% wealth share trend (WID)
const TOP1_WEALTH_TREND = {
  years: [1995, 2000, 2005, 2010, 2015, 2020, 2022],
  global: [30.5, 32.6, 34.1, 36.8, 37.2, 37.8, 38.0],
};

// Gini coefficient – selected countries (World Bank, latest available ~2019–2022)
const GINI_BY_COUNTRY = {
  countries: ['South Africa', 'Brazil', 'Mexico', 'United States', 'China', 'India', 'United Kingdom', 'Japan', 'Germany', 'Norway'],
  gini: [63.0, 52.9, 45.4, 39.8, 38.2, 35.7, 35.1, 32.9, 31.7, 27.7],
  colors: ['#922B21', '#C0392B', '#E74C3C', '#E67E22', '#F39C12', '#F1C40F', '#3498DB', '#2980B9', '#2ECC71', '#27AE60'],
};

// Extreme poverty – $2.15/day (World Bank PIP) – millions and percentage
const EXTREME_POVERTY = {
  years: [1990, 1999, 2005, 2010, 2015, 2019, 2020, 2022],
  millions: [1896, 1695, 1316, 1077, 740, 659, 719, 692],
  percent: [38.0, 29.0, 21.5, 15.7, 10.1, 8.4, 9.3, 8.6],
};

// Poverty headcount by region (World Bank PIP, $2.15/day, 2019)
const POVERTY_BY_REGION = {
  regions: ['Sub-Saharan Africa', 'MENA', 'South Asia', 'Latin America & Carib.', 'Europe & Central Asia', 'East Asia & Pacific'],
  percent: [35.0, 7.0, 5.0, 3.4, 1.3, 1.2],
  colors: ['#E74C3C', '#9B59B6', '#F39C12', '#E67E22', '#3498DB', '#2ECC71'],
};

// Gender wage gap (OECD 2023 + ILO) – % less women earn compared to men (median full-time)
const GENDER_WAGE_GAP = {
  countries: ['South Korea', 'Japan', 'United States', 'Canada', 'United Kingdom', 'Germany', 'OECD Average', 'France', 'Australia', 'Norway', 'Belgium'],
  gap: [31.2, 21.3, 17.0, 16.1, 14.3, 13.6, 11.9, 11.6, 9.9, 4.5, 3.4],
  colors: ['#922B21', '#C0392B', '#E74C3C', '#E67E22', '#F39C12', '#F1C40F', '#95A5A6', '#3498DB', '#2980B9', '#27AE60', '#2ECC71'],
};

// Female labor force participation rate (ILO modeled, 15+ age) – global trend
const FEMALE_LFPR = {
  years: [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2023],
  female: [51.0, 50.4, 49.6, 49.0, 48.1, 47.4, 46.0, 47.3],
  male: [79.7, 78.8, 77.9, 76.6, 75.1, 74.0, 72.3, 72.0],
};

// Female LFPR by region (ILO 2023, 15+ age, percent)
const FEMALE_LFPR_REGION = {
  regions: ['East Asia & Pacific', 'Sub-Saharan Africa', 'Europe & Central Asia', 'Latin America & Carib.', 'North America', 'South Asia', 'MENA'],
  female: [59, 58, 49, 50, 55, 24, 20],
  male: [74, 69, 66, 74, 67, 76, 72],
  colors: ['#3498DB', '#E74C3C', '#2ECC71', '#E67E22', '#27AE60', '#F39C12', '#9B59B6'],
};

// Intergenerational earnings elasticity (OECD / World Bank GDIM) – higher = less mobile
const SOCIAL_MOBILITY = {
  countries: ['Denmark', 'Norway', 'Finland', 'Canada', 'Australia', 'Japan', 'Germany', 'France', 'United States', 'United Kingdom', 'China', 'Brazil'],
  elasticity: [0.15, 0.17, 0.18, 0.19, 0.26, 0.34, 0.32, 0.41, 0.47, 0.50, 0.60, 0.58],
  colors: ['#27AE60', '#2ECC71', '#1ABC9C', '#16A085', '#3498DB', '#2980B9', '#3498DB', '#F39C12', '#E67E22', '#E74C3C', '#C0392B', '#922B21'],
};

// Public social spending (OECD 2022) – % of GDP
const SOCIAL_SPENDING = {
  countries: ['France', 'Finland', 'Denmark', 'Germany', 'Japan', 'United Kingdom', 'OECD Average', 'United States', 'Australia', 'South Korea'],
  pctGDP: [31.6, 29.0, 28.3, 26.7, 24.0, 21.2, 21.1, 18.7, 17.3, 14.8],
  colors: ['#3498DB', '#2980B9', '#1ABC9C', '#2ECC71', '#F39C12', '#E67E22', '#95A5A6', '#E74C3C', '#C0392B', '#922B21'],
};

// Table of Contents
const tocItems: TOCItem[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'income-inequality', label: 'Part 1: Income Inequality' },
  { id: 'wealth-concentration', label: 'Part 2: Wealth Concentration' },
  { id: 'poverty', label: 'Part 3: Poverty & Shared Prosperity' },
  { id: 'gender', label: 'Part 4: Gender Economic Gaps' },
  { id: 'regional', label: 'Part 5: Regional Disparities & Mobility' },
  { id: 'policy', label: 'Part 6: Policy & Redistribution' },
  { id: 'conclusions', label: 'Conclusions' },
  { id: 'methodology', label: 'Methodology' },
];

export default function InequalityInclusiveGrowth() {
  const canonicalUrl = `${SITE_URL}/insights/inequality-inclusive-growth`;
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
            <span className={styles.focusArea}>Inequality &amp; Inclusive Growth</span>
            <h1 className={styles.articleTitle}>{INSIGHT_TITLE}</h1>
            <p className={styles.articleMeta}>
              Income and wealth distribution, top shares, extreme poverty, gender wage gaps, regional disparities, social mobility, and redistribution. Data from WID, World Bank, OECD, and ILO.
            </p>
            <div className={styles.lastUpdated}>
              <Calendar size={14} />
              <span>Last updated: February 2026</span>
            </div>
          </header>

          <CiteThisReport
            reportId="CL-2025-09"
            title={INSIGHT_TITLE}
            version="February 2026"
            path="/insights/inequality-inclusive-growth"
          />

          <section id="summary" className={styles.executiveSummary}>
            <h2 className={styles.summaryTitle}>The Bottom Line</h2>
            <ul className={styles.summaryPoints}>
              <li>The <strong>top 10% of earners</strong> capture 52% of global income; the <strong>bottom 50%</strong> receive just 8.5% (WID 2022)</li>
              <li>Wealth is even more concentrated: the <strong>top 1% owns 38%</strong> of global wealth, while the bottom half owns about 2%</li>
              <li>Extreme poverty ($2.15/day) fell from <strong>38% in 1990 to 8.6% in 2022</strong>, one of the greatest achievements in human history, but progress has slowed and COVID-19 pushed millions back into poverty</li>
              <li>Women earn roughly <strong>20% less than men</strong> globally (ILO); the gender wage gap persists in every country, from 3% in Belgium to 31% in South Korea</li>
              <li>Social mobility varies enormously: in the Nordic countries a child&apos;s earnings are largely independent of their parents&apos;; in the US, UK, Brazil, and China, <strong>parental income strongly predicts outcomes</strong></li>
            </ul>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>52%</span>
                <span className={styles.statLabel}>Top 10% income share</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>38%</span>
                <span className={styles.statLabel}>Top 1% wealth share</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>692M</span>
                <span className={styles.statLabel}>In extreme poverty</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>~20%</span>
                <span className={styles.statLabel}>Global gender wage gap</span>
              </div>
            </div>
          </section>

          <div className={styles.articleContent}>

            {/* ======== PART 1: INCOME INEQUALITY ======== */}
            <section id="income-inequality" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 1</span>
              <h2 className={styles.sectionHeading}>Income Inequality: The Global Picture</h2>
              <p className={styles.sectionLead}>
                The World Inequality Database (WID), founded by Thomas Piketty, Emmanuel Saez, and Gabriel Zucman, provides
                the most comprehensive data on global income distribution. Its findings reveal a world where economic growth
                has been distributed extraordinarily unevenly.
              </p>
            </section>

            <section id="income-shares">
              <h3><Scale size={20} /> Global Income Distribution</h3>
              <p>
                As of 2022, the top 10% of earners worldwide capture 52% of total global income, while the bottom 50% (nearly
                4 billion people) receive just 8.5%. The top 1% alone takes 19% of all income. Between-country inequality has
                narrowed since 2000 (driven by growth in China and India), but within-country inequality has widened in most
                major economies.
              </p>

              <PlotlyChart
                title="Global Income Distribution by Group (WID 2022)"
                data={[{
                  labels: GLOBAL_INCOME_SHARES.groups,
                  values: GLOBAL_INCOME_SHARES.share,
                  type: 'pie',
                  hole: 0.45,
                  marker: { colors: GLOBAL_INCOME_SHARES.colors },
                  textinfo: 'label+percent',
                  textposition: 'outside',
                }]}
                layout={{
                  showlegend: false,
                  annotations: [{
                    text: '100%<br>of income',
                    showarrow: false,
                    font: { size: 13, color: '#666' },
                    x: 0.5,
                    y: 0.5,
                  }],
                }}
                source={{ name: 'World Inequality Database (WID)', url: 'https://wid.world/' }}
              />

              <h3><Globe size={20} /> Top 10% Income Share by Region</h3>
              <p>
                Regional inequality varies considerably. Europe has the lowest top-10% share (36%), reflecting decades of
                progressive taxation and social spending. The Middle East and North Africa (MENA) has the highest (58%),
                followed by South and Southeast Asia (57%) and Latin America (55%).
              </p>

              <PlotlyChart
                title="Top 10% Income Share by Region (WID 2022)"
                data={[{
                  x: TOP10_BY_REGION.regions,
                  y: TOP10_BY_REGION.share,
                  type: 'bar',
                  marker: { color: TOP10_BY_REGION.colors },
                  text: TOP10_BY_REGION.share.map(s => `${s}%`),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'Top 10% share (%)', range: [0, 70] },
                  showlegend: false,
                }}
                source={{ name: 'World Inequality Database (WID)', url: 'https://wid.world/' }}
              />

              <h3><TrendingUp size={20} /> Gini Coefficient by Country</h3>
              <p>
                The Gini coefficient (0 = perfect equality, 100 = one person has everything) is the most widely used
                summary measure of income inequality. South Africa (63) is the most unequal major economy; the Nordic
                countries (~27–28) are the most equal. The United States (40) is among the most unequal high-income
                countries.
              </p>

              <PlotlyChart
                title="Gini Coefficient – Selected Countries (World Bank, latest)"
                data={[{
                  x: GINI_BY_COUNTRY.countries,
                  y: GINI_BY_COUNTRY.gini,
                  type: 'bar',
                  marker: { color: GINI_BY_COUNTRY.colors },
                  text: GINI_BY_COUNTRY.gini.map(g => g.toFixed(1)),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -30 },
                  yaxis: { title: 'Gini coefficient (0–100)', range: [0, 75] },
                  showlegend: false,
                }}
                source={{ name: 'World Bank Development Indicators', url: 'https://data.worldbank.org/indicator/SI.POV.GINI' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>Within-country inequality has risen in most major economies since the 1980s.</strong> In the
                  United States, the top 1% income share roughly doubled from 10% in 1980 to 21% in 2022 (WID). In
                  China, the top 10% share rose from 27% to 43% over the same period. The drivers include technological
                  change, globalization, declining union coverage, and shifts in tax and transfer policy.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 2: WEALTH CONCENTRATION ======== */}
            <section id="wealth-concentration" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 2</span>
              <h2 className={styles.sectionHeading}>Wealth Concentration</h2>
              <p className={styles.sectionLead}>
                Wealth (assets minus debts) is far more concentrated than income. The World Inequality Database and
                Credit Suisse Global Wealth Report both document a global distribution where the top 1% holds more than
                the entire bottom 90% combined.
              </p>
            </section>

            <section id="wealth-distribution">
              <h3><DollarSign size={20} /> Global Wealth Distribution</h3>
              <p>
                The top 1% of adults worldwide own approximately 38% of all global wealth; the top 10% hold 76%.
                The bottom 50% of the world&apos;s population (roughly 2.8 billion adults) collectively own about 2% of total
                wealth. This concentration has intensified since the 2008 financial crisis, driven by asset price
                appreciation (housing, equities) that disproportionately benefits the already-wealthy.
              </p>

              <PlotlyChart
                title="Global Wealth Distribution by Group (WID / Credit Suisse)"
                data={[{
                  labels: GLOBAL_WEALTH_SHARES.groups,
                  values: GLOBAL_WEALTH_SHARES.share,
                  type: 'pie',
                  hole: 0.45,
                  marker: { colors: GLOBAL_WEALTH_SHARES.colors },
                  textinfo: 'label+percent',
                  textposition: 'outside',
                }]}
                layout={{
                  showlegend: false,
                  annotations: [{
                    text: 'Global<br>wealth',
                    showarrow: false,
                    font: { size: 13, color: '#666' },
                    x: 0.5,
                    y: 0.5,
                  }],
                }}
                source={{ name: 'WID / Credit Suisse Global Wealth Report', url: 'https://wid.world/' }}
              />

              <PlotlyChart
                title="Top 1% Global Wealth Share (1995–2022)"
                data={[{
                  x: TOP1_WEALTH_TREND.years,
                  y: TOP1_WEALTH_TREND.global,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Top 1% share (%)',
                  line: { color: '#1A1A2E', width: 3 },
                  marker: { size: 6 },
                  fill: 'tozeroy',
                  fillcolor: 'rgba(26, 26, 46, 0.08)',
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Share of global wealth (%)', range: [25, 42] },
                }}
                source={{ name: 'World Inequality Database (WID)', url: 'https://wid.world/' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Wealth inequality is self-reinforcing</strong>
                  <p>
                    Capital income (dividends, interest, rents, capital gains) flows predominantly to the wealthy, creating
                    a compounding dynamic: those who already hold assets accumulate more, while those without assets remain
                    dependent on labor income alone. Piketty&apos;s framework (r &gt; g) posits that when the rate of return
                    on capital exceeds economic growth, wealth concentration tends to rise over time unless offset by policy.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 3: POVERTY & SHARED PROSPERITY ======== */}
            <section id="poverty" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 3</span>
              <h2 className={styles.sectionHeading}>Poverty &amp; Shared Prosperity</h2>
              <p className={styles.sectionLead}>
                The World Bank&apos;s Poverty and Inequality Platform (PIP) tracks global poverty against internationally
                comparable thresholds. The decline in extreme poverty since 1990 is one of the most remarkable achievements
                in modern history, but progress has stalled, and COVID-19 reversed years of gains.
              </p>
            </section>

            <section id="extreme-poverty">
              <h3><TrendingDown size={20} /> Extreme Poverty: The Long Decline</h3>
              <p>
                At the international poverty line of $2.15 per day (2017 PPP), the share of the world&apos;s population
                living in extreme poverty fell from 38% in 1990 to 8.4% in 2019. In absolute terms, the number of
                extremely poor fell from nearly 1.9 billion to 659 million over the same period. China&apos;s growth alone
                accounts for the majority of this reduction.
              </p>

              <PlotlyChart
                title="Global Extreme Poverty – Number and Share (1990–2022)"
                data={[
                  {
                    x: EXTREME_POVERTY.years,
                    y: EXTREME_POVERTY.millions,
                    type: 'bar',
                    name: 'Millions in extreme poverty',
                    marker: { color: 'rgba(231, 76, 60, 0.6)' },
                    yaxis: 'y',
                  },
                  {
                    x: EXTREME_POVERTY.years,
                    y: EXTREME_POVERTY.percent,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Share of population (%)',
                    line: { color: '#1A1A2E', width: 3 },
                    marker: { size: 6 },
                    yaxis: 'y2',
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Millions', side: 'left' },
                  yaxis2: { title: '% of population', overlaying: 'y', side: 'right', range: [0, 45] },
                }}
                source={{ name: 'World Bank Poverty and Inequality Platform', url: 'https://pip.worldbank.org/' }}
              />

              <h3><MapPin size={20} /> Poverty by Region</h3>
              <p>
                Sub-Saharan Africa now accounts for the vast majority of the world&apos;s extreme poor. While poverty rates
                fell in all regions, Africa&apos;s progress has been slower than population growth in some countries. As of
                2019, about 35% of sub-Saharan Africa&apos;s population (roughly 400 million people) lived below $2.15/day.
              </p>

              <PlotlyChart
                title="Extreme Poverty Rate by Region ($2.15/day, 2019)"
                data={[{
                  x: POVERTY_BY_REGION.regions,
                  y: POVERTY_BY_REGION.percent,
                  type: 'bar',
                  marker: { color: POVERTY_BY_REGION.colors },
                  text: POVERTY_BY_REGION.percent.map(p => `${p}%`),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'Poverty headcount (%)', range: [0, 42] },
                  showlegend: false,
                }}
                source={{ name: 'World Bank PIP', url: 'https://pip.worldbank.org/' }}
              />

              <SectionInsight variant="success">
                <p>
                  <strong>The decline from 38% to 8.6% in three decades is unprecedented.</strong> More than 1.2 billion
                  people were lifted above the extreme poverty line between 1990 and 2022. Economic growth, urbanization,
                  and targeted social programs (e.g. Bolsa Família, India&apos;s PDS) all contributed. Yet at $2.15/day, the
                  bar is very low: nearly half the world (3.4 billion people) live on less than $6.85/day.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 4: GENDER ECONOMIC GAPS ======== */}
            <section id="gender" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 4</span>
              <h2 className={styles.sectionHeading}>Gender Economic Gaps</h2>
              <p className={styles.sectionLead}>
                Despite decades of progress on education and legal rights, women remain systematically disadvantaged in the
                global economy. The ILO and OECD document persistent gaps in wages, labor force participation, and access
                to economic opportunity.
              </p>
            </section>

            <section id="gender-wage-gap">
              <h3><Scale size={20} /> Gender Wage Gap</h3>
              <p>
                The OECD measures the gender wage gap as the difference between median male and female full-time earnings,
                expressed as a percentage of male earnings. Globally, the ILO estimates women earn roughly 20% less than
                men. The gap has narrowed but remains substantial in every country measured.
              </p>

              <PlotlyChart
                title="Gender Wage Gap – Selected Countries (OECD 2023, %)"
                data={[{
                  x: GENDER_WAGE_GAP.countries,
                  y: GENDER_WAGE_GAP.gap,
                  type: 'bar',
                  marker: { color: GENDER_WAGE_GAP.colors },
                  text: GENDER_WAGE_GAP.gap.map(g => `${g}%`),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -30 },
                  yaxis: { title: 'Gap (% less than men)', range: [0, 38] },
                  showlegend: false,
                }}
                source={{ name: 'OECD Gender Wage Gap Indicator / ILO', url: 'https://data.oecd.org/earnwage/gender-wage-gap.htm' }}
              />

              <h3><Users size={20} /> Labor Force Participation</h3>
              <p>
                Globally, about 47% of working-age women participate in the labor force, compared to 72% of men. This gap
                has barely narrowed in 30 years and has actually widened in some regions. In South Asia and the MENA region,
                female participation rates remain below 25%, reflecting deep structural barriers.
              </p>

              <PlotlyChart
                title="Global Labor Force Participation Rate by Gender (1990–2023)"
                data={[
                  {
                    x: FEMALE_LFPR.years,
                    y: FEMALE_LFPR.female,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Female',
                    line: { color: '#9B59B6', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: FEMALE_LFPR.years,
                    y: FEMALE_LFPR.male,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Male',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 6 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'LFPR (%)', range: [35, 85] },
                }}
                source={{ name: 'ILO Modelled Estimates (ILOSTAT)', url: 'https://ilostat.ilo.org/' }}
              />

              <PlotlyChart
                title="Female Labor Force Participation by Region (ILO 2023, %)"
                data={[
                  {
                    x: FEMALE_LFPR_REGION.regions,
                    y: FEMALE_LFPR_REGION.female,
                    type: 'bar',
                    name: 'Female',
                    marker: { color: '#9B59B6' },
                  },
                  {
                    x: FEMALE_LFPR_REGION.regions,
                    y: FEMALE_LFPR_REGION.male,
                    type: 'bar',
                    name: 'Male',
                    marker: { color: '#3498DB' },
                  },
                ]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'LFPR (%)', range: [0, 85] },
                  barmode: 'group',
                }}
                source={{ name: 'ILO Modelled Estimates (ILOSTAT)', url: 'https://ilostat.ilo.org/' }}
              />

              <div className={styles.infoBox}>
                <h3><DollarSign size={20} /> The cost of gender inequality</h3>
                <p>
                  McKinsey Global Institute estimated that closing gender gaps in labor force participation could add
                  $12 trillion to global GDP by 2025. The World Bank finds that gender inequality in earnings costs
                  countries an estimated $160 trillion in lost human capital wealth. These are not just equity arguments; they
                  are economic imperatives.
                </p>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 5: REGIONAL DISPARITIES & MOBILITY ======== */}
            <section id="regional" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 5</span>
              <h2 className={styles.sectionHeading}>Regional Disparities &amp; Social Mobility</h2>
              <p className={styles.sectionLead}>
                Inequality operates not only between individuals but between places and across generations. The OECD
                and World Bank&apos;s Global Database on Intergenerational Mobility (GDIM) document wide differences in
                how much parental background determines economic outcomes.
              </p>
            </section>

            <section id="social-mobility">
              <h3><TrendingUp size={20} /> Intergenerational Earnings Elasticity</h3>
              <p>
                Intergenerational earnings elasticity measures the correlation between parents&apos; and children&apos;s earnings.
                A value near 0 indicates high mobility (parental income has little effect); a value near 1 means income
                is almost entirely inherited. The Nordic countries achieve the highest mobility; the United States, United
                Kingdom, China, and Brazil have significantly lower mobility, meaning where you start largely determines
                where you end up.
              </p>

              <PlotlyChart
                title="Intergenerational Earnings Elasticity (higher = less mobile)"
                data={[{
                  x: SOCIAL_MOBILITY.countries,
                  y: SOCIAL_MOBILITY.elasticity,
                  type: 'bar',
                  marker: { color: SOCIAL_MOBILITY.colors },
                  text: SOCIAL_MOBILITY.elasticity.map(e => e.toFixed(2)),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -30 },
                  yaxis: { title: 'Elasticity (0 = high mobility, 1 = low)', range: [0, 0.7] },
                  showlegend: false,
                }}
                source={{ name: 'OECD / World Bank GDIM', url: 'https://www.worldbank.org/en/topic/poverty/brief/what-is-the-global-database-on-intergenerational-mobility-gdim' }}
              />

              <SectionInsight>
                <p>
                  <strong>&ldquo;The Great Gatsby Curve&rdquo;:</strong> Countries with higher income inequality tend to have
                  lower social mobility. The United States has both high inequality and low mobility; Denmark has both low
                  inequality and high mobility. This pattern, documented by economists Miles Corak and Alan Krueger, suggests
                  that inequality today constrains opportunity tomorrow, making it self-perpetuating without intervention.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 6: POLICY & REDISTRIBUTION ======== */}
            <section id="policy" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 6</span>
              <h2 className={styles.sectionHeading}>Policy &amp; Redistribution</h2>
              <p className={styles.sectionLead}>
                Government tax and transfer systems are the primary mechanisms through which market inequality is
                moderated. OECD data on social spending reveals wide differences in how much countries invest in
                redistribution, and these choices have measurable consequences for inequality outcomes.
              </p>
            </section>

            <section id="redistribution">
              <h3><Landmark size={20} /> Public Social Spending</h3>
              <p>
                OECD countries spend an average of 21% of GDP on social programs (pensions, health, unemployment
                insurance, family benefits, and social assistance). France leads at nearly 32%; the United States spends
                19%, well below the OECD average. Countries with higher social spending tend to have lower poverty rates
                and lower income inequality after taxes and transfers.
              </p>

              <PlotlyChart
                title="Public Social Spending as % of GDP (OECD 2022)"
                data={[{
                  x: SOCIAL_SPENDING.countries,
                  y: SOCIAL_SPENDING.pctGDP,
                  type: 'bar',
                  marker: { color: SOCIAL_SPENDING.colors },
                  text: SOCIAL_SPENDING.pctGDP.map(s => `${s}%`),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -30 },
                  yaxis: { title: '% of GDP', range: [0, 38] },
                  showlegend: false,
                }}
                source={{ name: 'OECD Social Expenditure Database (SOCX)', url: 'https://www.oecd.org/social/expenditure.htm' }}
              />

              <div className={styles.infoBox}>
                <h3><Landmark size={20} /> Redistribution works, but it&apos;s not automatic</h3>
                <p>
                  OECD analysis shows that taxes and transfers reduce the Gini coefficient by an average of 16 points
                  in member countries, from about 0.50 (market income) to about 0.34 (disposable income). But the
                  degree of redistribution varies enormously. Some countries with high pre-tax inequality (France,
                  Belgium) achieve low post-tax inequality through strong transfers; others (US, UK) redistribute less
                  and accept higher inequality as a policy outcome.
                </p>
                <p>
                  Beyond redistribution, &ldquo;pre-distribution&rdquo; policies (minimum wages, labor market regulation,
                  public education, universal healthcare, and competition policy) shape market inequality before taxes.
                  The most equal societies combine both approaches.
                </p>
              </div>

              <SectionInsight>
                <p>
                  <strong>The evidence favors investment in equity.</strong> IMF research (Ostry et al. 2014) found that
                  lower inequality is associated with stronger and more durable economic growth, and that redistribution
                  (unless extreme) does not harm growth. The World Bank&apos;s Commission on Global Poverty concluded that
                  growth alone is insufficient; shared prosperity requires deliberate policy choices.
                </p>
              </SectionInsight>
            </section>

            {/* ======== CONCLUSIONS ======== */}
            <section id="conclusions" className={styles.takeaways}>
              <h2><BookOpen size={20} /> The Bottom Line</h2>
              <ul>
                <li>
                  <strong>Global income inequality is extreme.</strong> The top 10% takes 52% of all income; the bottom
                  50% receives 8.5%. Within-country inequality has risen sharply in most major economies since 1980.
                </li>
                <li>
                  <strong>Wealth concentration is even more severe.</strong> The top 1% holds 38% of global wealth, a
                  share that has risen steadily since the mid-1990s. Asset price appreciation and capital income flows
                  create a self-reinforcing dynamic.
                </li>
                <li>
                  <strong>Poverty has fallen dramatically but remains deep.</strong> 692 million people still live on
                  less than $2.15/day; 3.4 billion live on less than $6.85/day. Sub-Saharan Africa now accounts for the
                  majority of the extreme poor.
                </li>
                <li>
                  <strong>Gender gaps are persistent and costly.</strong> Women earn ~20% less than men globally; female
                  labor force participation has barely changed in 30 years. Closing these gaps would add trillions to
                  global GDP.
                </li>
                <li>
                  <strong>Social mobility is highest where inequality is lowest.</strong> The Great Gatsby Curve reveals
                  that unequal societies tend to be immobile societies. Inequality today becomes entrenched inequality
                  tomorrow.
                </li>
                <li>
                  <strong>Policy choices drive outcomes.</strong> Redistribution through taxes and transfers, public
                  investment in education and health, labor market regulation, and progressive fiscal policy all demonstrably
                  reduce inequality without harming growth.
                </li>
              </ul>
            </section>

            {/* ======== METHODOLOGY ======== */}
            <section id="methodology" className={styles.methodology}>
              <h2>Data Sources &amp; Methodology</h2>
              <p>
                This analysis draws primarily from the World Inequality Database (WID) for income and wealth shares;
                the World Bank Poverty and Inequality Platform (PIP) for poverty headcounts and Gini coefficients; the
                OECD for gender wage gaps, social spending, and PISA-related human capital indicators; the ILO for labor
                force participation and earnings data; and the World Bank Global Database on Intergenerational Mobility (GDIM).
              </p>
              <p>
                <strong>Key indicators:</strong> The Gini coefficient measures income inequality on a 0–100 scale. WID
                income and wealth shares are based on national accounts data combined with tax records, surveys, and
                wealth rankings. Extreme poverty is measured at the $2.15/day line in 2017 PPP. The gender wage gap is
                the OECD definition (median full-time earnings gap). Intergenerational elasticity is typically estimated
                from panel or linked administrative data.
              </p>
              <p>
                <strong>Limitations:</strong> Income and wealth data are subject to under-reporting at both extremes
                (top earners and informal workers). Gini estimates differ by source depending on whether they use
                consumption or income, gross or net. Wealth data is especially uncertain for the very top (offshore
                holdings, complex structures). Cross-country comparisons of mobility rely on varying data quality and
                definitions.
              </p>
              <p>
                <strong>Last Updated:</strong> February 2026. Data align with WID 2022 data release, World Bank PIP
                (September 2023 update), OECD 2023 indicators, and ILO modelled estimates (November 2023).
              </p>
            </section>

            {/* ======== RESOURCES ======== */}
            <section className={styles.resources}>
              <h2>Primary Sources</h2>
              <ul>
                <li>
                  <a href="https://wid.world/" target="_blank" rel="noopener noreferrer">
                    World Inequality Database (WID) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://pip.worldbank.org/" target="_blank" rel="noopener noreferrer">
                    World Bank Poverty and Inequality Platform (PIP) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://data.oecd.org/inequality.htm" target="_blank" rel="noopener noreferrer">
                    OECD Inequality Data <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://ilostat.ilo.org/" target="_blank" rel="noopener noreferrer">
                    ILO Statistics (ILOSTAT) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://data.worldbank.org/indicator/SI.POV.GINI" target="_blank" rel="noopener noreferrer">
                    World Bank – Gini Index <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.oecd.org/social/expenditure.htm" target="_blank" rel="noopener noreferrer">
                    OECD Social Expenditure Database (SOCX) <ExternalLink size={14} />
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
                  <a href="https://ourworldindata.org/income-inequality" target="_blank" rel="noopener noreferrer">
                    Our World in Data – Income Inequality <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.imf.org/external/pubs/ft/sdn/2014/sdn1402.pdf" target="_blank" rel="noopener noreferrer">
                    IMF – Redistribution, Inequality, and Growth (Ostry et al.) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.worldbank.org/en/topic/poverty/brief/what-is-the-global-database-on-intergenerational-mobility-gdim" target="_blank" rel="noopener noreferrer">
                    World Bank – Global Database on Intergenerational Mobility <ExternalLink size={14} />
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
