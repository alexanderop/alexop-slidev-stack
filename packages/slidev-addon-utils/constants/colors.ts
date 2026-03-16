import { inject } from 'vue'
import { THEME_KEY } from '../composables/keys'

export interface VariantColor {
  stroke: string
  fill: string
}

export type Variant = 'default' | 'accent' | 'success' | 'danger' | 'muted'

export const VARIANT_COLORS: Record<Variant, VariantColor> = {
  default: { stroke: 'rgba(255, 107, 237, 0.7)', fill: 'rgba(52, 63, 96, 0.4)' },
  accent: { stroke: 'rgba(255, 107, 237, 0.9)', fill: 'rgba(255, 107, 237, 0.15)' },
  success: { stroke: 'rgba(52, 211, 153, 0.8)', fill: 'rgba(52, 211, 153, 0.12)' },
  danger: { stroke: 'rgba(248, 113, 113, 0.8)', fill: 'rgba(248, 113, 113, 0.1)' },
  muted: { stroke: 'rgba(255, 255, 255, 0.3)', fill: 'rgba(255, 255, 255, 0.05)' },
}

export const EDGE_STROKE = 'rgba(255, 107, 237, 0.5)'

export function getVariantColors(variant?: Variant, theme?: Record<Variant, VariantColor>): VariantColor {
  const resolved = theme ?? inject(THEME_KEY, null!) ?? VARIANT_COLORS
  return resolved[variant ?? 'default']
}
