import type { InjectionKey, Ref } from 'vue'
import type { RoughGenerator } from 'roughjs/bin/generator'
import type { Variant, VariantColor } from '../constants/colors'

export const ROUGH_GENERATOR_KEY: InjectionKey<RoughGenerator> = Symbol('roughGenerator')
export const ROUGHNESS_KEY: InjectionKey<Ref<number>> = Symbol('roughness')
export const SEED_KEY: InjectionKey<Ref<number>> = Symbol('seed')
export const THEME_KEY: InjectionKey<Record<Variant, VariantColor>> = Symbol('roughTheme')
