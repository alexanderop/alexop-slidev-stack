import { inject } from 'vue'
import rough from 'roughjs'
import type { RoughGenerator } from 'roughjs/bin/generator'
import { ROUGH_GENERATOR_KEY, ROUGHNESS_KEY, SEED_KEY } from './keys'

export interface PathInfo {
  d: string
  stroke?: string
  strokeWidth?: number
  fill?: string
}

export function useRoughContext() {
  const injectedGen = inject(ROUGH_GENERATOR_KEY, null!)
  const injectedRoughness = inject(ROUGHNESS_KEY, null!)
  const injectedSeed = inject(SEED_KEY, null!)
  const gen = injectedGen || rough.generator()

  function resolveRoughness(explicit?: number): number {
    return explicit ?? injectedRoughness?.value ?? 1.0
  }

  function resolveSeed(explicit?: number): number {
    return explicit ?? injectedSeed?.value ?? 42
  }

  return { gen, resolveRoughness, resolveSeed }
}

export function useRough() {
  const { gen, resolveRoughness, resolveSeed } = useRoughContext()

  function toPaths(drawable: ReturnType<RoughGenerator['rectangle']>): PathInfo[] {
    return gen.toPaths(drawable) as PathInfo[]
  }

  return { gen, resolveRoughness, resolveSeed, toPaths }
}
