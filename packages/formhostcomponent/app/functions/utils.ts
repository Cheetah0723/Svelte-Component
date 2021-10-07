export const groupMultipleBy = <T, K extends string | number | symbol>(
  list: T[],
  keys: (element: T) => K[]
) => {
  return list.reduce((map, x) => {
    for (const key of keys(x)) {
      const values = (map[key] = map[key] || [])
      values.push(x)
    }
    return map
  }, {} as Record<K, T[]>)
}
