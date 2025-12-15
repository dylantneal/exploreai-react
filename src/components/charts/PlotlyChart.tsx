import Plot from 'react-plotly.js';
import { Data, Layout, Config } from 'plotly.js';
import styles from '../../styles/components/Chart.module.css';

interface PlotlyChartProps {
  title: string;
  data: Data[];
  layout?: Partial<Layout>;
  height?: number;
  source?: {
    name: string;
    url: string;
  };
}

export default function PlotlyChart({ 
  title, 
  data, 
  layout = {}, 
  height = 380,
  source 
}: PlotlyChartProps) {
  // Merge default layout with provided layout
  const defaultLayout: Partial<Layout> = {
    font: {
      family: "'Inter', sans-serif",
      size: 12,
      color: '#666',
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    margin: { t: 20, r: 30, b: 50, l: 60 },
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0.5,
      xanchor: 'center',
      y: -0.15,
      font: { size: 11 },
    },
    xaxis: {
      gridcolor: 'rgba(0,0,0,0.06)',
      gridwidth: 1,
      linecolor: 'rgba(0,0,0,0.1)',
      tickfont: { size: 11 },
      ...layout.xaxis,
    },
    yaxis: {
      gridcolor: 'rgba(0,0,0,0.06)',
      gridwidth: 1,
      linecolor: 'rgba(0,0,0,0.1)',
      tickfont: { size: 11 },
      zeroline: false,
      ...layout.yaxis,
    },
    hoverlabel: {
      bgcolor: '#1A1A2E',
      bordercolor: 'transparent',
      font: { color: '#fff', size: 12 },
    },
    hovermode: 'x unified',
    ...layout,
  };

  const config: Partial<Config> = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d'],
    responsive: true,
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h4 className={styles.chartTitle}>{title}</h4>
      </div>
      <div className={styles.chartWrapper}>
        <Plot
          data={data}
          layout={{
            ...defaultLayout,
            height,
            autosize: true,
          }}
          config={config}
          style={{ width: '100%', height: `${height}px` }}
          useResizeHandler
        />
      </div>
      {source && (
        <div className={styles.chartFooter}>
          <p className={styles.chartSource}>
            Source: <a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a>
          </p>
        </div>
      )}
    </div>
  );
}
