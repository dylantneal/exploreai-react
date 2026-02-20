export const SITE_NAME = 'Clarity Lab';
export const SITE_TAGLINE = 'Quantitative analysis of climate, health, and economic systems';
export const SITE_DESCRIPTION = 'Clarity Lab produces open research on global challenges using data from authoritative sources.';
export const SITE_YEAR = 2026;
/** Year the lab was established (used for "Since", "Founded", institutional copy). */
export const FOUNDED_YEAR = 2022;

export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Research', path: '/research' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const SOCIAL_LINKS = {
  email: 'contact@clarity-lab.net',
};

/** Short line for trust strip / footer (no fake logos; can add real ones later). */
export const TRUST_LINE = 'Research cited by educators, policymakers, and news organizations worldwide.';
