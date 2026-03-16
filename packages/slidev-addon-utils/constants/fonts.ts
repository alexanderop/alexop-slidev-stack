export const FONTS = {
  sans: "'Geist', sans-serif",
  mono: "'Geist Mono', monospace",
} as const

export const TEXT_STYLES = {
  label: {
    fontFamily: FONTS.sans,
    fontSize: '16px',
    fontWeight: '600',
    fill: 'rgba(234, 237, 243, 0.95)',
  },
  subtitle: {
    fontFamily: FONTS.mono,
    fontSize: '12px',
    fontWeight: '400',
    fill: 'rgba(255, 255, 255, 0.4)',
  },
  title: {
    fontFamily: FONTS.mono,
    fontSize: '13px',
    fontWeight: '600',
    fill: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
  edgeLabel: {
    fontFamily: FONTS.mono,
    fontSize: '11px',
    fontWeight: '400',
    fill: 'rgba(255, 107, 237, 0.7)',
  },
  detail: {
    fontFamily: FONTS.mono,
    fontSize: '12px',
    fontWeight: '400',
    fill: 'rgba(255, 255, 255, 0.5)',
  },
} as const
