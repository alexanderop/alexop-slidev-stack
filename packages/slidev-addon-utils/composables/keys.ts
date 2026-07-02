import type { InjectionKey, Ref } from 'vue'
import type { RoughGenerator } from 'roughjs/bin/generator'
import type { Variant, VariantColor } from '../constants/colors'

export const ROUGH_GENERATOR_KEY: InjectionKey<RoughGenerator> = Symbol('roughGenerator')
export const ROUGHNESS_KEY: InjectionKey<Ref<number>> = Symbol('roughness')
export const SEED_KEY: InjectionKey<Ref<number>> = Symbol('seed')
export const THEME_KEY: InjectionKey<Record<Variant, VariantColor>> = Symbol('roughTheme')

export interface DiagramNodeBox {
  x: number
  y: number
  width: number
  height: number
}

export const DIAGRAM_NODES_KEY: InjectionKey<Map<string, DiagramNodeBox>> = Symbol('diagramNodes')
