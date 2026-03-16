import { shallowRef, onMounted } from 'vue'
import { codeToTokens } from 'shiki'
import type { ThemedToken } from 'shiki'

const cache = new Map<string, ThemedToken[]>()

export function useShikiTokens(code: string, lang: string = 'javascript', theme: string = 'vitesse-dark') {
  const tokens = shallowRef<ThemedToken[] | null>(null)
  const cacheKey = `${code}:${lang}:${theme}`

  const cached = cache.get(cacheKey)
  if (cached) {
    tokens.value = cached
    return { tokens }
  }

  onMounted(async () => {
    try {
      const result = await codeToTokens(code, { lang: lang as any, theme })
      const line = result.tokens[0] ?? []
      cache.set(cacheKey, line)
      tokens.value = line
    } catch (e) {
      console.warn(`[useShikiTokens] Failed to highlight: "${code}"`, e)
    }
  })

  return { tokens }
}
