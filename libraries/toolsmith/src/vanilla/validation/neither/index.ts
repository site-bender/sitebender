// (JSDoc removed in favor of Envoy)
//++ neither(A, B) — returns true only when both predicates are false
const neither =
	<T>(predA: (value: T) => boolean, predB: (value: T) => boolean) =>
	(value: T): boolean => !predA(value) && !predB(value)

export default neither
