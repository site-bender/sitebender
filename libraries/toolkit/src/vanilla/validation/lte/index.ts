// (JSDoc removed in favor of Envoy)
//++ lte(threshold)(value) — inclusive <= comparison predicate
const lte = <T>(threshold: T) => (value: T): boolean => value <= threshold

export default lte
