# Migration Plan: HTML/CSS → React + TypeScript

> **Document Version:** 1.0  
> **Created:** December 11, 2024  
> **Status:** Planning Phase

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Issues & Technical Debt](#issues--technical-debt)
4. [Proposed Architecture](#proposed-architecture)
5. [Technology Stack](#technology-stack)
6. [Migration Phases](#migration-phases)
7. [Component Breakdown](#component-breakdown)
8. [File Mapping](#file-mapping)
9. [Open Questions](#open-questions)
10. [Timeline Estimate](#timeline-estimate)

---

## Executive Summary

**Explore The World** (exploreai.science) is an educational platform focused on Data Science, Machine Learning, and AI. The current implementation uses static HTML/CSS with some embedded JavaScript for data visualizations.

This document outlines the migration to a modern **React + TypeScript** stack to improve:
- Developer experience and maintainability
- Component reusability (DRY principle)
- Type safety and error prevention
- Performance through code splitting
- Scalability for future features

---

## Current State Analysis

### Codebase Metrics

| Metric | Value |
|--------|-------|
| Total HTML Pages | 19 |
| Total Lines (HTML) | ~2,938 |
| CSS Files | 15 |
| Images | 7 |
| External Libraries | Plotly.js, D3.js |

### Page Inventory

#### Main Navigation Pages (7)
| File | Lines | Description |
|------|-------|-------------|
| index.html | 65 | Homepage with hero and featured topics |
| about.html | 62 | Mission, inspiration, contact info |
| resources.html | 89 | Educational resources index |
| data.html | 100 | Data stories, datasets, tools |
| research.html | 95 | Research summaries and collaboration |
| topics.html | 84 | Blog and news section |
| community.html | 53 | Discord community CTA |

#### Tutorial Pages (6)
| File | Lines | Description |
|------|-------|-------------|
| intro-to-data-science.html | 115 | Introduction to data science |
| basic-python-for-data-science.html | 112 | Python basics for DS |
| data-visualization.html | 164 | Visualization with Matplotlib/Seaborn |
| machine-learning-algorithms.html | 285 | ML algorithms deep dive |
| deep-learning-neural-networks.html | 166 | Neural networks and deep learning |
| natural-language-processing.html | 200 | NLP techniques and tools |

#### Case Study Pages (3)
| File | Lines | Description |
|------|-------|-------------|
| predictive-analytics-healthcare.html | 198 | Healthcare predictive analytics |
| fraud-detection-finance.html | 178 | Financial fraud detection |
| customer-segmentation-retail.html | 163 | Retail customer segmentation |

#### Data Story Pages (3)
| File | Lines | Description |
|------|-------|-------------|
| climate-change.html | 291 | Climate data with Plotly charts |
| global-health.html | 276 | Global health trends |
| economic-shifts.html | 242 | Economic data analysis |

### Current CSS Architecture

\`\`\`
css/
├── global/
│   ├── variables.css    # CSS custom properties (colors, fonts, spacing)
│   ├── reset.css        # CSS reset/normalize
│   └── global.css       # Base element styles
├── layout/
│   └── layout.css       # Layout utilities
├── components/
│   ├── buttons.css      # Button styles
│   ├── cards.css        # Card component
│   ├── footer.css       # Footer styles
│   ├── forms.css        # Form elements
│   └── header.css       # Header/navigation
├── sections/
│   ├── about.css        # About page specific
│   ├── community.css    # Community page specific
│   ├── data.css         # Data page specific
│   ├── home.css         # Home page specific
│   ├── research.css     # Research page specific
│   ├── resources.css    # Resources page specific
│   └── topics.css       # Topics page specific
├── utilities/
│   └── utilities.css    # Utility classes
└── reset.css            # Duplicate reset file
\`\`\`

### Design System (from variables.css)

\`\`\`css
/* Colors */
--color-primary: #1A1A2E      /* Dark navy */
--color-secondary: #00BFFF    /* Deep sky blue */
--color-accent: #1B204C       /* Dark blue-purple */
--color-highlight: #FF5733    /* Orange-red */
--color-background: #F5F5F5   /* Light gray */

/* Fonts */
--font-family-futuristic: 'Orbitron', sans-serif
--font-family-sans: 'Roboto', 'Helvetica Neue', Arial, sans-serif

/* Gradients */
--gradient-primary: linear-gradient(135deg, #1A1A2E 0%, #00BFFF 100%)
--gradient-secondary: linear-gradient(135deg, #00BFFF 0%, #1B204C 100%)
\`\`\`

---

## Issues & Technical Debt

### Critical Issues

| Issue | Affected Files | Impact |
|-------|----------------|--------|
| **Missing styles.css** | intro-to-data-science.html, basic-python-for-data-science.html, climate-change.html | Pages render without proper styling |
| **Inconsistent CSS imports** | Various pages | Different pages have different styling |
| **No shared templating** | All 19 HTML files | Header/nav/footer duplicated everywhere |

### Maintenance Challenges

1. **No Component Reuse**: Every page contains full HTML structure
2. **Manual Updates**: Changing navigation requires editing 19 files
3. **Inline Scripts**: Plotly charts embedded directly in HTML
4. **No Type Checking**: Pure HTML/JS with no compile-time safety
5. **No Build Process**: No minification, bundling, or optimization

### Deprecated/Inconsistent Patterns

- Some pages use old nav label "Cutting Edge Research" vs "Research Topics"
- Mixed use of section IDs and class names
- Inconsistent hero section implementations

---

## Proposed Architecture

### Directory Structure

\`\`\`
exploreai/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Site header with navigation
│   │   │   ├── Footer.tsx           # Site footer
│   │   │   ├── Navigation.tsx       # Nav menu component
│   │   │   └── Layout.tsx           # Page wrapper (header + content + footer)
│   │   │
│   │   ├── ui/
│   │   │   ├── Card.tsx             # Reusable card component
│   │   │   ├── Button.tsx           # Button variants
│   │   │   ├── Hero.tsx             # Hero section with image/overlay
│   │   │   ├── ArticleSection.tsx   # Content section wrapper
│   │   │   └── ExternalLink.tsx     # Links that open in new tab
│   │   │
│   │   └── charts/
│   │       ├── ChartWrapper.tsx     # Base Plotly wrapper
│   │       ├── LineChart.tsx        # Time series charts
│   │       ├── BarChart.tsx         # Bar/column charts
│   │       └── ScatterChart.tsx     # Scatter plots
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Resources.tsx
│   │   ├── Data.tsx
│   │   ├── Research.tsx
│   │   ├── Topics.tsx
│   │   ├── Community.tsx
│   │   │
│   │   ├── tutorials/
│   │   │   ├── index.tsx            # Tutorial listing (optional)
│   │   │   ├── IntroToDataScience.tsx
│   │   │   ├── BasicPython.tsx
│   │   │   ├── DataVisualization.tsx
│   │   │   ├── MachineLearning.tsx
│   │   │   ├── DeepLearning.tsx
│   │   │   └── NaturalLanguageProcessing.tsx
│   │   │
│   │   ├── case-studies/
│   │   │   ├── index.tsx            # Case study listing (optional)
│   │   │   ├── HealthcareAnalytics.tsx
│   │   │   ├── FraudDetection.tsx
│   │   │   └── CustomerSegmentation.tsx
│   │   │
│   │   └── data-stories/
│   │       ├── index.tsx            # Data stories listing (optional)
│   │       ├── ClimateChange.tsx
│   │       ├── GlobalHealth.tsx
│   │       └── EconomicShifts.tsx
│   │
│   ├── styles/
│   │   ├── globals.css              # CSS variables, reset, base styles
│   │   ├── components/              # CSS Modules for components
│   │   └── pages/                   # Page-specific styles
│   │
│   ├── types/
│   │   └── index.ts                 # Shared TypeScript types
│   │
│   ├── hooks/
│   │   └── useScrollHeader.ts       # Header scroll effect hook
│   │
│   ├── utils/
│   │   └── constants.ts             # Site-wide constants
│   │
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # Entry point
│   └── router.tsx                   # React Router configuration
│
├── public/
│   └── images/
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
\`\`\`

---

## Technology Stack

### Core Technologies

| Category | Technology | Version | Rationale |
|----------|------------|---------|-----------|
| **Framework** | React | 18.x | Industry standard, large ecosystem |
| **Language** | TypeScript | 5.x | Type safety, better DX |
| **Build Tool** | Vite | 5.x | Fast HMR, optimized builds |
| **Routing** | React Router | 6.x | Declarative routing |
| **Styling** | CSS Modules | - | Scoped styles, existing CSS compatible |

### Additional Libraries

| Library | Purpose |
|---------|---------|
| react-plotly.js | Plotly wrapper for React |
| plotly.js | Interactive data visualizations |
| lucide-react | Modern icon library |
| react-helmet-async | Document head management (SEO) |

### Package.json Dependencies (Proposed)

\`\`\`json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "react-plotly.js": "^2.6.0",
    "plotly.js": "^2.27.0",
    "lucide-react": "^0.294.0",
    "react-helmet-async": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^3.1.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
\`\`\`

---

## Migration Phases

### Phase 1: Project Setup (Day 1)

**Objective:** Create new React project alongside existing code

**Tasks:**
- [ ] Initialize Vite + React + TypeScript project
- [ ] Configure TypeScript (tsconfig.json)
- [ ] Set up ESLint and Prettier
- [ ] Install dependencies
- [ ] Copy images to public/images/
- [ ] Port CSS variables to globals.css
- [ ] Set up basic routing structure

**Deliverable:** Empty React app with routing skeleton

---

### Phase 2: Core Components (Days 2-3)

**Objective:** Build reusable layout and UI components

**Tasks:**
- [ ] Create Layout.tsx (wrapper component)
- [ ] Create Header.tsx with navigation
- [ ] Create Footer.tsx
- [ ] Create Navigation.tsx with route links
- [ ] Create Hero.tsx component
- [ ] Create Card.tsx component
- [ ] Create Button.tsx component
- [ ] Create ArticleSection.tsx component
- [ ] Port component CSS to CSS Modules

**Deliverable:** Component library ready for page composition

---

### Phase 3: Main Pages (Days 4-5)

**Objective:** Migrate primary navigation pages

**Tasks:**
- [ ] Migrate Home page
- [ ] Migrate About page
- [ ] Migrate Resources page (index with links)
- [ ] Migrate Data page
- [ ] Migrate Research page
- [ ] Migrate Topics page
- [ ] Migrate Community page
- [ ] Verify all navigation links work

**Deliverable:** All main pages functional with proper routing

---

### Phase 4: Tutorial Pages (Days 6-7)

**Objective:** Migrate educational content pages

**Tasks:**
- [ ] Migrate IntroToDataScience
- [ ] Migrate BasicPython
- [ ] Migrate DataVisualization
- [ ] Migrate MachineLearning
- [ ] Migrate DeepLearning
- [ ] Migrate NaturalLanguageProcessing
- [ ] Ensure consistent styling across tutorials

**Deliverable:** All tutorial content accessible

---

### Phase 5: Case Studies (Day 8)

**Objective:** Migrate industry case study pages

**Tasks:**
- [ ] Migrate HealthcareAnalytics
- [ ] Migrate FraudDetection
- [ ] Migrate CustomerSegmentation

**Deliverable:** Case studies with proper formatting

---

### Phase 6: Data Stories with Charts (Days 9-10)

**Objective:** Migrate interactive data visualization pages

**Tasks:**
- [ ] Create Plotly chart wrapper components
- [ ] Extract chart data to TypeScript files
- [ ] Migrate ClimateChange with all charts
- [ ] Migrate GlobalHealth with all charts
- [ ] Migrate EconomicShifts with all charts
- [ ] Ensure charts are responsive

**Deliverable:** Interactive data stories with working visualizations

---

### Phase 7: Polish & Deploy (Days 11-12)

**Objective:** Final touches and deployment

**Tasks:**
- [ ] Add SEO meta tags with react-helmet-async
- [ ] Add loading states and error boundaries
- [ ] Performance optimization (lazy loading)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness verification
- [ ] Update README.md
- [ ] Configure deployment (Vercel/Netlify)
- [ ] Set up CI/CD pipeline

**Deliverable:** Production-ready React application

---

## Component Breakdown

### Layout Components

#### Layout.tsx
\`\`\`tsx
interface LayoutProps {
  children: React.ReactNode;
}

// Wraps all pages with Header and Footer
// Handles scroll-to-top on route change
\`\`\`

#### Header.tsx
\`\`\`tsx
interface HeaderProps {
  transparent?: boolean;  // For hero overlay effect
}

// Fixed header with navigation
// Scroll effect (changes background on scroll)
\`\`\`

#### Navigation.tsx
\`\`\`tsx
// Navigation links with active state
// Mobile hamburger menu (future enhancement)

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Educational Resources', path: '/resources' },
  { label: 'Exploring the World', path: '/data' },
  { label: 'Research Topics', path: '/research' },
  { label: 'Current Trends', path: '/topics' },
  { label: 'Community', path: '/community' },
];
\`\`\`

### UI Components

#### Hero.tsx
\`\`\`tsx
interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlay?: boolean;
  fullHeight?: boolean;
}
\`\`\`

#### Card.tsx
\`\`\`tsx
interface CardProps {
  title?: string;
  children: React.ReactNode;
  href?: string;
  hoverable?: boolean;
}
\`\`\`

### Chart Components

#### LineChart.tsx
\`\`\`tsx
interface LineChartProps {
  data: {
    x: number[];
    y: number[];
    name?: string;
  }[];
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
}
\`\`\`

---

## File Mapping

### HTML → React Component Mapping

| Original HTML | React Component | Route |
|---------------|-----------------|-------|
| index.html | pages/Home.tsx | / |
| about.html | pages/About.tsx | /about |
| resources.html | pages/Resources.tsx | /resources |
| data.html | pages/Data.tsx | /data |
| research.html | pages/Research.tsx | /research |
| topics.html | pages/Topics.tsx | /topics |
| community.html | pages/Community.tsx | /community |
| intro-to-data-science.html | pages/tutorials/IntroToDataScience.tsx | /tutorials/intro-to-data-science |
| basic-python-for-data-science.html | pages/tutorials/BasicPython.tsx | /tutorials/basic-python |
| data-visualization.html | pages/tutorials/DataVisualization.tsx | /tutorials/data-visualization |
| machine-learning-algorithms.html | pages/tutorials/MachineLearning.tsx | /tutorials/machine-learning |
| deep-learning-neural-networks.html | pages/tutorials/DeepLearning.tsx | /tutorials/deep-learning |
| natural-language-processing.html | pages/tutorials/NaturalLanguageProcessing.tsx | /tutorials/nlp |
| predictive-analytics-healthcare.html | pages/case-studies/HealthcareAnalytics.tsx | /case-studies/healthcare |
| fraud-detection-finance.html | pages/case-studies/FraudDetection.tsx | /case-studies/fraud-detection |
| customer-segmentation-retail.html | pages/case-studies/CustomerSegmentation.tsx | /case-studies/customer-segmentation |
| climate-change.html | pages/data-stories/ClimateChange.tsx | /data-stories/climate-change |
| global-health.html | pages/data-stories/GlobalHealth.tsx | /data-stories/global-health |
| economic-shifts.html | pages/data-stories/EconomicShifts.tsx | /data-stories/economic-shifts |

---

## Open Questions

### Content Management
- [ ] **Q1:** Should content be extracted to Markdown/MDX files for easier editing?
- [ ] **Q2:** Is there interest in a headless CMS (Contentful, Sanity) for non-developer content updates?

### Data Visualizations
- [ ] **Q3:** Should chart data be fetched from an API, or remain static in code?
- [ ] **Q4:** Are there plans to add more interactive features to charts (filtering, zooming)?

### SEO & Performance
- [ ] **Q5:** Is SSR/SSG needed? (Would require Next.js instead of Vite)
- [ ] **Q6:** What is the target audience and expected traffic?

### Future Features
- [ ] **Q7:** Is user authentication planned (for community features)?
- [ ] **Q8:** Should there be a search functionality across articles?
- [ ] **Q9:** Are there plans for a newsletter signup?

---

## Timeline Estimate

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Phase 1: Project Setup | 1 day | Day 1 |
| Phase 2: Core Components | 2 days | Day 3 |
| Phase 3: Main Pages | 2 days | Day 5 |
| Phase 4: Tutorial Pages | 2 days | Day 7 |
| Phase 5: Case Studies | 1 day | Day 8 |
| Phase 6: Data Stories | 2 days | Day 10 |
| Phase 7: Polish & Deploy | 2 days | Day 12 |

**Total Estimated Time:** 12 working days

---

## Next Steps

1. **Review this document** and answer open questions
2. **Decide on optional features** (CMS, SSR, etc.)
3. **Begin Phase 1** — Initialize the new React project
4. **Parallel track** — Keep existing site live during migration

---

## Appendix: Useful Commands

\`\`\`bash
# Initialize new Vite project
npm create vite@latest exploreai-react -- --template react-ts

# Install dependencies
npm install react-router-dom react-plotly.js plotly.js lucide-react react-helmet-async

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

---

*Document maintained by: Development Team*  
*Last updated: December 11, 2024*
