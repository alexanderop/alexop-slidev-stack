import { computed } from 'vue'
import { useNav } from '@slidev/client'

/**
 * Visibility driven by the slide's click counter.
 * A step of `undefined` or `<= 0` is always visible.
 * Pair with `clicks: N` in the slide's frontmatter.
 */
export function useClickStep(getStep: () => number | undefined) {
  const nav = useNav()
  return computed(() => {
    const step = getStep()
    return step == null || step <= 0 || nav.clicks.value >= step
  })
}
