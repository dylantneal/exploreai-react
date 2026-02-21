import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, ExternalLink, AlertTriangle, Calendar, Zap,
  Flame, Plug, TrendingDown, Users, Box, BookOpen
} from 'lucide-react';
import PlotlyChart from '../../components/charts/PlotlyChart';
import TableOfContents, { TOCItem } from '../../components/ui/TableOfContents';
import SectionInsight from '../../components/ui/SectionInsight';
import CiteThisReport from '../../components/ui/CiteThisReport';
import { SITE_NAME, SITE_URL } from '../../utils/constants';
import styles from '../../styles/pages/Article.module.css';

const INSIGHT_TITLE = 'Energy Systems: A Data-Driven Analysis';
const INSIGHT_DESCRIPTION = 'Primary energy mix, electricity by source, fossil phase-out, energy access, and critical minerals. Data from IEA, IRENA, BP, and World Bank.';

// ============================================
// DATA SETS - Based on IEA, IRENA, BP, World Bank
// ============================================

// Primary energy consumption by source (IEA/BP) - share of total, percent
const PRIMARY_ENERGY_SHARE = {
  years: [1990, 2000, 2010, 2015, 2020, 2022, 2024],
  oil: [39, 39, 33, 32, 31, 31, 30],
  gas: [22, 23, 24, 24, 25, 24, 25],
  coal: [26, 25, 29, 28, 27, 26, 26],
  nuclear: [6, 6, 5, 5, 4, 4, 4],
  hydro: [6, 6, 6, 7, 7, 7, 7],
  other_renewables: [1, 1, 2, 4, 6, 8, 8],
};

// Electricity generation by source (IEA) - percent
const ELECTRICITY_MIX = {
  years: [2000, 2010, 2015, 2020, 2022, 2024],
  coal: [39, 41, 39, 35, 36, 34],
  gas: [18, 22, 22, 23, 22, 23],
  nuclear: [17, 13, 11, 10, 9, 9],
  hydro: [17, 16, 16, 16, 15, 15],
  wind: [1, 2, 4, 6, 8, 10],
  solar: [0, 0, 1, 3, 5, 7],
  other: [8, 6, 9, 7, 5, 2],
};

// Renewable share of new power capacity (IRENA) - percent
const NEW_CAPACITY_RENEWABLES = {
  years: [2015, 2017, 2019, 2021, 2023, 2024],
  share: [58, 62, 72, 83, 86, 90],
};

// Population without electricity (IEA/World Bank) - millions
const WITHOUT_ELECTRICITY = {
  years: [2000, 2010, 2015, 2020, 2022],
  global: [1680, 1220, 1110, 770, 760],
};

// Access to electricity by region (World Bank) - percent 2022
const ACCESS_BY_REGION = {
  regions: ['Sub-Saharan Africa', 'South Asia', 'East Asia & Pacific', 'Middle East & N. Africa', 'Latin America', 'Europe & C. Asia', 'North America'],
  access: [52, 96, 99, 99, 99, 100, 100],
  colors: ['#E74C3C', '#F39C12', '#27AE60', '#3498DB', '#9B59B6', '#1ABC9C', '#95A5A6'],
};

// Critical minerals: demand index for clean energy (IEA) - 2020 = 100
const CRITICAL_MINERALS_DEMAND = {
  years: [2015, 2018, 2020, 2022, 2024, 2030],
  lithium: [40, 70, 100, 180, 280, 450],
  cobalt: [60, 85, 100, 130, 160, 220],
  nickel_clean: [50, 75, 100, 140, 190, 320],
  copper: [85, 92, 100, 108, 118, 145],
};

// Coal demand (IEA) - billion tonnes oil equivalent, approximate
const COAL_DEMAND = {
  years: [2000, 2010, 2015, 2020, 2022, 2024],
  demand: [2.3, 3.5, 3.8, 3.6, 4.0, 3.9],
};

// Global renewable capacity (IRENA) - gigawatts
const RENEWABLE_CAPACITY = {
  years: [2000, 2010, 2015, 2020, 2022, 2024],
  total: [754, 1251, 1856, 2838, 3382, 4500],
  solar: [1, 40, 227, 714, 1047, 1890],
  wind: [17, 198, 433, 733, 899, 1147],
};

// Table of Contents
const tocItems: TOCItem[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'primary-mix', label: 'Part 1: Primary Energy Mix' },
  { id: 'electricity', label: 'Part 2: Electricity by Source' },
  { id: 'fossil-phaseout', label: 'Part 3: Fossil Phase-Out' },
  { id: 'access', label: 'Part 4: Energy Access' },
  { id: 'minerals', label: 'Part 5: Critical Minerals' },
  { id: 'conclusions', label: 'Conclusions' },
  { id: 'methodology', label: 'Methodology' },
];

export default function EnergySystems() {
  const canonicalUrl = `${SITE_URL}/insights/energy-systems`;
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
            <span className={styles.focusArea}>Energy Systems</span>
            <h1 className={styles.articleTitle}>{INSIGHT_TITLE}</h1>
            <p className={styles.articleMeta}>
              Primary energy mix, electricity by source, fossil phase-out, energy access, and critical minerals. Data from IEA, IRENA, BP, and World Bank.
            </p>
            <div className={styles.lastUpdated}>
              <Calendar size={14} />
              <span>Last updated: December 2025</span>
            </div>
          </header>

          <CiteThisReport
            reportId="CL-2025-06"
            title={INSIGHT_TITLE}
            version="December 2025"
            path="/insights/energy-systems"
          />

          <section id="summary" className={styles.executiveSummary}>
            <h2 className={styles.summaryTitle}>The Bottom Line</h2>
            <ul className={styles.summaryPoints}>
              <li>Primary energy is still <strong>~80% fossil</strong> (oil, gas, coal); the share of renewables is rising but the transition must accelerate to meet climate goals</li>
              <li><strong>Renewables accounted for over 90% of new power capacity</strong> added globally in 2024 (IRENA); solar and wind dominate new build</li>
              <li>About <strong>760 million people</strong> lack electricity access, mostly in sub-Saharan Africa; progress has slowed since 2019</li>
              <li>Demand for <strong>critical minerals</strong> (lithium, cobalt, nickel, copper) for batteries and grids is surging; supply and refining are concentrated in few countries</li>
              <li>Coal demand has plateaued globally; gas and oil remain the largest single sources. Net-zero pathways require a rapid fossil phase-out (see also the <Link to="/insights/climate-change">Climate report</Link>)</li>
            </ul>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>~80%</span>
                <span className={styles.statLabel}>Fossil share</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>90%+</span>
                <span className={styles.statLabel}>New power renewables</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>760M</span>
                <span className={styles.statLabel}>Without electricity</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>4.5 TW</span>
                <span className={styles.statLabel}>Renewable capacity</span>
              </div>
            </div>
          </section>

          <div className={styles.articleContent}>

            <section id="primary-mix" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 1</span>
              <h2 className={styles.sectionHeading}>Primary Energy Mix</h2>
              <p className={styles.sectionLead}>
                The world still runs mainly on fossil fuels. Oil, gas, and coal together supply about 80% of primary energy; 
                nuclear and renewables (hydro, wind, solar, biofuels) make up the rest. The share of renewables is growing but from a low base.
              </p>
            </section>

            <section id="primary-energy">
              <h3><Flame size={20} /> Global Primary Energy by Source</h3>
              <p>
                Primary energy is the energy in raw fuels before conversion (e.g. to electricity). IEA and BP Statistical Review 
                report consumption by source. The mix has shifted slowly: coal has plateaued, oil and gas remain dominant, and &quot;other renewables&quot; (wind, solar, biofuels) are the fastest-growing segment.
              </p>

              <PlotlyChart
                title="Primary Energy Consumption by Source (Share of Total, 1990-2024)"
                data={[
                  { x: PRIMARY_ENERGY_SHARE.years, y: PRIMARY_ENERGY_SHARE.oil, type: 'scatter', mode: 'lines', name: 'Oil', line: { color: '#333', width: 2 }, fill: 'tonexty', stackgroup: 'one' },
                  { x: PRIMARY_ENERGY_SHARE.years, y: PRIMARY_ENERGY_SHARE.gas, type: 'scatter', mode: 'lines', name: 'Gas', line: { color: '#3498DB', width: 2 }, fill: 'tonexty', stackgroup: 'one' },
                  { x: PRIMARY_ENERGY_SHARE.years, y: PRIMARY_ENERGY_SHARE.coal, type: 'scatter', mode: 'lines', name: 'Coal', line: { color: '#2C3E50', width: 2 }, fill: 'tonexty', stackgroup: 'one' },
                  { x: PRIMARY_ENERGY_SHARE.years, y: PRIMARY_ENERGY_SHARE.nuclear, type: 'scatter', mode: 'lines', name: 'Nuclear', line: { color: '#9B59B6', width: 2 }, fill: 'tonexty', stackgroup: 'one' },
                  { x: PRIMARY_ENERGY_SHARE.years, y: PRIMARY_ENERGY_SHARE.hydro, type: 'scatter', mode: 'lines', name: 'Hydro', line: { color: '#1ABC9C', width: 2 }, fill: 'tonexty', stackgroup: 'one' },
                  { x: PRIMARY_ENERGY_SHARE.years, y: PRIMARY_ENERGY_SHARE.other_renewables, type: 'scatter', mode: 'lines', name: 'Other renewables', line: { color: '#F1C40F', width: 2 }, fill: 'tonexty', stackgroup: 'one' },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Share (%)', range: [0, 105] },
                }}
                source={{ name: 'IEA / BP Statistical Review', url: 'https://www.iea.org/data-and-statistics' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>Fossil fuels still supply about 80% of primary energy.</strong> The transition is underway (renewables are the fastest-growing source), but 
                  absolute fossil consumption remains high. Meeting net-zero goals requires a sharp decline in coal, oil, and gas use over the next decades.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            <section id="electricity" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 2</span>
              <h2 className={styles.sectionHeading}>Electricity by Source</h2>
              <p className={styles.sectionLead}>
                The power sector is decarbonizing faster than the rest of the energy system. Wind and solar now make up a large share of new capacity; 
                coal&apos;s share of generation is falling in many regions. For a detailed look at renewable capacity growth, see the <Link to="/insights/climate-change">Climate Change report</Link>.
              </p>
            </section>

            <section id="electricity-mix">
              <h3><Plug size={20} /> Electricity Generation Mix</h3>
              <p>
                IEA and national statistics track electricity generation by source. The share of wind and solar has risen rapidly; 
                coal remains the single largest source globally but is declining in advanced economies.
              </p>

              <PlotlyChart
                title="Global Electricity Generation by Source (Share, 2000-2024)"
                data={[
                  { x: ELECTRICITY_MIX.years, y: ELECTRICITY_MIX.coal, type: 'scatter', mode: 'lines', name: 'Coal', line: { color: '#2C3E50', width: 2 } },
                  { x: ELECTRICITY_MIX.years, y: ELECTRICITY_MIX.gas, type: 'scatter', mode: 'lines', name: 'Gas', line: { color: '#3498DB', width: 2 } },
                  { x: ELECTRICITY_MIX.years, y: ELECTRICITY_MIX.nuclear, type: 'scatter', mode: 'lines', name: 'Nuclear', line: { color: '#9B59B6', width: 2 } },
                  { x: ELECTRICITY_MIX.years, y: ELECTRICITY_MIX.hydro, type: 'scatter', mode: 'lines', name: 'Hydro', line: { color: '#1ABC9C', width: 2 } },
                  { x: ELECTRICITY_MIX.years, y: ELECTRICITY_MIX.wind, type: 'scatter', mode: 'lines', name: 'Wind', line: { color: '#27AE60', width: 2 } },
                  { x: ELECTRICITY_MIX.years, y: ELECTRICITY_MIX.solar, type: 'scatter', mode: 'lines', name: 'Solar', line: { color: '#F1C40F', width: 2 } },
                  { x: ELECTRICITY_MIX.years, y: ELECTRICITY_MIX.other, type: 'scatter', mode: 'lines', name: 'Other', line: { color: '#95A5A6', width: 2 } },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Share (%)', range: [0, 45] },
                }}
                source={{ name: 'IEA', url: 'https://www.iea.org/data-and-statistics' }}
              />

              <PlotlyChart
                title="Share of New Power Capacity from Renewables (2015-2024)"
                data={[{
                  x: NEW_CAPACITY_RENEWABLES.years,
                  y: NEW_CAPACITY_RENEWABLES.share,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Renewables (%)',
                  line: { color: '#27AE60', width: 3 },
                  marker: { size: 8 },
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Share of new capacity (%)', range: [50, 100] },
                }}
                source={{ name: 'IRENA', url: 'https://www.irena.org/Data/Statistics' }}
              />

              <PlotlyChart
                title="Global Renewable Capacity (2000-2024)"
                data={[
                  { x: RENEWABLE_CAPACITY.years, y: RENEWABLE_CAPACITY.years.map((_, i) => RENEWABLE_CAPACITY.total[i] - RENEWABLE_CAPACITY.solar[i] - RENEWABLE_CAPACITY.wind[i]), type: 'scatter', mode: 'lines', name: 'Hydro + other', line: { color: '#1ABC9C', width: 2 }, fill: 'tonexty', stackgroup: 'one' },
                  { x: RENEWABLE_CAPACITY.years, y: RENEWABLE_CAPACITY.wind, type: 'scatter', mode: 'lines', name: 'Wind', line: { color: '#27AE60', width: 2 }, fill: 'tonexty', stackgroup: 'one' },
                  { x: RENEWABLE_CAPACITY.years, y: RENEWABLE_CAPACITY.solar, type: 'scatter', mode: 'lines', name: 'Solar', line: { color: '#F1C40F', width: 2 }, fill: 'tonexty', stackgroup: 'one' },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Capacity (GW)' },
                }}
                source={{ name: 'IRENA', url: 'https://www.irena.org/Data/Statistics' }}
              />

              <SectionInsight variant="success">
                <p>
                  <strong>Over 90% of new power capacity added in 2024 was renewable</strong>, mainly wind and solar (IRENA). 
                  Total renewable capacity reached about 4,500 GW. The economics favor clean energy in most markets; the main constraints are grid integration, permitting, and supply chains.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            <section id="fossil-phaseout" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 3</span>
              <h2 className={styles.sectionHeading}>Fossil Phase-Out</h2>
              <p className={styles.sectionLead}>
                Net-zero pathways require a steep decline in fossil fuel use. Coal demand has plateaued or begun to fall in many regions; 
                oil and gas demand are still growing in aggregate but the growth rate is slowing. Policy and technology will determine the pace of phase-out.
              </p>
            </section>

            <section id="coal-demand">
              <h3><TrendingDown size={20} /> Coal Demand</h3>
              <p>
                Coal is the most carbon-intensive major fuel. IEA and BP report global coal consumption; it peaked in many OECD countries years ago 
                but remained strong in Asia. Recent data show a plateau or slight decline globally as renewables and gas displace coal in power.
              </p>

              <PlotlyChart
                title="Global Coal Demand (2000-2024)"
                data={[{
                  x: COAL_DEMAND.years,
                  y: COAL_DEMAND.demand,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Billion toe',
                  line: { color: '#2C3E50', width: 3 },
                  marker: { size: 6 },
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Billion tonnes oil equivalent (approx.)' },
                }}
                source={{ name: 'IEA', url: 'https://www.iea.org/data-and-statistics' }}
              />
            </section>

            <div className={styles.sectionDivider} />

            <section id="access" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 4</span>
              <h2 className={styles.sectionHeading}>Energy Access</h2>
              <p className={styles.sectionLead}>
                Hundreds of millions of people still lack access to electricity, mostly in sub-Saharan Africa and parts of Asia. 
                Progress accelerated in the 2010s but has slowed; the pandemic and fiscal constraints have delayed connection targets.
              </p>
            </section>

            <section id="electricity-access">
              <h3><Users size={20} /> Population Without Electricity</h3>
              <p>
                The World Bank and IEA track the number and share of people without access to electricity. 
                Global numbers have fallen sharply since 2000, but the remaining gap is concentrated in the hardest-to-reach regions.
              </p>

              <PlotlyChart
                title="Number of People Without Electricity (2000-2022)"
                data={[{
                  x: WITHOUT_ELECTRICITY.years,
                  y: WITHOUT_ELECTRICITY.global,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Millions',
                  line: { color: '#E74C3C', width: 3 },
                  marker: { size: 6 },
                  fill: 'tozeroy',
                  fillcolor: 'rgba(231, 76, 60, 0.1)',
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Millions' },
                }}
                source={{ name: 'IEA / World Bank', url: 'https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS' }}
              />

              <PlotlyChart
                title="Access to Electricity by Region (2022)"
                data={[{
                  x: ACCESS_BY_REGION.regions,
                  y: ACCESS_BY_REGION.access,
                  type: 'bar',
                  marker: { color: ACCESS_BY_REGION.colors },
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'Access (%)', range: [0, 105] },
                  showlegend: false,
                }}
                source={{ name: 'World Bank', url: 'https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>About 760 million still without electricity</strong>
                  <p>
                    Sub-Saharan Africa has the lowest access rate (around 52% in 2022) and the largest number of people without power. 
                    Mini-grids and off-grid solar are expanding but investment and policy support need to scale to meet SDG 7 (affordable, reliable, sustainable energy for all).
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            <section id="minerals" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 5</span>
              <h2 className={styles.sectionHeading}>Critical Minerals</h2>
              <p className={styles.sectionLead}>
                The clean energy transition depends on minerals such as lithium, cobalt, nickel, and copper for batteries, grids, and renewables. 
                IEA and others project a sharp rise in demand; supply and refining are concentrated in a few countries, creating potential bottlenecks and geopolitical risk.
              </p>
            </section>

            <section id="critical-minerals">
              <h3><Box size={20} /> Demand for Clean-Energy Minerals</h3>
              <p>
                The IEA tracks demand for critical minerals used in clean energy technologies. Lithium (for batteries) and nickel are among the fastest-growing; 
                copper is essential for grids and EVs. Supply must scale up to avoid constraining the transition.
              </p>

              <PlotlyChart
                title="Critical Minerals Demand for Clean Energy (2020 = 100)"
                data={[
                  { x: CRITICAL_MINERALS_DEMAND.years, y: CRITICAL_MINERALS_DEMAND.lithium, type: 'scatter', mode: 'lines+markers', name: 'Lithium', line: { color: '#F1C40F', width: 2 }, marker: { size: 5 } },
                  { x: CRITICAL_MINERALS_DEMAND.years, y: CRITICAL_MINERALS_DEMAND.cobalt, type: 'scatter', mode: 'lines+markers', name: 'Cobalt', line: { color: '#3498DB', width: 2 }, marker: { size: 5 } },
                  { x: CRITICAL_MINERALS_DEMAND.years, y: CRITICAL_MINERALS_DEMAND.nickel_clean, type: 'scatter', mode: 'lines+markers', name: 'Nickel (clean energy)', line: { color: '#95A5A6', width: 2 }, marker: { size: 5 } },
                  { x: CRITICAL_MINERALS_DEMAND.years, y: CRITICAL_MINERALS_DEMAND.copper, type: 'scatter', mode: 'lines+markers', name: 'Copper', line: { color: '#E67E22', width: 2 }, marker: { size: 5 } },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Index (2020 = 100)' },
                }}
                source={{ name: 'IEA Critical Minerals', url: 'https://www.iea.org/topics/critical-minerals' }}
              />

              <SectionInsight>
                <p>
                  <strong>Lithium demand for batteries is projected to grow severalfold by 2030</strong> (IEA). Cobalt and nickel are also under pressure. 
                  Supply diversification, recycling, and more efficient use can reduce bottlenecks. Geopolitical concentration of mining and refining remains a risk.
                </p>
              </SectionInsight>
            </section>

            <section id="conclusions" className={styles.takeaways}>
              <h2><BookOpen size={20} /> The Bottom Line</h2>
              <ul>
                <li>
                  <strong>The energy system is still dominated by fossil fuels.</strong> About 80% of primary energy comes from oil, gas, and coal. 
                  The share of renewables is rising fast in power, but overall energy demand is also growing; the transition must accelerate to align with climate goals.
                </li>
                <li>
                  <strong>Electricity is decarbonizing faster than other sectors.</strong> Over 90% of new power capacity is renewable. 
                  For a deeper treatment of renewable growth and climate solutions, see the <Link to="/insights/climate-change">Climate Change report</Link>.
                </li>
                <li>
                  <strong>Energy access remains a crisis for hundreds of millions.</strong> About 760 million people lack electricity; most are in sub-Saharan Africa. 
                  Closing the gap requires sustained investment and policy focus.
                </li>
                <li>
                  <strong>Critical minerals are a bottleneck and an opportunity.</strong> Demand for lithium, cobalt, nickel, and copper will surge. 
                  Supply chains need to scale and diversify to support the transition without undue concentration risk.
                </li>
                <li>
                  <strong>Energy ties climate, economy, and development.</strong> Decarbonizing energy is central to climate action; 
                  access to affordable energy is central to development. The data show both the scale of the challenge and the momentum of the transition.
                </li>
              </ul>
            </section>

            <section id="methodology" className={styles.methodology}>
              <h2>Data Sources & Methodology</h2>
              <p>
                This analysis draws from the International Energy Agency (IEA) Data and Statistics and World Energy Outlook, 
                IRENA Data & Statistics, the BP Statistical Review of World Energy, and the World Bank (access to electricity and energy indicators). 
                Critical minerals demand is from IEA work on critical minerals and clean energy.
              </p>
              <p>
                <strong>Reference years:</strong> Primary energy and electricity mix use IEA/BP data through 2024 where available. 
                Access figures follow World Bank and IEA (e.g. 2022 for number without electricity). Critical minerals demand uses IEA projections and historical data.
              </p>
              <p>
                <strong>Limitations:</strong> Primary energy definitions differ across sources (e.g. IEA vs BP). Electricity generation and capacity data are reported with lags. 
                Access estimates rely on surveys and models. Critical minerals demand is model-based and depends on technology and policy assumptions.
              </p>
              <p>
                <strong>Last Updated:</strong> December 2025. Data align with IEA, IRENA, and World Bank releases available at that time. 
                For a deeper treatment of renewables and decarbonization, see the <Link to="/insights/climate-change">Climate Change report</Link>.
              </p>
            </section>

            <section className={styles.resources}>
              <h2>Primary Sources</h2>
              <ul>
                <li>
                  <a href="https://www.iea.org/data-and-statistics" target="_blank" rel="noopener noreferrer">
                    IEA Data and Statistics <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.iea.org/reports/world-energy-outlook" target="_blank" rel="noopener noreferrer">
                    IEA World Energy Outlook <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.irena.org/Data/Statistics" target="_blank" rel="noopener noreferrer">
                    IRENA Data & Statistics <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.bp.com/en/global/corporate/energy-economics/statistical-review-of-world-energy.html" target="_blank" rel="noopener noreferrer">
                    BP Statistical Review of World Energy <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://data.worldbank.org/topic/energy-and-mining" target="_blank" rel="noopener noreferrer">
                    World Bank – Energy and mining <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.iea.org/topics/critical-minerals" target="_blank" rel="noopener noreferrer">
                    IEA Critical Minerals <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.resources}>
              <h2>Further Reading</h2>
              <ul>
                <li>
                  <a href="https://ourworldindata.org/energy" target="_blank" rel="noopener noreferrer">
                    Our World in Data – Energy <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.iea.org/reports" target="_blank" rel="noopener noreferrer">
                    IEA Reports <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.irena.org/Publications" target="_blank" rel="noopener noreferrer">
                    IRENA Publications <ExternalLink size={14} />
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
