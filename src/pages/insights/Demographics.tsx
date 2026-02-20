import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, ExternalLink, AlertTriangle, Calendar, Users, TrendingUp,
  MapPin, Baby, Building2, Plane, BookOpen
} from 'lucide-react';
import PlotlyChart from '../../components/charts/PlotlyChart';
import TableOfContents, { TOCItem } from '../../components/ui/TableOfContents';
import SectionInsight from '../../components/ui/SectionInsight';
import CiteThisReport from '../../components/ui/CiteThisReport';
import { SITE_NAME, SITE_URL } from '../../utils/constants';
import styles from '../../styles/pages/Article.module.css';

const INSIGHT_TITLE = 'Demographics & Population: A Data-Driven Analysis';
const INSIGHT_DESCRIPTION = 'Population size and growth, aging, fertility, urbanization, and migration—from UN World Population Prospects, UNPD, and IOM.';

// ============================================
// DATA SETS - Based on UN WPP, UNPD, IOM
// ============================================

// Global population (UN WPP 2024) - billions
const GLOBAL_POPULATION = {
  years: [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2015, 2020, 2024, 2030, 2050],
  population: [2.5, 3.0, 3.7, 4.4, 5.3, 6.1, 6.9, 7.3, 7.8, 8.2, 8.5, 9.7],
};

// Population by region (UN WPP 2024) - millions, 2024; regional totals sum to global
const REGIONAL_POPULATION = {
  regions: ['Asia', 'Africa', 'Europe', 'Latin America & Caribbean', 'Northern America', 'Oceania'],
  population: [5169, 1204, 741, 662, 379, 45],
  colors: ['#3498DB', '#27AE60', '#9B59B6', '#E67E22', '#E74C3C', '#1ABC9C'],
};

// Annual population growth rate (UN WPP) - percent
const GROWTH_RATE = {
  years: [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2024],
  global: [1.8, 1.9, 2.1, 1.7, 1.6, 1.3, 1.2, 0.9, 0.9],
};

// Population aged 65+ as share of total (UN WPP) - percent
const AGING_65_PLUS = {
  years: [1950, 1980, 2000, 2010, 2020, 2024, 2030, 2050],
  global: [5.1, 5.9, 6.9, 7.7, 9.3, 10.0, 11.7, 16.4],
  europe: [8.2, 12.5, 15.5, 17.3, 20.3, 21.2, 23.5, 28.5],
  africa: [3.2, 3.0, 3.1, 3.4, 3.5, 3.6, 4.2, 5.8],
};

// Median age (UN WPP) - years
const MEDIAN_AGE = {
  years: [1950, 1980, 2000, 2020, 2024, 2050],
  global: [23.6, 22.9, 26.4, 30.9, 32.0, 36.2],
  japan: [22.3, 32.6, 41.2, 48.4, 49.5, 54.7],
  nigeria: [18.9, 17.2, 17.6, 17.2, 17.1, 20.3],
};

// Total fertility rate by region (UN WPP) - births per woman
const FERTILITY_BY_REGION = {
  regions: ['Sub-Saharan Africa', 'Middle East & N. Africa', 'Central & South Asia', 'East Asia', 'Europe', 'Latin America', 'Northern America', 'Oceania'],
  tfr: [4.6, 2.6, 2.3, 1.2, 1.5, 1.9, 1.6, 2.1],
  colors: ['#27AE60', '#E67E22', '#3498DB', '#E74C3C', '#9B59B6', '#1ABC9C', '#8E44AD', '#16A085'],
};

// Total fertility rate global trend (UN WPP 2024)
const FERTILITY_GLOBAL = {
  years: [1950, 1970, 1990, 2010, 2020, 2024],
  tfr: [4.97, 4.45, 3.31, 2.53, 2.32, 2.3],
};

// Urban share of population (UN WPP / World Urbanization Prospects) - percent
const URBAN_SHARE = {
  years: [1950, 1970, 1990, 2010, 2020, 2024, 2050],
  global: [30, 37, 43, 52, 56, 57, 68],
  africa: [15, 23, 32, 40, 44, 45, 59],
  asia: [18, 25, 35, 46, 52, 53, 66],
};

// International migrant stock (UN DESA / IOM) - millions
const MIGRANT_STOCK = {
  years: [1990, 2000, 2010, 2015, 2020, 2024],
  stock: [153, 173, 222, 249, 281, 281],
};

// Forcibly displaced (UNHCR Global Trends) - millions
const DISPLACED = {
  years: [2010, 2015, 2018, 2020, 2022, 2024],
  total: [41, 66, 71, 82, 108, 123],
  refugees: [11, 16, 26, 26, 35, 37],
};

// Table of Contents
const tocItems: TOCItem[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'population-growth', label: 'Part 1: Population Size and Growth' },
  { id: 'aging', label: 'Part 2: Aging' },
  { id: 'fertility', label: 'Part 3: Fertility', level: 2 },
  { id: 'urbanization', label: 'Part 4: Urbanization' },
  { id: 'migration', label: 'Part 5: Migration' },
  { id: 'conclusions', label: 'Conclusions' },
  { id: 'methodology', label: 'Methodology' },
];

export default function Demographics() {
  const canonicalUrl = `${SITE_URL}/insights/demographics`;
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
            <span className={styles.focusArea}>Demographics & Population</span>
            <h1 className={styles.articleTitle}>{INSIGHT_TITLE}</h1>
            <p className={styles.articleMeta}>
              Population size and growth, aging, fertility, urbanization, and migration—from UN and IOM.
            </p>
            <div className={styles.lastUpdated}>
              <Calendar size={14} />
              <span>Last updated: December 2025</span>
            </div>
          </header>

          <CiteThisReport
            reportId="CL-2025-04"
            title={INSIGHT_TITLE}
            version="December 2025"
            path="/insights/demographics"
          />

          <section id="summary" className={styles.executiveSummary}>
            <h2 className={styles.summaryTitle}>The Bottom Line</h2>
            <ul className={styles.summaryPoints}>
              <li>Global population reached <strong>8.2 billion</strong> in 2024 and is projected to peak around 10.3 billion in the mid-2080s</li>
              <li>Population growth has slowed to <strong>under 1% per year</strong>; more than half of all countries have fertility below replacement level (2.1)</li>
              <li><strong>10% of the world is 65 or older</strong>; by 2050 one in six people will be 65+, with profound implications for labor and pensions</li>
              <li><strong>57% of people now live in urban areas</strong>; the share will rise to about two-thirds by 2050</li>
              <li><strong>281 million people</strong> lived outside their country of birth (mid-2020, UN); <strong>123 million</strong> were forcibly displaced at end-2024 (refugees, IDPs, asylum seekers)</li>
            </ul>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>8.2B</span>
                <span className={styles.statLabel}>Population</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>10%</span>
                <span className={styles.statLabel}>Aged 65+</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>2.3</span>
                <span className={styles.statLabel}>Global TFR</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>123M</span>
                <span className={styles.statLabel}>Displaced</span>
              </div>
            </div>
          </section>

          <div className={styles.articleContent}>

            <section id="population-growth" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 1</span>
              <h2 className={styles.sectionHeading}>Population Size and Growth</h2>
              <p className={styles.sectionLead}>
                The world added more than 5.5 billion people since 1950. Growth rates have been falling for decades; 
                the global population is still increasing but at less than 1% per year and is projected to peak later this century.
              </p>
            </section>

            <section id="population-global">
              <h3><Users size={20} /> Global Population</h3>
              <p>
                The United Nations World Population Prospects (WPP) is the standard reference for global and national 
                population estimates and projections. Historical data and medium-variant projections show a world that 
                more than tripled in size since 1950, with most of the remaining growth concentrated in sub-Saharan Africa and South Asia.
              </p>

              <PlotlyChart
                title="Global Population (1950-2050)"
                data={[
                  {
                    x: GLOBAL_POPULATION.years,
                    y: GLOBAL_POPULATION.population,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Population (billions)',
                    line: { color: '#E67E22', width: 3, shape: 'spline' },
                    marker: { size: 6 },
                    fill: 'tozeroy',
                    fillcolor: 'rgba(230, 126, 34, 0.08)',
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Population (billions)', range: [0, 11] },
                }}
                source={{ name: 'UN World Population Prospects 2024', url: 'https://population.un.org/wpp/' }}
              />

              <SectionInsight>
                <p>
                  <strong>Population doubled between 1974 and 2024</strong>, from about 4 billion to 8.2 billion. 
                  The UN medium-variant projection suggests a peak around 10.3 billion in the mid-2080s, with slow decline thereafter 
                  as fertility remains below replacement in more than half of countries.
                </p>
              </SectionInsight>

              <PlotlyChart
                title="Population by Region (2024)"
                data={[{
                  x: REGIONAL_POPULATION.regions,
                  y: REGIONAL_POPULATION.population,
                  type: 'bar',
                  marker: { color: REGIONAL_POPULATION.colors },
                  text: REGIONAL_POPULATION.population.map((v) => `${v}M`),
                  textposition: 'outside',
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'Population (millions)' },
                  showlegend: false,
                }}
                source={{ name: 'UN World Population Prospects 2024', url: 'https://population.un.org/wpp/' }}
              />

              <PlotlyChart
                title="Annual Population Growth Rate (1950-2024)"
                data={[{
                  x: GROWTH_RATE.years,
                  y: GROWTH_RATE.global,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Global (%)',
                  line: { color: '#3498DB', width: 3 },
                  marker: { size: 6 },
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Growth rate (% per year)', range: [0, 2.5] },
                }}
                source={{ name: 'UN World Population Prospects 2024', url: 'https://population.un.org/wpp/' }}
              />
            </section>

            <div className={styles.sectionDivider} />

            <section id="aging" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 2</span>
              <h2 className={styles.sectionHeading}>Aging</h2>
              <p className={styles.sectionLead}>
                Declining fertility and rising life expectancy are increasing the share of the population aged 65 and over. 
                This shift has major implications for labor forces, pension systems, and healthcare demand.
              </p>
            </section>

            <section id="aging-share">
              <h3><TrendingUp size={20} /> Share Aged 65+</h3>
              <p>
                The proportion of the world&apos;s population aged 65 or older has risen from about 5% in 1950 to 10% in 2024. 
                Europe and Japan are furthest along; Africa remains the youngest region.
              </p>

              <PlotlyChart
                title="Population Aged 65+ as Share of Total (1950-2050)"
                data={[
                  {
                    x: AGING_65_PLUS.years,
                    y: AGING_65_PLUS.global,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Global',
                    line: { color: '#E67E22', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: AGING_65_PLUS.years,
                    y: AGING_65_PLUS.europe,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Europe',
                    line: { color: '#9B59B6', width: 2, dash: 'dot' },
                  },
                  {
                    x: AGING_65_PLUS.years,
                    y: AGING_65_PLUS.africa,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Africa',
                    line: { color: '#27AE60', width: 2, dash: 'dot' },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Share aged 65+ (%)', range: [0, 32] },
                }}
                source={{ name: 'UN World Population Prospects 2024', url: 'https://population.un.org/wpp/' }}
              />

              <PlotlyChart
                title="Median Age: Global, Japan, Nigeria (1950-2050)"
                data={[
                  {
                    x: MEDIAN_AGE.years,
                    y: MEDIAN_AGE.global,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Global',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: MEDIAN_AGE.years,
                    y: MEDIAN_AGE.japan,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Japan',
                    line: { color: '#E74C3C', width: 2, dash: 'dot' },
                  },
                  {
                    x: MEDIAN_AGE.years,
                    y: MEDIAN_AGE.nigeria,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Nigeria',
                    line: { color: '#27AE60', width: 2, dash: 'dot' },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Median age (years)', range: [15, 58] },
                }}
                source={{ name: 'UN World Population Prospects 2024', url: 'https://population.un.org/wpp/' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>Japan&apos;s median age is now about 49</strong>, the highest in the world. By 2050, one in six people 
                  globally will be 65 or older. Aging will strain pension and health systems in high-income countries 
                  and an increasing number of middle-income ones.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            <section id="fertility" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 3</span>
              <h2 className={styles.sectionHeading}>Fertility</h2>
              <p className={styles.sectionLead}>
                The total fertility rate (TFR)—births per woman—has fallen globally. Replacement level is about 2.1; 
                half of all countries are now below that, while others remain well above it.
              </p>
            </section>

            <section id="fertility-rates">
              <h3><Baby size={20} /> Total Fertility Rate by Region</h3>
              <p>
                Sub-Saharan Africa still has the highest TFR; East Asia and Europe have the lowest. 
                The global average has dropped from about 5 births per woman in 1950 to about 2.3 in 2024.
              </p>

              <PlotlyChart
                title="Total Fertility Rate by Region (2024)"
                data={[{
                  x: FERTILITY_BY_REGION.regions,
                  y: FERTILITY_BY_REGION.tfr,
                  type: 'bar',
                  marker: { color: FERTILITY_BY_REGION.colors },
                  name: 'TFR',
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -30 },
                  yaxis: { title: 'Births per woman', range: [0, 5] },
                  shapes: [{ type: 'line', x0: -0.5, x1: 7.5, y0: 2.1, y1: 2.1, line: { dash: 'dash', color: '#666' } }],
                  annotations: [{ x: 7.5, y: 2.1, text: 'Replacement (2.1)', showarrow: false, xanchor: 'left' }],
                  showlegend: false,
                }}
                source={{ name: 'UN World Population Prospects 2024', url: 'https://population.un.org/wpp/' }}
              />

              <PlotlyChart
                title="Global Total Fertility Rate (1950-2024)"
                data={[{
                  x: FERTILITY_GLOBAL.years,
                  y: FERTILITY_GLOBAL.tfr,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Global TFR',
                  line: { color: '#9B59B6', width: 3 },
                  marker: { size: 6 },
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Births per woman', range: [1.5, 5.5] },
                  shapes: [{ type: 'line', x0: 1950, x1: 2024, y0: 2.1, y1: 2.1, line: { dash: 'dash', color: '#666' } }],
                  annotations: [{ x: 2024, y: 2.1, text: 'Replacement (2.1)', showarrow: false, xanchor: 'left' }],
                }}
                source={{ name: 'UN World Population Prospects 2024', url: 'https://population.un.org/wpp/' }}
              />
            </section>

            <div className={styles.sectionDivider} />

            <section id="urbanization" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 4</span>
              <h2 className={styles.sectionHeading}>Urbanization</h2>
              <p className={styles.sectionLead}>
                For the first time in history, more than half of humanity lives in urban areas. 
                Urbanization is expected to continue, especially in Africa and Asia.
              </p>
            </section>

            <section id="urban-share">
              <h3><Building2 size={20} /> Urban Share of Population</h3>
              <p>
                The UN World Urbanization Prospects and WPP provide consistent estimates of urban versus rural population. 
                Definitions vary by country, but the global trend is clear: the world is urbanizing.
              </p>

              <PlotlyChart
                title="Urban Share of Population (1950-2050)"
                data={[
                  {
                    x: URBAN_SHARE.years,
                    y: URBAN_SHARE.global,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Global',
                    line: { color: '#1ABC9C', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: URBAN_SHARE.years,
                    y: URBAN_SHARE.africa,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Africa',
                    line: { color: '#27AE60', width: 2, dash: 'dot' },
                  },
                  {
                    x: URBAN_SHARE.years,
                    y: URBAN_SHARE.asia,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Asia',
                    line: { color: '#3498DB', width: 2, dash: 'dot' },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Urban share (%)', range: [0, 75] },
                }}
                source={{ name: 'UN World Urbanization Prospects', url: 'https://population.un.org/wup/' }}
              />

              <SectionInsight variant="success">
                <p>
                  <strong>57% of the world&apos;s population lived in urban areas in 2024.</strong> By 2050, the share is 
                  projected to reach about 68%. Most of the increase will occur in Africa and Asia, where urban populations 
                  are growing rapidly.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            <section id="migration" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 5</span>
              <h2 className={styles.sectionHeading}>Migration</h2>
              <p className={styles.sectionLead}>
                International migration has grown in absolute terms: the UN estimated 281 million people living outside their country of birth in mid-2020, with the 2024 dataset extending estimates through 2024. 
                Forced displacement—refugees, asylum seekers, and internally displaced persons—reached 123 million at the end of 2024.
              </p>
            </section>

            <section id="migrant-stock">
              <h3><Plane size={20} /> International Migrant Stock</h3>
              <p>
                The UN Department of Economic and Social Affairs and IOM track the number of people living in a country 
                other than their country of birth. This &quot;migrant stock&quot; rose from 153 million in 1990 to 281 million in mid-2020 (UN DESA); the International Migrant Stock 2024 dataset provides updated estimates through 2024.
              </p>

              <PlotlyChart
                title="International Migrant Stock (1990-2024)"
                data={[{
                  x: MIGRANT_STOCK.years,
                  y: MIGRANT_STOCK.stock,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Migrant stock (millions)',
                  line: { color: '#3498DB', width: 3 },
                  marker: { size: 6 },
                  fill: 'tozeroy',
                  fillcolor: 'rgba(52, 152, 219, 0.1)',
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Millions' },
                }}
                source={{ name: 'UN DESA International Migrant Stock 2024', url: 'https://www.un.org/development/desa/pd/content/international-migrant-stock' }}
              />

              <h3><MapPin size={20} /> Forcibly Displaced</h3>
              <p>
                UNHCR reports record numbers of forcibly displaced people: refugees under UNHCR and UNRWA mandates, 
                asylum seekers, and internally displaced persons (IDPs). Conflict, persecution, and climate-related 
                hazards continue to drive displacement.
              </p>

              <PlotlyChart
                title="Forcibly Displaced People (2010-2024)"
                data={[
                  {
                    x: DISPLACED.years,
                    y: DISPLACED.total,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Total displaced',
                    line: { color: '#E74C3C', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: DISPLACED.years,
                    y: DISPLACED.refugees,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Refugees (UNHCR + UNRWA)',
                    line: { color: '#E67E22', width: 2, dash: 'dot' },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Millions' },
                }}
                source={{ name: 'UNHCR Global Trends 2024', url: 'https://www.unhcr.org/global-trends' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>123 million forcibly displaced at end-2024</strong>
                  <p>
                    This includes refugees (about 37 million under UNHCR and UNRWA mandates), asylum seekers, IDPs, and others in need of protection. 
                    The figure has more than doubled since 2010. Most displacement is internal (within countries); UNHCR reports about 73.5 million IDPs globally.
                  </p>
                </div>
              </div>
            </section>

            <section id="conclusions" className={styles.takeaways}>
              <h2><BookOpen size={20} /> The Bottom Line</h2>
              <ul>
                <li>
                  <strong>Growth is slowing.</strong> Global population will likely peak later this century. 
                  Half of countries already have fertility below replacement; others will follow.
                </li>
                <li>
                  <strong>The world is aging.</strong> The share 65+ will rise from 10% to 16% by 2050. 
                  Labor forces will shrink in many countries; pension and health systems will face pressure.
                </li>
                <li>
                  <strong>Urbanization continues.</strong> Two-thirds of people could live in urban areas by 2050. 
                  Most growth will be in Africa and Asia.
                </li>
                <li>
                  <strong>Migration and displacement are at record levels.</strong> 281 million international migrants (mid-2020, UN); 
                  123 million forcibly displaced at end-2024. Policy and cooperation will shape outcomes for decades.
                </li>
                <li>
                  <strong>Demographics tie directly to health and economics.</strong> Aging affects healthcare demand and 
                  labor supply; fertility and migration shape future population size and structure. 
                  These dynamics are central to sustainable development.
                </li>
              </ul>
            </section>

            <section id="methodology" className={styles.methodology}>
              <h2>Data Sources & Methodology</h2>
              <p>
                This analysis draws from the UN Department of Economic and Social Affairs (UN DESA) World Population 
                Prospects (WPP) 2024, the UN Population Division, the UN DESA International Migrant Stock 2024 and IOM World Migration Report, 
                and UNHCR Global Trends for forced displacement. WPP provides the standard set of demographic estimates 
                and projections used by governments and international organizations.
              </p>
              <p>
                <strong>Reference years:</strong> Global population and most demographic series use WPP 2024 (mid-2024: 8.2 billion). 
                International migrant stock is widely cited at 281 million for mid-2020; the 2024 dataset extends estimates through 2024. 
                Forcibly displaced figures are from UNHCR Global Trends (end-of-year; 2024: 123.2 million).
              </p>
              <p>
                <strong>Limitations:</strong> Definitions of &quot;urban&quot; and &quot;migrant&quot; vary by country. 
                Projections depend on assumptions about fertility, mortality, and migration; actual outcomes may differ. 
                Some figures are modeled or interpolated where direct counts are unavailable.
              </p>
              <p>
                <strong>Last Updated:</strong> December 2025. Data align with UN World Population Prospects 2024 revision, 
                UN DESA International Migrant Stock 2024, and UNHCR Global Trends 2024.
              </p>
            </section>

            <section className={styles.resources}>
              <h2>Primary Sources</h2>
              <ul>
                <li>
                  <a href="https://population.un.org/wpp/" target="_blank" rel="noopener noreferrer">
                    UN World Population Prospects (WPP) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.un.org/development/desa/pd/" target="_blank" rel="noopener noreferrer">
                    UN Population Division <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://worldmigrationreport.iom.int/" target="_blank" rel="noopener noreferrer">
                    IOM World Migration Report <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.unhcr.org/global-trends" target="_blank" rel="noopener noreferrer">
                    UNHCR Global Trends <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://population.un.org/wup/" target="_blank" rel="noopener noreferrer">
                    UN World Urbanization Prospects <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.resources}>
              <h2>Further Reading</h2>
              <ul>
                <li>
                  <a href="https://ourworldindata.org/population-growth" target="_blank" rel="noopener noreferrer">
                    Our World in Data – Population Growth <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.prb.org/" target="_blank" rel="noopener noreferrer">
                    Population Reference Bureau (PRB) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.unfpa.org/" target="_blank" rel="noopener noreferrer">
                    UNFPA <ExternalLink size={14} />
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
