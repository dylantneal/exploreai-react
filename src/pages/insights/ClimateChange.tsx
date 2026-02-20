import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, ExternalLink, AlertTriangle, TrendingUp, Thermometer, 
  Waves, Wind, Calendar, Flame, Droplets, Mountain, Clock, 
  DollarSign, Target, MapPin, GitBranch, Scale, Users, Zap, BookOpen
} from 'lucide-react';
import PlotlyChart from '../../components/charts/PlotlyChart';
import TableOfContents, { TOCItem } from '../../components/ui/TableOfContents';
import SectionInsight from '../../components/ui/SectionInsight';
import CiteThisReport from '../../components/ui/CiteThisReport';
import { SITE_NAME, SITE_URL } from '../../utils/constants';
import styles from '../../styles/pages/Article.module.css';

const INSIGHT_TITLE = 'Climate Change: A Data-Driven Analysis';
const INSIGHT_DESCRIPTION = 'What the scientific evidence tells us about our changing climate: CO₂, temperature, ice, sea level, and what it means for our future. Data from NASA, NOAA, IPCC.';

// ============================================
// DATA SETS - Based on authoritative sources
// ============================================

// Mauna Loa CO2 Data (NOAA/Scripps) - Annual averages
const CO2_DATA = {
  years: [1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [316.91, 320.04, 325.68, 331.15, 338.75, 346.12, 354.39, 360.88, 369.55, 379.80, 389.90, 400.83, 414.24, 416.45, 418.56, 421.08, 422.80, 426.50],
};

// NASA GISTEMP Global Temperature Anomaly (baseline 1951-1980)
const TEMP_ANOMALY_DATA = {
  years: [1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2015, 2020, 2023, 2024, 2025],
  global: [-0.16, -0.34, -0.08, -0.42, -0.25, -0.14, 0.12, -0.17, -0.01, 0.03, 0.26, 0.45, 0.42, 0.72, 0.90, 1.02, 1.17, 1.28, 1.21],
  land: [-0.24, -0.48, -0.13, -0.56, -0.35, -0.18, 0.15, -0.24, -0.03, 0.01, 0.32, 0.61, 0.60, 1.00, 1.25, 1.40, 1.54, 1.70, 1.62],
  ocean: [-0.12, -0.27, -0.06, -0.34, -0.20, -0.11, 0.10, -0.13, 0.00, 0.04, 0.23, 0.37, 0.33, 0.57, 0.73, 0.84, 0.98, 1.08, 1.02],
};

// Arctic Sea Ice Minimum Extent (NSIDC) - Million km²
const ARCTIC_ICE_DATA = {
  years: [1979, 1985, 1990, 1995, 2000, 2005, 2007, 2010, 2012, 2015, 2019, 2020, 2021, 2022, 2023, 2024],
  extent: [7.05, 6.85, 6.24, 6.12, 6.32, 5.57, 4.30, 4.90, 3.41, 4.63, 4.32, 3.74, 4.72, 4.67, 4.23, 4.28],
};

// Global Mean Sea Level (NASA/WMO) - mm relative to 1993
const SEA_LEVEL_DATA = {
  years: [1993, 1995, 2000, 2005, 2010, 2015, 2020, 2023, 2024, 2025],
  level: [0, 9, 25, 41, 58, 78, 97, 108, 113, 117],
};

// Global CO2 Emissions by Sector (Our World in Data / IEA 2022) - Gt CO2
const EMISSIONS_BY_SECTOR = {
  sectors: ['Electricity & Heat', 'Transport', 'Manufacturing', 'Agriculture', 'Buildings', 'Other Industry'],
  values: [13.5, 7.9, 6.2, 5.8, 2.9, 1.5],
  colors: ['#E74C3C', '#3498DB', '#9B59B6', '#27AE60', '#F39C12', '#95A5A6'],
};

// Methane (CH4) Concentration (NOAA/WMO) - Parts per billion
const METHANE_DATA = {
  years: [1984, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2022, 2023, 2024],
  values: [1644, 1714, 1773, 1773, 1774, 1799, 1834, 1889, 1911, 1923, 1934],
};

// Nitrous Oxide (N2O) Concentration (NOAA/WMO) - Parts per billion
const N2O_DATA = {
  years: [1980, 1990, 2000, 2010, 2015, 2020, 2022, 2023, 2024],
  values: [301, 308, 316, 323, 328, 333, 336, 337, 338],
};

// Ice Sheet Mass Loss (NASA GRACE/GRACE-FO) - Gigatons per year
const ICE_SHEET_DATA = {
  years: [2002, 2005, 2008, 2010, 2012, 2015, 2018, 2020, 2022, 2024],
  greenland: [-137, -194, -261, -312, -438, -275, -254, -279, -221, -270],
  antarctica: [-94, -109, -140, -148, -165, -127, -155, -175, -150, -155],
};

// Ocean Acidification (NOAA PMEL) - Ocean surface pH
const OCEAN_PH_DATA = {
  years: [1850, 1900, 1950, 1980, 2000, 2010, 2020, 2024],
  ph: [8.21, 8.20, 8.18, 8.15, 8.12, 8.10, 8.08, 8.07],
};

// Global Glacier Mass Change (WGMS) - Meters water equivalent
const GLACIER_DATA = {
  years: [1970, 1980, 1990, 2000, 2010, 2015, 2020, 2023, 2024],
  cumulative_loss: [0, -2, -5, -10, -17, -23, -30, -36, -37.3],
};

// Global Renewable Energy Capacity (IRENA/IEA) - Gigawatts
const RENEWABLE_CAPACITY = {
  years: [2000, 2005, 2010, 2015, 2018, 2020, 2022, 2023, 2024],
  solar: [1, 5, 40, 227, 480, 714, 1047, 1419, 1890],
  wind: [17, 59, 198, 433, 564, 733, 899, 1017, 1147],
  total_renewable: [754, 981, 1251, 1856, 2356, 2838, 3382, 3884, 4500],
};

// Carbon Budget (IPCC AR6 WG1, updated for emissions through 2024)
const CARBON_BUDGET = {
  scenarios: ['1.5°C (50%)', '1.5°C (67%)', '1.5°C (83%)', '2.0°C (50%)', '2.0°C (67%)'],
  remaining_gt: [275, 175, 75, 850, 700],
  years_remaining: [7.2, 4.6, 2.0, 22.4, 18.4],
  colors: ['#E74C3C', '#C0392B', '#922B21', '#F39C12', '#D68910'],
};

// Climate Tipping Points
const TIPPING_POINTS = [
  { name: 'Arctic Summer Ice', threshold: '~1.5°C', status: 'Near', risk: 'high', consequence: 'Ice-free summers by 2040s-2050s' },
  { name: 'Greenland Ice Sheet', threshold: '~1.5-2.0°C', status: 'Approaching', risk: 'high', consequence: '7m sea level rise over centuries' },
  { name: 'West Antarctic Ice', threshold: '~1.5-2.0°C', status: 'Early signs', risk: 'high', consequence: '3-5m sea level rise' },
  { name: 'Coral Reefs', threshold: '1.5°C', status: 'Critical', risk: 'critical', consequence: '70-90% loss at 1.5°C, 99%+ at 2°C' },
  { name: 'Permafrost', threshold: 'Already thawing', status: 'Active', risk: 'critical', consequence: '1,500 Gt carbon release potential' },
  { name: 'Amazon Rainforest', threshold: '~2.0-2.5°C', status: 'At risk', risk: 'medium', consequence: 'Savannification, major carbon release' },
];

// Attribution Evidence (IPCC AR6 WG1)
const ATTRIBUTION_DATA = {
  observed_warming: 1.28,
  human_contribution: 1.27,
  natural_contribution: 0.01,
};

// Model vs Observation Comparison
const MODEL_VS_OBS = {
  years: [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024],
  model_prediction: [0.35, 0.45, 0.55, 0.65, 0.75, 0.90, 1.05, 1.20],
  observed: [0.35, 0.42, 0.42, 0.65, 0.72, 0.90, 1.02, 1.28],
};

// Economic Costs of Climate Change
const ECONOMIC_COSTS = {
  scenarios: ['No Action (4°C+)', 'Current Policies (2.7°C)', 'Paris-Aligned (2°C)', 'Net Zero (1.5°C)'],
  gdp_loss_2100: [23, 13, 8, 4],
  colors: ['#922B21', '#E74C3C', '#F39C12', '#27AE60'],
};

// Regional Vulnerability Index
const REGIONAL_VULNERABILITY = {
  regions: ['Small Island States', 'Sub-Saharan Africa', 'South Asia', 'Southeast Asia', 'Mediterranean', 'Central America', 'Arctic', 'North America', 'Europe', 'East Asia'],
  vulnerability: [95, 85, 80, 75, 65, 70, 60, 35, 30, 45],
};

// IPCC Future Scenarios
const FUTURE_PROJECTIONS = {
  years: [2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100],
  ssp126: [1.1, 1.3, 1.5, 1.6, 1.6, 1.6, 1.5, 1.5, 1.4],
  ssp245: [1.1, 1.4, 1.7, 2.0, 2.2, 2.4, 2.5, 2.6, 2.7],
  ssp585: [1.1, 1.5, 1.9, 2.4, 2.9, 3.4, 3.9, 4.3, 4.7],
};

// Decarbonization Pathways
const DECARBONIZATION_NEEDS = {
  sectors: ['Electricity', 'Transport', 'Industry', 'Buildings', 'Agriculture'],
  current_emissions: [13.5, 7.9, 6.2, 2.9, 5.8],
  needed_2030: [8.0, 6.5, 5.5, 2.3, 5.0],
  needed_2050: [0, 0.5, 1.0, 0.3, 3.0],
};

// Table of Contents Items
const tocItems: TOCItem[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'evidence', label: 'Part 1: The Evidence' },
  { id: 'atmosphere', label: 'Atmosphere', level: 2 },
  { id: 'temperature', label: 'Temperature', level: 2 },
  { id: 'cryosphere', label: 'Ice & Glaciers', level: 2 },
  { id: 'oceans', label: 'Oceans', level: 2 },
  { id: 'cause', label: 'Part 2: The Cause' },
  { id: 'stakes', label: 'Part 3: What\'s at Stake' },
  { id: 'tipping-points', label: 'Tipping Points', level: 2 },
  { id: 'vulnerability', label: 'Who\'s Most Affected', level: 2 },
  { id: 'timeline', label: 'Part 4: The Timeline' },
  { id: 'solutions', label: 'Part 5: Solutions' },
  { id: 'economics', label: 'Part 6: The Economics' },
  { id: 'conclusions', label: 'Conclusions' },
  { id: 'methodology', label: 'Methodology' },
];

export default function ClimateChange() {
  const canonicalUrl = `${SITE_URL}/insights/climate-change`;
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
        <span className={styles.focusArea}>Climate & Environment</span>
          <h1 className={styles.articleTitle}>Climate Change: A Data-Driven Analysis</h1>
        <p className={styles.articleMeta}>
            What the scientific evidence tells us about our changing climate, and what it means for our future
        </p>
          <div className={styles.lastUpdated}>
            <Calendar size={14} />
            <span>Last updated: December 2025</span>
          </div>
      </header>

        <CiteThisReport
          reportId="CL-2025-01"
          title={INSIGHT_TITLE}
          version="December 2025"
          path="/insights/climate-change"
        />

        {/* ============================================
            EXECUTIVE SUMMARY
            ============================================ */}
        <section id="summary" className={styles.executiveSummary}>
          <h2 className={styles.summaryTitle}>The Bottom Line</h2>
          <ul className={styles.summaryPoints}>
            <li>Earth has warmed <strong>1.28°C</strong> since pre-industrial times, the warmest in 125,000 years</li>
            <li>Human activity is the cause, with <strong>virtually 100%</strong> of observed warming attributed to human influence</li>
            <li>At current emission rates, we have <strong>~5 years</strong> before exhausting the carbon budget for 1.5°C</li>
            <li>Acting on climate costs <strong>$4T/year</strong>; not acting costs <strong>$52T/year</strong> by 2100</li>
            <li>Solutions exist and are scaling: renewables are now <strong>cheaper than fossil fuels</strong> in most markets</li>
          </ul>
          <div className={styles.summaryStats}>
            <div className={styles.summaryStat}>
              <span className={styles.statValue}>426 ppm</span>
              <span className={styles.statLabel}>CO₂ Level</span>
            </div>
            <div className={styles.summaryStat}>
              <span className={styles.statValue}>+1.28°C</span>
              <span className={styles.statLabel}>Warming</span>
            </div>
            <div className={styles.summaryStat}>
              <span className={styles.statValue}>+117 mm</span>
              <span className={styles.statLabel}>Sea Level</span>
            </div>
            <div className={styles.summaryStat}>
              <span className={styles.statValue}>-39%</span>
              <span className={styles.statLabel}>Arctic Ice</span>
            </div>
          </div>
        </section>

        <div className={styles.articleContent}>

          {/* ============================================
              PART 1: THE EVIDENCE
              ============================================ */}
          <section id="evidence" className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>Part 1</span>
            <h2 className={styles.sectionHeading}>The Evidence: What's Happening?</h2>
            <p className={styles.sectionLead}>
              Multiple independent measurement systems (satellites, ocean buoys, weather stations, 
              and ice cores) tell a consistent story of a planet that is rapidly changing.
            </p>
          </section>

          {/* Atmosphere Section */}
          <section id="atmosphere">
            <h3><TrendingUp size={20} /> Atmospheric Composition</h3>
            <p>
              The Mauna Loa Observatory has measured atmospheric CO₂ since 1958, creating the 
              longest continuous record. This data shows both the annual cycle of plant growth 
              and the relentless upward trend driven by fossil fuel combustion.
        </p>

        <PlotlyChart
              title="Atmospheric CO₂ Concentration (1960-2025)"
          data={[
            {
                  x: CO2_DATA.years,
                  y: CO2_DATA.values,
              type: 'scatter',
              mode: 'lines+markers',
              name: 'CO₂ (ppm)',
                  line: { color: '#00BFFF', width: 3, shape: 'spline' },
                  marker: { size: 6 },
                  fill: 'tozeroy',
                  fillcolor: 'rgba(0, 191, 255, 0.08)',
                },
                {
                  x: [1960, 2025],
                  y: [280, 280],
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Pre-industrial (~280 ppm)',
                  line: { color: '#666', width: 2, dash: 'dash' },
                },
              ]}
              layout={{
                xaxis: { title: 'Year' },
                yaxis: { title: 'Parts per Million (ppm)', range: [260, 440] },
              }}
              source={{ name: 'NOAA Global Monitoring Laboratory', url: 'https://gml.noaa.gov/ccgg/trends/' }}
            />

            <SectionInsight>
              <p>
                <strong>CO₂ is now at 426 ppm</strong>, 52% higher than pre-industrial levels and the 
                highest concentration in at least 3 million years. The current rate of increase 
                (3.7 ppm/year) is <strong>15× faster</strong> than any sustained change in the 
                800,000-year ice core record.
              </p>
            </SectionInsight>

            <h4>Other Greenhouse Gases</h4>
            <p>
              While CO₂ is the dominant driver, methane (CH₄) and nitrous oxide (N₂O) contribute 
              significantly. Methane has 80× the warming potential of CO₂ over 20 years; all three 
              gases set records in 2024.
            </p>

            <PlotlyChart
              title="Atmospheric Methane Concentration (1984-2024)"
              data={[
                {
                  x: METHANE_DATA.years,
                  y: METHANE_DATA.values,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'CH₄ (ppb)',
                  line: { color: '#E67E22', width: 3 },
                  marker: { size: 6 },
                  fill: 'tozeroy',
                  fillcolor: 'rgba(230, 126, 34, 0.08)',
                },
                {
                  x: [1984, 2024],
                  y: [722, 722],
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Pre-industrial (~722 ppb)',
                  line: { color: '#666', width: 2, dash: 'dash' },
            },
          ]}
          layout={{
            xaxis: { title: 'Year' },
                yaxis: { title: 'Parts per Billion (ppb)', range: [600, 2000] },
              }}
              source={{ name: 'NOAA Global Monitoring Laboratory', url: 'https://gml.noaa.gov/ccgg/trends_ch4/' }}
            />

            <SectionInsight>
              <p>
                Methane is responsible for roughly <strong>30% of warming</strong> since pre-industrial 
                times. Its short atmospheric lifetime (~12 years) means cutting methane emissions 
                would slow warming faster than any other intervention.
              </p>
            </SectionInsight>
          </section>

          <div className={styles.sectionDivider} />

          {/* Temperature Section */}
          <section id="temperature">
            <h3><Thermometer size={20} /> Global Temperature</h3>
            <p>
              Temperature anomalies show the deviation from a baseline average, allowing accurate 
              comparison across regions and time periods. Multiple independent datasets (NASA, NOAA, 
              Berkeley Earth, UK Met Office) show consistent warming.
        </p>

        <PlotlyChart
              title="Global Temperature Anomaly (1880-2025)"
          data={[
            {
                  x: TEMP_ANOMALY_DATA.years,
                  y: TEMP_ANOMALY_DATA.global,
              type: 'scatter',
              mode: 'lines+markers',
                  name: 'Global Average',
              line: { color: '#FF5733', width: 3 },
                  marker: { size: 5 },
                },
                {
                  x: TEMP_ANOMALY_DATA.years,
                  y: TEMP_ANOMALY_DATA.land,
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Land Only',
                  line: { color: '#E67E22', width: 2, dash: 'dot' },
                },
                {
                  x: TEMP_ANOMALY_DATA.years,
                  y: TEMP_ANOMALY_DATA.ocean,
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Ocean Only',
                  line: { color: '#3498DB', width: 2, dash: 'dot' },
                },
                {
                  x: [1880, 2025],
                  y: [0, 0],
                  type: 'scatter',
                  mode: 'lines',
                  name: '1951-1980 Baseline',
                  line: { color: '#666', width: 1, dash: 'dash' },
                  showlegend: false,
            },
          ]}
          layout={{
            xaxis: { title: 'Year' },
            yaxis: { title: 'Temperature Anomaly (°C)' },
          }}
              source={{ name: 'NASA GISS Surface Temperature Analysis', url: 'https://data.giss.nasa.gov/gistemp/' }}
            />

            <SectionInsight variant="warning">
              <p>
                <strong>2024 was the warmest year on record</strong> at +1.28°C above the 1951-1980 
                baseline (+1.55°C above pre-industrial). The 10 warmest years have all occurred 
                since 2010. Land surfaces are warming nearly twice as fast as oceans.
              </p>
            </SectionInsight>

            <div className={styles.warningBox}>
              <AlertTriangle size={20} />
              <div>
                <strong>The 1.5°C Threshold</strong>
                <p>
                  The Paris Agreement established 1.5°C as a critical threshold. Beyond this, impacts 
                  intensify rapidly: extreme heat events become 8.6× more likely, 70-90% of coral reefs 
                  die, and several tipping points may be crossed.
                </p>
              </div>
            </div>
          </section>

          <div className={styles.sectionDivider} />

          {/* Cryosphere Section */}
          <section id="cryosphere">
            <h3><Mountain size={20} /> Ice & Glaciers</h3>
            <p>
              The cryosphere (Earth's frozen regions) is responding rapidly to warming. Sea ice, 
              ice sheets, and glaciers are all declining at accelerating rates.
            </p>

            <PlotlyChart
              title="Arctic Sea Ice September Minimum (1979-2024)"
              data={[
                {
                  x: ARCTIC_ICE_DATA.years,
                  y: ARCTIC_ICE_DATA.extent,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Ice Extent',
                  line: { color: '#00BFFF', width: 3, shape: 'spline' },
                  marker: { size: 6 },
                  fill: 'tozeroy',
                  fillcolor: 'rgba(0, 191, 255, 0.08)',
                },
              ]}
              layout={{
                xaxis: { title: 'Year' },
                yaxis: { title: 'Million km²', range: [0, 8] },
              }}
              source={{ name: 'NSIDC Sea Ice Index', url: 'https://nsidc.org/data/seaice_index/' }}
            />

            <PlotlyChart
              title="Ice Sheet Mass Loss (2002-2024)"
              data={[
                {
                  x: ICE_SHEET_DATA.years,
                  y: ICE_SHEET_DATA.greenland.map(v => Math.abs(v)),
                  type: 'bar',
                  name: 'Greenland',
                  marker: { color: 'rgba(52, 152, 219, 0.8)' },
                },
                {
                  x: ICE_SHEET_DATA.years,
                  y: ICE_SHEET_DATA.antarctica.map(v => Math.abs(v)),
                  type: 'bar',
                  name: 'Antarctica',
                  marker: { color: 'rgba(155, 89, 182, 0.8)' },
                },
              ]}
              layout={{
                xaxis: { title: 'Year' },
                yaxis: { title: 'Mass Loss (Gigatons/year)' },
                barmode: 'group',
              }}
              source={{ name: 'NASA GRACE-FO', url: 'https://grace.jpl.nasa.gov/' }}
            />

            <PlotlyChart
              title="Global Glacier Mass Loss (1970-2024)"
              data={[
                {
                  x: GLACIER_DATA.years,
                  y: GLACIER_DATA.cumulative_loss,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Cumulative Loss',
                  line: { color: '#9B59B6', width: 3 },
                  marker: { size: 7 },
                  fill: 'tozeroy',
                  fillcolor: 'rgba(155, 89, 182, 0.1)',
                },
              ]}
              layout={{
                xaxis: { title: 'Year' },
                yaxis: { title: 'Cumulative Change (m water equivalent)' },
              }}
              source={{ name: 'World Glacier Monitoring Service', url: 'https://wgms.ch/' }}
            />

            <SectionInsight>
              <p>
                Arctic sea ice has declined <strong>39% since 1979</strong>. Greenland and Antarctica 
                together lose over <strong>400 billion tons of ice annually</strong>. Glaciers worldwide 
                have lost 37 meters of ice thickness since 1970, with 2023-2024 marking the third 
                consecutive year of record loss.
              </p>
            </SectionInsight>
          </section>

          <div className={styles.sectionDivider} />

          {/* Ocean Section */}
          <section id="oceans">
            <h3><Waves size={20} /> Oceans</h3>
            <p>
              Oceans have absorbed over 90% of the excess heat from global warming and roughly 
              30% of human-emitted CO₂. This has profound consequences for marine ecosystems and 
              coastal communities.
        </p>

        <PlotlyChart
              title="Global Mean Sea Level Rise (1993-2025)"
              data={[
                {
                  x: SEA_LEVEL_DATA.years,
                  y: SEA_LEVEL_DATA.level,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Sea Level',
                  line: { color: '#3498DB', width: 3, shape: 'spline' },
                  marker: { size: 7 },
                  fill: 'tozeroy',
                  fillcolor: 'rgba(52, 152, 219, 0.1)',
                },
              ]}
              layout={{
                xaxis: { title: 'Year' },
                yaxis: { title: 'Sea Level Change (mm)' },
              }}
              source={{ name: 'NASA Sea Level Change Portal', url: 'https://sealevel.nasa.gov/' }}
            />

            <PlotlyChart
              title="Ocean Acidification (1850-2024)"
              data={[
                {
                  x: OCEAN_PH_DATA.years,
                  y: OCEAN_PH_DATA.ph,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Ocean pH',
                  line: { color: '#1ABC9C', width: 3 },
                  marker: { size: 7 },
                },
              ]}
              layout={{
                xaxis: { title: 'Year' },
                yaxis: { title: 'Ocean Surface pH', range: [8.0, 8.25] },
              }}
              source={{ name: 'NOAA PMEL', url: 'https://www.pmel.noaa.gov/co2/story/Ocean+Acidification' }}
            />

            <SectionInsight>
              <p>
                Sea level has risen <strong>117mm since 1993</strong> and is accelerating from 
                2.1 mm/year to 4.1 mm/year. Ocean pH has dropped from 8.21 to 8.07, a 
                <strong>~30% increase in acidity</strong> (hydrogen ion concentration), 
                threatening shell-forming organisms that form the base of marine food webs.
              </p>
            </SectionInsight>
          </section>

          {/* ============================================
              PART 2: THE CAUSE
              ============================================ */}
          <section id="cause" className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>Part 2</span>
            <h2 className={styles.sectionHeading}>The Cause: Why We Know It's Us</h2>
            <p className={styles.sectionLead}>
              Climate science uses multiple independent lines of evidence (physics, chemistry, 
              isotopic signatures, and model comparisons) to establish causation with high confidence.
            </p>
          </section>

          <div className={styles.infoBox}>
            <h3><Scale size={18} /> Attribution Science</h3>
            <p>
              The IPCC states: <em>"It is unequivocal that human influence has warmed the atmosphere, 
              ocean and land."</em> This conclusion rests on: (1) known physics of greenhouse gases, 
              (2) isotopic fingerprints of fossil carbon in the atmosphere, (3) observed "fingerprints" 
              that match human (not natural) forcing, and (4) climate models that only match observations 
              when human factors are included.
            </p>
          </div>

          <PlotlyChart
            title="Human vs. Natural Contribution to Observed Warming"
            data={[
              {
                x: ['Observed Warming', 'Human Contribution', 'Natural Factors'],
                y: [ATTRIBUTION_DATA.observed_warming, ATTRIBUTION_DATA.human_contribution, ATTRIBUTION_DATA.natural_contribution],
                type: 'bar',
                marker: { color: ['#3498DB', '#E74C3C', '#27AE60'] },
                text: [`+${ATTRIBUTION_DATA.observed_warming}°C`, `+${ATTRIBUTION_DATA.human_contribution}°C`, `+${ATTRIBUTION_DATA.natural_contribution}°C`],
                textposition: 'outside',
              },
            ]}
            layout={{
              xaxis: { title: '' },
              yaxis: { title: 'Temperature Change (°C)', range: [0, 1.6] },
            }}
            height={350}
            source={{ name: 'IPCC AR6 Working Group I', url: 'https://www.ipcc.ch/report/ar6/wg1/' }}
          />

          <PlotlyChart
            title="Climate Models vs. Observations (1990-2024)"
          data={[
            {
                x: MODEL_VS_OBS.years,
                y: MODEL_VS_OBS.model_prediction,
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Model Predictions (made in 1990)',
                line: { color: '#9B59B6', width: 3, dash: 'dash' },
                marker: { size: 6 },
              },
              {
                x: MODEL_VS_OBS.years,
                y: MODEL_VS_OBS.observed,
              type: 'scatter',
              mode: 'lines+markers',
                name: 'Actual Observations',
                line: { color: '#E74C3C', width: 3 },
              marker: { size: 8 },
            },
          ]}
          layout={{
            xaxis: { title: 'Year' },
              yaxis: { title: 'Temperature Anomaly (°C)' },
            }}
            source={{ name: 'Hausfather et al. (2020), Geophysical Research Letters', url: 'https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2019GL085378' }}
          />

          <SectionInsight>
            <p>
              <strong>Natural factors cannot explain the warming.</strong> Solar output has been 
              slightly declining since 1980. Volcanic eruptions cause temporary cooling, not warming. 
              Human activities account for <strong>essentially 100%</strong> of observed warming since 
              pre-industrial times. Climate models have successfully predicted warming for over 30 years.
            </p>
          </SectionInsight>

          <h4>Where Emissions Come From</h4>

          <PlotlyChart
            title="Global CO₂ Emissions by Sector"
            data={[
              {
                x: EMISSIONS_BY_SECTOR.sectors,
                y: EMISSIONS_BY_SECTOR.values,
                type: 'bar',
                marker: { color: EMISSIONS_BY_SECTOR.colors },
                text: EMISSIONS_BY_SECTOR.values.map(v => `${v} Gt`),
                textposition: 'outside',
              },
            ]}
            layout={{
              xaxis: { title: '', tickangle: -25 },
              yaxis: { title: 'Gt CO₂ per Year', range: [0, 16] },
            }}
            height={400}
            source={{ name: 'Our World in Data / IEA', url: 'https://ourworldindata.org/emissions-by-sector' }}
          />

          {/* ============================================
              PART 3: WHAT'S AT STAKE
              ============================================ */}
          <section id="stakes" className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>Part 3</span>
            <h2 className={styles.sectionHeading}>What's at Stake</h2>
            <p className={styles.sectionLead}>
              Climate change is not just about higher temperatures. It's about triggering 
              irreversible changes and amplifying impacts on the most vulnerable.
            </p>
          </section>

          {/* Tipping Points */}
          <section id="tipping-points">
            <h3><Target size={20} /> Climate Tipping Points</h3>
            <p>
              Tipping points are thresholds beyond which changes become self-reinforcing and 
              potentially irreversible. Current warming (~1.3°C) is already approaching or 
              activating several of these critical systems.
            </p>

            <div className={styles.tippingPointsGrid}>
              {TIPPING_POINTS.map((tp) => (
                <div 
                  key={tp.name} 
                  className={`${styles.tippingPointCard} ${
                    tp.risk === 'critical' ? styles.riskCritical : 
                    tp.risk === 'high' ? styles.riskHigh : 
                    styles.riskMedium
                  }`}
                >
                  <div className={styles.tpHeader}>
                    <h4>{tp.name}</h4>
                    <span className={styles.tpStatus}>{tp.status}</span>
                  </div>
                  <div className={styles.tpThreshold}>
                    <span className={styles.label}>Threshold:</span>
                    <span className={styles.value}>{tp.threshold}</span>
                  </div>
                  <p className={styles.tpConsequence}>{tp.consequence}</p>
                </div>
              ))}
            </div>

            <SectionInsight variant="warning">
              <p>
                Multiple tipping points cluster around <strong>1.5-2°C</strong> warming. Once crossed, 
                these systems may continue changing for centuries regardless of emission reductions. 
                Coral reefs and permafrost are already showing signs of destabilization.
              </p>
            </SectionInsight>

            <div className={styles.feedbackLoop}>
              <h4>Amplifying Feedback Loops</h4>
              <ul>
                <li><strong>Ice-Albedo:</strong> Melting ice reveals dark surfaces → absorbs more heat → more melting</li>
                <li><strong>Permafrost Carbon:</strong> Warming thaws permafrost → releases CO₂ and CH₄ → more warming</li>
                <li><strong>Water Vapor:</strong> Warmer air holds more water vapor (a GHG) → more warming</li>
                <li><strong>Forest Dieback:</strong> Heat and drought kill trees → releases stored carbon → more warming</li>
              </ul>
            </div>
          </section>

          <div className={styles.sectionDivider} />

          {/* Vulnerability */}
          <section id="vulnerability">
            <h3><MapPin size={20} /> Who's Most Affected</h3>
            <p>
              Climate impacts are profoundly unequal. Those who contributed least to the problem 
              often face the greatest risks, a fundamental injustice at the heart of climate policy.
        </p>

        <PlotlyChart
              title="Regional Climate Vulnerability Index"
              data={[
                {
                  x: REGIONAL_VULNERABILITY.regions,
                  y: REGIONAL_VULNERABILITY.vulnerability,
                  type: 'bar',
                  marker: { 
                    color: REGIONAL_VULNERABILITY.vulnerability.map(v => 
                      v > 80 ? '#922B21' : v > 60 ? '#E74C3C' : v > 40 ? '#F39C12' : '#27AE60'
                    ),
                  },
                  text: REGIONAL_VULNERABILITY.vulnerability.map(v => `${v}`),
                  textposition: 'outside',
                },
              ]}
              layout={{
                xaxis: { title: '', tickangle: -45 },
                yaxis: { title: 'Vulnerability Index (0-100)', range: [0, 110] },
              }}
              height={420}
              source={{ name: 'ND-GAIN Country Index', url: 'https://gain.nd.edu/our-work/country-index/' }}
            />

            <SectionInsight variant="warning">
              <p>
                Small island nations and Sub-Saharan Africa face the highest vulnerability despite 
                contributing <strong>less than 4% of historical emissions combined</strong>. The 
                ~65 million people in small island states face potential loss of their entire nations 
                to rising seas.
              </p>
            </SectionInsight>
          </section>

          {/* ============================================
              PART 4: THE TIMELINE
              ============================================ */}
          <section id="timeline" className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>Part 4</span>
            <h2 className={styles.sectionHeading}>The Timeline: How Much Time Do We Have?</h2>
            <p className={styles.sectionLead}>
              The carbon budget translates temperature targets into concrete numbers: 
              how much CO₂ we can still emit, and how long that lasts at current rates.
            </p>
          </section>

          <PlotlyChart
            title="Remaining Carbon Budget by Temperature Target"
          data={[
            {
                x: CARBON_BUDGET.scenarios,
                y: CARBON_BUDGET.remaining_gt,
              type: 'bar',
                marker: { color: CARBON_BUDGET.colors },
                text: CARBON_BUDGET.remaining_gt.map((v, i) => 
                  `${v} Gt (~${CARBON_BUDGET.years_remaining[i].toFixed(1)} yrs)`
                ),
                textposition: 'outside',
              },
            ]}
            layout={{
              xaxis: { title: '' },
              yaxis: { title: 'Remaining Budget (Gt CO₂)', range: [0, 1000] },
            }}
            height={400}
            source={{ name: 'IPCC AR6 (updated for 2025)', url: 'https://www.ipcc.ch/report/ar6/wg1/' }}
          />

          <div className={styles.warningBox}>
            <Clock size={20} />
            <div>
              <strong>The Math is Unforgiving</strong>
              <p>
                At 38 Gt CO₂/year, the budget for a 67% chance of limiting warming to 1.5°C 
                lasts <strong>less than 5 years</strong>. To stay on track, global emissions 
                must fall 43% by 2030 and reach net-zero by ~2050. Current pledges put us on 
                track for 2.5-2.9°C, and the gap between pledges and actions is even larger.
              </p>
            </div>
          </div>

          <PlotlyChart
            title="Projected Temperature Pathways to 2100"
            data={[
              {
                x: FUTURE_PROJECTIONS.years,
                y: FUTURE_PROJECTIONS.ssp126,
                type: 'scatter',
                mode: 'lines',
                name: 'SSP1-2.6 (Net Zero)',
                line: { color: '#27AE60', width: 3 },
              },
              {
                x: FUTURE_PROJECTIONS.years,
                y: FUTURE_PROJECTIONS.ssp245,
                type: 'scatter',
                mode: 'lines',
                name: 'SSP2-4.5 (Current Policies)',
                line: { color: '#F39C12', width: 3 },
              },
              {
                x: FUTURE_PROJECTIONS.years,
                y: FUTURE_PROJECTIONS.ssp585,
                type: 'scatter',
                mode: 'lines',
                name: 'SSP5-8.5 (High Emissions)',
                line: { color: '#E74C3C', width: 3 },
              },
              {
                x: [2020, 2100],
                y: [1.5, 1.5],
                type: 'scatter',
                mode: 'lines',
                name: '1.5°C Target',
                line: { color: '#888', width: 2, dash: 'dash' },
            },
          ]}
          layout={{
            xaxis: { title: 'Year' },
              yaxis: { title: 'Temperature Change (°C vs. 1850-1900)', range: [0, 5] },
            }}
            height={420}
            source={{ name: 'IPCC AR6 Working Group I', url: 'https://www.ipcc.ch/report/ar6/wg1/' }}
          />

          <SectionInsight>
            <p>
              The difference between scenarios is <strong>primarily a function of choices made in the next 
              5-10 years</strong>. Warming through mid-century is largely locked in by past emissions, 
              but end-of-century outcomes diverge dramatically based on near-term policy decisions.
            </p>
          </SectionInsight>

          {/* ============================================
              PART 5: SOLUTIONS
              ============================================ */}
          <section id="solutions" className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>Part 5</span>
            <h2 className={styles.sectionHeading}>Solutions: What Needs to Happen</h2>
            <p className={styles.sectionLead}>
              The technologies exist. Renewable energy is now cheaper than fossil fuels in most markets. 
              The challenge is scaling deployment fast enough.
            </p>
          </section>

        <PlotlyChart
            title="Global Renewable Energy Growth (2000-2024)"
          data={[
            {
                x: RENEWABLE_CAPACITY.years,
                y: RENEWABLE_CAPACITY.solar,
                type: 'bar',
                name: 'Solar',
                marker: { color: 'rgba(241, 196, 15, 0.8)' },
              },
              {
                x: RENEWABLE_CAPACITY.years,
                y: RENEWABLE_CAPACITY.wind,
              type: 'bar',
                name: 'Wind',
                marker: { color: 'rgba(52, 152, 219, 0.8)' },
            },
          ]}
          layout={{
            xaxis: { title: 'Year' },
              yaxis: { title: 'Installed Capacity (GW)' },
              barmode: 'stack',
            }}
            height={400}
            source={{ name: 'IRENA / IEA', url: 'https://www.irena.org/Statistics' }}
          />

          <SectionInsight variant="success">
            <p>
              <strong>Solar capacity has grown 1,890× since 2000.</strong> Combined solar and wind 
              now exceed 3,000 GW globally. In 2024, renewables accounted for over 90% of new 
              electricity capacity added worldwide. The economics now favor clean energy.
            </p>
          </SectionInsight>

          <h4>What Each Sector Must Do</h4>

          <PlotlyChart
            title="Sector Decarbonization Pathway (1.5°C-Aligned)"
            data={[
              {
                x: DECARBONIZATION_NEEDS.sectors,
                y: DECARBONIZATION_NEEDS.current_emissions,
                type: 'bar',
                name: 'Current (2024)',
                marker: { color: 'rgba(231, 76, 60, 0.8)' },
              },
              {
                x: DECARBONIZATION_NEEDS.sectors,
                y: DECARBONIZATION_NEEDS.needed_2030,
                type: 'bar',
                name: 'Target 2030',
                marker: { color: 'rgba(243, 156, 18, 0.8)' },
              },
              {
                x: DECARBONIZATION_NEEDS.sectors,
                y: DECARBONIZATION_NEEDS.needed_2050,
                type: 'bar',
                name: 'Target 2050',
                marker: { color: 'rgba(39, 174, 96, 0.8)' },
              },
            ]}
            layout={{
              xaxis: { title: '' },
              yaxis: { title: 'Gt CO₂ per Year' },
              barmode: 'group',
            }}
            height={420}
            source={{ name: 'IEA Net Zero by 2050', url: 'https://www.iea.org/reports/net-zero-by-2050' }}
          />

          <SectionInsight>
            <p>
              <strong>Electricity is the linchpin:</strong> decarbonizing power enables electrification 
              of transport and buildings, potentially cutting emissions 60%+ by 2050. Industry requires 
              green hydrogen and carbon capture. Agriculture must address livestock and land use.
            </p>
          </SectionInsight>

          {/* ============================================
              PART 6: THE ECONOMICS
              ============================================ */}
          <section id="economics" className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>Part 6</span>
            <h2 className={styles.sectionHeading}>The Economics: Why Action Pays</h2>
            <p className={styles.sectionLead}>
              Climate action isn't just about avoiding disaster. It's one of the best investments 
              humanity can make. The costs of inaction far exceed the costs of mitigation.
            </p>
          </section>

          <PlotlyChart
            title="Economic Costs by 2100 Under Different Scenarios"
            data={[
              {
                x: ECONOMIC_COSTS.scenarios,
                y: ECONOMIC_COSTS.gdp_loss_2100,
                type: 'bar',
                marker: { color: ECONOMIC_COSTS.colors },
                text: ECONOMIC_COSTS.gdp_loss_2100.map(v => `${v}% GDP`),
                textposition: 'outside',
              },
            ]}
            layout={{
              xaxis: { title: '' },
              yaxis: { title: 'GDP Loss (%)', range: [0, 28] },
            }}
            height={380}
            source={{ name: 'Swiss Re Institute / NGFS', url: 'https://www.swissre.com/institute/' }}
          />

          <SectionInsight variant="success">
            <p>
              <strong>Every $1 invested in climate action saves $4-10 in avoided damages.</strong> 
              Without action, climate change could reduce global GDP by 23% by 2100, larger than 
              the Great Depression. Full mitigation costs ~$4 trillion/year but avoids $52 trillion 
              in annual damages: a <strong>13× return on investment</strong>.
            </p>
          </SectionInsight>

          {/* ============================================
              KEY CONCLUSIONS
              ============================================ */}
          <section id="conclusions" className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>Synthesis</span>
            <h2 className={styles.sectionHeading}>Conclusions: What the Data Tells Us</h2>
            <p className={styles.sectionLead}>
              Drawing together the evidence presented above, we can state the following conclusions 
              with high confidence, based on the scientific methodology of converging independent 
              lines of evidence.
            </p>
          </section>

          <div className={styles.infoBox}>
            <h3><Scale size={18} /> Conclusion 1: Climate Change is Unambiguously Occurring</h3>
            <p>
              The data leaves no room for doubt that Earth's climate system is changing rapidly:
            </p>
            <ul>
              <li><strong>Atmospheric CO₂</strong> has risen from 280 ppm (pre-industrial) to 426 ppm, a 52% increase and the highest level in at least 3 million years</li>
              <li><strong>Global temperature</strong> has increased 1.28°C since pre-industrial times, with 2024 the warmest year in the instrumental record</li>
              <li><strong>Arctic sea ice</strong> has declined 39% since satellite monitoring began in 1979</li>
              <li><strong>Sea level</strong> has risen 117mm since 1993 and is accelerating from 2.1 to 4.1 mm/year</li>
              <li><strong>Ocean pH</strong> has dropped from 8.21 to 8.07, a ~30% increase in acidity</li>
              <li><strong>Ice sheets</strong> are losing over 400 billion tons of ice annually</li>
            </ul>
            <p>
              These changes are observed by independent measurement systems (satellites, ocean buoys, 
              weather stations, ice cores) maintained by different institutions in different countries, 
              all showing consistent results.
            </p>
          </div>

          <div className={styles.infoBox}>
            <h3><Scale size={18} /> Conclusion 2: Human Activity is the Dominant Cause</h3>
            <p>
              The IPCC states it is <strong>"unequivocal"</strong> that human influence has warmed 
              the atmosphere, ocean, and land. This conclusion rests on multiple independent lines of evidence:
            </p>
            <ul>
              <li><strong>Physics:</strong> The greenhouse effect has been understood since the 1850s. Adding CO₂ traps more heat; this is not in dispute</li>
              <li><strong>Isotopic fingerprints:</strong> The carbon in the atmosphere carries the isotopic signature of fossil fuels, not volcanoes or oceans</li>
              <li><strong>Timing:</strong> Warming accelerated in lockstep with industrialization and fossil fuel use</li>
              <li><strong>Pattern:</strong> Observed warming patterns (stratospheric cooling, polar amplification) match human forcing, not natural forcing</li>
              <li><strong>Attribution:</strong> Human contribution accounts for +1.27°C of the +1.28°C observed warming; natural factors contribute only +0.01°C</li>
              <li><strong>Model validation:</strong> Climate models have successfully predicted warming for 30+ years, predictions made before the observations occurred</li>
            </ul>
            <p>
              Natural factors (solar variation, volcanic eruptions) cannot explain the observed warming. 
              Solar output has been slightly declining since 1980, yet warming has accelerated.
            </p>
          </div>

          <div className={styles.warningBox}>
            <AlertTriangle size={20} />
            <div>
              <strong>Conclusion 3: We Are Approaching Critical Thresholds</strong>
              <p>
                At 1.28°C warming, we are already experiencing impacts and approaching tipping points:
              </p>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li>Coral reefs are at <strong>critical risk</strong>: 70-90% will die at 1.5°C, 99%+ at 2°C</li>
                <li>Permafrost is <strong>actively thawing</strong>, beginning to release its 1,500 Gt carbon store</li>
                <li>Arctic summer ice-free conditions are <strong>projected by 2040s-2050s</strong></li>
                <li>The carbon budget for 1.5°C (67% probability) provides only <strong>~4.6 years</strong> at current emission rates</li>
              </ul>
              <p style={{ marginTop: '8px' }}>
                Once tipping points are crossed, changes become self-reinforcing and potentially irreversible 
                on human timescales.
              </p>
            </div>
          </div>

          <div className={styles.infoBox}>
            <h3><Zap size={18} /> Conclusion 4: Solutions Exist and Are Economically Viable</h3>
            <p>
              The technology to address climate change exists and is scaling rapidly:
            </p>
            <ul>
              <li><strong>Solar capacity</strong> has grown 1,890× since 2000 and is now the cheapest form of new electricity in most markets</li>
              <li><strong>Renewables</strong> represented over 90% of new electricity capacity added globally in 2024</li>
              <li><strong>Total renewable capacity</strong> reached 4,500 GW in 2024, a 500% increase since 2000</li>
              <li><strong>Cost of solar</strong> has fallen 90% since 2010; wind has fallen 70%</li>
            </ul>
            <p>
              The barrier is no longer technological; it is the pace of deployment and the political will 
              to accelerate the transition.
            </p>
          </div>

          <div className={styles.infoBox}>
            <h3><DollarSign size={18} /> Conclusion 5: Inaction is Far More Expensive Than Action</h3>
            <p>
              The economic analysis is unambiguous:
            </p>
            <ul>
              <li><strong>Cost of inaction (4°C+):</strong> 23% of global GDP by 2100, equivalent to $52 trillion/year in damages</li>
              <li><strong>Cost of full mitigation (1.5°C):</strong> ~4% of GDP, approximately $4 trillion/year in investment</li>
              <li><strong>Net savings from action:</strong> ~$48 trillion/year by 2100</li>
              <li><strong>Return on investment:</strong> Every $1 spent on climate action avoids $4-13 in damages</li>
            </ul>
            <p>
              Climate action is not a burden. It is the most profitable investment humanity can make. 
              The costs of inaction would exceed any economic crisis in human history.
            </p>
          </div>

          <section className={styles.takeaways}>
            <h2><BookOpen size={20} /> The Bottom Line</h2>
            <ul>
              <li>
                <strong>This is settled science.</strong> The evidence comes from physics, chemistry, 
                direct observations, ice cores, satellites, and ocean buoys, all converging on the same 
                conclusion. There is no credible scientific alternative explanation.
              </li>
              <li>
                <strong>The window for action is closing rapidly.</strong> At current emission rates, 
                the 1.5°C carbon budget will be exhausted within 5 years. Each year of delay reduces 
                our options and increases the eventual cost.
              </li>
              <li>
                <strong>The impacts are not distant; they are here.</strong> Record temperatures, 
                accelerating ice loss, rising seas, and intensifying extreme weather are occurring now. 
                These trends will continue and accelerate without intervention.
              </li>
              <li>
                <strong>Solutions are available and affordable.</strong> Clean energy is now cheaper 
                than fossil fuels in most markets. The technology exists; what's needed is deployment 
                at unprecedented speed and scale.
              </li>
              <li>
                <strong>The choice is ours.</strong> The difference between 1.5°C and 4°C is not 
                physics; it is policy. The future climate depends primarily on decisions made in the 
                next decade.
              </li>
            </ul>
          </section>

          {/* ============================================
              METHODOLOGY & SOURCES
              ============================================ */}
          <section id="methodology" className={styles.methodology}>
          <h2>Data Sources & Methodology</h2>
          <p>
              This analysis draws from primary authoritative sources: NASA GISTEMP for temperature 
              (1951-1980 baseline), NOAA Global Monitoring Laboratory for greenhouse gases, 
              NASA GRACE-FO for ice sheet mass balance, NOAA PMEL for ocean acidification, 
              satellite altimetry for sea level, NSIDC for sea ice, WGMS for glaciers, Global 
              Carbon Project for emissions, and IRENA/IEA for energy statistics.
          </p>
          <p>
              <strong>Uncertainties:</strong> Temperature uncertainty is ±0.05°C for recent decades. 
              Ice sheet mass balance uncertainty is ±50 Gt/year. Future projections span a range 
              reflecting both scenario and climate system uncertainty. Historical data uses 
              reconstruction techniques with associated uncertainties.
          </p>
        </section>

          <section className={styles.resources}>
            <h2>Primary Sources</h2>
            <ul>
              <li>
                <a href="https://data.giss.nasa.gov/gistemp/" target="_blank" rel="noopener noreferrer">
                  NASA GISS Surface Temperature Analysis <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://gml.noaa.gov/ccgg/trends/" target="_blank" rel="noopener noreferrer">
                  NOAA Global Monitoring Laboratory <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://nsidc.org/data/seaice_index/" target="_blank" rel="noopener noreferrer">
                  NSIDC Sea Ice Index <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://grace.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer">
                  NASA GRACE-FO <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://sealevel.nasa.gov/" target="_blank" rel="noopener noreferrer">
                  NASA Sea Level Change Portal <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://www.ipcc.ch/report/ar6/wg1/" target="_blank" rel="noopener noreferrer">
                  IPCC Sixth Assessment Report <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://www.globalcarbonproject.org/" target="_blank" rel="noopener noreferrer">
                  Global Carbon Project <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://www.irena.org/Statistics" target="_blank" rel="noopener noreferrer">
                  IRENA Renewable Energy Statistics <ExternalLink size={14} />
                </a>
              </li>
            </ul>
        </section>

        <section className={styles.resources}>
          <h2>Further Reading</h2>
          <ul>
            <li>
              <a href="https://climate.nasa.gov/" target="_blank" rel="noopener noreferrer">
                  NASA Climate Change Portal <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://ourworldindata.org/climate-change" target="_blank" rel="noopener noreferrer">
                  Our World in Data - Climate Change <ExternalLink size={14} />
              </a>
            </li>
            <li>
                <a href="https://www.carbonbrief.org/" target="_blank" rel="noopener noreferrer">
                  Carbon Brief <ExternalLink size={14} />
              </a>
            </li>
            <li>
                <a href="https://skepticalscience.com/" target="_blank" rel="noopener noreferrer">
                  Skeptical Science <ExternalLink size={14} />
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
