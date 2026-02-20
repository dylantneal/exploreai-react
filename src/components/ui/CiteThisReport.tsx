import { SITE_NAME, SITE_URL } from '../../utils/constants';
import styles from '../../styles/components/CiteThisReport.module.css';

export interface CiteThisReportProps {
  /** Short report ID for citations (e.g. CL-2025-01). */
  reportId: string;
  /** Full report title as published. */
  title: string;
  /** Version or last-updated string (e.g. "December 2025"). */
  version: string;
  /** Path for canonical URL (e.g. /insights/climate-change). */
  path: string;
}

/** Derives the publication year from a version string like "December 2025". */
function yearFromVersion(version: string): string {
  const match = version.match(/\d{4}/);
  return match ? match[0] : new Date().getFullYear().toString();
}

export default function CiteThisReport({ reportId, title, version, path }: CiteThisReportProps) {
  const canonicalUrl = `${SITE_URL}${path}`;
  const year = yearFromVersion(version);

  const apaCitation = `${SITE_NAME}. (${year}). ${title} (Report No. ${reportId}). ${canonicalUrl}`;

  const copyCitation = () => {
    void navigator.clipboard.writeText(apaCitation);
  };

  return (
    <aside className={styles.citeBlock} aria-label="How to cite this report">
      <div className={styles.citeHeader}>
        <span className={styles.citeLabel}>How to cite this report</span>
        <span className={styles.reportId}>Report No. {reportId}</span>
        <span className={styles.version}>Version: {version}</span>
      </div>
      <p className={styles.apa}>
        <strong>APA:</strong>{' '}
        <cite className={styles.citation}>{apaCitation}</cite>
      </p>
      <button type="button" className={styles.copyButton} onClick={copyCitation}>
        Copy citation
      </button>
    </aside>
  );
}
