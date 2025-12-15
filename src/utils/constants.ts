export const SITE_NAME = 'Clarity Lab';
export const SITE_TAGLINE = 'Quantitative analysis of climate, health, and economic systems';
export const SITE_DESCRIPTION = 'Clarity Lab produces open research on global challenges using data from authoritative sources.';
export const SITE_YEAR = 2024;

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
  discord: 'https://discord.gg/qffBtcYX',
  github: 'https://github.com/dylantneal',
  email: 'contact@clarity-lab.net',
};
