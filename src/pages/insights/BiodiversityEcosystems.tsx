import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, ExternalLink, AlertTriangle, Calendar, TreePine,
  Bug, Bird, Shield, Waves, Leaf, DollarSign, Landmark, BookOpen
} from 'lucide-react';
import PlotlyChart from '../../components/charts/PlotlyChart';
import TableOfContents, { TOCItem } from '../../components/ui/TableOfContents';
import SectionInsight from '../../components/ui/SectionInsight';
import CiteThisReport from '../../components/ui/CiteThisReport';
import { SITE_NAME, SITE_URL } from '../../utils/constants';
import styles from '../../styles/pages/Article.module.css';

const INSIGHT_TITLE = 'Biodiversity & Ecosystems: A Data-Driven Analysis';
const INSIGHT_DESCRIPTION = 'Species trends, extinction risk, protected area coverage, deforestation, ecosystem services, and policy frameworks. Data from IUCN, IPBES, FAO, CBD, and BirdLife.';

// ============================================
// DATA SETS – IUCN, WWF/ZSL, UNEP-WCMC, FAO, IPBES
// ============================================

// Living Planet Index (WWF/ZSL LPI 2022) – index of monitored vertebrate populations (1970 = 1.0)
const LIVING_PLANET_INDEX = {
  years: [1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2018],
  global: [1.0, 0.93, 0.84, 0.77, 0.70, 0.62, 0.56, 0.48, 0.44, 0.37, 0.31],
};

// LPI by system (WWF LPI 2022) – index values at 2018
const LPI_BY_SYSTEM = {
  systems: ['Freshwater', 'Terrestrial', 'Marine'],
  decline: [83, 69, 56],
  colors: ['#3498DB', '#27AE60', '#1ABC9C'],
};

// IUCN Red List – percentage of assessed species threatened, by taxonomic group (2024 update)
const THREATENED_BY_GROUP = {
  groups: ['Amphibians', 'Sharks & Rays', 'Reef Corals', 'Conifers', 'Mammals', 'Reptiles', 'Birds'],
  percent: [41, 37, 33, 34, 27, 21, 13],
  colors: ['#E74C3C', '#C0392B', '#F39C12', '#8E44AD', '#E67E22', '#2ECC71', '#3498DB'],
};

// IUCN Red List – total assessed and threatened species (2024)
const RED_LIST_SUMMARY = {
  categories: ['Extinct', 'Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'],
  species: [947, 9065, 16094, 17116, 8733, 76565],
  colors: ['#2C3E50', '#922B21', '#E74C3C', '#F39C12', '#F1C40F', '#27AE60'],
};

// Red List Index trends (IUCN RLI) – closer to 1.0 = better; declining = worsening
const RED_LIST_INDEX = {
  years: [1993, 1998, 2003, 2008, 2013, 2018, 2024],
  birds: [0.928, 0.926, 0.922, 0.918, 0.914, 0.910, 0.907],
  mammals: [0.836, 0.833, 0.829, 0.824, 0.819, 0.815, 0.812],
  amphibians: [0.812, 0.808, 0.800, 0.793, 0.787, 0.780, 0.773],
  corals: [0.960, 0.952, 0.941, 0.926, 0.910, 0.893, 0.878],
};

// Protected area coverage (UNEP-WCMC / WDPA) – % of total area
const PROTECTED_AREAS = {
  years: [1990, 2000, 2010, 2015, 2020, 2024],
  terrestrial: [8.8, 11.5, 14.0, 14.7, 15.4, 17.0],
  marine: [0.7, 1.7, 4.2, 5.5, 7.5, 8.3],
};

// Global forest area (FAO Global Forest Resources Assessment) – billion hectares
const FOREST_AREA = {
  years: [1990, 2000, 2010, 2015, 2020],
  area: [4.236, 4.158, 4.106, 4.060, 4.059],
};

// Net forest area change by region (FAO FRA 2020) – million hectares per year, 2010–2020
const FOREST_CHANGE_BY_REGION = {
  regions: ['Africa', 'South America', 'Oceania', 'North & Central America', 'Europe', 'Asia'],
  change: [-3.94, -2.60, -0.31, 0.03, 0.30, 1.17],
  colors: ['#E74C3C', '#C0392B', '#F39C12', '#95A5A6', '#2ECC71', '#27AE60'],
};

// Annual tree cover loss (Global Forest Watch / Hansen et al.) – million hectares
const TREE_COVER_LOSS = {
  years: [2001, 2005, 2008, 2010, 2012, 2015, 2017, 2019, 2020, 2022],
  loss: [9.6, 10.3, 11.4, 12.0, 10.5, 20.3, 15.8, 12.1, 12.2, 11.1],
};

// Ecosystem services global value estimates (Costanza et al. 2014 updated, TEEB, Dasgupta 2021)
const ECOSYSTEM_SERVICES_VALUE = {
  services: ['Nutrient Cycling', 'Climate Regulation', 'Erosion Control', 'Recreation', 'Water Supply', 'Food Production', 'Pollination', 'Raw Materials'],
  value: [17.1, 16.3, 11.5, 10.8, 7.6, 6.2, 3.6, 3.2],
  colors: ['#16A085', '#1ABC9C', '#2ECC71', '#27AE60', '#3498DB', '#2980B9', '#F39C12', '#E67E22'],
};

// Coral reef status – percent of reefs at risk (GCRMN 2021)
const CORAL_REEF_STATUS = {
  years: [1998, 2002, 2006, 2010, 2014, 2019],
  hardCoralCover: [32.5, 30.4, 29.2, 28.1, 27.8, 26.0],
  algaeCover: [15.1, 17.6, 19.0, 20.4, 21.5, 22.8],
};

// Table of Contents
const tocItems: TOCItem[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'species-trends', label: 'Part 1: Species Trends & Decline' },
  { id: 'extinction-risk', label: 'Part 2: Extinction Risk' },
  { id: 'protected-areas', label: 'Part 3: Protected Areas & Conservation' },
  { id: 'deforestation', label: 'Part 4: Deforestation & Forest Loss' },
  { id: 'ecosystem-services', label: 'Part 5: Ecosystem Services & Value' },
  { id: 'policy', label: 'Part 6: Policy Frameworks & Outlook' },
  { id: 'conclusions', label: 'Conclusions' },
  { id: 'methodology', label: 'Methodology' },
];

export default function BiodiversityEcosystems() {
  const canonicalUrl = `${SITE_URL}/insights/biodiversity-ecosystems`;
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
            <span className={styles.focusArea}>Biodiversity &amp; Ecosystems</span>
            <h1 className={styles.articleTitle}>{INSIGHT_TITLE}</h1>
            <p className={styles.articleMeta}>
              Species trends, extinction risk, protected area coverage, deforestation, ecosystem services, and international policy. Data from IUCN, IPBES, FAO, CBD, and BirdLife.
            </p>
            <div className={styles.lastUpdated}>
              <Calendar size={14} />
              <span>Last updated: January 2026</span>
            </div>
          </header>

          <CiteThisReport
            reportId="CL-2025-07"
            title={INSIGHT_TITLE}
            version="January 2026"
            path="/insights/biodiversity-ecosystems"
          />

          <section id="summary" className={styles.executiveSummary}>
            <h2 className={styles.summaryTitle}>The Bottom Line</h2>
            <ul className={styles.summaryPoints}>
              <li>Monitored wildlife populations have declined by an average of <strong>69% since 1970</strong> (WWF Living Planet Index); freshwater species are the hardest hit (−83%)</li>
              <li>Over <strong>44,000 species</strong> are currently classified as threatened with extinction on the IUCN Red List, including 41% of amphibians, 37% of sharks and rays, 33% of reef-building corals</li>
              <li>Protected areas now cover about <strong>17% of land</strong> and <strong>8% of oceans</strong>, still short of the Kunming-Montreal &ldquo;30 by 30&rdquo; target</li>
              <li>The world lost a net <strong>178 million hectares of forest</strong> between 1990 and 2020, with the tropics accounting for most of the loss</li>
              <li>Global ecosystem services are valued at roughly <strong>$125–145 trillion per year</strong>, exceeding global GDP, yet nature&apos;s value is largely invisible in economic accounting</li>
            </ul>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>−69%</span>
                <span className={styles.statLabel}>Wildlife decline since 1970</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>44K+</span>
                <span className={styles.statLabel}>Threatened species</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>17%</span>
                <span className={styles.statLabel}>Land protected</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>~$125T</span>
                <span className={styles.statLabel}>Ecosystem services / yr</span>
              </div>
            </div>
          </section>

          <div className={styles.articleContent}>

            {/* ======== PART 1: SPECIES TRENDS ======== */}
            <section id="species-trends" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 1</span>
              <h2 className={styles.sectionHeading}>Species Trends &amp; Decline</h2>
              <p className={styles.sectionLead}>
                The Living Planet Index (LPI), published by WWF and the Zoological Society of London (ZSL), tracks average change
                in monitored populations of vertebrate species. It is the most widely cited indicator of global wildlife trends.
              </p>
            </section>

            <section id="living-planet-index">
              <h3><Bug size={20} /> Living Planet Index</h3>
              <p>
                The 2022 LPI report tracked nearly 32,000 populations of 5,230 vertebrate species. The global index declined by
                69% between 1970 and 2018. This does not mean that 69% of individual animals have disappeared; it measures the
                average relative change in monitored population sizes. Some populations collapsed while others remained stable or grew.
              </p>

              <PlotlyChart
                title="Living Planet Index – Global (1970–2018)"
                data={[{
                  x: LIVING_PLANET_INDEX.years,
                  y: LIVING_PLANET_INDEX.global,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'LPI (1970 = 1.0)',
                  line: { color: '#16A085', width: 3 },
                  marker: { size: 6 },
                  fill: 'tozeroy',
                  fillcolor: 'rgba(22, 160, 133, 0.1)',
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Index (1970 = 1.0)', range: [0, 1.1] },
                  shapes: [{ type: 'line', x0: 1970, x1: 2018, y0: 1.0, y1: 1.0, line: { dash: 'dash', color: '#999' } }],
                  annotations: [{ x: 2018, y: 0.31, text: '−69%', showarrow: true, arrowhead: 2, ax: 30, ay: -30 }],
                }}
                source={{ name: 'WWF / ZSL Living Planet Report 2022', url: 'https://livingplanet.panda.org/' }}
              />

              <PlotlyChart
                title="Average Population Decline by System (1970–2018)"
                data={[{
                  x: LPI_BY_SYSTEM.systems,
                  y: LPI_BY_SYSTEM.decline,
                  type: 'bar',
                  marker: { color: LPI_BY_SYSTEM.colors },
                  text: LPI_BY_SYSTEM.decline.map(d => `−${d}%`),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '' },
                  yaxis: { title: 'Average decline (%)', range: [0, 100] },
                  showlegend: false,
                }}
                source={{ name: 'WWF / ZSL Living Planet Report 2022', url: 'https://livingplanet.panda.org/' }}
              />

              <SectionInsight variant="warning">
                <p>
                  <strong>Freshwater ecosystems have been devastated.</strong> The 83% average decline in freshwater vertebrate
                  populations exceeds both terrestrial and marine realms by a wide margin. Habitat loss, pollution, dam construction,
                  invasive species, and over-extraction are the primary drivers.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 2: EXTINCTION RISK ======== */}
            <section id="extinction-risk" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 2</span>
              <h2 className={styles.sectionHeading}>Extinction Risk</h2>
              <p className={styles.sectionLead}>
                The IUCN Red List of Threatened Species is the world&apos;s most comprehensive inventory of the conservation status of
                biological species. Updated continuously, it assesses extinction risk across all major taxonomic groups and underpins
                international conservation policy.
              </p>
            </section>

            <section id="red-list">
              <h3><AlertTriangle size={20} /> IUCN Red List: Threatened Species by Group</h3>
              <p>
                As of the 2024 update, the IUCN Red List has assessed over 163,000 species. More than 44,000 are classified as
                threatened (Critically Endangered, Endangered, or Vulnerable). The proportion of species at risk varies widely by
                taxonomic group, with amphibians and cycads among the most imperiled.
              </p>

              <PlotlyChart
                title="Percentage of Assessed Species Threatened by Group (2024)"
                data={[{
                  x: THREATENED_BY_GROUP.groups,
                  y: THREATENED_BY_GROUP.percent,
                  type: 'bar',
                  marker: { color: THREATENED_BY_GROUP.colors },
                  text: THREATENED_BY_GROUP.percent.map(p => `${p}%`),
                  textposition: 'outside' as const,
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'Threatened (%)', range: [0, 50] },
                  showlegend: false,
                }}
                source={{ name: 'IUCN Red List (2024 update)', url: 'https://www.iucnredlist.org/' }}
              />

              <PlotlyChart
                title="IUCN Red List – Species by Category (2024)"
                data={[{
                  labels: RED_LIST_SUMMARY.categories,
                  values: RED_LIST_SUMMARY.species,
                  type: 'pie',
                  hole: 0.45,
                  marker: { colors: RED_LIST_SUMMARY.colors },
                  textinfo: 'label+percent',
                  textposition: 'outside',
                }]}
                layout={{
                  showlegend: false,
                }}
                source={{ name: 'IUCN Red List (2024)', url: 'https://www.iucnredlist.org/' }}
              />

              <h3><Bird size={20} /> Red List Index: Trends over Time</h3>
              <p>
                The Red List Index (RLI) tracks the aggregate survival probability of species groups over time. A value of 1.0 means
                all species qualify as Least Concern; a value of 0 means all are Extinct. For every group assessed, the index is
                declining, meaning the collective extinction risk is increasing.
              </p>

              <PlotlyChart
                title="Red List Index by Taxonomic Group (1993–2024)"
                data={[
                  {
                    x: RED_LIST_INDEX.years,
                    y: RED_LIST_INDEX.birds,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Birds',
                    line: { color: '#3498DB', width: 2 },
                    marker: { size: 5 },
                  },
                  {
                    x: RED_LIST_INDEX.years,
                    y: RED_LIST_INDEX.mammals,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Mammals',
                    line: { color: '#E67E22', width: 2 },
                    marker: { size: 5 },
                  },
                  {
                    x: RED_LIST_INDEX.years,
                    y: RED_LIST_INDEX.amphibians,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Amphibians',
                    line: { color: '#E74C3C', width: 2 },
                    marker: { size: 5 },
                  },
                  {
                    x: RED_LIST_INDEX.years,
                    y: RED_LIST_INDEX.corals,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Corals',
                    line: { color: '#F39C12', width: 2 },
                    marker: { size: 5 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Red List Index', range: [0.7, 1.0] },
                }}
                source={{ name: 'IUCN Red List Index', url: 'https://www.iucnredlist.org/assessment/red-list-index' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>A sixth mass extinction?</strong>
                  <p>
                    Current extinction rates are estimated at 100–1,000 times the natural background rate (IPBES 2019).
                    If present trends continue, scientists warn of a sixth mass extinction event, comparable in scale
                    to the five great extinctions in Earth&apos;s geological past, but driven overwhelmingly by human activity.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 3: PROTECTED AREAS ======== */}
            <section id="protected-areas" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 3</span>
              <h2 className={styles.sectionHeading}>Protected Areas &amp; Conservation</h2>
              <p className={styles.sectionLead}>
                Protected areas (national parks, wildlife reserves, marine sanctuaries) are a cornerstone of conservation strategy.
                The UN Environment Programme World Conservation Monitoring Centre (UNEP-WCMC) tracks global coverage through the
                World Database on Protected Areas (WDPA).
              </p>
            </section>

            <section id="protected-coverage">
              <h3><Shield size={20} /> Terrestrial and Marine Protected Area Coverage</h3>
              <p>
                Protected area coverage has expanded substantially since 1990 but remains below the targets set by the
                Kunming-Montreal Global Biodiversity Framework (GBF), adopted in December 2022, which calls for
                protecting 30% of land and 30% of oceans by 2030 (&ldquo;30 by 30&rdquo;).
              </p>

              <PlotlyChart
                title="Global Protected Area Coverage (1990–2024)"
                data={[
                  {
                    x: PROTECTED_AREAS.years,
                    y: PROTECTED_AREAS.terrestrial,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Terrestrial (%)',
                    line: { color: '#27AE60', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: PROTECTED_AREAS.years,
                    y: PROTECTED_AREAS.marine,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Marine (%)',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 6 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: '% of total area', range: [0, 35] },
                  shapes: [
                    { type: 'line', x0: 1990, x1: 2024, y0: 30, y1: 30, line: { dash: 'dot', color: '#E74C3C', width: 2 } },
                  ],
                  annotations: [
                    { x: 2008, y: 30, text: '30 × 30 target', showarrow: false, yanchor: 'bottom', font: { color: '#E74C3C', size: 11 } },
                  ],
                }}
                source={{ name: 'UNEP-WCMC / WDPA', url: 'https://www.protectedplanet.net/' }}
              />

              <SectionInsight>
                <p>
                  <strong>Coverage is growing, but quality and connectivity matter.</strong> Many protected areas face under-funding,
                  weak enforcement, or fragmentation. &ldquo;Paper parks,&rdquo; protected in law but not in practice, remain a
                  widespread problem. Effective conservation requires both expanding coverage and strengthening management of
                  existing sites.
                </p>
              </SectionInsight>

              <div className={styles.infoBox}>
                <h3><Landmark size={20} /> The Kunming-Montreal Global Biodiversity Framework</h3>
                <p>
                  Adopted at COP15 in December 2022, the GBF sets 23 targets across four goals. Target 3 (&ldquo;30 by 30&rdquo;)
                  calls for at least 30% of terrestrial, inland water, and coastal/marine areas to be effectively conserved by 2030.
                  Target 1 aims to bring the loss of areas of high biodiversity importance close to zero. The framework also addresses
                  restoration, sustainable use, financial flows, and capacity building.
                </p>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 4: DEFORESTATION ======== */}
            <section id="deforestation" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 4</span>
              <h2 className={styles.sectionHeading}>Deforestation &amp; Forest Loss</h2>
              <p className={styles.sectionLead}>
                Forests cover about 31% of the world&apos;s land area and harbor roughly 80% of terrestrial biodiversity.
                Deforestation, primarily driven by agricultural expansion, logging, and infrastructure, is a leading cause of
                habitat loss, carbon emissions, and biodiversity decline.
              </p>
            </section>

            <section id="forest-area">
              <h3><TreePine size={20} /> Global Forest Area</h3>
              <p>
                The FAO Global Forest Resources Assessment (FRA) is the most comprehensive assessment of the world&apos;s forests.
                FRA 2020 reports that global forest area declined from 4.24 billion hectares in 1990 to 4.06 billion hectares in 2020, a
                net loss of roughly 178 million hectares (an area larger than Libya) over three decades.
              </p>

              <PlotlyChart
                title="Global Forest Area (1990–2020)"
                data={[{
                  x: FOREST_AREA.years,
                  y: FOREST_AREA.area,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Billion hectares',
                  line: { color: '#27AE60', width: 3 },
                  marker: { size: 7 },
                  fill: 'tozeroy',
                  fillcolor: 'rgba(39, 174, 96, 0.08)',
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Billion hectares', range: [3.9, 4.3] },
                }}
                source={{ name: 'FAO Global Forest Resources Assessment 2020', url: 'https://www.fao.org/forest-resources-assessment/' }}
              />

              <h3><Leaf size={20} /> Net Forest Change by Region</h3>
              <p>
                The pattern of forest loss is geographically uneven. Africa and South America experienced the largest net losses
                in 2010–2020, driven by agricultural expansion and commodity production. Asia showed net gains, largely due to
                China&apos;s large-scale afforestation and reforestation programs, though this masks continued loss of natural
                tropical forests in Southeast Asia.
              </p>

              <PlotlyChart
                title="Net Forest Area Change by Region (2010–2020, Mha/yr)"
                data={[{
                  x: FOREST_CHANGE_BY_REGION.regions,
                  y: FOREST_CHANGE_BY_REGION.change,
                  type: 'bar',
                  marker: { color: FOREST_CHANGE_BY_REGION.colors },
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'Million hectares per year' },
                  showlegend: false,
                  shapes: [{ type: 'line', x0: -0.5, x1: 5.5, y0: 0, y1: 0, line: { color: '#333', width: 1 } }],
                }}
                source={{ name: 'FAO FRA 2020', url: 'https://www.fao.org/forest-resources-assessment/' }}
              />

              <PlotlyChart
                title="Annual Tree Cover Loss (2001–2022)"
                data={[{
                  x: TREE_COVER_LOSS.years,
                  y: TREE_COVER_LOSS.loss,
                  type: 'bar',
                  marker: { color: '#E74C3C' },
                  name: 'Million hectares',
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Million hectares' },
                  showlegend: false,
                }}
                source={{ name: 'Global Forest Watch / Hansen et al.', url: 'https://www.globalforestwatch.org/' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Tropical primary forests are irreplaceable</strong>
                  <p>
                    While planted forests can recover some biomass, the loss of old-growth tropical forests means the permanent
                    destruction of complex ecosystems that took centuries to develop. Primary tropical forests store far more
                    carbon per hectare and harbor far greater biodiversity than secondary or planted forests.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 5: ECOSYSTEM SERVICES ======== */}
            <section id="ecosystem-services" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 5</span>
              <h2 className={styles.sectionHeading}>Ecosystem Services &amp; Nature&apos;s Value</h2>
              <p className={styles.sectionLead}>
                Ecosystems provide a vast array of services that underpin human well-being and economic activity: pollination,
                water purification, climate regulation, flood protection, nutrient cycling, and more. The economics of ecosystems
                and biodiversity (TEEB) and the Dasgupta Review have brought these values into sharp focus.
              </p>
            </section>

            <section id="services-value">
              <h3><DollarSign size={20} /> The Value of Nature</h3>
              <p>
                Costanza et al. (2014) estimated the total global value of ecosystem services at $125 trillion per year in
                2011 dollars, roughly 1.5 times global GDP. The Dasgupta Review (2021), commissioned by the UK Treasury,
                concluded that humanity has been running down natural capital far faster than it can regenerate, and that GDP
                systematically fails to capture the depreciation of nature.
              </p>

              <PlotlyChart
                title="Estimated Global Value of Ecosystem Services by Type ($ trillion/yr)"
                data={[{
                  x: ECOSYSTEM_SERVICES_VALUE.services,
                  y: ECOSYSTEM_SERVICES_VALUE.value,
                  type: 'bar',
                  marker: { color: ECOSYSTEM_SERVICES_VALUE.colors },
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -30 },
                  yaxis: { title: 'USD trillion per year' },
                  showlegend: false,
                }}
                source={{ name: 'Costanza et al. (2014) / TEEB', url: 'https://www.teebweb.org/' }}
              />

              <SectionInsight variant="success">
                <p>
                  <strong>Nature is not a luxury; it is infrastructure.</strong> Pollinators contribute an estimated $235–577 billion
                  per year to global food production (IPBES 2016). Mangroves and coral reefs provide coastal protection worth
                  billions annually. Wetlands filter water and buffer floods. These services are largely unpriced and routinely
                  excluded from economic decision-making.
                </p>
              </SectionInsight>

              <h3><Waves size={20} /> Coral Reefs: A Bellwether</h3>
              <p>
                Coral reefs support roughly 25% of all marine species despite covering less than 0.1% of the ocean floor. The
                Global Coral Reef Monitoring Network (GCRMN 2021) documented a long-term decline in hard coral cover and an
                increase in algal overgrowth, driven by warming-induced mass bleaching events, ocean acidification, and pollution.
              </p>

              <PlotlyChart
                title="Average Coral Reef Cover – Hard Coral vs Algae (1998–2019)"
                data={[
                  {
                    x: CORAL_REEF_STATUS.years,
                    y: CORAL_REEF_STATUS.hardCoralCover,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Hard coral cover (%)',
                    line: { color: '#1ABC9C', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: CORAL_REEF_STATUS.years,
                    y: CORAL_REEF_STATUS.algaeCover,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Algae cover (%)',
                    line: { color: '#E74C3C', width: 3, dash: 'dash' },
                    marker: { size: 6 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: '% cover' },
                }}
                source={{ name: 'GCRMN Status of Coral Reefs 2020', url: 'https://gcrmn.net/2020-report/' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Warming above 1.5°C could destroy 70–90% of tropical coral reefs</strong>
                  <p>
                    IPCC SR1.5 concluded that 1.5°C of global warming would cause the loss of 70–90% of warm-water
                    coral reefs. At 2°C, more than 99% could be lost. Once bleached and dead, reef recovery takes
                    decades to centuries if conditions improve, and may be irreversible at higher warming levels.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            {/* ======== PART 6: POLICY FRAMEWORKS ======== */}
            <section id="policy" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 6</span>
              <h2 className={styles.sectionHeading}>Policy Frameworks &amp; Outlook</h2>
              <p className={styles.sectionLead}>
                International biodiversity governance centers on the UN Convention on Biological Diversity (CBD), the
                Intergovernmental Science-Policy Platform on Biodiversity and Ecosystem Services (IPBES), and the IUCN. The
                Kunming-Montreal Global Biodiversity Framework (2022) represents the most ambitious multilateral agreement on
                nature to date.
              </p>
            </section>

            <section id="policy-frameworks">
              <h3><Landmark size={20} /> Key International Agreements</h3>
              <p>
                IPBES published its landmark Global Assessment in 2019, warning that around one million species face extinction
                and that the rate of species loss is accelerating. It identified five direct drivers of biodiversity loss, in
                order of impact: (1) land/sea use change, (2) direct exploitation, (3) climate change, (4) pollution, and
                (5) invasive alien species.
              </p>

              <div className={styles.infoBox}>
                <h3><Landmark size={20} /> Five Direct Drivers of Biodiversity Loss (IPBES 2019)</h3>
                <p>
                  <strong>1. Changes in land and sea use:</strong> conversion of habitats for agriculture, aquaculture,
                  and infrastructure remains the single largest driver of biodiversity loss globally.
                </p>
                <p>
                  <strong>2. Direct exploitation:</strong> overfishing, hunting, logging, and wildlife trade continue to
                  deplete populations faster than they can recover.
                </p>
                <p>
                  <strong>3. Climate change:</strong> rising temperatures, altered precipitation, and extreme weather are
                  increasingly important drivers, projected to surpass land-use change in coming decades.
                </p>
                <p>
                  <strong>4. Pollution:</strong> nutrient runoff, pesticides, plastics, and industrial chemicals damage
                  ecosystems on land and in water.
                </p>
                <p>
                  <strong>5. Invasive alien species:</strong> non-native species introduced by trade and travel disrupt
                  ecosystems and threaten native biodiversity worldwide.
                </p>
              </div>

              <SectionInsight>
                <p>
                  <strong>The 30 by 30 target is achievable but requires transformative change.</strong> Reaching 30% protection
                  of land and oceans by 2030 demands significant expansion of protected areas, increased conservation finance
                  (estimated at $700 billion per year; current flows are about $150 billion), mainstreaming biodiversity
                  into trade and agriculture policy, and reforming harmful subsidies (estimated at $500+ billion per year for
                  activities that damage nature).
                </p>
              </SectionInsight>
            </section>

            {/* ======== CONCLUSIONS ======== */}
            <section id="conclusions" className={styles.takeaways}>
              <h2><BookOpen size={20} /> The Bottom Line</h2>
              <ul>
                <li>
                  <strong>Biodiversity loss is accelerating.</strong> The Living Planet Index shows a 69% average decline in
                  monitored wildlife populations since 1970, with freshwater ecosystems hit hardest. The Red List Index is
                  declining for every assessed group.
                </li>
                <li>
                  <strong>Extinction risk is at crisis levels.</strong> Over 44,000 species are threatened with extinction.
                  Current rates are 100–1,000× the natural background. Amphibians, sharks, and corals are among the most
                  vulnerable.
                </li>
                <li>
                  <strong>Protected areas are expanding but not fast enough.</strong> At 17% of land and 8% of ocean, the
                  world is well short of the 30 by 30 target. Coverage, quality, and connectivity all need to increase.
                </li>
                <li>
                  <strong>Deforestation remains a critical threat.</strong> Nearly 180 million hectares of forest were lost
                  between 1990 and 2020. Tropical primary forests, once lost, are effectively irreplaceable within human
                  timescales.
                </li>
                <li>
                  <strong>Nature underpins the global economy.</strong> Ecosystem services valued at $125+ trillion per year
                  are overwhelmingly invisible in GDP and financial accounting. The Dasgupta Review argues that rethinking
                  economics to include natural capital is not optional; it is urgent.
                </li>
                <li>
                  <strong>Climate and biodiversity are inseparable.</strong> Climate change is an accelerating driver of
                  biodiversity loss, and biodiversity loss undermines nature&apos;s capacity to regulate the climate. Addressing
                  one without the other will not succeed.
                </li>
              </ul>
            </section>

            {/* ======== METHODOLOGY ======== */}
            <section id="methodology" className={styles.methodology}>
              <h2>Data Sources &amp; Methodology</h2>
              <p>
                This analysis draws primarily from the IUCN Red List and Red List Index, the WWF/ZSL Living Planet Report (2022),
                the UNEP-WCMC World Database on Protected Areas (WDPA), the FAO Global Forest Resources Assessment (FRA 2020),
                Global Forest Watch (Hansen et al.), the IPBES Global Assessment (2019), the Global Coral Reef Monitoring Network
                (GCRMN 2021), the Dasgupta Review (2021), and Costanza et al. (2014) for ecosystem service valuation.
              </p>
              <p>
                <strong>Key indicators:</strong> The Living Planet Index measures average relative change in vertebrate populations
                (not total abundance). The IUCN Red List assesses species against standardized criteria; &ldquo;threatened&rdquo;
                combines Critically Endangered, Endangered, and Vulnerable categories. Protected area figures from WDPA reflect
                designated area and may overestimate effective protection. Forest area data follow FAO definitions (land spanning
                more than 0.5 ha with trees taller than 5 m and canopy cover above 10%).
              </p>
              <p>
                <strong>Limitations:</strong> Monitoring coverage is uneven; vertebrates are better assessed than invertebrates, plants,
                and fungi. The LPI is dominated by well-studied species in data-rich regions. Protected area &ldquo;effectiveness&rdquo;
                varies widely and is difficult to assess at global scale. Ecosystem service valuations involve significant
                uncertainties and methodological debate.
              </p>
              <p>
                <strong>Last Updated:</strong> January 2026. Data align with IUCN Red List 2024 update, WWF LPI 2022, FAO FRA 2020,
                and GCRMN 2021.
              </p>
            </section>

            {/* ======== RESOURCES ======== */}
            <section className={styles.resources}>
              <h2>Primary Sources</h2>
              <ul>
                <li>
                  <a href="https://www.iucnredlist.org/" target="_blank" rel="noopener noreferrer">
                    IUCN Red List of Threatened Species <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://livingplanet.panda.org/" target="_blank" rel="noopener noreferrer">
                    WWF / ZSL Living Planet Report <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://ipbes.net/global-assessment" target="_blank" rel="noopener noreferrer">
                    IPBES Global Assessment on Biodiversity (2019) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.cbd.int/gbf" target="_blank" rel="noopener noreferrer">
                    UN CBD – Kunming-Montreal Global Biodiversity Framework <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.fao.org/forest-resources-assessment/" target="_blank" rel="noopener noreferrer">
                    FAO Global Forest Resources Assessment <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.globalforestwatch.org/" target="_blank" rel="noopener noreferrer">
                    Global Forest Watch <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.protectedplanet.net/" target="_blank" rel="noopener noreferrer">
                    UNEP-WCMC Protected Planet / WDPA <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://gcrmn.net/2020-report/" target="_blank" rel="noopener noreferrer">
                    GCRMN Status of Coral Reefs of the World <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.resources}>
              <h2>Further Reading</h2>
              <ul>
                <li>
                  <a href="https://www.gov.uk/government/publications/final-report-the-economics-of-biodiversity-the-dasgupta-review" target="_blank" rel="noopener noreferrer">
                    The Dasgupta Review – Economics of Biodiversity (2021) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.teebweb.org/" target="_blank" rel="noopener noreferrer">
                    The Economics of Ecosystems and Biodiversity (TEEB) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="http://www.birdlife.org/datazone" target="_blank" rel="noopener noreferrer">
                    BirdLife International Data Zone <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://ourworldindata.org/biodiversity" target="_blank" rel="noopener noreferrer">
                    Our World in Data – Biodiversity <ExternalLink size={14} />
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
