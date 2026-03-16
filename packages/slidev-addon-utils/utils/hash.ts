export function hashId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = Math.trunc((h << 5) - h + id.codePointAt(i))
  }
  return Math.abs(h)
}
