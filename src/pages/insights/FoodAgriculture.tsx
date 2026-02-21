import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, ExternalLink, AlertTriangle, Calendar, Wheat,
  UtensilsCrossed, Leaf, MapPin, Fish, DollarSign, Thermometer, BookOpen
} from 'lucide-react';
import PlotlyChart from '../../components/charts/PlotlyChart';
import TableOfContents, { TOCItem } from '../../components/ui/TableOfContents';
import SectionInsight from '../../components/ui/SectionInsight';
import CiteThisReport from '../../components/ui/CiteThisReport';
import { SITE_NAME, SITE_URL } from '../../utils/constants';
import styles from '../../styles/pages/Article.module.css';

const INSIGHT_TITLE = 'Food & Agriculture: A Data-Driven Analysis';
const INSIGHT_DESCRIPTION = 'Undernourishment, crop yields, land use, fertilizer, fisheries, food prices, and climate impact. Data from FAO, IFPRI, World Bank, and IPCC.';

// ============================================
// DATA SETS - Based on FAO, IFPRI, World Bank, IPCC
// ============================================

// Undernourishment prevalence (FAO SOFI) - percent of population
const UNDERNOURISHMENT_PREVALENCE = {
  years: [2000, 2005, 2010, 2015, 2019, 2020, 2021, 2022],
  global: [12.9, 11.8, 10.6, 8.6, 7.9, 9.3, 9.8, 9.2],
};

// Number of undernourished (FAO SOFI) - millions
const UNDERNOURISHED_NUMBER = {
  years: [2000, 2005, 2010, 2015, 2019, 2020, 2021, 2022],
  global: [796, 804, 648, 589, 613, 702, 739, 735],
};

// Undernourishment by region (FAO SOFI 2022) - percent
const UNDERNOURISHMENT_BY_REGION = {
  regions: ['Africa', 'Asia', 'Latin America & Caribbean', 'Oceania', 'Northern America & Europe'],
  prevalence: [19.7, 8.5, 6.5, 5.3, 0.9],
  colors: ['#E74C3C', '#F39C12', '#27AE60', '#3498DB', '#95A5A6'],
};

// Global cereal yield (FAO) - tonnes per hectare
const CEREAL_YIELD = {
  years: [1961, 1970, 1980, 1990, 2000, 2010, 2015, 2020, 2022],
  yield: [1.4, 1.8, 2.2, 2.8, 3.0, 3.5, 3.9, 4.1, 4.2],
};

// Crop yields by type (FAO 2022) - tonnes/ha, global average
const YIELDS_BY_CROP = {
  crops: ['Maize', 'Wheat', 'Rice (paddy)', 'Barley', 'Soybeans', 'Potatoes'],
  yield: [5.9, 3.5, 4.6, 3.1, 2.8, 21.0],
  colors: ['#F1C40F', '#E67E22', '#1ABC9C', '#9B59B6', '#27AE60', '#8E44AD'],
};

// Agricultural land (FAO / World Bank) - million km²
const AGRICULTURAL_LAND = {
  years: [1961, 1980, 2000, 2010, 2020, 2022],
  area: [44.5, 47.2, 48.7, 48.8, 47.7, 47.6],
};

// Fertilizer consumption (FAO) - million tonnes nutrient (N+P₂O₅+K₂O)
const FERTILIZER_USE = {
  years: [1961, 1980, 2000, 2010, 2015, 2020, 2022],
  global: [31, 113, 137, 175, 188, 197, 198],
};

// Fisheries: capture vs aquaculture (FAO) - million tonnes live weight
const FISHERIES = {
  years: [1990, 2000, 2010, 2015, 2020, 2022],
  capture: [86, 88, 88, 92, 90, 92],
  aquaculture: [17, 35, 61, 77, 88, 94],
};

// FAO Food Price Index (2014-2016 = 100)
const FOOD_PRICE_INDEX = {
  years: [2000, 2005, 2010, 2015, 2020, 2021, 2022, 2023],
  index: [92, 97, 123, 91, 98, 125, 143, 124],
};

// GHG emissions by sector (IPCC/FAO) - percent of total anthropogenic, approximate
const AGRICULTURE_EMISSIONS = {
  sectors: ['Agriculture', 'Energy', 'Industry', 'Transport', 'Buildings', 'Other'],
  share: [22, 35, 21, 15, 6, 1],
  colors: ['#27AE60', '#E74C3C', '#9B59B6', '#3498DB', '#95A5A6', '#BDC3C7'],
};

// Table of Contents
const tocItems: TOCItem[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'hunger', label: 'Part 1: Hunger and Undernourishment' },
  { id: 'yields', label: 'Part 2: Crop Yields and Production' },
  { id: 'land-fertilizer', label: 'Part 3: Land Use and Fertilizer' },
  { id: 'fisheries', label: 'Part 4: Fisheries and Aquaculture' },
  { id: 'prices', label: 'Part 5: Food Prices and Trade' },
  { id: 'climate', label: 'Part 6: Climate Impact on Agriculture' },
  { id: 'conclusions', label: 'Conclusions' },
  { id: 'methodology', label: 'Methodology' },
];

export default function FoodAgriculture() {
  const canonicalUrl = `${SITE_URL}/insights/food-agriculture`;
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
            <span className={styles.focusArea}>Food & Agriculture</span>
            <h1 className={styles.articleTitle}>{INSIGHT_TITLE}</h1>
            <p className={styles.articleMeta}>
              Undernourishment, crop yields, land use, fertilizer, fisheries, food prices, and climate impact. Data from FAO, IFPRI, World Bank, and IPCC.
            </p>
            <div className={styles.lastUpdated}>
              <Calendar size={14} />
              <span>Last updated: December 2025</span>
            </div>
          </header>

          <CiteThisReport
            reportId="CL-2025-05"
            title={INSIGHT_TITLE}
            version="December 2025"
            path="/insights/food-agriculture"
          />

          <section id="summary" className={styles.executiveSummary}>
            <h2 className={styles.summaryTitle}>The Bottom Line</h2>
            <ul className={styles.summaryPoints}>
              <li><strong>735 million people</strong> faced hunger in 2022 (FAO); progress reversed after 2019, with COVID and conflict as major drivers</li>
              <li>Global cereal yields have <strong>tripled since 1961</strong>, but yield growth is slowing and climate change is increasing risk</li>
              <li>Agriculture uses about <strong>38% of the world&apos;s land</strong> and accounts for roughly <strong>22% of global GHG emissions</strong></li>
              <li><strong>Aquaculture now exceeds capture fisheries</strong> in total production; both are under pressure from overfishing and warming</li>
              <li>Food prices spiked in 2022; the long-term trend is volatile. Climate and extreme weather will amplify price and supply risks</li>
            </ul>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>735M</span>
                <span className={styles.statLabel}>Undernourished</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>9.2%</span>
                <span className={styles.statLabel}>Hunger prevalence</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>22%</span>
                <span className={styles.statLabel}>Ag GHG share</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statValue}>4.2 t/ha</span>
                <span className={styles.statLabel}>Cereal yield</span>
              </div>
            </div>
          </section>

          <div className={styles.articleContent}>

            <section id="hunger" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 1</span>
              <h2 className={styles.sectionHeading}>Hunger and Undernourishment</h2>
              <p className={styles.sectionLead}>
                The FAO State of Food Security and Nutrition (SOFI) reports the number and share of people without enough dietary energy for an active, healthy life. 
                After years of decline, global hunger rose from 2019, driven by conflict, climate shocks, and the COVID-19 pandemic.
              </p>
            </section>

            <section id="undernourishment">
              <h3><UtensilsCrossed size={20} /> Prevalence and Number Undernourished</h3>
              <p>
                FAO defines undernourishment as habitual dietary energy intake below the minimum requirement. 
                SOFI provides regional and global estimates. The 2022 figure of 735 million undernourished is well above the 2019 level and reflects setbacks in many regions.
              </p>

              <PlotlyChart
                title="Number of Undernourished People (2000-2022)"
                data={[{
                  x: UNDERNOURISHED_NUMBER.years,
                  y: UNDERNOURISHED_NUMBER.global,
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
                source={{ name: 'FAO State of Food Security and Nutrition (SOFI)', url: 'https://www.fao.org/publications/sofi/' }}
              />

              <PlotlyChart
                title="Prevalence of Undernourishment (2000-2022)"
                data={[{
                  x: UNDERNOURISHMENT_PREVALENCE.years,
                  y: UNDERNOURISHMENT_PREVALENCE.global,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Global (%)',
                  line: { color: '#E67E22', width: 3 },
                  marker: { size: 6 },
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Prevalence (%)', range: [0, 15] },
                }}
                source={{ name: 'FAO SOFI', url: 'https://www.fao.org/publications/sofi/' }}
              />

              <PlotlyChart
                title="Prevalence of Undernourishment by Region (2022)"
                data={[{
                  x: UNDERNOURISHMENT_BY_REGION.regions,
                  y: UNDERNOURISHMENT_BY_REGION.prevalence,
                  type: 'bar',
                  marker: { color: UNDERNOURISHMENT_BY_REGION.colors },
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -25 },
                  yaxis: { title: 'Prevalence (%)' },
                  showlegend: false,
                }}
                source={{ name: 'FAO SOFI 2023', url: 'https://www.fao.org/publications/sofi/' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>COVID-19 and conflict reversed progress</strong>
                  <p>
                    Between 2019 and 2022, the number of undernourished people increased by more than 120 million. 
                    Africa has the highest prevalence (about 20%); Asia has the largest number in absolute terms. 
                    Conflict, climate extremes, and economic shocks continue to drive food insecurity.
                  </p>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            <section id="yields" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 2</span>
              <h2 className={styles.sectionHeading}>Crop Yields and Production</h2>
              <p className={styles.sectionLead}>
                Global cereal yields have risen sharply since the 1960s due to improved varieties, fertilizer, and irrigation. 
                Growth has slowed in recent decades, and climate change is already affecting yields in many regions.
              </p>
            </section>

            <section id="crop-yields">
              <h3><Leaf size={20} /> Cereal and Crop Yields</h3>
              <p>
                FAO and World Bank track crop production and area; yield (production per hectare) is a key measure of productivity. 
                Cereals (wheat, rice, maize, etc.) provide most of the world&apos;s dietary energy.
              </p>

              <PlotlyChart
                title="Global Cereal Yield (1961-2022)"
                data={[{
                  x: CEREAL_YIELD.years,
                  y: CEREAL_YIELD.yield,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Tonnes per hectare',
                  line: { color: '#27AE60', width: 3 },
                  marker: { size: 6 },
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Tonnes per hectare' },
                }}
                source={{ name: 'FAO FAOSTAT', url: 'https://www.fao.org/faostat/' }}
              />

              <PlotlyChart
                title="Global Average Yield by Crop (2022)"
                data={[{
                  x: YIELDS_BY_CROP.crops,
                  y: YIELDS_BY_CROP.yield,
                  type: 'bar',
                  marker: { color: YIELDS_BY_CROP.colors },
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -20 },
                  yaxis: { title: 'Tonnes per hectare' },
                  showlegend: false,
                }}
                source={{ name: 'FAO FAOSTAT', url: 'https://www.fao.org/faostat/' }}
              />

              <SectionInsight variant="success">
                <p>
                  <strong>Cereal yields have roughly tripled since 1961</strong>, from about 1.4 to 4.2 tonnes per hectare globally. 
                  This growth has allowed food production to keep pace with population despite limited expansion of cropland. 
                  Further gains are possible but require sustainable intensification and adaptation to climate change.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            <section id="land-fertilizer" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 3</span>
              <h2 className={styles.sectionHeading}>Land Use and Fertilizer</h2>
              <p className={styles.sectionLead}>
                Agricultural land area has stabilized after decades of expansion; fertilizer use has grown but efficiency gains have slowed. 
                Both have environmental trade-offs: land use drives deforestation and biodiversity loss; excess fertilizer contributes to pollution and GHG emissions.
              </p>
            </section>

            <section id="land-and-fertilizer">
              <h3><MapPin size={20} /> Agricultural Land and Fertilizer</h3>
              <p>
                FAO and the World Bank report agricultural area (arable, permanent crops, permanent pasture). 
                Fertilizer consumption (nitrogen, phosphate, potash) is tracked by FAO; overuse can cause nutrient runoff and nitrous oxide emissions.
              </p>

              <PlotlyChart
                title="Global Agricultural Land (1961-2022)"
                data={[{
                  x: AGRICULTURAL_LAND.years,
                  y: AGRICULTURAL_LAND.area,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Million km²',
                  line: { color: '#8E44AD', width: 3 },
                  marker: { size: 6 },
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Million km²' },
                }}
                source={{ name: 'FAO FAOSTAT / World Bank', url: 'https://www.fao.org/faostat/' }}
              />

              <PlotlyChart
                title="Global Fertilizer Consumption (1961-2022)"
                data={[{
                  x: FERTILIZER_USE.years,
                  y: FERTILIZER_USE.global,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Million tonnes (N+P₂O₅+K₂O)',
                  line: { color: '#3498DB', width: 3 },
                  marker: { size: 6 },
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Million tonnes' },
                }}
                source={{ name: 'FAO FAOSTAT', url: 'https://www.fao.org/faostat/' }}
              />
            </section>

            <div className={styles.sectionDivider} />

            <section id="fisheries" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 4</span>
              <h2 className={styles.sectionHeading}>Fisheries and Aquaculture</h2>
              <p className={styles.sectionLead}>
                Capture fisheries production has been roughly stable for decades; aquaculture has grown rapidly and now exceeds capture in total volume. 
                Overfishing, warming oceans, and pollution threaten long-term sustainability.
              </p>
            </section>

            <section id="fisheries-production">
              <h3><Fish size={20} /> Capture vs Aquaculture Production</h3>
              <p>
                FAO reports global fish and seafood production from capture fisheries and aquaculture. 
                Aquaculture has been the main source of growth in supply and is critical for food security in many regions.
              </p>

              <PlotlyChart
                title="Global Fisheries Production (1990-2022)"
                data={[
                  {
                    x: FISHERIES.years,
                    y: FISHERIES.capture,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Capture (million t)',
                    line: { color: '#3498DB', width: 3 },
                    marker: { size: 6 },
                  },
                  {
                    x: FISHERIES.years,
                    y: FISHERIES.aquaculture,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Aquaculture (million t)',
                    line: { color: '#1ABC9C', width: 3 },
                    marker: { size: 6 },
                  },
                ]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Million tonnes (live weight)' },
                }}
                source={{ name: 'FAO Fisheries and Aquaculture', url: 'https://www.fao.org/fishery/statistics/global-production/en' }}
              />

              <SectionInsight>
                <p>
                  <strong>Aquaculture production surpassed capture fisheries</strong> in the early 2020s in total volume. 
                  About one-third of fish stocks are overfished; climate change is affecting fish distribution and productivity. 
                  Sustainable management and reduced overfishing are essential for long-term supply.
                </p>
              </SectionInsight>
            </section>

            <div className={styles.sectionDivider} />

            <section id="prices" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 5</span>
              <h2 className={styles.sectionHeading}>Food Prices and Trade</h2>
              <p className={styles.sectionLead}>
                The FAO Food Price Index tracks international prices for cereals, oils, dairy, meat, and sugar. 
                Prices spiked in 2021–2022 due to supply shocks, energy costs, and the war in Ukraine; volatility remains a concern for food security.
              </p>
            </section>

            <section id="food-prices">
              <h3><DollarSign size={20} /> FAO Food Price Index</h3>
              <p>
                The index (2014–2016 = 100) reflects monthly average prices of a basket of internationally traded food commodities. 
                It is a proxy for cost pressures facing import-dependent countries and vulnerable populations.
              </p>

              <PlotlyChart
                title="FAO Food Price Index (2000-2023)"
                data={[{
                  x: FOOD_PRICE_INDEX.years,
                  y: FOOD_PRICE_INDEX.index,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Index (2014-2016=100)',
                  line: { color: '#F39C12', width: 3 },
                  marker: { size: 6 },
                }]}
                layout={{
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Index' },
                  shapes: [{ type: 'line', x0: 2000, x1: 2023, y0: 100, y1: 100, line: { dash: 'dash', color: '#666' } }],
                  annotations: [{ x: 2023, y: 100, text: 'Base 100', showarrow: false, xanchor: 'left' }],
                }}
                source={{ name: 'FAO Food Price Index', url: 'https://www.fao.org/worldfoodsituation/foodpricesindex/en/' }}
              />
            </section>

            <div className={styles.sectionDivider} />

            <section id="climate" className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>Part 6</span>
              <h2 className={styles.sectionHeading}>Climate Impact on Agriculture</h2>
              <p className={styles.sectionLead}>
                Agriculture is both affected by and contributes to climate change. The sector accounts for about 22% of global anthropogenic GHG emissions; 
                rising temperatures, drought, and extreme weather already reduce yields in many regions (IPCC).
              </p>
            </section>

            <section id="climate-agriculture">
              <h3><Thermometer size={20} /> Emissions and Risk</h3>
              <p>
                FAO and IPCC report that agriculture (including livestock, crops, and land-use change linked to farming) contributes roughly one-fifth to one-quarter of total GHG emissions. 
                IPCC AR6 documents observed and projected impacts of climate change on crop and livestock productivity.
              </p>

              <PlotlyChart
                title="Share of Global Anthropogenic GHG Emissions (approx.)"
                data={[{
                  x: AGRICULTURE_EMISSIONS.sectors,
                  y: AGRICULTURE_EMISSIONS.share,
                  type: 'bar',
                  marker: { color: AGRICULTURE_EMISSIONS.colors },
                }]}
                layout={{
                  xaxis: { title: '', tickangle: -30 },
                  yaxis: { title: 'Percent of total' },
                  showlegend: false,
                }}
                source={{ name: 'IPCC AR6 WG3 / FAO', url: 'https://www.ipcc.ch/report/ar6/wg3/' }}
              />

              <div className={styles.warningBox}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Climate change is already reducing yields</strong>
                  <p>
                    IPCC AR6 concludes that climate change has already negatively affected crop yields in many regions, especially in low latitudes. 
                    Further warming will increase the risk of crop failure, pest and disease pressure, and water stress. 
                    Adaptation (resilient varieties, water management, diversification) and mitigation (reduced emissions from agriculture) are both essential.
                  </p>
                </div>
              </div>
            </section>

            <section id="conclusions" className={styles.takeaways}>
              <h2><BookOpen size={20} /> The Bottom Line</h2>
              <ul>
                <li>
                  <strong>Hunger has risen since 2019.</strong> 735 million people were undernourished in 2022. 
                  Conflict, climate shocks, and economic disruption have reversed years of progress; Africa and parts of Asia are most affected.
                </li>
                <li>
                  <strong>Yields have grown but face headwinds.</strong> Cereal yields tripled since 1961, but growth is slowing. 
                  Climate change is already reducing yields in many regions; adaptation and sustainable intensification are urgent.
                </li>
                <li>
                  <strong>Land and fertilizer use have limits.</strong> Agricultural area has stabilized; fertilizer use has grown with environmental costs. 
                  Efficiency and reduced waste are key to feeding more people without proportional increases in land and inputs.
                </li>
                <li>
                  <strong>Aquaculture has overtaken capture fisheries</strong> in total production; both are under pressure from overfishing and climate. 
                  Sustainable management is critical for long-term supply.
                </li>
                <li>
                  <strong>Food systems connect climate, health, and economics.</strong> Agriculture contributes about 22% of GHG emissions; 
                  climate change threatens production and prices. Addressing hunger and sustainability together is essential for the world&apos;s biggest challenges.
                </li>
              </ul>
            </section>

            <section id="methodology" className={styles.methodology}>
              <h2>Data Sources & Methodology</h2>
              <p>
                This analysis draws from the FAO (FAOSTAT, State of Food Security and Nutrition/SOFI, Food Price Index, and fisheries statistics), 
                IFPRI data and reports, World Bank agriculture and rural development indicators, and IPCC AR6 (Working Groups 2 and 3) for climate–agriculture links. 
                FAO is the primary UN agency for food and agriculture statistics.
              </p>
              <p>
                <strong>Reference years:</strong> Undernourishment figures follow FAO SOFI (2022 reference for latest global estimate). 
                FAOSTAT data are typically available with a lag. Food price index and emissions shares are cited with their respective reference periods.
              </p>
              <p>
                <strong>Limitations:</strong> Undernourishment is modeled from dietary energy availability and distribution; definitions and methods vary by source. 
                Climate impact estimates are from models and expert assessment; actual outcomes depend on adaptation and policy. 
                Some regional aggregates mask within-region variation.
              </p>
              <p>
                <strong>Last Updated:</strong> December 2025. Data align with FAO SOFI 2023, FAOSTAT, and IPCC AR6.
              </p>
            </section>

            <section className={styles.resources}>
              <h2>Primary Sources</h2>
              <ul>
                <li>
                  <a href="https://www.fao.org/faostat/" target="_blank" rel="noopener noreferrer">
                    FAO FAOSTAT <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.fao.org/publications/sofi/" target="_blank" rel="noopener noreferrer">
                    FAO State of Food Security and Nutrition (SOFI) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.ifpri.org/" target="_blank" rel="noopener noreferrer">
                    IFPRI <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://data.worldbank.org/topic/agriculture-and-rural-development" target="_blank" rel="noopener noreferrer">
                    World Bank – Agriculture and rural development <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.ipcc.ch/report/ar6/wg2/" target="_blank" rel="noopener noreferrer">
                    IPCC AR6 Working Group 2 (Impacts) <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.ipcc.ch/report/ar6/wg3/" target="_blank" rel="noopener noreferrer">
                    IPCC AR6 Working Group 3 (Mitigation) <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.resources}>
              <h2>Further Reading</h2>
              <ul>
                <li>
                  <a href="https://ourworldindata.org/food-agriculture" target="_blank" rel="noopener noreferrer">
                    Our World in Data – Food and Agriculture <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.fao.org/publications/en/" target="_blank" rel="noopener noreferrer">
                    FAO Publications <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://www.ifpri.org/publications" target="_blank" rel="noopener noreferrer">
                    IFPRI Publications <ExternalLink size={14} />
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
