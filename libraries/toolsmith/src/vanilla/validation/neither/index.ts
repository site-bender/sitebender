// (JSDoc removed in favor of Envoy)
//++ neither(A, B) — returns true only when both predicates are false
const neither =
	<T>(predA: (value: T) => boolean, predB: (value: T) => boolean) =>
	(value: T): boolean => !predA(value) && !predB(value)

export default neither

//?? [EXAMPLE] neither((n:number)=>n>0,(n:number)=>n%2===0)(-3) // true
