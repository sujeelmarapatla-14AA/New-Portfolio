import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './MagicBento.css';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Built-in vector icons for MagicBento visuals (self-contained, no external deps)
const GitBranchIcon: React.FC<{ size?: number; strokeWidth?: number }> = ({ size = 15, strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const Tick02Icon: React.FC<{ size?: number; strokeWidth?: number }> = ({ size = 11, strokeWidth = 2.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SlackIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  </svg>
);

const GithubIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const FigmaIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zM4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4zm0-8c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4zm8 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0zm0 8h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V8z" />
  </svg>
);

const NotionIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.69c-.467-.373-.84-.42-1.774-.326L2.64 2.576c-.42.047-.514.28-.327.467l2.146 1.165zm.887 3.545v13.636c0 .7.373.933 1.167.887l14.24-.84c.794-.047.887-.607.887-1.12V6.634c0-.513-.373-.746-.794-.7l-14.706.84c-.56.047-.794.373-.794.979zm13.497 1.307c.093.42.093.84 0 1.26l-2.007 7.045c-.187.653-.56.84-1.167.887-.607.047-1.073-.14-1.447-.653l-4.526-6.672v6.205c.327.187.56.467.56.84 0 .047-.046.28-.233.28l-2.846.187c-.093 0-.14-.233-.14-.28 0-.373.28-.607.607-.793V9.664c-.374-.187-.607-.467-.607-.84 0-.047.046-.28.233-.28l2.94-.187c.607-.047 1.073.14 1.493.653l4.573 6.672V9.897c-.327-.187-.56-.467-.56-.84 0-.047.047-.28.234-.28l2.846-.187c.187 0 .373.187.448.47z" />
  </svg>
);

const SparklesIcon: React.FC<{ size?: number; strokeWidth?: number }> = ({ size = 17, strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const Key01Icon: React.FC<{ size?: number; strokeWidth?: number }> = ({ size = 14, strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);

const FingerPrintIcon: React.FC<{ size?: number; strokeWidth?: number }> = ({ size = 14, strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
    <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.1-1.4.3-2" />
    <path d="M17.3 9.3A6 6 0 0 0 12 6c-3.3 0-6 2.7-6 6 0 2.5-.5 5-2 7" />
    <path d="M12 10a2 2 0 0 0-2 2c0 4-1 6.5-2 8" />
    <path d="M14 13.5a4 4 0 0 1-1.5 3.2" />
    <path d="M17 16c-.5 2-1.5 3.5-3 4.5" />
    <path d="M21 17c-.5 1.5-1.5 3-3 4" />
    <path d="M21.5 13c.3.9.5 2 .5 3.5" />
  </svg>
);

const THEMES = {
  dark: {
    '--mb-surface': 'linear-gradient(180deg, #1f1719 0%, #140f11 100%)',
    '--mb-edge': 'rgba(255, 255, 255, 0.08)',
    '--mb-highlight': 'rgba(255, 255, 255, 0.08)',
    '--mb-shadow': '0 24px 48px -28px rgba(0, 0, 0, 0.85), 0 8px 18px -12px rgba(0, 0, 0, 0.6)',
    '--mb-tile': 'linear-gradient(180deg, #352327 0%, #221618 100%)',
    '--mb-tile-edge': 'rgba(255, 255, 255, 0.08)',
    '--mb-tile-highlight': 'rgba(255, 255, 255, 0.15)',
    '--mb-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.7)',
    '--mb-well': 'rgba(255, 255, 255, 0.035)',
    '--mb-well-edge': 'rgba(255, 255, 255, 0.07)',
    '--mb-ink': '#f5f0ef',
    '--mb-muted': 'rgba(245, 240, 239, 0.65)',
    '--mb-faint': 'rgba(245, 240, 239, 0.35)',
    '--mb-line': 'rgba(245, 240, 239, 0.12)',
    '--mb-secondary': '#a89d9e',
    '--mb-secondary-ink': '#161113',
    '--mb-cursor-stroke': 'rgba(22, 17, 19, 0.9)',
    '--mb-ring': 'rgba(22, 17, 19, 0.85)',
    '--mb-focus': 'rgba(245, 240, 239, 0.5)',
    '--mb-glow-alpha': 0.85,
    '--mb-spot-alpha': 0.08
  },
  light: {
    '--mb-surface': 'linear-gradient(180deg, #ffffff 0%, #f7f7f9 100%)',
    '--mb-edge': 'rgba(24, 24, 27, 0.08)',
    '--mb-highlight': 'rgba(255, 255, 255, 1)',
    '--mb-shadow': '0 24px 48px -30px rgba(24, 24, 27, 0.28), 0 8px 18px -14px rgba(24, 24, 27, 0.16)',
    '--mb-tile': 'linear-gradient(180deg, #ffffff 0%, #f6f6f8 100%)',
    '--mb-tile-edge': 'rgba(24, 24, 27, 0.08)',
    '--mb-tile-highlight': 'rgba(255, 255, 255, 1)',
    '--mb-tile-shadow': '0 4px 10px -5px rgba(24, 24, 27, 0.22)',
    '--mb-well': 'rgba(24, 24, 27, 0.025)',
    '--mb-well-edge': 'rgba(24, 24, 27, 0.06)',
    '--mb-ink': '#18181b',
    '--mb-muted': 'rgba(24, 24, 27, 0.6)',
    '--mb-faint': 'rgba(24, 24, 27, 0.3)',
    '--mb-line': 'rgba(24, 24, 27, 0.08)',
    '--mb-secondary': '#71717a',
    '--mb-secondary-ink': '#ffffff',
    '--mb-cursor-stroke': '#ffffff',
    '--mb-ring': '#ffffff',
    '--mb-focus': 'rgba(24, 24, 27, 0.4)',
    '--mb-glow-alpha': 0.5,
    '--mb-spot-alpha': 0.035
  }
};

const INK: Record<'dark' | 'light', [number, number, number]> = { dark: [245, 240, 239], light: [24, 24, 27] };
const MIN_CELL = 150;
const MIN_PAIR = 200;
const STAGGER = 80;
const TILT = 6;
const MAGNET = 6;

export interface MagicBentoItem {
  id?: string | number;
  label?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  visual?: React.ReactNode | 'analytics' | 'dashboard' | 'collaboration' | 'automation' | 'integration' | 'security';
  content?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (event: React.MouseEvent) => void;
  colSpan?: number;
  rowSpan?: number;
}

export interface MagicBentoProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: MagicBentoItem[];
  columns?: number;
  rowHeight?: number;
  gap?: number;
  radius?: number;
  theme?: 'dark' | 'light';
  glowColor?: string;
  textAutoHide?: boolean;
  enableBorderGlow?: boolean;
  enableSpotlight?: boolean;
  spotlightRadius?: number;
  enableStars?: boolean;
  particleCount?: number;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  intro?: boolean;
  disableAnimations?: boolean;
  onItemClick?: (item: MagicBentoItem, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_ITEMS: MagicBentoItem[] = [
  { title: 'Analytics', description: 'Track systems performance', visual: 'analytics' },
  { title: 'Dashboard', description: 'Centralized telemetry view', visual: 'dashboard' },
  {
    title: 'Collaboration',
    description: 'Work together seamlessly',
    visual: 'collaboration',
    colSpan: 2,
    rowSpan: 2
  },
  { title: 'Automation', description: 'Streamline CI/CD workflows', visual: 'automation', colSpan: 2, rowSpan: 2 },
  { title: 'Integration', description: 'Connect developer tools', visual: 'integration' },
  { title: 'Security', description: 'Enterprise-grade protection', visual: 'security' }
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const vars = (values: Record<string, string | number>) => values as React.CSSProperties;

const parseRgb = (value?: string): [number, number, number] | null => {
  if (!value) return null;
  const text = String(value).trim();
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
  if (hex) {
    const full = hex[1].length === 3 ? hex[1].replace(/./g, digit => digit + digit) : hex[1];
    return [0, 2, 4].map(index => parseInt(full.slice(index, index + 2), 16)) as [number, number, number];
  }
  const numbers = text.match(/[\d.]+/g);
  if (numbers && numbers.length >= 3 && /^(rgba?\(|[\d.\s,]+$)/i.test(text)) {
    return numbers.slice(0, 3).map(channel => clamp(Math.round(parseFloat(channel)), 0, 255)) as [number, number, number];
  }
  return null;
};

const inkFor = (rgb: [number, number, number]) => {
  const [r, g, b] = rgb.map(channel => channel / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.55 ? '#161113' : '#ffffff';
};

const CHART = [3.1, 3.8, 3.5, 4.9, 4.4, 5.8, 5.3, 6.9, 6.5, 8.2, 9.4, 12.4];

const curve = (values: number[], width: number, height: number) => {
  const top = 6;
  const bottom = 2;
  const low = Math.min(...values) * 0.7;
  const high = Math.max(...values);
  const points: [number, number][] = values.map((value, index) => [
    (index / (values.length - 1)) * width,
    top + (1 - (value - low) / (high - low)) * (height - top - bottom)
  ]);
  const count = points.length;
  const slopes: number[] = [];
  for (let i = 0; i < count - 1; i++) {
    slopes.push((points[i + 1][1] - points[i][1]) / (points[i + 1][0] - points[i][0]));
  }
  const tangents = points.map((_, i) => {
    if (i === 0) return slopes[0];
    if (i === count - 1) return slopes[count - 2];
    return slopes[i - 1] * slopes[i] > 0 ? (slopes[i - 1] + slopes[i]) / 2 : 0;
  });
  for (let i = 0; i < count - 1; i++) {
    if (slopes[i] === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
      continue;
    }
    const a = tangents[i] / slopes[i];
    const b = tangents[i + 1] / slopes[i];
    const length = a * a + b * b;
    if (length > 9) {
      const scale = 3 / Math.sqrt(length);
      tangents[i] = scale * a * slopes[i];
      tangents[i + 1] = scale * b * slopes[i];
    }
  }
  let line = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
  const samples: [number, number][] = [];
  for (let i = 0; i < count - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const third = (x1 - x0) / 3;
    const c1 = [x0 + third, y0 + tangents[i] * third];
    const c2 = [x1 - third, y1 - tangents[i + 1] * third];
    line += ` C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`;
    for (let step = 0; step < 12; step++) {
      const t = step / 12;
      const u = 1 - t;
      samples.push([
        u * u * u * x0 + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * x1,
        u * u * u * y0 + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * y1
      ]);
    }
  }
  samples.push(points[count - 1]);
  const area = `${line} L${width.toFixed(2)},${height.toFixed(2)} L0,${height.toFixed(2)} Z`;
  return { line, area, samples };
};

const sampleAt = (samples: [number, number][], x: number) => {
  let index = 1;
  while (index < samples.length - 1 && samples[index][0] < x) index++;
  const [x0, y0] = samples[index - 1];
  const [x1, y1] = samples[index];
  const t = x1 === x0 ? 0 : clamp((x - x0) / (x1 - x0), 0, 1);
  return y0 + (y1 - y0) * t;
};

const AnalyticsVisual = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useIsomorphicLayoutEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    const update = () => {
      const next = { width: plot.clientWidth, height: plot.clientHeight };
      setSize(previous =>
        previous && previous.width === next.width && previous.height === next.height ? previous : next
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(plot);
    return () => observer.disconnect();
  }, []);

  const shape = useMemo(
    () => (size && size.width > 4 && size.height > 4 ? curve(CHART, size.width, size.height) : null),
    [size]
  );

  const scrub = (event: React.PointerEvent) => {
    const plot = plotRef.current;
    const chart = chartRef.current;
    const line = scrubRef.current;
    const dot = dotRef.current;
    const label = valueRef.current;
    const note = noteRef.current;
    if (!shape || !plot || !chart || !line || !dot || !label || !note) return;
    const rect = plot.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = sampleAt(shape.samples, x);
    const position = (x / Math.max(1, rect.width)) * (CHART.length - 1);
    const index = Math.floor(position);
    const next = Math.min(CHART.length - 1, index + 1);
    const value = CHART[index] + (CHART[next] - CHART[index]) * (position - index);
    chart.dataset.scrub = '';
    line.style.transform = `translateX(${x.toFixed(1)}px)`;
    dot.style.transform = `translateY(${y.toFixed(1)}px)`;
    label.textContent = `${value.toFixed(1)}k`;
    note.textContent = `Oct ${Math.round(position) + 1}`;
  };

  const rest = () => {
    if (chartRef.current) delete chartRef.current.dataset.scrub;
    if (valueRef.current) valueRef.current.textContent = `${CHART[CHART.length - 1].toFixed(1)}k`;
    if (noteRef.current) noteRef.current.textContent = '+18%';
  };

  return (
    <div
      ref={chartRef}
      className="magic-bento__chart"
      onPointerMove={scrub}
      onPointerDown={scrub}
      onPointerLeave={rest}
    >
      <div className="magic-bento__figure">
        <span ref={valueRef} className="magic-bento__figure-value">
          {CHART[CHART.length - 1].toFixed(1)}k
        </span>
        <span ref={noteRef} className="magic-bento__figure-note">
          +18%
        </span>
      </div>
      <div ref={plotRef} className="magic-bento__plot">
        {shape && size && (
          <svg viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true">
            <path className="magic-bento__chart-area" d={shape.area} />
            <path className="magic-bento__chart-line" d={shape.line} pathLength="1" />
          </svg>
        )}
        <span ref={scrubRef} className="magic-bento__scrub">
          <span ref={dotRef} className="magic-bento__scrub-dot" />
        </span>
      </div>
    </div>
  );
};

const BARS = [42, 58, 49, 71, 63, 88, 76];

const DashboardVisual = () => (
  <div className="magic-bento__bars">
    <div className="magic-bento__figure">
      <span className="magic-bento__figure-value">$48.2k</span>
      <span className="magic-bento__figure-note">Weekly</span>
    </div>
    <div className="magic-bento__bars-plot">
      {BARS.map((height, index) => (
        <span
          key={index}
          className="magic-bento__bar"
          data-peak={height === Math.max(...BARS) ? '' : undefined}
          style={vars({ '--h': height / 100, '--i': index })}
        />
      ))}
    </div>
  </div>
);

const ARROW = (
  <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
    <path
      d="M2.2 1.6 13.4 9.9c.5.4.3 1.2-.4 1.3l-4.6.6-2.2 4.2c-.3.6-1.2.5-1.4-.1L1.2 2.4c-.2-.6.5-1.1 1-.8Z"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const CollaborationVisual = () => (
  <div className="magic-bento__collab magic-bento__well">
    <span className="magic-bento__doc-title">Launch plan</span>
    <div className="magic-bento__lines">
      <span className="magic-bento__line" style={vars({ '--w': '92%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '78%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '86%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '44%' })} />
      <span className="magic-bento__line magic-bento__line--gap" style={vars({ '--w': '88%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '70%' })}>
        <span className="magic-bento__selection" style={vars({ '--from': '18%', '--span': '58%' })}>
          <span className="magic-bento__caret" />
        </span>
      </span>
      <span className="magic-bento__line" style={vars({ '--w': '82%' })} />
    </div>
    <span
      className="magic-bento__cursor magic-bento__cursor--primary"
      style={vars({ '--x': '58%', '--y': '52%', '--i': 0, '--path': 'magic-bento-path-a' })}
    >
      {ARROW}
      <span className="magic-bento__cursor-name">Maya</span>
    </span>
    <span
      className="magic-bento__cursor magic-bento__cursor--secondary"
      style={vars({ '--x': '30%', '--y': '24%', '--i': 1, '--path': 'magic-bento-path-b' })}
    >
      {ARROW}
      <span className="magic-bento__cursor-name">Leo</span>
    </span>
  </div>
);

const STEPS = [
  { label: 'Install', time: '8s' },
  { label: 'Build', time: '12s' },
  { label: 'Test', time: '48s' },
  { label: 'Deploy', time: '9s' }
];

const AutomationVisual = () => (
  <div className="magic-bento__flow" style={vars({ '--n': STEPS.length })}>
    <div className="magic-bento__flow-trigger magic-bento__tile">
      <span className="magic-bento__flow-glyph">
        <GitBranchIcon size={15} strokeWidth={1.8} />
      </span>
      <span className="magic-bento__flow-copy">
        <span className="magic-bento__flow-name">Push to main</span>
        <span className="magic-bento__flow-meta magic-bento__flow-hash">a1c9f3e</span>
      </span>
    </div>
    <ol className="magic-bento__steps magic-bento__well">
      <span className="magic-bento__rail" aria-hidden="true">
        <span className="magic-bento__rail-fill" />
      </span>
      {STEPS.map((step, index) => (
        <li key={step.label} className="magic-bento__step" style={vars({ '--i': index })}>
          <span className="magic-bento__status">
            <span className="magic-bento__pending" />
            <span className="magic-bento__spinner" />
            <span className="magic-bento__done">
              <Tick02Icon size={11} strokeWidth={2.6} />
            </span>
          </span>
          {step.label}
          <span className="magic-bento__step-time">{step.time}</span>
        </li>
      ))}
    </ol>
  </div>
);

const APPS = [
  { icon: SlackIcon, x: '17%', y: '24%' },
  { icon: GithubIcon, x: '83%', y: '24%' },
  { icon: FigmaIcon, x: '17%', y: '78%' },
  { icon: NotionIcon, x: '83%', y: '78%' }
];

const IntegrationVisual = () => (
  <div className="magic-bento__hub">
    <svg className="magic-bento__hub-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {APPS.map(app => (
        <line key={app.x + app.y} x1={parseFloat(app.x)} y1={parseFloat(app.y)} x2="50" y2="51" pathLength="1" />
      ))}
    </svg>
    {APPS.map((app, index) => (
      <span
        key={`packet-${index}`}
        className="magic-bento__packet"
        style={vars({ '--x': app.x, '--y': app.y, '--i': index })}
      />
    ))}
    {APPS.map((app, index) => {
      const AppIcon = app.icon;
      return (
        <span
          key={app.x + app.y}
          className="magic-bento__hub-node magic-bento__tile"
          style={vars({ '--x': app.x, '--y': app.y, '--s': '26px', '--i': index + 1 })}
        >
          <AppIcon size={14} />
        </span>
      );
    })}
    <span
      className="magic-bento__hub-node magic-bento__tile"
      style={vars({ '--x': '50%', '--y': '51%', '--s': '34px', '--i': 0 })}
    >
      <SparklesIcon size={17} strokeWidth={1.8} />
    </span>
  </div>
);

const SETTINGS = [
  { icon: Key01Icon, label: 'SSO' },
  { icon: FingerPrintIcon, label: '2FA' }
];

const SecurityVisual = () => (
  <div className="magic-bento__shield">
    {SETTINGS.map((setting, index) => {
      const SetIcon = setting.icon;
      return (
        <div key={setting.label} className="magic-bento__setting magic-bento__tile">
          <SetIcon size={14} strokeWidth={1.8} />
          <span className="magic-bento__setting-label">{setting.label}</span>
          <span className="magic-bento__switch" style={vars({ '--i': index })} />
        </div>
      );
    })}
  </div>
);

const VISUALS: Record<string, React.FC> = {
  analytics: AnalyticsVisual,
  dashboard: DashboardVisual,
  collaboration: CollaborationVisual,
  automation: AutomationVisual,
  integration: IntegrationVisual,
  security: SecurityVisual
};

const REPLAY = new Set([
  'magic-bento-draw',
  'magic-bento-fade',
  'magic-bento-grow',
  'magic-bento-pop',
  'magic-bento-select',
  'magic-bento-wait',
  'magic-bento-run',
  'magic-bento-check',
  'magic-bento-rail',
  'magic-bento-switch-track',
  'magic-bento-switch-knob'
]);

const FLOW = new Set([
  'magic-bento-wait',
  'magic-bento-run',
  'magic-bento-check',
  'magic-bento-rail',
  'magic-bento-fade'
]);

const finite = (animation: Animation) => {
  const timing = animation.effect?.getTiming?.();
  return timing ? timing.iterations !== Infinity : false;
};

const nameOf = (animation: Animation) => (animation as CSSAnimation).animationName || '';

interface CardState {
  hot: number;
  rx: number;
  ry: number;
  tx: number;
  ty: number;
  vrx: number;
  vry: number;
  vtx: number;
  vty: number;
  press: number;
  vpress: number;
  stars: number;
  particles: { x: number; y: number; vx: number; vy: number; size: number; phase: number; rate: number }[] | null;
  active: boolean;
  written: Record<string, string>;
  drawn?: boolean;
}

const MagicBento: React.FC<MagicBentoProps> = ({
  items = DEFAULT_ITEMS,
  columns = 4,
  rowHeight = 200,
  gap = 12,
  radius = 20,
  theme = 'dark',
  glowColor = '#C52A35',
  textAutoHide = true,
  enableBorderGlow = true,
  enableSpotlight = true,
  spotlightRadius = 300,
  enableStars = false,
  particleCount = 24,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = true,
  intro = true,
  disableAnimations = false,
  onItemClick,
  className = '',
  style
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const starRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const engineRef = useRef<{ sync: () => void } | null>(null);
  const [cols, setCols] = useState(Math.max(1, Math.round(columns)));

  const palette = theme === 'light' ? 'light' : 'dark';
  const glow = parseRgb(glowColor) ?? INK[palette];
  const settings = {
    items,
    columns: Math.max(1, Math.round(columns)),
    gap: Math.max(0, gap),
    enableBorderGlow,
    enableSpotlight,
    spotlightRadius: Math.max(40, spotlightRadius),
    enableStars,
    particleCount: clamp(Math.round(particleCount), 0, 120),
    enableTilt,
    enableMagnetism,
    clickEffect,
    intro,
    disableAnimations,
    onItemClick,
    glow
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = !settingsRef.current.disableAnimations && !reduced;
    const playIntro = motion && settingsRef.current.intro;
    if (motion) root.dataset.motion = '';
    else delete root.dataset.motion;
    if (playIntro) root.dataset.intro = '';
    else delete root.dataset.intro;

    const pointer = { x: -1e5, y: -1e5, inside: false, down: -1 };
    const light = { x: -1e5, y: -1e5, near: 0, ready: false };
    const states: CardState[] = [];
    const wave = { x: 0, y: 0, t: -1, duration: 1.1, reach: 800 };
    let rects: (DOMRect | null)[] = [];
    let bounds: DOMRect | null = null;
    let dirty = true;
    let raf = 0;
    let last = 0;
    let visible = true;
    let entered = !playIntro;
    let settleTimer = 0;
    let introTimer = 0;
    const lastFlow: number[] = [];

    const stateFor = (index: number): CardState => {
      if (!states[index]) {
        states[index] = {
          hot: 0,
          rx: 0,
          ry: 0,
          tx: 0,
          ty: 0,
          vrx: 0,
          vry: 0,
          vtx: 0,
          vty: 0,
          press: 1,
          vpress: 0,
          stars: 0,
          particles: null,
          active: false,
          written: {}
        };
      }
      return states[index];
    };

    const write = (element: HTMLElement, state: CardState, name: string, value: string) => {
      if (state.written[name] === value) return;
      state.written[name] = value;
      element.style.setProperty(name, value);
    };

    const measure = () => {
      dirty = false;
      bounds = root.getBoundingClientRect();
      rects = cellRefs.current.map(cell => (cell ? cell.getBoundingClientRect() : null));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      starRefs.current.forEach((canvas, index) => {
        const rect = rects[index];
        if (!canvas || !rect) return;
        const width = Math.max(1, Math.round(rect.width * ratio));
        const height = Math.max(1, Math.round(rect.height * ratio));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
      });
    };

    const seed = (index: number, rect: DOMRect) => {
      const count = settingsRef.current.particleCount;
      const state = stateFor(index);
      if (state.particles && state.particles.length === count) return state.particles;
      state.particles = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 6,
        vy: -4 - Math.random() * 10,
        size: 0.6 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        rate: 1.2 + Math.random() * 2.4
      }));
      return state.particles;
    };

    const drawStars = (index: number, rect: DOMRect, state: CardState, lx: number, ly: number, dt: number, now: number) => {
      const canvas = starRefs.current[index];
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;
      const ratio = canvas.width / Math.max(1, rect.width);
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (state.stars < 0.004) return;
      const s = settingsRef.current;
      const particles = seed(index, rect);
      const reach = s.spotlightRadius * 0.75;
      const [r, g, b] = s.glow;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      for (const particle of particles) {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        if (particle.y < -4) {
          particle.y = rect.height + 4;
          particle.x = Math.random() * rect.width;
        }
        if (particle.x < -4) particle.x = rect.width + 4;
        if (particle.x > rect.width + 4) particle.x = -4;
        const distance = Math.hypot(particle.x - lx, particle.y - ly) / reach;
        if (distance >= 1) continue;
        const falloff = 1 - distance * distance * (3 - 2 * distance);
        const twinkle = 0.55 + 0.45 * Math.sin(now * 0.001 * particle.rate + particle.phase);
        const alpha = state.stars * falloff * twinkle;
        if (alpha < 0.01) continue;
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }
    };

    const replay = (card: HTMLElement, filter: Set<string>) => {
      if (!motion || !card.getAnimations) return;
      for (const animation of card.getAnimations({ subtree: true })) {
        if (!filter.has(nameOf(animation)) || !finite(animation)) continue;
        const target = animation.effect instanceof KeyframeEffect ? animation.effect.target : null;
        if (target instanceof Element && target.classList.contains('magic-bento__cursor')) continue;
        animation.currentTime = 0;
        animation.play();
      }
    };

    const startWave = (x: number, y: number, duration: number) => {
      if (!motion || !bounds) return;
      wave.x = x;
      wave.y = y;
      wave.t = 0;
      wave.duration = duration;
      wave.reach =
        Math.max(
          Math.hypot(x - bounds.left, y - bounds.top),
          Math.hypot(x - bounds.right, y - bounds.top),
          Math.hypot(x - bounds.left, y - bounds.bottom),
          Math.hypot(x - bounds.right, y - bounds.bottom)
        ) + 140;
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      if (dirty) measure();
      const s = settingsRef.current;
      const cards = cardRefs.current;
      let busy = false;

      const margin = s.spotlightRadius * 0.5;
      const near =
        pointer.inside &&
        bounds &&
        pointer.x > bounds.left - margin &&
        pointer.x < bounds.right + margin &&
        pointer.y > bounds.top - margin &&
        pointer.y < bounds.bottom + margin
          ? 1
          : 0;
      if (!light.ready && near) {
        light.x = pointer.x;
        light.y = pointer.y;
        light.ready = true;
      }
      const follow = 1 - Math.exp(-dt / 0.05);
      light.x += (pointer.x - light.x) * follow;
      light.y += (pointer.y - light.y) * follow;
      const fade = 1 - Math.exp(-dt / (near > light.near ? 0.12 : 0.4));
      light.near += (near - light.near) * fade;
      if (Math.abs(near - light.near) < 0.002) light.near = near;
      else busy = true;
      if (Math.abs(pointer.x - light.x) + Math.abs(pointer.y - light.y) > 0.3) busy = true;

      let waveRadius = 0;
      let waveAlpha = 0;
      if (wave.t >= 0) {
        wave.t += dt;
        const progress = Math.min(1, wave.t / wave.duration);
        waveRadius = wave.reach * (1 - Math.pow(1 - progress, 2.2));
        waveAlpha = Math.pow(1 - progress, 1.3);
        if (progress >= 1) {
          wave.t = -1;
          waveAlpha = 0;
        } else busy = true;
      }

      cards.forEach((card, index) => {
        const rect = rects[index];
        if (!card || !rect) return;
        const state = stateFor(index);
        const lx = light.x - rect.left;
        const ly = light.y - rect.top;
        const px = pointer.x - rect.left;
        const py = pointer.y - rect.top;
        const inside = pointer.inside && entered && px >= 0 && py >= 0 && px <= rect.width && py <= rect.height;

        if (inside !== state.active) {
          state.active = inside;
          if (inside) {
            card.dataset.active = '';
            if (now - (lastFlow[index] || -1e9) > 3200 && card.querySelector('.magic-bento__steps')) {
              lastFlow[index] = now;
              replay(card, FLOW);
            }
          } else delete card.dataset.active;
        }

        const hotTarget = inside && s.enableSpotlight ? 1 : 0;
        state.hot += (hotTarget - state.hot) * (1 - Math.exp(-dt / (hotTarget > state.hot ? 0.14 : 0.32)));
        if (Math.abs(hotTarget - state.hot) < 0.002) state.hot = hotTarget;
        else busy = true;

        const u = clamp(px / Math.max(1, rect.width), 0, 1) - 0.5;
        const v = clamp(py / Math.max(1, rect.height), 0, 1) - 0.5;
        const tilt = inside && s.enableTilt && motion;
        const magnet = inside && s.enableMagnetism && motion;
        const targets = [
          tilt ? -v * 2 * TILT : 0,
          tilt ? u * 2 * TILT : 0,
          magnet ? u * 2 * MAGNET : 0,
          magnet ? v * 2 * MAGNET : 0
        ];
        const keys: [keyof CardState, keyof CardState][] = [
          ['rx', 'vrx'],
          ['ry', 'vry'],
          ['tx', 'vtx'],
          ['ty', 'vty']
        ];
        const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
        const h = dt / steps;
        keys.forEach(([key, velocity], k) => {
          for (let step = 0; step < steps; step++) {
            (state[velocity] as number) += (170 * (targets[k] - (state[key] as number)) - 20 * (state[velocity] as number)) * h;
            (state[key] as number) += (state[velocity] as number) * h;
          }
          if (Math.abs(targets[k] - (state[key] as number)) < 0.002 && Math.abs(state[velocity] as number) < 0.01) {
            (state[key] as number) = targets[k];
            (state[velocity] as number) = 0;
          } else busy = true;
        });
        const pressTarget = pointer.down === index && s.clickEffect && motion ? 0.985 : 1;
        for (let step = 0; step < steps; step++) {
          state.vpress += (420 * (pressTarget - state.press) - 28 * state.vpress) * h;
          state.press += state.vpress * h;
        }
        if (Math.abs(pressTarget - state.press) < 0.0002 && Math.abs(state.vpress) < 0.001) {
          state.press = pressTarget;
          state.vpress = 0;
        } else busy = true;

        write(card, state, '--mb-x', `${lx.toFixed(1)}px`);
        write(card, state, '--mb-y', `${ly.toFixed(1)}px`);
        write(card, state, '--mb-near', (s.enableBorderGlow ? light.near : 0).toFixed(3));
        write(card, state, '--mb-hot', state.hot.toFixed(3));
        write(card, state, '--mb-rx', `${state.rx.toFixed(3)}deg`);
        write(card, state, '--mb-ry', `${state.ry.toFixed(3)}deg`);
        write(card, state, '--mb-tx', `${state.tx.toFixed(2)}px`);
        write(card, state, '--mb-ty', `${state.ty.toFixed(2)}px`);
        write(card, state, '--mb-press', state.press.toFixed(4));
        write(card, state, '--mb-wx', `${(wave.x - rect.left).toFixed(1)}px`);
        write(card, state, '--mb-wy', `${(wave.y - rect.top).toFixed(1)}px`);
        write(card, state, '--mb-wr', `${waveRadius.toFixed(1)}px`);
        write(card, state, '--mb-wa', waveAlpha.toFixed(3));

        if (s.enableStars && starRefs.current[index]) {
          const starTarget = inside && motion ? 1 : 0;
          state.stars += (starTarget - state.stars) * (1 - Math.exp(-dt / (starTarget ? 0.3 : 0.5)));
          if (state.stars < 0.004 && !starTarget) state.stars = 0;
          if (state.stars > 0 || starTarget) {
            drawStars(index, rect, state, lx, ly, dt, now);
            state.drawn = true;
            busy = true;
          } else if (state.drawn) {
            drawStars(index, rect, state, lx, ly, dt, now);
            state.drawn = false;
          }
        }
      });

      if (busy && visible) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const cardIndex = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return -1;
      const card = target.closest('.magic-bento__card');
      return card instanceof HTMLElement ? cardRefs.current.indexOf(card) : -1;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
      wake();
    };

    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      pointer.inside = false;
      pointer.down = -1;
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
      pointer.down = cardIndex(event.target);
      wake();
    };

    const release = () => {
      if (pointer.down < 0) return;
      pointer.down = -1;
      wake();
    };

    const activate = (index: number, x: number, y: number) => {
      const s = settingsRef.current;
      const card = cardRefs.current[index];
      if (!card) return;
      if (s.clickEffect) {
        if (dirty) measure();
        startWave(x, y, 1.1);
        replay(card, REPLAY);
        lastFlow[index] = performance.now();
      }
      wake();
    };

    const onClick = (event: MouseEvent) => {
      const index = cardIndex(event.target);
      const card = cardRefs.current[index];
      if (!card) return;
      if (event.detail === 0) {
        const rect = card.getBoundingClientRect();
        activate(index, rect.left + rect.width / 2, rect.top + rect.height / 2);
      } else activate(index, event.clientX, event.clientY);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = cardRefs.current[cardIndex(event.target)];
      if (!card || event.target !== card || card.tagName === 'A') return;
      event.preventDefault();
      card.click();
    };

    const onScroll = () => {
      dirty = true;
      wake();
    };

    const resizeObserver = new ResizeObserver(() => {
      const s = settingsRef.current;
      const width = root.clientWidth;
      const cell = (count: number) => (width - s.gap * (count - 1)) / count;
      const next = cell(s.columns) >= MIN_CELL ? s.columns : s.columns >= 2 && cell(2) >= MIN_PAIR ? 2 : 1;
      setCols(next);
      dirty = true;
      wake();
    });
    resizeObserver.observe(root);

    const enter = () => {
      entered = true;
      let order = 0;
      cellRefs.current.forEach(cell => {
        if (!cell) return;
        cell.style.setProperty('--mb-delay', `${order++ * STAGGER}ms`);
        cell.dataset.state = 'in';
      });
      if (dirty) measure();
      introTimer = window.setTimeout(() => {
        if (bounds) startWave(bounds.left, bounds.top, 1.7);
        wake();
      }, 260);
      settleTimer = window.setTimeout(
        () => {
          cellRefs.current.forEach(cell => cell?.style.setProperty('--mb-delay', '0ms'));
        },
        order * STAGGER + 2600
      );
      wake();
    };

    let gate: IntersectionObserver | null = null;
    if (playIntro && typeof IntersectionObserver !== 'undefined') {
      gate = new IntersectionObserver(
        (entries, observer) => {
          if (!entries.some(entry => entry.isIntersecting)) return;
          observer.disconnect();
          enter();
        },
        { threshold: 0.15 }
      );
      gate.observe(root);
    } else {
      cellRefs.current.forEach(cell => {
        if (!cell) return;
        cell.style.setProperty('--mb-delay', '0ms');
        cell.dataset.state = 'in';
      });
      if (motion) {
        for (const animation of root.getAnimations ? root.getAnimations({ subtree: true }) : []) {
          if (REPLAY.has(nameOf(animation)) && finite(animation)) animation.finish();
        }
      }
    }

    const visibility = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (visible) {
        dirty = true;
        wake();
      }
    });
    visibility.observe(root);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', release, { passive: true });
    window.addEventListener('pointercancel', release, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('pointerout', onPointerOut as EventListener);
    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKeyDown);

    engineRef.current = {
      sync: () => {
        cellRefs.current.forEach(cell => {
          if (!cell || (!entered && playIntro)) return;
          if (cell.dataset.state !== 'in') {
            cell.style.setProperty('--mb-delay', '0ms');
            cell.dataset.state = 'in';
          }
        });
        dirty = true;
        wake();
      }
    };

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      window.clearTimeout(introTimer);
      gate?.disconnect();
      visibility.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('pointerout', onPointerOut as EventListener);
      root.removeEventListener('click', onClick);
      root.removeEventListener('keydown', onKeyDown);
      engineRef.current = null;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    engineRef.current?.sync();
  }, [items, cols, rowHeight, gap, radius, enableStars, enableSpotlight, enableBorderGlow]);

  const ink = INK[palette];
  const accent = parseRgb(glowColor) ?? ink;
  const corner = Math.max(0, radius);
  const span = Math.max(1, cols);

  cellRefs.current.length = items.length;
  cardRefs.current.length = items.length;
  starRefs.current.length = items.length;

  return (
    <div
      ref={rootRef}
      className={`magic-bento ${className}`.trim()}
      data-autohide={textAutoHide ? '' : undefined}
      data-motion={disableAnimations ? undefined : ''}
      data-intro={intro && !disableAnimations ? '' : undefined}
      style={{
        ...vars({
          ...THEMES[palette],
          '--mb-glow-rgb': glow.join(', '),
          '--mb-accent-rgb': accent.join(', '),
          '--mb-accent-ink': inkFor(accent),
          '--mb-radius': `${corner}px`,
          '--mb-inner-radius': `${Math.round(clamp(corner * 0.5, 6, 12))}px`,
          '--mb-pad': `${Math.round(clamp(corner * 0.85, 14, 20))}px`,
          '--mb-spot-size': `${Math.max(40, spotlightRadius)}px`,
          '--mb-border-size': `${Math.round(Math.max(40, spotlightRadius) * 0.75)}px`
        }),
        gridTemplateColumns: `repeat(${span}, minmax(0, 1fr))`,
        gridAutoRows: span === 1 ? `minmax(${rowHeight}px, auto)` : `${rowHeight}px`,
        gap: `${Math.max(0, gap)}px`,
        ...style
      }}
    >
      {items.map((item, index) => {
        const entry = item ?? {};
        const Visual = typeof entry.visual === 'string' ? VISUALS[entry.visual] : null;
        const visual = Visual ? <Visual /> : typeof entry.visual === 'string' ? null : entry.visual;
        const clickable = Boolean(entry.href || entry.onClick || onItemClick);
        const handleClick = (event: React.MouseEvent) => {
          entry.onClick?.(event);
          onItemClick?.(entry, index);
        };
        const cardProps = {
          ref: (element: HTMLElement | null) => {
            cardRefs.current[index] = element;
          },
          className: 'magic-bento__card',
          'data-clickable': clickable ? '' : undefined,
          'data-image': entry.image ? '' : undefined,
          onClick: clickable ? handleClick : undefined
        };
        const body = (
          <>
            {entry.image && <img className="magic-bento__image" src={entry.image} alt="" draggable={false} />}
            {entry.image && <span className="magic-bento__scrim" />}
            {enableSpotlight && <span className="magic-bento__light" />}
            {enableStars && (
              <canvas
                ref={element => {
                  starRefs.current[index] = element;
                }}
                className="magic-bento__stars"
                aria-hidden="true"
              />
            )}
            <div className="magic-bento__content">
              {entry.content ?? (
                <>
                  {(entry.icon || entry.label) && (
                    <div className="magic-bento__header">
                      {entry.icon && <span className="magic-bento__icon">{entry.icon}</span>}
                      {entry.label && <span className="magic-bento__label">{entry.label}</span>}
                    </div>
                  )}
                  {visual && (
                    <div className="magic-bento__visual" aria-hidden="true">
                      {visual}
                    </div>
                  )}
                  {(entry.title || entry.description) && (
                    <div className="magic-bento__text">
                      {entry.title && <h3 className="magic-bento__title">{entry.title}</h3>}
                      {entry.description && <p className="magic-bento__description">{entry.description}</p>}
                    </div>
                  )}
                </>
              )}
            </div>
            <span className="magic-bento__rim" />
            <span className="magic-bento__border" />
          </>
        );

        return (
          <div
            key={entry.id ?? index}
            ref={element => {
              cellRefs.current[index] = element;
            }}
            className="magic-bento__cell"
            style={{
              gridColumn: `span ${Math.min(span, Math.max(1, Math.round(entry.colSpan ?? 1)))}`,
              gridRow: `span ${Math.max(1, Math.round(entry.rowSpan ?? 1))}`
            }}
          >
            {entry.href ? (
              <a {...cardProps} href={entry.href} target={entry.target} rel={entry.rel}>
                {body}
              </a>
            ) : (
              <div
                {...cardProps}
                role={clickable ? 'button' : undefined}
                tabIndex={clickable ? 0 : undefined}
                aria-label={clickable ? entry.title : undefined}
              >
                {body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MagicBento;
