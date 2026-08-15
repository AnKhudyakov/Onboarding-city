export const variant = <T>(options: readonly T[], x: number, y: number) => {
  let hash = Math.imul(x, 73_856_093) ^ Math.imul(y, 19_349_663)

  hash ^= hash >>> 15
  hash = Math.imul(hash, 2_246_822_507)
  hash ^= hash >>> 13
  hash = Math.imul(hash, 3_266_489_909)
  hash ^= hash >>> 16

  return options[((hash % options.length) + options.length) % options.length]
}
